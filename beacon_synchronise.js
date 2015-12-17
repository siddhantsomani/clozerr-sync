var registry = global.registry;
var events = require('events');
var eventEmitter = new events.EventEmitter();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Clozerr');

var db = mongoose.connection;

db.on('error',function(err){
	console.log("Connection Error - ",err);
});

db.once('open',function(){
	console.log("Connected");
});

/*var edittedSchema = new mongoose.Schema({
	name: String,
	//Add the below attributes to preexisting Schema
	LastModified: Date,
	LastSynchronized: Date
});*/

var beacon_synchronise = function (){
	var Vendor = registry.getSharedObject('models_Vendor');
	Vendor.find().$where("this.last_modified > this.sync_data.beaconstac.last_synchronised").exec(function (err,vendor){
			if(err)
				throw err;
			else {
				//Update last Synchronised in Clozerr DB to 'now'
				for(var i = 0; i<vendor.length;i++){
					//vendor[i].LastSynchronized = new Date();
					vendor[i].sync_data.beaconstac.last_synchronised = new Date();
					vendor[i].save(function(err){
						if(err)
							console.log("Synchronisation Error - ",vendor[i].name);
					});
					//Synchronize beacons and location fields
					
					var set_place_promise = set_place(vendor[i].name, vendor[i].location[0], vendor[i].location[1], vendor[i].geofences);//For synchronising the location
					var set_beacon_promise = set_beacon(vendor[i].beacons.beacon_id,vendor[i].beacons.title,vendor[i].beacons.major, vendor[i].beacons.minor,vendor[i].name, vendor[i].beacons.message);
				}
				//TESTING Synchronisation: console.log(vendors);

			}
	});

}
eventEmitter.on('beacon_synchronise',beacon_synchronise);

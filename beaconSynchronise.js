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

var beaconSynchronise = function (){
	var Vendor = mongoose.model('Vendor',edittedSchema); // Replace Vendor by Model Name
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
				}
				//TESTING Synchronisation: console.log(vendors);
				//Update DB Using API (SDK)
				
			}
	});
	
}
eventEmitter.on('beaconSynchronise',beaconSynchronise);


var registry = global.registry;
var mongoose = require('mongoose');
var _ = require('underscore');
module.exports = function randomiser(user){
	mongoose.connect('mongodb://localhost/Clozerr');
	var db = mongoose.connection;
	
	db.on('error',function (err){
		console.log("Connection Error - ",err);
	});
	db.once('open', function(){
		console.log("Connected");
	});
	
	var easy = [];
	var medium = [];
	var hard = [];
	var Offer = registry.getSharedObject('models_Offer');
	var used_offers = user.Offers_used;
	Offer.find({ params.type : "treasureHuntClue" }).exec(function (err, offer){
		if(err)
			throw err;
		else
		{
			for(var i =0;i<offer.length;i++){
				if(offer[i].params.level == "easy"){
					easy.push(offer[i]._id);
				}
				else if(offer[i].params.level == "medium"){
					medium.push(offer[i]._id);
				}
				else if(offer[i].params.level == "hard"){
					hard.push(offer[i]._id);
				}
			}
		// diff - Value returned is offer._id of the next offer(clue) to be given to the user
			if(_.difference(easy,used_offers)){
				var diff = _.difference(easy,used_offers);
				return diff[0];
			}
			else if(_.difference(medium,used_offers)){
				var diff = _.difference(medium,used_offers);
				return diff[0];
			}
			else {
				var diff = _.difference(hard,used_offers);
				return diff[0];
			}
		}
	});	
}
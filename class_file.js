const mongoose = require("mongoose")
const keys = require("./config/keys")
var data_model = require("./Models/save_data");
const date = require('date-and-time');



class Database {

 	user(ip, search,site) {
 		let now = new Date();
 		let user_data = {
 			ip :{
 				"search": search, 
 				"site": site, 
 				"time": date.format(now, 'YYYY/MM/DD HH:mm:ss', true) 
 			}
 		}

 		const instance = new data_model(user_data)
 		instance.save(function(err){
 			if (err){
 				console.log(err)
 				//Do something to complete the request, even if there is some error saving data in the db. 
 			}
 			else{
 				console.log("No error saving the data in db.")
 			}
 		})
	}
}



module.exports = Database;


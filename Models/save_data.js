var express = require('express')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//mongoose.connect('mongodb://localhost/lol_db');


const ObjectId = Schema.ObjectId;
 
const peopleSchema = new Schema({
	site_Name :{
		author: ObjectId,
		name: { type: String, default: 'hahaha' },
		body: { type: String, default: 'lol' },
		
	}, 
	amazon:{
		age: { type: String , default: 'hahaha'}
	}
  //date: Date
});

//turing schema into model
var person = mongoose.model('people', peopleSchema);

//importing that module 
module.exports = person;

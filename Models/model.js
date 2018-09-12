var express = require('express')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/lol_db');


const ObjectId = Schema.ObjectId;
 
const peopleSchema = new Schema({
  //author: ObjectId,
  name: { type: String, default: 'hahaha' },
  body: { type: String, default: 'lol' },
  age: { type: Number, min: 18, index: true }
  //date: Date
});

//turing schema into model
var person = mongoose.model('people', peopleSchema);

//importing that module 
module.exports = person;

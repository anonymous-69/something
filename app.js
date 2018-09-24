// Boilerplate code for the express app. 
var express = require('express')
var bodyParser = require('body-parser')
var path = require("path")
var app = express()




//Bodyparser middleware 
//it will handle parsing json content 
app.use(bodyParser.json()); 
//app.use(bodyParser.urlencoded({extended:false}))


//after request middleware!
app.use(function( req,res,next){
    //console.log("above middleware")
    next()
    

});





let amazon = require('./routes/amazon');
app.use('/', amazon);

let flipkart = require('./routes/flipkart');
app.use('/', flipkart);

//before respose middleware 
app.use(function( req,res,next){
    //console.log("below middleware")
	next()
	//res.send("yoyo")

});




//before respose middleware 
app.use(function( req,res,next){
    //console.log("sub below below middleware")
    //res.send("yoyo")

});







app.listen(5000, function(){
	console.log("server started on port 5000....")
})



//curl -H "Accept: application/json" -X POST  --data '{"param1":"value1";"param2":"value2"}' http://localhost:3000/api
//curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"id":100}' http://localhost:3000/api
//curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"id":100}' http://localhost:3000/api
//curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"param1":"value1";"param2":"value2"}' http://localhost:3000/api


//dict = {'Name': 'Zara', 'Age': 7, 'Class': 'First'}




//request-promise- make ajax request to other websites 
//cherio- beautiful soup
//axios or request  
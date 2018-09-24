const express = require('express');
const router = express.Router();
const Regex = require('regex');
const cheerio = require('cheerio');
const axios = require('axios')
const JSON = require('circular-json');
var request = require('request');

router.get('/paytm-request',function(req,res){
    url = "https://middleware.paytmmall.com/T-shirt-below-199-llpid-180827?channel=web&child_site_id=6&site_id=1&version=2&src=store&utm_source=paytm&utm_medium=affiliate&utm_campaign=redirection&utm_content=%2F&discoverability=online&use_mw=1&category=5028&items_per_page=32"

    request(url, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log(response.body.meta_title)
  //console.log('body:', body); // Print the HTML for the Google homepage.
  const content = JSON.parse(response.body)
  console.log(content.path)
  res.send(response)
});

})

module.exports = router;
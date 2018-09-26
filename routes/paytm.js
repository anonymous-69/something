//"use strict"
const express = require('express');
const router = express.Router();
const Regex = require('regex');
const cheerio = require('cheerio');
const axios = require('axios')
const JSON = require('circular-json');
var request = require('request');


router.get('/paytm',function(req,res,next){
    console.log("hitting paytm route")
    var  search_term = "sneakers"
    var  number_of_products =  ""
    var  search = encodeURI(search_term);
    url_paytm = `https://middleware.paytmmall.com/search?channel=web&child_site_id=6&site_id=2&version=2&userQuery=${search}&from=organic&cat_tree=1&page_count=1&items_per_page=32&resolution=960x720&quality=high&curated=1&_type=1`
    console.log(url_paytm)
    headers =   {
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
        "X-user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36 FKUA/website/41/website/Desktop",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Connection": "keep-alive"
        }

    var response = axios({
        method: 'post',
        url: url_paytm,
        headers:headers
      })
    .then(function (response){
        console.log("lol")
        number_of_products = 0 
        var paytm_json_obj = {"paytm_product":[]};
        products = response.data.grid_layout
        products.map(function(item, index){
            product_name = item.name
            product_url = item.url
            product_price = item.offer_price
            product_image_url = item.image_url
            console.log(product_name)
            console.log(product_image_url)
            console.log(product_price)     
            console.log("===================================================")   
                
            paytm_json_obj['paytm_product'].push({"product_name" : product_name, "product_url" :product_url, "product_rating": "Not available","product_image_url":product_image_url, "product_price":product_price });
            number_of_products = number_of_products+1 
            paytm_json_obj["number_of_products"] = number_of_products
            
        
        })
        
        res.send(paytm_json_obj)
    })
    .catch(function(err){
        console.log("eooooooo")
        console.log(err)
    })

})

module.exports = router;









//https://middleware.paytmmall.com/search?
//channel=web
//&child_site_id=6
//&site_id=2
//&version=2
//&userQuery=xbox%20games
//&from=organic
//&cat_tree=1
//&page_count=1
//&items_per_page=32
//&resolution=960x720
//&quality=high
//&curated=1
//&_type=1
//
//
//
//
//https://middleware.paytmmall.com/search
//?channel=web
//&child_site_id=6   
//&site_id=2
//&version=2
//&userQuery=iphone%20
//&from=organic
//&cat_tree=1
//&page_count=1
//&items_per_page=32
//&resolution=960x720
//&quality=high
//&curated=1
//&_type=1
//




//https://middleware.paytmmall.com/search?channel=web&child_site_id=6&site_id=2&version=2&userQuery=samsung&from=organic&cat_tree=1&page_count=1&items_per_page=32&resolution=960x720&quality=high&curated=1&_type=1





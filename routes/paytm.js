"use strict"
const express = require('express');
const router = express.Router();
const Regex = require('regex');
const cheerio = require('cheerio');
const axios = require('axios')
const JSON = require('circular-json');
const request = require('request');
const  rp = require('request-promise')
const  date = require('date-and-time');;
const initial_data = require('../send_data_to_db')
//import Database as database from '../class_file'




router.get('/paytm',function(req,res,next){

    console.log("hitting paytm route")
    //Saving the IP, search term and the site name in the databse. 
    let site = "paytm.com"
    const search = "ps4 games"
    const ip = req.ip
    let user = new initial_data(ip, search, site)
    user.user()

    var  number_of_products =  ""
    const  search_term = encodeURI(search);
    const url_paytm = `https://middleware.paytmmall.com/search?channel=web&child_site_id=6&site_id=2&version=2&userQuery=${search}&from=organic&cat_tree=1&page_count=1&items_per_page=32&resolution=960x720&quality=high&curated=1&_type=1`
    //const url1 = "http://httpbin.org/ip"
    console.log(url_paytm)
    const headers = {
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
        "X-user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36 FKUA/website/41/website/Desktop",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Referer": "https://paytmmall.com/",
        "Connection": "keep-alive",
        "Host":"middleware.paytmmall.com",
        "Origin": "https://paytmmall.com"
        }



    rp({
        method: 'POST',
        url: url_paytm,
        //proxy: 'http://190.81.162.134:53281',
        headers:headers,
        json: true
    })
    .then(function (response){
       

        console.log("yo")
        
        number_of_products = 0 
        var paytm_json_obj = {"paytm_product":[]};
        let products = response.grid_layout
        products.map(function(item, index){
            let product_name = item.name
            let product_url_middleware = item.newurl
            let product_url = product_url_middleware.replace(/middleware\./gm, '');
            let product_price = item.offer_price
            let product_image_url = item.image_url
            console.log(product_name)
            console.log(product_image_url)
            console.log(product_price)     
            console.log("===================================================")   
                
            paytm_json_obj['paytm_product'].push({"product_name" : product_name, "product_url" :product_url, "product_rating": "Not available","product_image_url":product_image_url, "product_price":product_price });
            number_of_products = number_of_products+1 
            paytm_json_obj["number_of_products"] = number_of_products
            
        
        })
        if (number_of_products == 0){
            res.send(JSON.stringify({"error": "Unable to find \""+ search +"\". You might have misspelled it or the product is not available."}))
        }
        else{
        res.send(paytm_json_obj)
        }
    })
    .catch(function(err){
        let user_ = new initial_data(ip, search, site, true)
        user_.user()
        console.log(err)
        res.status(403)
        res.send(JSON.stringify({error_message:"something went wrong!"}))
    })

})

module.exports = router;











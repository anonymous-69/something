"use strict"
const express = require('express');
const router = express.Router();
const Regex = require('regex');
const cheerio = require('cheerio');
const axios = require('axios')
const JSON = require('circular-json');
var request = require('request');
var rp = require('request-promise');

router.get('/flipkart', function(req,res){
    const url_flipkart = "https://www.flipkart.com/api/4/page/fetch"
    const headers =   {
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
        "X-user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36 FKUA/website/41/website/Desktop",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Referer": "https://www.flipkart.com/home-kitchen/home-appliances/washing-machines/semi-automatic-top-load~function/pr?sid=j9e%2Cabm%2C8qx&otracker=nmenu_sub_TVs+and+Appliances_0_Semi+Automatic+Top+Load&p%5B%5D=facets.ideal_for_family_size%255B%255D%3DFamily%2Bof%2B3&page=3",
        "Connection": "keep-alive",
        "Host":"www.flipkart.com",
        "Origin": "https://www.flipkart.com"
        }
               
    const payload = {
        "pageUri":"/search?q=sneakers+&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off",
        "pageContext":{
            "paginatedFetch":false,
            "pageNumber":1,
            "fetchSeoData":true
        }
        ,"requestContext":{
            "type":"BROWSE_PAGE","ssid":"77tw95kkog0000001537966890125","sqid":"j5lw9681gw0000001537966890125"}}
    
    rp({
        method: 'POST',
        url: url_flipkart,
        proxy: 'http://190.81.162.134:53281',
        headers:headers,
        body:payload,
        json: true,
    })
    .then(function (response) {
        console.log("finally")
        var response_data = response
        
        var products = response_data.RESPONSE.slots
    
        console.log(typeof(products))
        var number_of_products
        var flipkart_json_obj = {"flipkart_product":[]};
        var number_of_products = 0
        products.map(function(item, index){
            if (!("widget" in item )){
                console.log("no widget")
                }
                else{
                    var y = item.widget
                    
                    if (!("data" in  y )){
                        console.log("no data")
                    }
                    else{
                        var x = item.widget.data
                        if (!("products" in x)){
                            console.log("no products")
                        }
                        else if ("products" in x){
                            let i 
                            for (i in x.products){
                                console.log(i)
                                var product_title = x.products[i].productInfo.value.titles.title
                                var price = x.products[i].productInfo.value.pricing.finalPrice.decimalValue
                                var ratings = x.products[i].productInfo.value.rating.average
                                var total_rating_number = x.products[i].productInfo.value.rating.count // no of users who gave it rating 
                                var product_url = x.products[i].productInfo.value.smartUrl
                                var product_image = x.products[i].productInfo.value.media.images[0].url
                            

                                const image_height = product_image.replace(/\{@height\}/gm, '832');
                                const image_width = image_height.replace(/\{@width\}/gm, '832');
                                const image_quality = image_width.replace(/\{@quality\}/gm, '70');
                                console.log(image_quality)
                                //let image_url
                                let image_url = String(image_quality) 
                                console.log(typeof(image_url))
                                number_of_products = number_of_products+1 
                                flipkart_json_obj['flipkart_product'].push({"product_name" : product_title, "product_url" :product_url, "product_rating": ratings,"product_image_url":image_quality, "product_price":price,"product_total_people_rated" : total_rating_number });
                                flipkart_json_obj['number_of_products'] = number_of_products
                                console.log(number_of_products)
                            
                            }
                        }
                        else {
                            res.send("No product or check if you spelled it correctly. ")
                        }
                    }
                    console.log("_______________________________--")
                }
                
        })
   

        let json_str = JSON.stringify(flipkart_json_obj)
        res.send(json_str)
        })
    .catch(function(err){
        console.log(err)
        res.status(403) 
        res.send(JSON.stringify({error_message:"something went wrong!"}))
    })
      
      
})

module.exports = router;



        //iphone 
        //"ssid":"hdeulcnzio0000001537687391769",
        //"sqid":"oh1lu4h7nk0000001537687391769"
        

        //note 8 
        //"ssid":"hdeulcnzio0000001537687391769",
        //"sqid":"ecf7a7u1740000001537687475137"


        //washiong machine 
        //"ssid":"ekoo69k30w0000001537687475138",
        //"sqid":"rv5dv6geg00000001537687532008"

        //jbl speakers 
        //"ssid":"v2nvb6kahs0000001537687532008",
        //"sqid":"rucjnz4a1s0000001537687658226"

        //F&D speakers 
        //"ssid":"ba2ykk1khs0000001537687701532",
        //"sqid":"leq6atohow0000001537687728192"


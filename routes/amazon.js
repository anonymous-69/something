"use strict"
const express = require('express');
const router = express.Router();
const Regex = require('regex');
const cheerio = require('cheerio');
const axios = require('axios')
const JSON = require('circular-json');
const request = require('request');
const pretty = require('pretty');
var rp = require('request-promise');

//Importing the functions and classes. 
const initial_data = require('../send_data_to_db')
const find_rh_value = require('../functions/amazon_functions_webpage')
const find_qid_value = require('../functions/amazon_functions_webpage')
const json_key_with_data = require('../functions/amazon_functions_api')
const escaping_characters = require('../functions/amazon_functions_api')
const product_url = require('../functions/amazon_functions_api')
const product_image = require('../functions/amazon_functions_api')
//const product_url = require('../functions/amazon_functions_api')


router.get('/amazon', function(req, res,next){
    console.log("Hitting amazon API")
    //saving ip, search term, time and website in db. 
    let search = 'ps4+games'
    const ip = req.ip
    const site = "amazon.in" 
    let user = new initial_data(ip, search, site)
    user.user()


    //add payload to the amazon website. 
    let url_amazon =  `https://www.amazon.in/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=${search}`
    //https://www.amazon.in/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=xiaomi&rh=i%3Aaps%2Ck%3Axiaomi
    let headers =   {
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
        "X-user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36 FKUA/website/41/website/Desktop",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Connection": "keep-alive"
        }

    rp({
        method: 'POST',
        url: url_amazon,
        //proxy: 'http://190.81.162.134:53281',
        headers:headers,
        //Not parsing json like others as it is html. 
        //json: true
    })
    .then(function (response){
        //console.log(response.data)
        let response_data = response.data
                
        var rh_value = find_rh_value.find_rh_value(response_data,search)
        var qid_value = find_qid_value.find_qid_value(response_data) 
        
        let fromHash = encodeURIComponent("ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=books+")
        let url =  `https://www.amazon.in/mn/search/ajax/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=${search}+&rh=${rh_value}&fromHash=${fromHash}&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=${qid_value}&atfLayout=list`
        
        console.log("--------------------------------------------------")
        console.log(url)
        console.log("--------------------------------------------------")

    let response2 = axios({
        method: 'post',
        url: url,
        headers:headers
      })
    .then(function (response2) {
        //console.log(response)
        let response_data2 = response2.data
        let amazon_json_obj = {"amazon_product":[]};

        let result = response_data2.replace(/}\n&&&\n{/gm, ',');
        //removing the &&& in the end
        let result2 = result.replace(/&&&/gm,'')
        let json_response_data2 = JSON.parse(result2)
        
        var data_array =json_key_with_data.json_key_with_data(json_response_data2)

        let i;
        var number_of_products = 0
        for (i in data_array){
            let $ = cheerio.load(data_array[i])
            let product_name = $('.s-access-title') 
            
            product_name.each(function(index,product){
                var product_title = $(product).text()
                console.log(product_title)
                console.log("---------------------------")
                //remove the sponsered result. 
                let m
                let sponsored_regex = /\[Sponsored]/g;
                if ((m = sponsored_regex.exec(product_title)) !== null) {
                    if (m.index === sponsored_regex.lastIndex) {
                        regex.lastIndex++;
                    }
                    console.log("alert, sponsored product found")
                }   
                else{
                    let product_name = escaping_characters.escaping_characters(product_title)
                    //Grabbing URL
                    var product_url = product_url.product_url(product_name)
                    
                    
                    //Grabbing Image URL 
                    product_image = product_image.product_image(product_name)

                    //Grabbing price. 
                    let price;
                    const regex_price = new RegExp(product_name + '.*?<span class="currencyINR">.*?<\\/span>(.*?)<\\/span>', 'g' )
                    console.log(regex_price)
                    if ((price = regex_price.exec(data_array[i]))!== null) {
                        // This is necessary to avoid infinite loops with zero-width matches
                        if (price.index === regex_price.lastIndex) {
                            regex_price.lastIndex++;
                        }
                        var product_price = price[1]
                        console.log(product_price)
                    }

                    else{
                        console.log("Unable to Grabbing price")
                        var product_price = 'price not available'    
                    }

                    //Grabbing ratings
                    
                    const regex_rating = new RegExp('>' + product_name + '<.*?(.*?) out of 5', 'gm')
                    console.log(regex_rating)
                    let rating;
                    if ((rating = regex_rating.exec(data_array[i]))!== null) {
            
                        if (rating.index === regex_rating.lastIndex) {
                            regex_rating.lastIndex++;
                        }
                        //rating gives some long ass string.   
                        let ratings_string = rating[1].split(" ").splice(-1)[0];
                        // ratings_string gives span class="a-icon-alt"
                        let regex_rating_number = /.*?>(.*)/gm;
                        let rating_number
                        if ((rating_number = regex_rating_number.exec(ratings_string))!== null) {

                            if (rating_number.index === regex_rating_number.lastIndex) {
                                regex_rating_number.lastIndex++;
                            }
                        
                        var product_ratings = rating_number[1]
                        console.log(product_ratings)
                        }
                        else{
                            console.log("unable to find ratings string- span class=\"a-icon-alt\" ")
                            var product_ratings = "unable to find ratings data"
                        }
                    
                    }
                    else{
                        console.log("Unable to grab ratings")
                        var product_ratings = "unable to find ratings data"
                    }
                    number_of_products = number_of_products+1
                    amazon_json_obj['amazon_product'].push({"product_name" : product_title, "product_url" :product_url, "product_image_url":product_image_url, "prodcut_price":product_price, "product_ratings": product_ratings  });
                    amazon_json_obj["number_of_products"] = number_of_products  
                }
            })
        }
    let json_str = JSON.stringify(amazon_json_obj)    
    //res.send(json_response_data2)
    res.send(json_str)
    //this is just the raw html 
    })
    .catch(function(err){
        console.log('this is error',err)
        res.status(403)
        res.send(JSON.stringify({error_message:"something went wrong!"}))
    })
    

    })
        
    .catch(function(err){
        console.log('this is error',err)
        res.status(403)
        res.send(JSON.stringify({error_message:"something went wrong!"}))
          
    })
})



module.exports = router;


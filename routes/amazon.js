"use strict"
const express = require('express');
const router = express.Router();
const Regex = require('regex');
const cheerio = require('cheerio');
const axios = require('axios')
const JSON = require('circular-json');
const request = require('request');
const pretty = require('pretty');

router.get('/amazon', function(req, res,next){
     let search = 'ps4'
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

    let payload = {
        //add something 
    }

    let response = axios({
        method: 'post',
        url: url_amazon,
        headers:headers
      })
    .then(function (response){
        //console.log(response.data)
        let amazon_webpage = response.data

        //if there is + in search, it will them be replaced by /+
        let search2 = search.replace(/\+/gm,'\\+')
        let regex_rh = new RegExp('rh=(.*?)&.*?'+ search2 , 'g')
        console.log(regex_rh)
        let rh;
        //Do something when these if statements fail. 
        if ((rh = regex_rh.exec(amazon_webpage)) !== null) {
                if (rh.index === regex_rh.lastIndex) {
                    regex.lastIndex++;
                }
            var rh_value = rh[1]
        }
        else{
            console.log("no rh value")
            var rh_url = "n%3A2591141031%2Ck%3Aps4+games"
        }
        let qid
        let regex_qid = /qid=(.*?)\"/g
        if ((qid = regex_qid.exec(amazon_webpage)) !== null) {
            if (qid.index === regex_qid.lastIndex) {
                regex.lastIndex++;
            }
        
        var qid_value =  qid[1]
        console.log("this is y,   ", qid[1])
        }
        else{
            console.log("No qid value")
            var qid_value = "1536936862"
        }
        let z = encodeURIComponent("ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=books+")
        console.log(z)
        let url =  `https://www.amazon.in/mn/search/ajax/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=${search}+&rh=${rh_value}&fromHash=${z}&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=${qid[1]}&atfLayout=list`
        
        console.log("--------------------------------------------------")
        console.log(url)
        console.log("--------------------------------------------------")

     //url= "https://www.amazon.in/mn/search/ajax/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=iphone&rh=i%3Aaps%2Ck%3Aiphone&fromHash=%2Fref%3Dnb_sb_noss_2%3Furl%3Dsearch-alias%253Daps%26field-keywords%3Dsamsing%2B%26sprefix%3Dsamsing%252Caps%252C380%26crid%3DXQW3OYZSXV6C&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1536522016&atfLayout=list"
    //samsung phones 
    //url = "https://www.amazon.in/mn/search/ajax/ref=nb_sb_noss?url=node%3D1805560031&field-keywords=samsung&lo=electronics&rh=n%3A1805560031%2Ck%3Asamsung&fromHash=%2Fs%2Fref%3Dsr_nr_p_89_2%3Ffst%3Das%253Aoff%26rh%3Dn%253A976419031%252Cn%253A1389401031%252Cn%253A1389432031%252Cn%253A1805560031%252Ck%253Aiphone%252Cp_89%253AOnePlus%26keywords%3Diphone%26ie%3DUTF8%26qid%3D1536522399%26rnid%3D3837712031%26lo%3Delectronics&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1536675080&atfLayout=image"
    //iphones 
    //url = 'https://www.amazon.in/mn/search/ajax/gp/search/ref=sr_nr_p_89_1?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A1389401031%2Cn%3A1389432031%2Cn%3A1805560031%2Ck%3Aiphone%2Cp_89%3AApple%7CiPhone&keywords=iphone&ie=UTF8&qid=1536786087&rnid=3837712031&fromHash=%2Fs%2Fref%3Dsr_nr_p_89_0%3Ffst%3Das%253Aoff%26rh%3Dn%253A976419031%252Cn%253A1389401031%252Cn%253A1389432031%252Cn%253A1805560031%252Ck%253Aiphone%252Cp_89%253AApple%26keywords%3Diphone%26ie%3DUTF8%26qid%3D1536786078%26rnid%3D3837712031&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1536786098&atfLayout=list'
    //1st sept , below 2 are not working 
    //url = 'https://www.amazon.in/mn/search/ajax/&rh=n%3A976419031%2Cn%3A1389401031%2Cn%3A1389432031%2Ck%3Aphones%2Cp_n_operating_system_browse-bin%3A1485080031&page=2&keywords=phones&ie=UTF8&qid=1535808244&fromHash=%2Fgp%2Fsearch%2Fref%3Dsr_nr_p_n_operating_system_0%3Ffst%3Das%253Aoff%26rh%3Dn%253A976419031%252Cn%253A1389401031%252Cn%253A1389432031%252Ck%253Aphones%252Cp_n_operating_system_browse-bin%253A1485080031%26keywords%3Dphones%26ie%3DUTF8%26qid%3D1535808224&section=BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1535808434&atfLayout=list'
    //url = "https://www.amazon.in/mn/search/ajax/ref=nb_sb_noss?url=node%3D1805560031&field-keywords=jbl+speakers&rh=n%3A976419031%2Cn%3A1389401031%2Cn%3A1389432031%2Cn%3A1805560031%2Ck%3Ajbl+speakers&fromHash=%2Fs%2Fref%3Dsr_nr_p_n_feature_six_brow_2%3Ffst%3Das%253Aoff%26rh%3Dn%253A976419031%252Cn%253A1389401031%252Cn%253A1389432031%252Cn%253A1805560031%252Ck%253Avivo%252Cp_n_feature_six_browse-bin%253A6631754031%26keywords%3Dvivo%26ie%3DUTF8%26qid%3D1536341840%26rnid%3D6631751031&section=BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1536357100&atfLayout=list"
    //url = 'https://www.amazon.in/mn/search/ajax/s/ref=sr_nr_p_89_0?fst=as%3Aoff&rh=n%3A1350384031%2Cn%3A1374515031%2Ck%3Awashing+machine+cleaning+powder%2Cp_89%3AWhirlpool&keywords=washing+machine+cleaning+powder&ie=UTF8&qid=1536825684&rnid=3837712031&fromHash=%2Fref%3Dnb_sb_ss_i_2_16%3Furl%3Dsearch-alias%253Daps%26field-keywords%3Dwashing%2Bmachine%2Bcleaning%2Bpowder%26sprefix%3Dwashing%2Bmachine%2B%252Caps%252C322%26crid%3D2Z7HAV5X3M10V&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1536825697&atfLayout=grid'
    //urls for testing 
    //url = "https://www.amazon.in/mn/search/ajax/ref=nb_sb_noss?url=node%3D1389432031&field-keywords=ps4+games&rh=n%3A976419031%2Cn%3A1389401031%2Cn%3A1389432031%2Ck%3Aps4+games&fromHash=%2Fgp%2Fsearch%2Fref%3Dsr_nr_p_89_0%3Ffst%3Das%253Aoff%26rh%3Dn%253A976419031%252Cn%253A1389401031%252Cn%253A1389432031%252Ck%253Aiphones%252Cp_89%253AApple%26keywords%3Diphones%26ie%3DUTF8%26qid%3D1536865785%26rnid%3D3837712031&section=BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1536866186&atfLayout=grid"
    //url = 'https://www.amazon.in/mn/search/ajax/ref=nb_sb_noss?url=node%3D1389432031&field-keywords=mouse+&lo=videogames&section=BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&atfLayout=list'
    //url = 'https://www.amazon.in/mn/search/ajax/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=xbox+games+&lo=videogames&rh=i%3Aaps%2Ck%3Axbox+games+&fromHash=%2Fref%3Dsr_il_ti_videogames%3Ffst%3Das%253Aon%26rh%3Dk%253Aps4%2Bgames%252Cn%253A976460031%252Cn%253A2591138031%252Cn%253A2591141031%26keywords%3Dps4%2Bgames%26ie%3DUTF8%26qid%3D1536874220%26lo%3Dvideogames&section=BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1536357100&atfLayout=grid'
    //url = "https://www.amazon.in/mn/search/ajax/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=ps4+games+&rh=n%3A2591141031%2Ck%3Aps4+games&fromHash=ref%3Dnb_sb_noss_2%3Furl%3Dsearch-alias%253Daps%26field-keywords%3Dbooks%2B&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1536936862&amp;sr=8-1-spons#productPromotions&atfLayout=list"
    
    let response2 = axios({
        method: 'post',
        url: url,
        headers:headers
      })
    .then(function (response2) {
        //console.log(response)
        console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
        let response_data = response2.data
        //removing \n
        let amazon_json_obj = {"amazon_product":[]};

        let result = response_data.replace(/}\n&&&\n{/gm, ',');
        //removing the &&& in the end
        let result2 = result.replace(/&&&/gm,'')
        let json_response_data = JSON.parse(result2)
        //console.log(result2)
        console.log("pppppppppppppppppppppppppppppppppppppppppppppppppppp")
        //scrapping the key having most of the products. 
                
        
        console.log("HELP")
        if (!("centerBelowPlus" in json_response_data)){
            let min_product_whitespace = json_response_data.centerMinus.data.value
            let min_products = min_product_whitespace.replace(/(\r\n\t|\n|\r\t)/gm,"");
            var data_array = [min_products]
            console.log('No data in  max_products')
        }
        else if (!("centerMinus" in json_response_data )){
            let max_product_whitespace = json_response_data.centerBelowPlus.data.value
            let max_products = max_product_whitespace.replace(/(\r\n\t|\n|\r\t)/gm,"");
            var data_array = [max_products]

            console.log("no data in min_products")
        }
        else{
            console.log("all data ")
            //console.log(data_array[i])
            let min_product_whitespace = json_response_data.centerMinus.data.value
            let max_product_whitespace = json_response_data.centerBelowPlus.data.value
            let min_products = min_product_whitespace.replace(/(\r\n\t|\n|\r\t)/gm,"");
            let max_products = max_product_whitespace.replace(/(\r\n\t|\n|\r\t)/gm,"");
            var data_array = [max_products, min_products ]
        }
        console.log("lol")
        let i;
        var number_of_products = 0
        for (i in data_array){
            //console.log(data_array[i])
            let $ = cheerio.load(data_array[i])
            var product_name = $('.s-access-title')
        
            
            product_name.each(function(index,product){
                var product_title = $(product).text()
                console.log(product_title)
                console.log("---------------------------")
                //remove the sponsered result. 
                let m
                let sponsored_regex = /\[Sponsored]/g;
                if ((m = sponsored_regex.exec(product_title)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                    if (m.index === sponsored_regex.lastIndex) {
                        regex.lastIndex++;
                    }
                    console.log("alert, sponsored product found")
                }   
                else{
                    let newData0 = product_title.replace(/\(/gm,'\\(')
                    let newData1 = newData0.replace(/\//gm,'\\/')
                    let newData2 = newData1.replace(/\)/gm,'\\)')
                    let newData3 = newData2.replace(/\+/gm,'\\+')
                    let newData4 = newData3.replace(/\[/gm,'\\[')
                    let newData5 = newData4.replace(/\[/gm,'\\]')
                    let newData6 = newData5.replace(/\|/gm,'\\|')
                    let newData7 = newData6.replace(/\./gm,'//.')
                    //Grabbing URL

                    const regex_url = new RegExp('<a .*? title=\"' + newData7 +  '\\".*?href=\\"(.*?)\\">' , 'g')
                    console.log(regex_url)
                    let url
                    if ((url = regex_url.exec(data_array[i])) !== null) {
                        // This is necessary to avoid infinite loops with zero-width matches
                        if (url.index === regex_url.lastIndex) {
                            regex.lastIndex++;
                        }
                        var product_url = url[1]
                        console.log("????????????")
                    }
                    else{
                        console.log("no url found")
                        var product_url = 'URL not available'
                        
                    }
                    
                    //Grabbing Image URL 
                    const regex_image = new RegExp('<img src=\\"(.*?)\\" srcset=\\".*?\\" width=\\".*?\\" height=\\".*?\\" alt=\\"'+ newData7 + '\\"', 'g' )
                    console.log(regex_image)
                    console.log("outside2 while loop ")
                    //Grabbing image url 
                    
                    let image_url
                    let beautify_html = pretty(data_array[i]);
                    if ((image_url = regex_image.exec(beautify_html))!== null) {
                        console.log("----------------------------------------------")
                        // This is necessary to avoid infinite loops with zero-width matches
                        if (image_url.index === regex_image.lastIndex) {
                            regex_image.lastIndex++;
                        }
                        var product_image_url = image_url[1]
                        console.log("99999999999999999999999999999999999999")
                        console.log(product_image_url)
                        console.log("99999999999999999999999999999999999999")
                        
                    }
                    else{
                        console.log("no image url found")
                        var product_image_url = 'image not available'
                        
                    }
                    //Grabbing price. 
                    let price;
                    const regex_price = new RegExp(newData7 + '.*?<span class="currencyINR">.*?<\\/span>(.*?)<\\/span>', 'g' )
                    console.log(regex_price)
                    if ((price = regex_price.exec(data_array[i]))!== null) {
                        // This is necessary to avoid infinite loops with zero-width matches
                        if (price.index === regex_price.lastIndex) {
                            regex_price.lastIndex++;
                        }
                        var product_price = price[1]
                        console.log(price[1])
                        console.log("00000000000000000000")
                        console.log(product_price)
                        console.log("00000000000000000000")
                                    
                    }
                    else{
                        console.log("Unable to Grabbing price")
                        var product_price = 'price not available'
                        
                    }

                    //Grabbing ratings
                    
                    const regex_rating = new RegExp('>' + newData7 + '<.*?(.*?) out of 5', 'gm')
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
                            var product_ratings = "unable to find ratings string- span class=\"a-icon-alt\" "
                        }
                    
                    }
                    else{
                        console.log("Unable to grab ratings")
                        //Do this for all the else statements so that code doesn't break. 
                        var product_ratings = "unable to find ratings data"
                    }
                    number_of_products = number_of_products+1
                    amazon_json_obj['amazon_product'].push({"product_name" : product_title, "product_url" :product_url, "product_image_url":product_image_url, "prodcut_price":product_price, "product_ratings": product_ratings  });
                    amazon_json_obj["number_of_products"] = number_of_products
                
                
                   
                }
            })
        }
    let json_str = JSON.stringify(amazon_json_obj)    
    //this is all the data including html
    //res.send(json_response_data)
    //this is all the poducts, links, images 
    res.send(json_str)
    //this is just the raw html 
    //res.send(max_products)
        

      })
      .catch(function(err){
          console.log('this is error',err)
      })
    

    })
        
    .catch(function(err){
          console.log('this is error',err)
      })
})



module.exports = router;



//https://images-eu.ssl-images-amazon.com/images/I/41U1z70fi-L._AC_US218_.jpg



//https://images-eu.ssl-images-amazon.com/images/I/51xn3k9d0FL._AC_US218_.jpg
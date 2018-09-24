const express = require('express');
const router = express.Router();
const Regex = require('regex');
const cheerio = require('cheerio');
const axios = require('axios')
const JSON = require('circular-json');
var request = require('request');


router.get('/lol', function(req, res,next){
    search = 'iphones'
    //add payload to the amazon website. 
    url_amazon =  `https://www.amazon.in/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=${search}`
    //view-source:https://www.amazon.in/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=xiaomi&rh=i%3Aaps%2Ck%3Axiaomi
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
        url: url_amazon,
        headers:headers
      })
    .then(function (response){
        //console.log(response.data)
        amazon_webpage = response.data

        //if there is + in search, it will them be replaced by /+
        var search2 = search.replace(/\+/gm,'\\+')
        regex_rh = new RegExp('rh=(.*?)&.*?'+ search2 , 'g')
        console.log(regex_rh)
        let rh;
        if ((rh = regex_rh.exec(amazon_webpage)) !== null) {
                if (rh.index === regex_rh.lastIndex) {
                    regex.lastIndex++;
                }
            console.log(rh[1])
        }
        let qid
        regex_qid = /qid=(.*?)\"/g
        if ((qid = regex_qid.exec(amazon_webpage)) !== null) {
            if (qid.index === regex_qid.lastIndex) {
                regex.lastIndex++;
            }
        console.log("222")
        console.log("this is y,   ", qid[1])
        }
        z = encodeURIComponent("ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=books+")
        console.log(z)
        url =  `https://www.amazon.in/mn/search/ajax/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=${search}+&rh=${rh[1]}&fromHash=${z}&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=${qid[1]}&atfLayout=list`
        
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
    
    var response = axios({
        method: 'post',
        url: url,
        headers:headers
      })
    .then(function (response) {
        //console.log(response)
        console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
        var response_data = response.data
        //removing \n
        var amazon_json_obj = {"amazon_product":[]};

        var result = response_data.replace(/}\n&&&\n{/gm, ',');
        //removing the &&& in the end
        var result2 = result.replace(/&&&/gm,'')
        var json_response_data = JSON.parse(result2)
        //console.log(result2)
        console.log("pppppppppppppppppppppppppppppppppppppppppppppppppppp")
        //scrapping the key having most of the products. 
                
        //console.log(max_products)
        console.log("HELP")
        if (!("centerBelowPlus" in json_response_data)){
            min_product_whitespace = json_response_data.centerMinus.data.value
            min_products = min_product_whitespace.replace(/(\r\n\t|\n|\r\t)/gm,"");
            data_array = [min_products]
            console.log('No data in  max_products')
        }
        else if (!("centerMinus" in json_response_data )){
            max_product_whitespace = json_response_data.centerBelowPlus.data.value
            max_products = max_product_whitespace.replace(/(\r\n\t|\n|\r\t)/gm,"");
            data_array = [max_products]

            console.log("no data in min_products")
        }
        else{
            console.log("all data ")
            //console.log(data_array[i])
            min_product_whitespace = json_response_data.centerMinus.data.value
            max_product_whitespace = json_response_data.centerBelowPlus.data.value
            min_products = min_product_whitespace.replace(/(\r\n\t|\n|\r\t)/gm,"");
            max_products = max_product_whitespace.replace(/(\r\n\t|\n|\r\t)/gm,"");
            data_array = [max_products, min_products ]
        }
        console.log("lol")
        for (i in data_array){
            //console.log(data_array[i])
            const $ = cheerio.load(data_array[i])
            const product_name = $('.s-access-title')
        
        
            product_name.each(function(index,product){
                const product_title = $(product).text()
                console.log(product_title)
                console.log("---------------------------")
                //remove the sponsered result. 
                let m
                const sponsored_regex = /\[Sponsored]/g;
                if ((m = sponsored_regex.exec(product_title)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                    if (m.index === sponsored_regex.lastIndex) {
                        regex.lastIndex++;
                    }
                    console.log("alert, sponsored product found")
                }   
                else{
                    var newData1 = product_title.replace(/\(/gm,'\\(')
                    var newData2 = newData1.replace(/\)/gm,'\\)')
                    var newData3 = newData2.replace(/\+/gm,'\\+')
                    

                    //Grabbing URL

                    const regex_url = new RegExp('<a .*? title=\"' + newData3 +  '\\".*?href=\\"(.*?)\\">' , 'g')
                    console.log(regex_url)
                    let url
                    if ((url = regex_url.exec(data_array[i])) !== null) {
                        // This is necessary to avoid infinite loops with zero-width matches
                        if (url.index === regex_url.lastIndex) {
                            regex.lastIndex++;
                        }
                        product_url = url[1]
                        console.log("????????????")
                    }
                    else{
                        console.log("no url found")
                        product_url = 'URL not available'
                        
                    }
                    
                    //Grabbing Image URL 
                    const regex_image = new RegExp('<img src=\\"(.*?.jpg)\\" .*? alt=\\"' +  newData3 + '\\" class=\\"s-access-image', 'g' )
                    console.log(regex_image)
                    console.log("outside2 while loop ")
                    //Grabbing image url 
                    
                    let image_url
                    if ((image_url = regex_image.exec(data_array[i]))!== null) {
                        console.log("----------------------------------------------")
                        // This is necessary to avoid infinite loops with zero-width matches
                        if (image_url.index === regex_image.lastIndex) {
                            regex_image.lastIndex++;
                        }
                        product_image_url = image_url[1]
                        console.log("lol")
                        //console.log(image_url[1])
                        console.log("```````````````````````````````````````````````")
                    }
                    else{
                        console.log("no image url found")
                        product_image_url = 'image not available'
                        
                    }
                    //Grabbing price. 
                    let price;
                    const regex_price = new RegExp(newData3 + '.*?<span class="currencyINR">.*?<\\/span>(.*?)<\\/span>', 'g' )
                    console.log(regex_price)
                    if ((price = regex_price.exec(data_array[i]))!== null) {
                        console.log("----------------------------------------------")
                        // This is necessary to avoid infinite loops with zero-width matches
                        if (price.index === regex_price.lastIndex) {
                            regex_price.lastIndex++;
                        }
                        product_price = price[1]
                        console.log("00000000000000000000")
                        console.log(product_price)
                        console.log("00000000000000000000")
                                    
                    }
                    else{
                        console.log("Unable to Grabbing price")
                        product_price = 'price not available'
                        
                    }

                    //Grabbing ratings
                    
                    const regex_rating = new RegExp(newData3 + '<.*?(.*?)out of 5 stars', 'gm')
                    console.log(regex_rating)
                    let rating;
                    if ((rating = regex_rating.exec(data_array[i]))!== null) {
                        console.log("----------------------------------------------")
                        // This is necessary to avoid infinite loops with zero-width matches
                        if (rating.index === regex_rating.lastIndex) {
                            regex_rating.lastIndex++;
                        }
                        product_ratings = rating[1]
                        console.log("11111111111111111111111111")
                        console.log(rating[1])
                        console.log("111111111111111111111111111")
                    }
                    else{
                        console.log("Unable to grab ratings")
                        //Do this for all the else statements so that code doesn't break. 
                        product_ratings = "unable to find ratings data"
                    }

                    amazon_json_obj['amazon_product'].push({"product_name" : product_title, "product_url" :product_url, "product_image_url":product_image_url, "prodcut_price":product_price, "product_ratings": product_ratings  });

                
                
                   
                }
            })
        }
    json_str = JSON.stringify(amazon_json_obj)    
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
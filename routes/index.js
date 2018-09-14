const express = require('express');
const router = express.Router();
const Regex = require('regex');
const cheerio = require('cheerio');
const axios = require('axios')
const JSON = require('circular-json');
var request = require('request');
 







router.get('/lol', function(req, res,next){
    search = 'ps4+games'
    
    url =  `https://www.amazon.in/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=${search}`
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
        url: url,
        headers:headers
      })
    .then(function (response){
        //console.log(response.data)
        amazon_webpage = response.data

        //if there is + in search, it will them be replaced by /+
        var search2 = search.replace(/\+/gm,'\\+')
        regex_rh = new RegExp('rh=(.*?)&.*?'+ search2 , 'g')
        console.log(regex_rh)
        let x;
        if ((x = regex_rh.exec(amazon_webpage)) !== null) {
                if (x.index === regex_rh.lastIndex) {
                    regex.lastIndex++;
                }
            console.log(x[1])
        }
        let y 
        regex_qid = /qid=(.*?)\"/g
        if ((y = regex_qid.exec(amazon_webpage)) !== null) {
            if (y.index === regex_qid.lastIndex) {
                regex.lastIndex++;
            }
        console.log("222")
        console.log("this is y,   ", y[1])
        }
        z = encodeURIComponent("ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=books+")
        console.log(z)
        url =  `https://www.amazon.in/mn/search/ajax/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=${search}+&rh=${x[1]}&fromHash=${z}&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=${y[1]}&atfLayout=list`
        //https://www.amazon.in/mn/search/ajax/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=xiaomi&rh=i%3Aaps%2Ck%3Axiaomi&fromHash=%2Fref%3Dnb_sb_noss_2%3Furl%3Dsearch-alias%253Daps%26field-keywords%3Dpixel%26rh%3Di%253Aaps%252Ck%253Apixel&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1536922216&atfLayout=list
        console.log("--------------------------------------------------")
        console.log(url)
        console.log("--------------------------------------------------")
        res.send('lol')
    })
    

        

    
    .catch(function(err){
          console.log('this is error',err)
      })
})




































router.get('/lol2', function (req, res) {
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
    url = "ttps://www.amazon.in/mn/search/ajax/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=ps4+games+&rh=n%3A2591141031%2Ck%3Aps4+games&fromHash=ref%3Dnb_sb_noss_2%3Furl%3Dsearch-alias%253Daps%26field-keywords%3Dbooks%2B&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1536936862&amp;sr=8-1-spons#productPromotions&atfLayout=list"
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
        url: url,
        headers:headers
      })
    .then(function (response) {
        //console.log(response)
        console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
        var response_data = response.data
        //removing \n
        var json_obj = {"amazon_product":[]};




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
            min_products = json_response_data.centerMinus.data.value
            data_array = [min_products]
            console.log('No data in  max_products')
        }
        else if (!("centerMinus" in json_response_data )){
            max_products = json_response_data.centerBelowPlus.data.value
            data_array = [max_products]

            console.log("no data in min_products")
        }
        else{
            console.log("all data ")
            //console.log(data_array[i])
            min_products = json_response_data.centerMinus.data.value
            max_products = json_response_data.centerBelowPlus.data.value
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
                    //console.log(newData3)
                    const regex_url = new RegExp('<a .*? title=\"' + newData3 +  '\\".*?href=\\"(.*?)\\">' , 'g')
                    console.log(regex_url)
                    console.log("outside while loop ")
                    if ((m = regex_url.exec(data_array[i])) !== null) {
                        // This is necessary to avoid infinite loops with zero-width matches
                        if (m.index === regex_url.lastIndex) {
                            regex.lastIndex++;
                        }
                        console.log("????????????")
                        
                    
                    
                        const regex_image = new RegExp('<img src=\\"(.*?.jpg)\\" .*? alt=\\"' +  newData3 + '\\" class=\\"s-access-image', 'g' )
                        console.log(regex_image)
                        console.log("outside2 while loop ")
                        let data
                        if ((data = regex_image.exec(data_array[i]))!== null) {
                            console.log("----------------------------------------------")
                            // This is necessary to avoid infinite loops with zero-width matches
                            if (data.index === regex_image.lastIndex) {
                                regex_image.lastIndex++;
                            }
                            console.log("lol")
                            //console.log(data[1])
                            console.log("```````````````````````````````````````````````")
                            json_obj['amazon_product'].push({"name" : product_title, "product_url" :m[1], "product_image_url":data[1] });
                            json_str = JSON.stringify(json_obj)
                            //console.log(json_str)  
                        }
                        else{
                            console.lof("no image url found")
                        }
                    
                    }
                    else{
                        console.log("no url found")
                    }
                }
            })
        }

        
    //this is all the data including html
    //res.send(json_response_data)
    //this is all the poducts, links, images 
    //res.send(json_str)
    //this is just the raw html 
    res.send(min_products)
        

      })
      .catch(function(err){
          console.log('this is error',err)
      })
    
    
  })
  


























router.get('/a', function(req, res,next){
    //const regex = ///;
const str = `<html>\\n</html><html>\\n</html><html>v</h\\ntml><html\\n></h\\nt\\nml><html><v/html><ht\\nm\\nl></vhtml>\\n<\\n\\nhtml></html>\\n\\n<html></html><html></\\nh\\ntml>`;
const subst = `lol`;

// The substituted value will be contained in the result variable
const result = str.replace(/\\n/g, "");
console.log(result)
res.send( result);
//res.status(status).send('Substitution result: ', result)    
    
    //res.send(ress)
	next()
})


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




router.get('/c', function (req, res) {
    //url= "https://www.amazon.in/mn/search/ajax/s/ref=sr_nr_p_n_feature_six_brow_2?fst=as%3Aoff&rh=n%3A976419031%2Cn%3A1389401031%2Cn%3A1389432031%2Cn%3A1805560031%2Ck%3Avivo%2Cp_n_feature_six_browse-bin%3A6631754031&keywords=vivo&ie=UTF8&qid=1536341840&rnid=6631751031&fromHash=%2Fref%3Dnb_sb_noss_2%3Furl%3Dsearch-alias%253Daps%26field-keywords%3Dvivo&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1536341860&atfLayout=list"
    url = "https://middleware.paytmmall.com/T-shirt-below-199-llpid-180827?channel=web&child_site_id=6&site_id=1&version=2&src=store&utm_source=paytm&utm_medium=affiliate&utm_campaign=redirection&utm_content=%2F&discoverability=online&use_mw=1&category=5028&items_per_page=32"

    var response = axios({
        method: 'post',
        url: url,
        
      })
    .then(function (response) {
        console.log("response:", typeof(response))
        console.log("response.data:",typeof(response.data))
        //reason why we have to first stringyfy it and them paarse it (even though stringify is actually the opposite of parse),
        //is becuase the respone object we get is JAVASCRIPT object. If you notice it, it doesn't have quotes around the key.
        //Hence we are first converting it to the string and then to the json object. 
        //It's actually beautiful as it contains both the javascript object and json object. 
        //The whole thing is a Javascript object but the data that we have is json object. 
        //Hence we can't do res.send(response), but we can still do res.send(response.data)


        var newData = JSON.stringify(response.data)
        var obj = JSON.parse(newData);
        //console.log(obj)
        res.send(obj)
        console.log(obj.meta_title)


    })
    .catch(function(err){
        console.log(err)
    })
    
  //console.log("man")
    //res.send("yo")
})


router.get('/d', function(req,res){
    url= "https://www.amazon.in/mn/search/ajax/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=iphone&rh=i%3Aaps%2Ck%3Aiphone&fromHash=%2Fref%3Dnb_sb_noss_2%3Furl%3Dsearch-alias%253Daps%26field-keywords%3Dsamsing%2B%26sprefix%3Dsamsing%252Caps%252C380%26crid%3DXQW3OYZSXV6C&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1536522016&atfLayout=list"
    //url = "https://www.amazon.in/mn/search/ajax/s/ref=sr_nr_p_89_12?fst=as%3Aoff&rh=i%3Aaps%2Ck%3Ajbl+speakers%2Cp_89%3Aillios&keywords=jbl+speakers&ie=UTF8&qid=1536477769&rnid=3837712031&fromHash=%2Fref%3Dsr_ex_p_89_0%3Frh%3Di%253Aaps%252Ck%253Ajbl%2Bspeakers%26keywords%3Djbl%2Bspeakers%26ie%3DUTF8%26qid%3D1536475855&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1536477782&atfLayout=list"
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
        url: url,
        headers:headers
      })
    .then(function (response) {
        var response_data = response.data
        //removing \n
        var result = response_data.replace(/}\n&&&\n{/gm, ',');
        //removing the &&& in the end
        var result2 = result.replace(/&&&/gm,'')
        json_response_data = JSON.parse(result2)
        //scrapping the key having most of the products. 
        max_products = json_response_data.centerBelowPlus.data.value
    
        console.log(typeof(max_products))
        //const regex = /<a .*? title= \"Apple iPhone X \(Silver, 64GB\)\".*?href=\"(.*?)\">/g;
        //const regex = /<a .*? title=\"Apple iPhone 6S \(Space Grey, 32GB\)\".*?href=\"(.*?)\">/gm
        
        const regex = new RegExp('<a .*? title=\"Apple iPhone 6S \(Space Grey, 32GB\)\".*?href=\"(.*?)\">', 'g');

            let m = regex.exec(max_products)
            console.log(m)
            console.log("outside while loop ")
            //var myArray = regex.exec('cdbbdbsbz');
            //while ((m = regex.exec(max_products)) !== null) {
            //    console.log("inside while loop ")
            //    // This is necessary to avoid infinite loops with zero-width matches
            //    if (m.index === regex.lastIndex) {
            //        regex.lastIndex++;
            //    }
            //    
            //    // The result can be accessed through the `m`-variable.
            //    m.forEach((match, groupIndex) => {
            //        console.log(`Found match, group ${groupIndex}: ${match}`);
            //    });
            //}
            res.send(max_products)

        })
        .catch(function(err){
            console.log(err)
        })
      
      
    })
    
  








    router.get('/e', function (req, res) {
        url= "https://www.amazon.in/mn/search/ajax/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=iphone&rh=i%3Aaps%2Ck%3Aiphone&fromHash=%2Fref%3Dnb_sb_noss_2%3Furl%3Dsearch-alias%253Daps%26field-keywords%3Dsamsing%2B%26sprefix%3Dsamsing%252Caps%252C380%26crid%3DXQW3OYZSXV6C&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1536522016&atfLayout=list"
        //url = "https://www.amazon.in/mn/search/ajax/s/ref=sr_nr_p_89_12?fst=as%3Aoff&rh=i%3Aaps%2Ck%3Ajbl+speakers%2Cp_89%3Aillios&keywords=jbl+speakers&ie=UTF8&qid=1536477769&rnid=3837712031&fromHash=%2Fref%3Dsr_ex_p_89_0%3Frh%3Di%253Aaps%252Ck%253Ajbl%2Bspeakers%26keywords%3Djbl%2Bspeakers%26ie%3DUTF8%26qid%3D1536475855&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1536477782&atfLayout=list"
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
            url: url,
            headers:headers
          })
        .then(function (response) {
            var response_data = response.data
            //removing \n
            var result = response_data.replace(/}\n&&&\n{/gm, ',');
            //removing the &&& in the end
            var result2 = result.replace(/&&&/gm,'')
            json_response_data = JSON.parse(result2)
            //scrapping the key having most of the products. 
            max_products = json_response_data.centerBelowPlus.data.value
            //const $ = cheerio.load(max_products)
            //const product_name = $('.s-access-title')

                //const regex = /<a .*? title= + newData3 + .*?href=\"(.*?)\">/gm;
                console.log(regex)
                let m;
                console.log("outside while loop ")
                while ((m = regex.exec(max_products)) !== null) {
                    console.log("inside while loop ")
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (m.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }
                    
                    // The result can be accessed through the `m`-variable.
                    m.forEach((match, groupIndex) => {
                        console.log(`Found match, group ${groupIndex}: ${match}`);
                    });
                }
                
            
        //res.send(max_products)
            //const product_link = $()
            //res.send(max_products)  
    
    
          })
          .catch(function(err){
              console.log(err)
          })
        
        
      })
  
      













router.post('/users/add', function(req, res){
	console.log(req.body.first_name)
	var newUser = {
		firstname : req.body.first_name,
		lastname : req.body.last_name,
		email : req.body.email
	}
	console.log(newUser)
})




//the the url will go here.  
router.post('/api', function(req, res,next){
	console.log(req.body)
	
	
	
})




router.get('/lssol', function (req, res) {
    url= "https://www.amazon.in/mn/search/ajax/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=iphone&rh=i%3Aaps%2Ck%3Aiphone&fromHash=%2Fref%3Dnb_sb_noss_2%3Furl%3Dsearch-alias%253Daps%26field-keywords%3Dsamsing%2B%26sprefix%3Dsamsing%252Caps%252C380%26crid%3DXQW3OYZSXV6C&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1536522016&atfLayout=list"
    //url = "https://www.amazon.in/mn/search/ajax/s/ref=sr_nr_p_89_12?fst=as%3Aoff&rh=i%3Aaps%2Ck%3Ajbl+speakers%2Cp_89%3Aillios&keywords=jbl+speakers&ie=UTF8&qid=1536477769&rnid=3837712031&fromHash=%2Fref%3Dsr_ex_p_89_0%3Frh%3Di%253Aaps%252Ck%253Ajbl%2Bspeakers%26keywords%3Djbl%2Bspeakers%26ie%3DUTF8%26qid%3D1536475855&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1536477782&atfLayout=list"
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
        url: url,
        headers:headers
      })
    .then(function (response) {
        //var str = JSON.stringify(response)
        var strin = response.data
        //var obj = JSON.parse(response);
        console.log("1st", typeof(response))
        //console.log(x.headers)
        console.log('2nd', typeof(x))
        //y = {"a":response.data}
        //const regex = /&&&/gm;
        //var subst = ',';
        //replace &&& with comma
        var result = strin.replace(/}\n&&&\n{/gm, ',');
        var result2 = result.replace(/&&&/gm,'')
        //removed \n
        //const result2 = result.replace(/\\n/g, "");
        //const result3 = result2.replace(/\\/g, "");
        var array = []
        //array.push(result2)
        //console.log(array)
        console.log("lol")
        //var obj = JSON.parse(array);
        res.send(result2)

        //console.log(array[0])
        //converting the string to json object
        //var obj = JSON.parse(result2);
        //console.log(str)
        //res.send(result2);


        //var replaced_string = sting.replace("&&&", "lol");
        //console.log(replaced_string)
        console.log("yo")
        var objs = array.map(JSON.parse);

        // ...or for older browsers
        //var objs=[];
        //for (var i=s.length;i--;) objs[i]=JSON.parse(s[i]);

        // ...or for maximum speed:
        var objs = JSON.parse('['+s.join(',')+']');
        res.send(objs)




        //res.send(response.data)
      })
      .catch(function(err){
          console.log(err)
      })
    
      //res.send("yo")
  })
  







  router.get('/lol1', function (req, res) {
    //url= "https://www.amazon.in/mn/search/ajax/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=iphone&rh=i%3Aaps%2Ck%3Aiphone&fromHash=%2Fref%3Dnb_sb_noss_2%3Furl%3Dsearch-alias%253Daps%26field-keywords%3Dsamsing%2B%26sprefix%3Dsamsing%252Caps%252C380%26crid%3DXQW3OYZSXV6C&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1536522016&atfLayout=list"
    url = "https://www.amazon.in/mn/search/ajax/ref=nb_sb_noss?url=node%3D1805560031&field-keywords=samsung&lo=electronics&rh=n%3A1805560031%2Ck%3Asamsung&fromHash=%2Fs%2Fref%3Dsr_nr_p_89_2%3Ffst%3Das%253Aoff%26rh%3Dn%253A976419031%252Cn%253A1389401031%252Cn%253A1389432031%252Cn%253A1805560031%252Ck%253Aiphone%252Cp_89%253AOnePlus%26keywords%3Diphone%26ie%3DUTF8%26qid%3D1536522399%26rnid%3D3837712031%26lo%3Delectronics&section=ATF,BTF&fromApp=gp%2Fsearch&fromPage=results&fromPageConstruction=auisearch&version=2&oqid=1536675080&atfLayout=image"
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
        url: url,
        headers:headers
      })
    .then(function (response) {
        var response_data = response.data
        //removing \n
        var result = response_data.replace(/}\n&&&\n{/gm, ',');
        //removing the &&& in the end
        var result2 = result.replace(/&&&/gm,'')
        json_response_data = JSON.parse(result2)
        //scrapping the key having most of the products. 
        max_products = json_response_data.centerBelowPlus.data.value
        const $ = cheerio.load(max_products)
        const product_name = $('.s-access-title')

        product_name.each(function(index,product){
            const product_title = $(product).text()
            //const product_link = $("a").attr("href", product_title ).text()
            //const product_title_url =  product_title.replace(/^[a-zA-Z0-9]/gm,'')
            //const product_title_url2 =  product_title_url.replace(/\)/gm,'')
            //const product_title_url3 = product_title_url2.
            console.log("---------------------------")
            //var newData = JSON.stringify(product_title)
            var newData1 = product_title.replace(/\(/gm,'\\(')
            var newData2 = newData1.replace(/\)/gm,'\\)')
            var newData3 = newData2.replace(/\+/gm,'\\+')
            

            console.log(newData3)
            //lol = "Apple iPhone 7 \\(Jet Black, 32GB\\)"
                    //Apple iPhone 8 Plus \\(Space Grey, 64GB\\)


            //const regex = new RegExp('<a .*? title=\"' + newData3 +  '\\".*?href=\\"(.*?)\\">' , 'g')
//
            //console.log(regex)
            //let m;
            //console.log("outside while loop ")
            //while ((m = regex.exec(max_products)) !== null) {
            //    //console.log("inside while loop ")
            //    // This is necessary to avoid infinite loops with zero-width matches
            //    if (m.index === regex.lastIndex) {
            //        regex.lastIndex++;
            //    }
            //    
            //    // The result can be accessed through the `m`-variable.
            //    m.forEach((match, groupIndex) => {
            //        console.log(`Found match, group ${groupIndex}: ${match}`);
            //    });
            //}
            
    


            //const regex2 = new RegExp('<a .*? title=\"' + newData3 +  '\\".*?href=\\"(.*?)\\">', 'g')
            //const regex2 = new RegExp('<img src=\"(.*) 1x,.* alt=\\"'+newData3 + '\\")', 'g') 
            const regex = new RegExp('<img src=\\"(.*?.jpg) .*? alt=\\"' +  newData3 + '\\" class=\\"s-access-image', 'g' )
            console.log(regex)
            
            console.log("outside2 while loop ")

            let m 
            while ((m = regex.exec(max_products))!== null) {
                console.log("----------------------------------------------")
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                    console.log("sex")
                }
                
                // The result can be accessed through the `m`-variable.
                m.forEach((match, groupIndex) => {
                    console.log(`Found match, group ${groupIndex}: ${match}`);

                });

            }
////



            
            //const product_title_url =  product_title.replace(/\(/gm,'')
            //console.log(product_title, "url:", product_link)
    })
    //const product_leink = $('a Apple iPhone X').attr('href')
    //const product_leink = $("a").attr("title", "Apple iPhone X (Space Grey, 256GB)" ).text()
    //product_link= $('title=\"Apple iPhone X \(Space Grey, 256GB\)\"').attr('href');
    //json_response_data =  $.serializeArray()

    //'<a title="Apple iPhone X (Space Grey, 256GB) ".*?href="(.*?)"'
    //product_leink = $('a \"Apple iPhone X \(Space Grey, 256GB\"\)').attr('href')
    //console.log("yoooo:", json_response_data)
    res.send(max_products)
        //const product_link = $()
        //res.send(max_products)  


      })
      .catch(function(err){
          console.log(err)
      })
    
    
  })
  













module.exports = router;
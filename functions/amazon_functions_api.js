//scrapping the key having most of the products. 

function json_key_with_data(json_response_data2){

	if (!("centerBelowPlus" in json_response_data2)){
        let min_product_whitespace = json_response_data2.centerMinus.data.value
        let min_products = min_product_whitespace.replace(/(\r\n\t|\n|\r\t)/gm,"");
        let data_array = [min_products]
        console.log('No data in  max_products')
        return data_array
    }
    else if (!("centerMinus" in json_response_data2 )){
        let max_product_whitespace = json_response_data2.centerBelowPlus.data.value
        let max_products = max_product_whitespace.replace(/(\r\n\t|\n|\r\t)/gm,"");
        let data_array = [max_products]
        console.log("no data in min_products")
        return data_array
    }
    else if ("centerBelowPlus" in json_response_data2 && "centerMinus" in json_response_data2 ){
        console.log("all data ")
        //console.log(data_array[i])
        let min_product_whitespace = json_response_data2.centerMinus.data.value
        let max_product_whitespace = json_response_data2.centerBelowPlus.data.value
        let min_products = min_product_whitespace.replace(/(\r\n\t|\n|\r\t)/gm,"");
        let max_products = max_product_whitespace.replace(/(\r\n\t|\n|\r\t)/gm,"");
        let data_array = [max_products, min_products ]
        return data_array
    }
    else{
        console.log("No data. ")
        //////Grab the searched value and then send it into the database of failed request. 
        res.send("No product or check if you spelled it correctly. ")
        return            
    }

}
	
function escaping_characters(product_title){
	let newData0 = product_title.replace(/\(/gm,'\\(')
    let newData1 = newData0.replace(/\//gm,'\\/')
    let newData2 = newData1.replace(/\)/gm,'\\)')
    let newData3 = newData2.replace(/\+/gm,'\\+')
    let newData4 = newData3.replace(/\[/gm,'\\[')
    let newData5 = newData4.replace(/\[/gm,'\\]')
    let newData6 = newData5.replace(/\|/gm,'\\|')
    let newData7 = newData6.replace(/\./gm,'//.')
    return newData7
}
//Grabbing URL
function product_url(product_name){

	const regex_url = new RegExp('<a .*? title=\"' + product_name +  '\\".*?href=\\"(.*?)\\">' , 'g')
    console.log(regex_url)
    let url
    if ((url = regex_url.exec(data_array[i])) !== null) {
        if (url.index === regex_url.lastIndex) {
            regex.lastIndex++;
        }
        let product_url = url[1]
        return product_url

    }
    else{
        console.log("no url found")
        let product_url = 'URL not available'
        return product_url
        
    }
}



function product_image(product_name){
	const regex_image = new RegExp('<img src=\\"(.*?)\\" srcset=\\".*?\\" width=\\".*?\\" height=\\".*?\\" alt=\\"'+ product_name + '\\"', 'g' )
    console.log(regex_image)
    //Grabbing image url 
    
    let image_url
    let beautify_html = pretty(data_array[i]);
    if ((image_url = regex_image.exec(beautify_html))!== null) {
        console.log("----------------------------------------------")
        
        if (image_url.index === regex_image.lastIndex) {
            regex_image.lastIndex++;
        }
        var product_image_url = image_url[1]
        console.log(product_image_url)
    }

    else{
        console.log("no image url found")
        var product_image_url = 'image not available'
        
    }
}






//
module.exports.product_url = product_url
module.exports.product_image = product_image
module.exports.product_url = product_url
module.exports.escaping_characters = escaping_characters
module.exports.json_key_with_data = json_key_with_data
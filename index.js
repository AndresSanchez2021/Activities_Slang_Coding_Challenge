import {fetch_data, logic} from './functions.js'
import {authorization, getURL ,postURL} from './constans.js'



const getOptions ={
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization":authorization
    }
}

let postOptions ={
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization":authorization
    },
    body:{}
}


export const main = (body) => {
    
    console.log(body)
    
    postOptions["body"]=body
    fetch_data(postURL,postOptions)
    .then(result => console.log(result))
    .catch(error => console.log(error))       
}


/* ------------ */
/*     main     */
/* ------------ */

fetch_data(getURL, getOptions)
    .then(result => logic(result))
    .then(data => main(data))
    .catch(error => console.log(error))




    



    






      




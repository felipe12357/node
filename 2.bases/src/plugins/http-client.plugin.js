const axios = require('axios');

const httpClientPlugin = {
    //se hace esto para q posteriormente podamos agregar algun token u otra modificacion
   /*  get: async(url) =>{
        const response = await fetch(url);
        return await response.json();
    },  */
    get: async(url)=>  {
        const {data} = await axios.get(url);
        return data;
    }
}

module.exports = {
    httpClientPlugin
}
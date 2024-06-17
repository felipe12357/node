import axios from 'axios';

export const httpClientPlugin = {
    //se hace esto para q posteriormente podamos agregar algun token u otra modificacion
   /*  get: async(url) =>{
        const response = await fetch(url);
        return await response.json();
    },  */
    get: async(url:string)=>  {
        const {data} = await axios.get(url);
        return data;
    }
}
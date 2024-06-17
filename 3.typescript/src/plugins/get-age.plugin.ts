export const getAge = require('get-age');

export const getAgePlugin = function(date:string){
    return getAge(date);
}

export const getAgeCalculatedPlugin = function (date:string){
    return new Date().getFullYear() - new Date(date).getFullYear();
}
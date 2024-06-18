
const fs = require('fs');

export interface WriteFilePlugginI{
    makeDir:(destination:string)=>void;
    writeFile:(destination:string,fileName:string,content:string)=>void;
}

export class WriteFilePluggin implements WriteFilePlugginI {

    constructor(){}

    makeDir(destination:string){
        fs.mkdirSync(destination,{recursive:true}); //crea la carpeta si no existe
    }

    writeFile(destination:string,fileName:string,content:string){
        fs.writeFileSync(`${destination}/${fileName}.txt`,content) 
    }
}
//Ejemplo de leer un archivo local y escribir otro
const fs = require('fs');
const data = fs.readFileSync('readmeTest.md','utf-8'); //accedo al contenido del archivo

const newData = data.replace(/React/ig, 'Angular');

fs.writeFileSync('readmeTestV2.md',newData) //Escribo un archivo nuevo

console.log(data);
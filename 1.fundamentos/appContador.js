const fs = require('fs');
const data = fs.readFileSync('readmeTest.md','utf-8'); //accedo al contenido del archivo

const wordCount = data.split(' ').length;

const wordCountReact = data.split(' ').filter(word => {
    return word.toLowerCase().includes('react')
}).length

const wordCountReact2 = data.match(/react/gi ?? []).length

console.log("el numero de palabras", wordCount);
console.log("palabras react",wordCountReact,wordCountReact2);
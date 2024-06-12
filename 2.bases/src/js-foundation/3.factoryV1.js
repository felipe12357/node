
const { getAge,getId } = require('../plugins');

const buildPersonV1 = ({name, birthdate}) =>{
    return {
        id: getId(),
        name: name,
        birthdate,
        age: getAge(birthdate)
    }
}

const jhon = buildPersonV1({name:'Andres', birthdate:'1987-11-12'})
//console.log(jhon);
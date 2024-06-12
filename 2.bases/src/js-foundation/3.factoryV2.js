//en esta version eliminanos las dependencias en los imports
const buildPersonV2 = (getId,getAge)=> {
    return ({name, birthdate}) =>{
        return {
            id: getId(),
            name: name,
            birthdate,
            age: getAge(birthdate)
        }
    }
}

module.exports = {
    buildPersonV2
}


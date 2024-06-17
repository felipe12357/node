const {emailTemplate} = require('./js-foundation/1.template');
const {getUserById} = require('./js-foundation/2.callBacks');
require('./js-foundation/3.factoryV1');

const { getAge,getId,buildlogger } = require('./plugins');
const { buildPersonV2 } = require('./js-foundation/3.factoryV2');

const getPokemon = require('./js-foundation/4.promises');
const getPokemonV2 = require('./js-foundation/5.promisesAdapter');


    // ejemplo de utiliza run callback
        function printResult(error, user){
            if (error)
                throw new Error(error)
            //console.log("el usuario encontrado es:",user)
        }
        getUserById(2,printResult);
    // 

    // ejemplo del factory functionV2
    const createUser = buildPersonV2(getId,getAge);
    const User2 = createUser({name:'Andres', birthdate:'1987-11-12'})
    //console.log('Usuario con V2', User2);


    // ejemplo de promesas
    getPokemon(149).then(name => console.log("pokemon name:",name));
    //ejemplo con adapter
    getPokemonV2(2).then(name => console.log("pokemon name:",name));


    // ejemplo de como utilizar winston logger
    const logger = buildlogger('app.js');
    logger.log('hola mundo')
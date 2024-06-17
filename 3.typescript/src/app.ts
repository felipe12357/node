import { buildlogger,getAgePlugin,getIdPlugin } from "./plugins"; 
import { UserI,getUserById } from './js-foundation/2.callBacks';
import { buildPerson } from './js-foundation/3.factory';
import { getPokemon } from "./js-foundation/4.promisesAdapter";
    
    // ejemplo de como utilizar winston logger
    const logger = buildlogger('app.js');
    logger.log('hola mundo')


    // ejemplo de utiliza run callback
        function printResult(error?:string, user?:UserI){
            if (error)
                throw new Error(error)
            //console.log("el usuario encontrado es:" + user)
            logger.log(`el usuario encontrado es: ${user?.name}`);
        }
        getUserById(2,printResult);
    // 

    // ejemplo del factory functionV2
    const createUser = buildPerson(getIdPlugin,getAgePlugin);
    const User2 = createUser({name:'Andres', birthdate:'1987-11-12'})
    logger.log(`el usuario creado es: ${User2.name}`);

    //ejemplo con adapter
    const pokeName = getPokemon(2).then(name => console.log("pokemon name:",name));
    logger.log(`${pokeName}`)

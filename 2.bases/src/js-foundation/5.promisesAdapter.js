const {httpClientPlugin } = require('../plugins/http-client.plugin');
const URL = 'https://pokeapi.co/api/v2/pokemon';

const getPokemon = async(pokeId)=>{
   const pokemon  = await httpClientPlugin.get(`${URL}/${pokeId}`);
   return pokemon.name;
}

module.exports = getPokemon;
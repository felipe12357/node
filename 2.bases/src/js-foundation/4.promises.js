const URL = 'https://pokeapi.co/api/v2/pokemon';
const getPokemon = (pokeId)=>{
    return fetch(`${URL}/${pokeId}`)
            .then((response)=>response.json())
            .then( (pokemon)=> pokemon.name);
}

module.exports = getPokemon;
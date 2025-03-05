import { httpClientPlugin } from '../plugins/http-client.plugin';
const URL = 'https://pokeapi.co/api/v2/pokemon';

export const getPokemon = async(pokeId:string | number): Promise<string>=>{
   
   try{
      const pokemon  = await httpClientPlugin.get(`${URL}/${pokeId}`);
      return pokemon.name;
   }catch(error){
      throw 'Pokemon not found'
   }

}

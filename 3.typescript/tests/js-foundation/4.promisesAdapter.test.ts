import { getPokemon } from "../../src/js-foundation/4.promisesAdapter"
import {describe, expect, it} from '@jest/globals';
describe('Promises',()=>{
    it('should return the name',(async()=>{
       const name = await getPokemon(1)
       expect(name).toBe('bulbasaur');
    }))

    it('should catch the error when pokemon not exits',async()=>{
        try{
            await getPokemon(10000)
            expect(true).toBe(false) //esto se agrega solo para garantizar q salga error ya q nunca deberia entrar
        }catch (error){
            expect(error).toBe('Pokemon not found')
        }
       
    })
})
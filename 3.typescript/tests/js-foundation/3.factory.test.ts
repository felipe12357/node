import { buildPerson } from "../../src/js-foundation/3.factory"
import {describe, expect, it} from '@jest/globals';
describe('factory',()=>{
    const mockIdFunction = ()=>'21';
    const mockAgeFunction = (date:string)=>'36';

    it('should return a function',()=>{
        const createUserFunction= buildPerson(mockIdFunction,mockAgeFunction);
        expect(typeof createUserFunction).toBe('function');
    })

    it('should return an object of type personProps',()=>{
       const createUserFunction= buildPerson(mockIdFunction,mockAgeFunction)
       const createdUser = createUserFunction({name:'Felipe',birthdate:"1987-11-12"});
       expect(createdUser).toEqual({id:'21', name: 'Felipe', birthdate:'1987-11-12', age: '36'})
    })
})
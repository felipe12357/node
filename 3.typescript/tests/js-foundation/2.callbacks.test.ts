import {describe, expect, it} from '@jest/globals';
import { UserI, getUserById } from "../../src/js-foundation/2.callBacks"

describe('callback',()=>{
   
    it('should return an user dont exits',()=>{
        const callbackMockfunction = (error?:string,user?:UserI)=>{
            expect(error).toBe('User not found with id: 10');
            expect(user).toBe(undefined);
        }
        getUserById(10,callbackMockfunction)
    })

    it('should return the found user',()=>{
        const callbackMockfunction = (error?:string,user?:UserI)=>{
            expect(error).toBe(undefined);
            expect(user).toEqual({  id:2, name: 'natalia' });
        }
        getUserById(2,callbackMockfunction)
    })
  
    //Ejemplo de solucion si tenemos q esperar la peticion (algo asyncrono)
    /*
    xit('should return the found user',(done)=>{
        const callbackMockfunction = (error?:string,user?:UserI)=>{
            expect(error).toBe(undefined);
            expect(user).toEqual({  id:2, name: 'natalia' });
            done()
        }
        getUserById(2,callbackMockfunction)
    })
    */
   
})
import {describe, expect, it,jest} from '@jest/globals';
import axios from "axios"
import { httpClientPlugin } from "../../src/plugins";

describe('http-client.plugin',()=>{
    it('should call get with the sent params',async()=>{
        const spy = jest.spyOn(axios,'get');
        await httpClientPlugin.get('http://hola.com');
        expect(spy).toHaveBeenCalledWith('http://hola.com');
    })
})
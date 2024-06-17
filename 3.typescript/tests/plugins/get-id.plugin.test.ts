import { getIdPlugin } from "../../src/plugins"
import {describe, expect, it} from '@jest/globals';
describe('get id plugin',()=>{
    it('should return string',()=>{
        const uuid =getIdPlugin();
        expect(typeof uuid).toBe('string');
        expect(uuid.length).toBe(36);
    })
})
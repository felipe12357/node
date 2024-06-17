import {describe, expect, it} from '@jest/globals';
import { getAgePlugin } from "../../src/plugins"
import { getAgeCalculatedPlugin } from "../../src/plugins/get-age.plugin"

describe('getAge',()=>{
    it('should return the calculated age',()=>{
        const result = getAgeCalculatedPlugin('1987-11-12')
        expect(result).toBe(37)
    })

    it('should call getAge package',()=>{
        const result= getAgePlugin('1987-11-12')
        expect(typeof result).toBe("number")
    })
})
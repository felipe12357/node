import {describe, expect, it,jest} from '@jest/globals';
import { buildlogger } from "../../src/plugins";
import { logger } from "../../src/plugins/logger.plugin";

describe('logger.plugin',()=>{

    it('should contain a log an error function',()=>{
        const log = buildlogger('felipe');
        expect(typeof log.log).toBe('function');
        expect(typeof log.error).toBe('function');
    })

    it('should call log function with:',()=>{
        const spy = jest.spyOn(logger,'log');
        const log = buildlogger('felipe');
        log.log('hola mundo');

        expect(spy).toHaveBeenCalledWith('info',expect.objectContaining({
                level:"info",message:'hola mundo',service:'felipe',
        }))
    })

    it('should call error function with',()=>{
        const spy = jest.spyOn(logger,'error');
        const log = buildlogger('felipe');
        log.error('hola mundo');

        expect(spy).toHaveBeenCalledWith('error',{
            message:'hola mundo',service:'felipe'
        })
    })
})
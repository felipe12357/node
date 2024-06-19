import {describe, expect, it,jest,fit} from '@jest/globals';
import {SaveFile, SaveFileOptionsI} from './save-file.use-case';
import { WriteFilePlugginI } from '../../plugins/writefile.pluggin';
describe('saveFile',()=>{

    //agrego esto para no ver los errores mockeados en consola
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const mockWriteFilePluggin:WriteFilePlugginI ={
        makeDir:()=>{},
        writeFile:()=>{}
    }

    const saveFile = new SaveFile(mockWriteFilePluggin);
    const saveFileOptions:SaveFileOptionsI ={
        content:"hola mundo",
        fileName:"hola"
    }

    it('should makeDir and writeFile from writeFilePlugin',()=>{
        const spy1 = jest.spyOn(mockWriteFilePluggin,'makeDir');
        const spy2 = jest.spyOn(mockWriteFilePluggin,'makeDir');
        saveFile.execute(saveFileOptions)

        expect(spy1).toHaveBeenCalled()
        expect(spy2).toHaveBeenCalled()
    })

    //Importante para q callera en el catch, fue necesario utilizar "throw"
    it('should return an error when it can not create the file or the folder',()=>{
        const spyMock = jest.spyOn(mockWriteFilePluggin,'makeDir')
                                .mockImplementation(()=> { throw new Error("error al crear la carpeta")});

        const result = saveFile.execute(saveFileOptions);
        expect(result).toBe(false);

        spyMock.mockRestore(); //restaura la funcion original 
    })

    it('should return an error when it can not create the file',()=>{
        jest.spyOn(mockWriteFilePluggin,'writeFile')
                                .mockImplementation(()=> { throw new Error("error al crear el archivo")});

        const result = saveFile.execute(saveFileOptions);
        expect(result).toBe(false);
    })
})
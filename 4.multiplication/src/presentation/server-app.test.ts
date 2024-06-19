import {describe, expect, it,beforeEach,afterAll,jest} from '@jest/globals';
import {ServerApp,RunningOptions} from './server-app';
import { CreateTable,CreateTableOptionsI } from '../domain/use-cases/create-table.use-case';
import { SaveFile, SaveFileOptionsI } from '../domain/use-cases/save-file.use-case';
describe('serverApp',()=>{
    const RunningOptions:RunningOptions ={
        base:10,
        limit:3
    }

    it('should call execute from createTable',()=>{
        const spy = jest.spyOn(CreateTable.prototype,'execute');
        ServerApp.run(RunningOptions)
        expect(spy).toHaveBeenCalledWith({base:10, limit:3})
    })

    it('otra forma de probar sin spyes',()=>{
        const createMock = jest.fn((values: CreateTableOptionsI) => "hola mundo"); 
        CreateTable.prototype.execute = createMock;
        ServerApp.run(RunningOptions);

        expect(createMock).toHaveBeenCalledWith({base:10, limit:3})
        jest.clearAllMocks(); //limpia las funciones ficticias
    });

    it('should call execute from SaveFile',()=>{
        const spyMock= jest.spyOn(CreateTable.prototype,'execute').mockReturnValue("HOLA MUNDO");
        const spy = jest.spyOn(SaveFile.prototype,'execute');
        ServerApp.run(RunningOptions)

        expect(spy).toHaveBeenCalledWith({fileName:"table-10",content:"HOLA MUNDO"});
        spyMock.mockRestore();
    })

    it('otra forma de probar sin spyes 2',()=>{
        const createMock = jest.fn((values: CreateTableOptionsI) => "HOLA MUNDO");
        const saveMock = jest.fn((values:SaveFileOptionsI)=>true);
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveMock;
        ServerApp.run(RunningOptions);

        expect(createMock).toHaveBeenCalledWith({base:10, limit:3})
        expect(saveMock).toHaveBeenCalledWith({fileName:"table-10",content:"HOLA MUNDO"});
        jest.clearAllMocks(); //limpia las funciones ficticias
    });

    it('should call console.log method',()=>{

        RunningOptions.showConsole = true;
        const spyMock= jest.spyOn(CreateTable.prototype,'execute').mockReturnValue("HOLA MUNDO");
        const spy =  jest.spyOn(console, 'log');
        
        ServerApp.run(RunningOptions)

        expect(spy).toHaveBeenCalledWith("HOLA MUNDO")
        spyMock.mockRestore();
    })



})
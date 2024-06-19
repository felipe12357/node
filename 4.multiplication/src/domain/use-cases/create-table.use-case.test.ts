import {describe, expect, it} from '@jest/globals';
import {CreateTable, CreateTableOptionsI} from './create-table.use-case';
describe('CreateTable',()=>{

    const createTable = new CreateTable();
    const createTableOptions:CreateTableOptionsI = {
        base:3
    }
    
    it('should create table with 10 limit as default value ',()=>{
        const content = createTable.execute(createTableOptions);
        const rows = content.split("\n");
        rows.pop(); //elimino el footer de la tabla
        rows.shift(); // elimino la cabecera de la tabla
        expect(content).toContain("3 x 1 = 3");
        expect(content).toContain("3 x 10 = 30");
        expect(rows.length).toBe(10);
    })

    it('should create table with limit sent value ',()=>{
        createTableOptions.limit = 20;
        createTableOptions.base = 2;
        const content = createTable.execute(createTableOptions);
        const rows = content.split("\n");
        rows.pop(); //elimino el footer de la tabla
        rows.shift(); // elimino la cabecera de la tabla
        expect(content).toContain("2 x 1 = 2");
        expect(content).toContain("2 x 20 = 40");
        expect(rows.length).toBe(20);
     })
})
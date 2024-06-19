import {describe, expect, it,beforeEach,afterAll} from '@jest/globals';
import { WriteFilePluggin } from './writefile.pluggin';
const fs = require('fs');

describe('writeFilePlugin',()=>{

    const writeFilePluggin = new WriteFilePluggin();
    const folderTestPath = "assetTest";

    beforeEach(()=>{
        if(fs.existsSync(folderTestPath)){
            fs.rmSync("assetTest", { recursive: true, force: true });
        }
    })

    afterAll(()=>{
        if(fs.existsSync(folderTestPath)){
            fs.rmSync("assetTest", { recursive: true, force: true });
        }
    })

    it('should create the folder',()=>{
        writeFilePluggin.makeDir(folderTestPath);
        const checkFolder = fs.existsSync(folderTestPath);
        expect(checkFolder).toBe(true)
    })

    it('should create the file with the specific content',()=>{

        writeFilePluggin.makeDir(folderTestPath);
        writeFilePluggin.writeFile(folderTestPath,"fileTest","hola mundo");

        const checkFile = fs.existsSync(`${folderTestPath}/fileTest.txt`); 
        const fileContent = fs.readFileSync(`${folderTestPath}/fileTest.txt`,{ encoding: 'utf-8'});

        expect(checkFile).toBe(true);
        expect(fileContent).toBe("hola mundo");
    })
})
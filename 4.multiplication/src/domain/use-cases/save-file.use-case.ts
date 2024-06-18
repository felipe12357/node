import { WriteFilePlugginI } from "../../plugins/writefile.pluggin";

export interface SaveFileOptionsI{
    content:string,
    fileName:string,
    destination?:string
}

export interface SaveFileUseCaseI{
    execute:(options:SaveFileOptionsI)=>boolean
}

export class SaveFile implements SaveFileUseCaseI {
    private writeFilePluggin:WriteFilePlugginI;

    constructor(writeFilePluggin:WriteFilePlugginI){
        this.writeFilePluggin = writeFilePluggin;
    }

    execute({fileName='table',content,destination='assets'}:SaveFileOptionsI):boolean{
        try{
            this.writeFilePluggin.makeDir(destination);
            this.writeFilePluggin.writeFile(destination,fileName,content)
            return true;
        }catch(error){
            console.error(error);
            return false;
        }

    }
}
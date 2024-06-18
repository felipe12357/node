import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";
import { WriteFilePluggin } from "../plugins/writefile.pluggin";

export interface RunningOptions {
    base:number
    limit:number
    showConsole?:boolean
}

export class ServerApp {
     static run ({ base, limit,showConsole }:RunningOptions){

        const writeFilePluggin  = new WriteFilePluggin();
       // const { base, limit } = options;
        const tableString = new CreateTable().execute({base, limit})
        new SaveFile(writeFilePluggin).execute({fileName:`table-${base}`,content:tableString})

        if(showConsole)
            console.log(tableString);
     }
}
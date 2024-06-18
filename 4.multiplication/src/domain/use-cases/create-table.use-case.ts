export interface CreateTableOptionsI {
    base:number,
    limit?:number
}

export interface CreateTableI {
    execute:(options:CreateTableOptionsI)=>string
}

export class CreateTable implements CreateTableI {
    constructor(){

    }

    execute({base,limit=10}:CreateTableOptionsI){
        let outputResult =`======= Tabla del ${base} ===== \n`;
        for(let a =1; a<=limit; a++){
            const result = base * a;
            outputResult +=`${base} x ${a} = ${result}  \n`;
        }
        outputResult += `=========================`;
        return outputResult;
    }
}
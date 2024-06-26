import { LogDataSource } from "../../domain/dataSources/log.datasource";
import { LogEntity, LogSecurityLevelEnum } from "../../domain/entities/log.entitiy";
import fs from 'fs';

export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = 'logs/';
    private readonly allLogPath ='logs/logs-all.log';
    private readonly mediumLogPath ='logs/logs-medium.log';
    private readonly highLogPath ='logs/logs-high.log';

    constructor(){
        this.createLogsFiles();
    }

    private createLogsFiles(){
        if(!fs.existsSync(this.logPath))
           fs.mkdirSync(this.logPath); 

        const logsPathFiles = [this.allLogPath,this.mediumLogPath,this.highLogPath];

        logsPathFiles.forEach(path =>{
            if(!fs.existsSync(path))
                fs.writeFileSync(path,'');
        })
    }


    async saveLog(logT: LogEntity): Promise<void> {
        const logContent = `${JSON.stringify(logT) } \n`;
        fs.appendFileSync(this.allLogPath, logContent);
        if(logT.level === LogSecurityLevelEnum.hight)
            fs.appendFileSync(this.highLogPath, logContent);
        if(logT.level === LogSecurityLevelEnum.medium)
            fs.appendFileSync(this.mediumLogPath, logContent);
    }

    private getLogsFromFile = (path:string):LogEntity[]=>{
        const contentStringList = fs.readFileSync(path,'utf8').split("\n");
        // const contentEntities = contentStringList.map( contentString => LogEntity.fromJson(contentString));
        //una forma corta, funciona cuando el argumento se usa para llamar otra funcion:
        const contentEntities = contentStringList.map( LogEntity.fromJson);
        return contentEntities;
    }

    async getLogs(severityLevel: LogSecurityLevelEnum): Promise<LogEntity[]> {
       
        switch(severityLevel){
            case LogSecurityLevelEnum.hight:
                return this.getLogsFromFile(this.highLogPath);
            case LogSecurityLevelEnum.medium:
                return this.getLogsFromFile(this.mediumLogPath);
            case LogSecurityLevelEnum.low:
                return this.getLogsFromFile(this.allLogPath);
            default:
                throw new Error(`log security level: ${severityLevel} not implemented`)
        }
    }

}
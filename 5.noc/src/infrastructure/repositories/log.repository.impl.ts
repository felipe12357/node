import { LogDataSource } from "../../domain/dataSources/log.datasource";
import { LogEntity, LogSecurityLevelEnum } from "../../domain/entities/log.entitiy";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {

    constructor(private readonly logDataSource:LogDataSource){

    }

    async saveLog(log: LogEntity): Promise<void> {
         this.logDataSource.saveLog(log);
    }
    
    async getLogs(severityLevel: LogSecurityLevelEnum): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(severityLevel);
    }
    
}
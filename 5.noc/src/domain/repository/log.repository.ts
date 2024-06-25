import { LogEntity, LogSecurityLevelEnum } from "../entities/log.entitiy";

export abstract class LogRepository {

    abstract saveLog(log:LogEntity):Promise<void>
    abstract getLogs(severityLevel:LogSecurityLevelEnum):Promise<LogEntity[]>
}
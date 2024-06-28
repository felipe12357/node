import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/dataSources/log.datasource";
import { LogEntity, LogSecurityLevelEnum } from "../../domain/entities/log.entitiy";

export class PostgrestDataSource implements LogDataSource {
    prisma = new PrismaClient();
    
    async saveLog({message,origin,level}: LogEntity): Promise<void> {
        const levelConverted = SeverityLevel[level.toUpperCase() as keyof typeof SeverityLevel];
        const newLog = await this.prisma.logModel.create({
            data: {
                message,
                origin,
                level: levelConverted
            },
          })
        console.log('new log 2',newLog);

        await this.prisma.$disconnect()
    }
    async getLogs(severityLevel: LogSecurityLevelEnum): Promise<LogEntity[]> {
        const logList = await this.prisma.logModel.findMany({
            where:{ level:severityLevel.toUpperCase() as SeverityLevel }
        });
        const logsEntitiesList = logList.map( LogEntity.fromObject);
        await this.prisma.$disconnect()
        return logsEntitiesList;
    }
}
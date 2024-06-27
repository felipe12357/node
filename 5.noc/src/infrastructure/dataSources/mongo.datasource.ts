import { envs } from "../../config/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { LogDataSource } from "../../domain/dataSources/log.datasource";
import { LogEntity, LogSecurityLevelEnum } from "../../domain/entities/log.entitiy";

export class MongoDataSource implements LogDataSource {

    private async openConnection(): Promise<void>{
        await MongoDatabase.connect({mongoUrl:envs.MONGO_URL,dbName:envs.MONGO_DB_NAME})
    }

    async saveLog({message,origin,level}: LogEntity): Promise<void> {
        await this.openConnection();

        //Se puede de cualquiera de las 2 formas:
        const LogRegister = new LogModel({ message, origin, level });
       // const LogRegister = await LogModel.create({ message, origin, level }); //con esta no es necesario utilizar el save
        
        await LogRegister.save();
        await MongoDatabase.disconnect();
    }
    
    async getLogs(severityLevel: LogSecurityLevelEnum): Promise<LogEntity[]> {
        await this.openConnection();
        const logList = await LogModel.find({level:severityLevel});
        const logsEntitiesList = logList.map( LogEntity.fromObject);
        await MongoDatabase.disconnect();
        return logsEntitiesList;
    }
}
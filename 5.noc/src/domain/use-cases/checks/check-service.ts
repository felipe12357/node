import { LogEntity, LogSecurityLevelEnum } from "../../entities/log.entitiy";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceI {
    execute(url:string):Promise<Boolean>
}

type SuccessCallBack =()=>void;
type ErrorCallBack = (error:string)=>void;

export class CheckService implements CheckServiceI{
    //all recibir los metodos en el constructor estoy implementando
    //injection de dependencias
    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallBack:SuccessCallBack,
        private readonly errorCallBack:ErrorCallBack){
    }

    async execute(url:string):Promise<boolean>{
        try {
            const req = await fetch(url);
            if( !req.ok)
                throw new Error(`Error checking the url : ${url}`)

            this.logRepository.saveLog(new LogEntity(LogSecurityLevelEnum.low,`Service ${url} working`))
            this.successCallBack();
            return true
        }catch(error){
            //console.log(error);
            const errorString = `${url} is failing, ${error}`;
            this.logRepository.saveLog(new LogEntity(LogSecurityLevelEnum.hight,errorString))
            this.errorCallBack(errorString);
            return false;
        }
    }
}
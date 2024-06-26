import { LogEntity, LogProperties, LogSecurityLevelEnum } from "../../entities/log.entitiy";
import { LogRepository } from "../../repository/log.repository";

interface CheckUseCaseI {
    execute(url:string):Promise<Boolean>
}

type SuccessCallBack =()=>void;
type ErrorCallBack = (error:string)=>void;

export class CheckUseCase implements CheckUseCaseI{
    //all recibir los metodos en el constructor estoy implementando
    //injection de dependencias
    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallBack:SuccessCallBack,
        private readonly errorCallBack:ErrorCallBack){
    }

    async execute(url:string):Promise<boolean>{

        const logProperties:LogProperties = { 
            message:`Service ${url} working`, 
            level:LogSecurityLevelEnum.low,
            origin: 'check-service'}

        try {
            const req = await fetch(url);
            if( !req.ok)
                throw new Error(`Error checking the url : ${url}`)

            this.logRepository.saveLog(new LogEntity(logProperties))
            this.successCallBack();
            return true
        }catch(error){
            //console.log(error);
            const errorString = `${url} is failing, ${error}`;
            logProperties.level = LogSecurityLevelEnum.hight;
            logProperties.message =errorString;

            this.logRepository.saveLog(new LogEntity(logProperties))
            this.errorCallBack(errorString);
            return false;
        }
    }
}
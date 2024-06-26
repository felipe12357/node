import { EmailService, SendMailOptions } from "../../../presentation/email/email.service";
import { LogEntity, LogProperties, LogSecurityLevelEnum } from "../../entities/log.entitiy";
import { LogRepository } from "../../repository/log.repository";


interface MailUseCaseI {
    sendEmail(options: SendMailOptions):Promise<void>
}

export class MailUseCase implements MailUseCaseI{

    constructor(
        private readonly emailService:EmailService,
        private readonly logRepository: LogRepository){
    }

    async sendEmail(options: SendMailOptions): Promise<void> {
       
        const logProperties:LogProperties = { 
            message:`Email sent Success`, 
            level:LogSecurityLevelEnum.low,
            origin: 'mail use case'
        }

        const sent = this.emailService.sendEmail(options);
        if(!sent){
            logProperties.message ="Error sending the message";
            logProperties.level = LogSecurityLevelEnum.hight;
        }
        
        this.logRepository.saveLog(new LogEntity(logProperties))

    }
}
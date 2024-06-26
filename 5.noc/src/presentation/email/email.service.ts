import nodemailer from 'nodemailer';
import { envs } from '../../config/envs.plugin';
import { LogProperties, LogSecurityLevelEnum } from '../../domain/entities/log.entitiy';
import SMTPTransport from 'nodemailer/lib/smtp-transport';


export type SendMailOptions = {
    to:string;
    subject:string;
    htmlBody:string;
    attachments?:attachment[]
}

type attachment ={
    fileName:string,
    path:string
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:envs.MAILER_EMAIL,
            pass:envs.MAILER_SECRET_KEY
        }
    })

    async sendEmail(options: SendMailOptions):Promise<SMTPTransport.SentMessageInfo>{
        const {to,subject,htmlBody,attachments=[]} = options;
        return await this.transporter.sendMail({
            to,subject,html:htmlBody,attachments
        })
    }
}
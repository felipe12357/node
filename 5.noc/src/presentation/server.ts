import { CheckUseCase } from "../domain/use-cases/checks/check-use-case";
import { MailUseCase } from "../domain/use-cases/mails/mail-use-case";
import { FileSystemDataSource } from "../infrastructure/dataSources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


export class Server {
    logDataSource = new FileSystemDataSource();
    fileSystemLogRepository = new LogRepositoryImpl(this.logDataSource);
    cronService: CronService = new CronService;
    mailService:EmailService = new EmailService();
    
    private static instance: Server;
    jobList:any[] =[]; // pongo any para no generar dependencia del tipo de job

    //Hago esto para q el metodo estatico pueda acceder a las propiedades de la clase,
    //en este caso cronService
    //Aca se esta implementando el patron singleton
    private static getInstance() {
        if (!Server.instance) {
            Server.instance = new Server();
        }
        return Server.instance;
    }

    static startLogs(){
        const ServerInstance = Server.getInstance();
        const checkUseCase = new CheckUseCase(
            ServerInstance.fileSystemLogRepository,
            ()=>console.log('success'),
            (error)=>console.error("error",error)
        );


        const functionTick= ()=>{ checkUseCase.execute('http://google.com')};
        const job = ServerInstance.cronService.createJob('*/3 * * * * *',functionTick);

        const functionTick2= ()=>{ checkUseCase.execute('http://localhost:3000')};
        const job2 = ServerInstance.cronService.createJob('*/3 * * * * *',functionTick2);
        ServerInstance.jobList = [job,job2];
    }

    static stopLogs(){
        const ServerInstance = Server.getInstance();
        ServerInstance.jobList.forEach(job => {
            ServerInstance.cronService.stopJobF(job);
        });
      
        console.log("detiene los trabajos");
    }

    static sendEmail(){
        const ServerInstance = Server.getInstance();

        const mailUseCase = new MailUseCase(ServerInstance.mailService,ServerInstance.fileSystemLogRepository);
        mailUseCase.sendEmail({to:"andrewt12357@hotmail.com",subject:"from node",htmlBody:"<p>Test body</p>"});
        mailUseCase.sendEmail({
            to:"andrewt12357@hotmail.com",
            subject:"from node with logs atthacments",
            htmlBody:"<p>Test body con attachments</p>",
            attachments:[
                { fileName:'logs-all.log',path:'logs/logs-all.log'},
                { fileName:'logs-high.log',path:'logs/logs-high.log'},
                { fileName:'logs-medium.log',path:'logs/logs-medium.log'} 
            ]
        })
    }
}
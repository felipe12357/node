"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const check_use_case_1 = require("../domain/use-cases/checks/check-use-case");
const file_system_datasource_1 = require("../infrastructure/dataSources/file-system.datasource");
const log_repository_impl_1 = require("../infrastructure/repositories/log.repository.impl");
const cron_service_1 = require("./cron/cron-service");
const email_service_1 = require("./email/email.service");
class Server {
    constructor() {
        this.logDataSource = new file_system_datasource_1.FileSystemDataSource();
        this.fileSystemLogRepository = new log_repository_impl_1.LogRepositoryImpl(this.logDataSource);
        this.cronService = new cron_service_1.CronService;
        this.mailService = new email_service_1.EmailService(this.fileSystemLogRepository);
        this.jobList = []; // pongo any para no generar dependencia del tipo de job
    }
    //Hago esto para q el metodo estatico pueda acceder a las propiedades de la clase,
    //en este caso cronService
    //Aca se esta implementando el patron singleton
    static getInstance() {
        if (!Server.instance) {
            Server.instance = new Server();
        }
        return Server.instance;
    }
    static start() {
        const ServerInstance = Server.getInstance();
        const checkService = new check_use_case_1.CheckUseCase(ServerInstance.fileSystemLogRepository, () => console.log('success'), (error) => console.error("error", error));
        const functionTick = () => { checkService.execute('http://google.com'); };
        const job = ServerInstance.cronService.createJob('*/3 * * * * *', functionTick);
        const functionTick2 = () => { checkService.execute('http://localhost:3000'); };
        const job2 = ServerInstance.cronService.createJob('*/3 * * * * *', functionTick2);
        ServerInstance.jobList = [job, job2];
    }
    static stop() {
        const ServerInstance = Server.getInstance();
        ServerInstance.jobList.forEach(job => {
            ServerInstance.cronService.stopJobF(job);
        });
        console.log("detiene los trabajos");
    }
    static sendEmail() {
        const ServerInstance = Server.getInstance();
        ServerInstance.mailService.sendEmail({ to: "andrewt12357@hotmail.com", subject: "from node", htmlBody: "<p>Test body</p>" });
        /*         ServerInstance.mailService.sendEmail({
                    to:"andrewt12357@hotmail.com",
                    subject:"from node with logs atthacments",
                    htmlBody:"<p>Test body con attachments</p>",
                    attachments:[
                        { fileName:'logs-all.log',path:'logs/logs-all.log'},
                        { fileName:'logs-high.log',path:'logs/logs-high.log'},
                        { fileName:'logs-medium.log',path:'logs/logs-medium.log'}
                    ]
                }) */
    }
}
exports.Server = Server;

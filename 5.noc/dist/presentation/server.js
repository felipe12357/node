"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const log_entitiy_1 = require("../domain/entities/log.entitiy");
const check_use_case_1 = require("../domain/use-cases/checks/check-use-case");
const mail_use_case_1 = require("../domain/use-cases/mails/mail-use-case");
const file_system_datasource_1 = require("../infrastructure/dataSources/file-system.datasource");
const mongo_datasource_1 = require("../infrastructure/dataSources/mongo.datasource");
const log_repository_impl_1 = require("../infrastructure/repositories/log.repository.impl");
const cron_service_1 = require("./cron/cron-service");
const email_service_1 = require("./email/email.service");
class Server {
    constructor() {
        //Aca podemos alternar entre los diferentes data sources
        this.logDataSource = new file_system_datasource_1.FileSystemDataSource();
        this.logRepository = new log_repository_impl_1.LogRepositoryImpl(this.logDataSource);
        this.mongoDataSource = new mongo_datasource_1.MongoDataSource();
        //  logRepository = new LogRepositoryImpl(this.mongoDataSource);
        this.cronService = new cron_service_1.CronService;
        this.mailService = new email_service_1.EmailService();
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
    static startLogs() {
        const ServerInstance = Server.getInstance();
        const checkUseCase = new check_use_case_1.CheckUseCase(ServerInstance.logRepository, () => console.log('success'), (error) => console.error("error", error));
        const functionTick = () => { checkUseCase.execute('http://google.com'); };
        const job = ServerInstance.cronService.createJob('*/3 * * * * *', functionTick);
        const functionTick2 = () => { checkUseCase.execute('http://localhost:3000'); };
        const job2 = ServerInstance.cronService.createJob('*/3 * * * * *', functionTick2);
        ServerInstance.jobList = [job, job2];
    }
    static stopLogs() {
        const ServerInstance = Server.getInstance();
        ServerInstance.jobList.forEach(job => {
            ServerInstance.cronService.stopJobF(job);
        });
        console.log("detiene los trabajos");
    }
    static sendEmail() {
        const ServerInstance = Server.getInstance();
        const mailUseCase = new mail_use_case_1.MailUseCase(ServerInstance.mailService, ServerInstance.logRepository);
        mailUseCase.sendEmail({ to: "andrewt12357@hotmail.com", subject: "from node", htmlBody: "<p>Test body</p>" });
        mailUseCase.sendEmail({
            to: "andrewt12357@hotmail.com",
            subject: "from node with logs atthacments",
            htmlBody: "<p>Test body con attachments</p>",
            attachments: [
                { fileName: 'logs-all.log', path: 'logs/logs-all.log' },
                { fileName: 'logs-high.log', path: 'logs/logs-high.log' },
                { fileName: 'logs-medium.log', path: 'logs/logs-medium.log' }
            ]
        });
    }
    static getLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const ServerInstance = Server.getInstance();
            const logs = yield ServerInstance.logRepository.getLogs(log_entitiy_1.LogSecurityLevelEnum.hight);
            console.log(logs);
            console.log("fin");
        });
    }
}
exports.Server = Server;

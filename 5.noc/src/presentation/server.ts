import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/dataSources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";


export class Server {
    cronService: CronService = new CronService;
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

    static start(){
        const logDataSource = new FileSystemDataSource();
        const fileSystemLogRepository = new LogRepositoryImpl(logDataSource);


        const ServerInstance = Server.getInstance();
        const checkService = new CheckService(
            fileSystemLogRepository,
            ()=>console.log('success'),
            (error)=>console.error("error",error)
        );


        const functionTick= ()=>{ checkService.execute('http://google.com')};
        const job = ServerInstance.cronService.createJob('*/3 * * * * *',functionTick);

        const functionTick2= ()=>{ checkService.execute('http://localhost:3000')};
        const job2 = ServerInstance.cronService.createJob('*/3 * * * * *',functionTick2);
        ServerInstance.jobList = [job,job2];
    }

    static stop(){
        const ServerInstance = Server.getInstance();
        ServerInstance.jobList.forEach(job => {
            ServerInstance.cronService.stopJobF(job);
        });
      
        console.log("detiene los trabajos");
    }
}
import { CronJob } from "cron";
//Aca se aplico el patron adapter ya q si se desea modifica como se hace el cron
//solo se modifica en este archivo
export class CronService {

    createJob(cronTime:string| Date,onTick:()=>void ){
        const job = new CronJob(
            cronTime,
            onTick,
            null,
            true,
            'America/Los_Angeles');

        return job;
    }

    stopJobF(job:CronJob){
        job.stop();
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronService = void 0;
const cron_1 = require("cron");
//Aca se aplico el patron adapter ya q si se desea modifica como se hace el cron
//solo se modifica en este archivo
class CronService {
    createJob(cronTime, onTick) {
        const job = new cron_1.CronJob(cronTime, onTick, null, true, 'America/Los_Angeles');
        return job;
    }
    stopJobF(job) {
        job.stop();
    }
}
exports.CronService = CronService;

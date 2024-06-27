import { Server } from "./presentation/server";
import { envs } from "./config/envs.plugin";

//const server = new Server();
//server.start();


/* Server.startLogs();
setTimeout(()=>{
    Server.stopLogs();
},10000); */


//Server.sendEmail();
(async()=>{
   await Server.getLogs();
})()


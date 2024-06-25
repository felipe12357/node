import { Server } from "./presentation/server";
import { envs } from "./config/envs.plugin";

//const server = new Server();
//server.start();
Server.start();
setTimeout(()=>{
    Server.stop();
},10000) 
console.log("arranca")
console.log(envs.MAILER_EMAIL);
console.log(envs);

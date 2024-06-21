import { Server } from "./presentation/server";

//const server = new Server();
//server.start();
Server.start();
setTimeout(()=>{
    Server.stop();
},10000) 
console.log("arranca")

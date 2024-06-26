"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./presentation/server");
//const server = new Server();
//server.start();
server_1.Server.start();
setTimeout(() => {
    server_1.Server.stop();
}, 10000);
//Server.sendEmail();

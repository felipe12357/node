import { envs } from "./config/envs";
import { AppRoutes } from "./routes";
import { Server } from "./server";

console.log('hola mundo');

const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
});
    
server.start()
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_app_1 = require("./presentation/server-app");
const args_pluggin_1 = require("./plugins/args.pluggin");
const { l: limit, b: base, s: showConsole } = args_pluggin_1.argv;
server_app_1.ServerApp.run({ limit, base, showConsole });
//para ejecutar desde consola:
//npx ts-node src/app -b 10 -l 5
//npx ts-node src/app --base 10 --limit 7 -s

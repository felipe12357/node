import { ServerApp } from './presentation/server-app'; 
import { argv } from './plugins/args.pluggin';

const { l:limit, b:base, s:showConsole} = argv;
ServerApp.run({limit,base,showConsole});


//para ejecutar desde consola:
//npx ts-node src/app -b 10 -l 5
//npx ts-node src/app --base 10 --limit 7 -s
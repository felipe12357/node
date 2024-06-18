//yargs se utiliza para trabajar facilmente con las variables de entorno
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const argv = yargs(hideBin(process.argv))
.option('b',{
    alias: 'base',
    type: 'number',
    demandOption:true, //hago q el argumento b sea obligatorio
    describe:'multiplicatin base'
})
.option('l',{
    alias: 'limit',
    type: 'number',
    demandOption:false,
    describe:'multiplicatin table limit',
    default:10
})
.option('s',{
    alias: 'show',
    type: 'boolean',
    describe:'show table in console',
})
.check((argv, options)=>{
    if(argv.b<1 || argv.l <1)
        throw new Error('El limite y la base tienen q ser mayor a 1');

    return true
})
.parseSync();



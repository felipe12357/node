export enum LogSecurityLevelEnum{
    low = 'low',
    medium = 'medium',
    hight = 'hight'
}

export type LogProperties = {
    level:LogSecurityLevelEnum,
    message:string,
    origin:string,
    createAt?:Date
}

export class LogEntity {
    public level: LogSecurityLevelEnum;
    public message:string;
    public createAt:Date;
    public origin:string;

    /*
    constructor(level:LogSecurityLevelEnum,message:string){
        this.level = level,
        this.message= message;
        this.createAt = new Date()
    } */

    //esta es la forma corta de implementar el codigo comentado
   /*  constructor(public level:LogSecurityLevelEnum,public message:string){
        this.createAt = new Date()
    } */

    //se hace esto por q son 3 propiedades y por lectura es mejor enviar un objeto
    constructor(logProperties:LogProperties){
        this.level = logProperties.level;
        this.message = logProperties.message;
        this.origin = logProperties.origin;
        this.createAt = new Date();
    }

    //Conocido tambien como factory constructor
    static fromJson = (json:string):LogEntity =>{
        const {message, level,origin, createAt} = JSON.parse(json);
        const logProperties:LogProperties = { message, level,origin, createAt }
        const log = new LogEntity(logProperties);
        log.createAt = new Date(createAt);
        return log;
    }

    static fromObject =(objectReceived:{[key:string]:any}):LogEntity =>{
        let {message, level,origin, createAt} = objectReceived;
        level = level.toLowerCase();
        const log = new LogEntity( {message, level,origin, createAt});
        return log;
    }
}
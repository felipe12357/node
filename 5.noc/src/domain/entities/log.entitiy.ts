export enum LogSecurityLevelEnum{
    low = 'low',
    medium = 'medium',
    hight = 'hight'
}

export class LogEntity {
/*     public level: LogSecurityLevelEnum;
    public message:string; */
    public createAt:Date;

    /*
    constructor(level:LogSecurityLevelEnum,message:string){
        this.level = level,
        this.message= message;
        this.createAt = new Date()
    } */

    //esta es la forma corta de implementar el codigo comentado
    constructor(public level:LogSecurityLevelEnum,public message:string){
        this.createAt = new Date()
    }

    //Conocido tambien como factory constructor
    static fromJson = (json:string):LogEntity =>{
        const {message, level, createAt} = JSON.parse(json);
        const log = new LogEntity(message,level);
        log.createAt = new Date(createAt);
        return log;
    }
}
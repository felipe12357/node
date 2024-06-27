"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogEntity = exports.LogSecurityLevelEnum = void 0;
var LogSecurityLevelEnum;
(function (LogSecurityLevelEnum) {
    LogSecurityLevelEnum["low"] = "low";
    LogSecurityLevelEnum["medium"] = "medium";
    LogSecurityLevelEnum["hight"] = "hight";
})(LogSecurityLevelEnum || (exports.LogSecurityLevelEnum = LogSecurityLevelEnum = {}));
class LogEntity {
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
    constructor(logProperties) {
        this.level = logProperties.level;
        this.message = logProperties.message;
        this.origin = logProperties.origin;
        this.createAt = new Date();
    }
}
exports.LogEntity = LogEntity;
//Conocido tambien como factory constructor
LogEntity.fromJson = (json) => {
    const { message, level, origin, createAt } = JSON.parse(json);
    const logProperties = { message, level, origin, createAt };
    const log = new LogEntity(logProperties);
    log.createAt = new Date(createAt);
    return log;
};
LogEntity.fromObject = (objectReceived) => {
    const { message, level, origin, createAt } = objectReceived;
    const log = new LogEntity({ message, level, origin, createAt });
    return log;
};

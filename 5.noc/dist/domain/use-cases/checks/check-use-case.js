"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckUseCase = void 0;
const log_entitiy_1 = require("../../entities/log.entitiy");
class CheckUseCase {
    //all recibir los metodos en el constructor estoy implementando
    //injection de dependencias
    constructor(logRepository, successCallBack, errorCallBack) {
        this.logRepository = logRepository;
        this.successCallBack = successCallBack;
        this.errorCallBack = errorCallBack;
    }
    execute(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const logProperties = {
                message: `Service ${url} working`,
                level: log_entitiy_1.LogSecurityLevelEnum.low,
                origin: 'check-service'
            };
            try {
                const req = yield fetch(url);
                if (!req.ok)
                    throw new Error(`Error checking the url : ${url}`);
                this.logRepository.saveLog(new log_entitiy_1.LogEntity(logProperties));
                this.successCallBack();
                return true;
            }
            catch (error) {
                //console.log(error);
                const errorString = `${url} is failing, ${error}`;
                logProperties.level = log_entitiy_1.LogSecurityLevelEnum.hight;
                logProperties.message = errorString;
                this.logRepository.saveLog(new log_entitiy_1.LogEntity(logProperties));
                this.errorCallBack(errorString);
                return false;
            }
        });
    }
}
exports.CheckUseCase = CheckUseCase;

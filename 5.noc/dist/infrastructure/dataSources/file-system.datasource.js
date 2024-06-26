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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemDataSource = void 0;
const log_entitiy_1 = require("../../domain/entities/log.entitiy");
const fs_1 = __importDefault(require("fs"));
class FileSystemDataSource {
    constructor() {
        this.logPath = 'logs/';
        this.allLogPath = 'logs/logs-all.log';
        this.mediumLogPath = 'logs/logs-medium.log';
        this.highLogPath = 'logs/logs-high.log';
        this.getLogsFromFile = (path) => {
            const contentStringList = fs_1.default.readFileSync(path, 'utf8').split("\n");
            // const contentEntities = contentStringList.map( contentString => LogEntity.fromJson(contentString));
            //una forma corta, funciona cuando el argumento se usa para llamar otra funcion:
            const contentEntities = contentStringList.map(log_entitiy_1.LogEntity.fromJson);
            return contentEntities;
        };
        this.createLogsFiles();
    }
    createLogsFiles() {
        if (!fs_1.default.existsSync(this.logPath))
            fs_1.default.mkdirSync(this.logPath);
        const logsPathFiles = [this.allLogPath, this.mediumLogPath, this.highLogPath];
        logsPathFiles.forEach(path => {
            if (!fs_1.default.existsSync(path))
                fs_1.default.writeFileSync(path, '');
        });
    }
    saveLog(logT) {
        return __awaiter(this, void 0, void 0, function* () {
            const logContent = `${JSON.stringify(logT)} \n`;
            fs_1.default.appendFileSync(this.allLogPath, logContent);
            if (logT.level === log_entitiy_1.LogSecurityLevelEnum.hight)
                fs_1.default.appendFileSync(this.highLogPath, logContent);
            if (logT.level === log_entitiy_1.LogSecurityLevelEnum.medium)
                fs_1.default.appendFileSync(this.mediumLogPath, logContent);
        });
    }
    getLogs(severityLevel) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (severityLevel) {
                case log_entitiy_1.LogSecurityLevelEnum.hight:
                    return this.getLogsFromFile(this.highLogPath);
                case log_entitiy_1.LogSecurityLevelEnum.medium:
                    return this.getLogsFromFile(this.mediumLogPath);
                case log_entitiy_1.LogSecurityLevelEnum.low:
                    return this.getLogsFromFile(this.allLogPath);
                default:
                    throw new Error(`log security level: ${severityLevel} not implemented`);
            }
        });
    }
}
exports.FileSystemDataSource = FileSystemDataSource;

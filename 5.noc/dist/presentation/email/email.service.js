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
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const envs_plugin_1 = require("../../config/envs.plugin");
const log_entitiy_1 = require("../../domain/entities/log.entitiy");
class EmailService {
    constructor(logRepository) {
        this.logRepository = logRepository;
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: envs_plugin_1.envs.MAILER_EMAIL,
                pass: envs_plugin_1.envs.MAILER_SECRET_KEY
            }
        });
    }
    sendEmail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { to, subject, htmlBody, attachments = [] } = options;
            const logProperties = {
                message: `Email sent Success`,
                level: log_entitiy_1.LogSecurityLevelEnum.low,
                origin: 'email.service'
            };
            try {
                const sentInformation = yield this.transporter.sendMail({
                    to, subject, html: htmlBody, attachments
                });
                this.logRepository.saveLog(new log_entitiy_1.LogEntity(logProperties));
                return true;
            }
            catch (error) {
                logProperties.level = log_entitiy_1.LogSecurityLevelEnum.hight;
                logProperties.message = "error sending the message";
                this.logRepository.saveLog(new log_entitiy_1.LogEntity(logProperties));
                //    console.error(error);
                return false;
            }
        });
    }
}
exports.EmailService = EmailService;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config"); //se utiliza pra poder leer las variables de ambiente q creemos en el archivo .env
const envvalidator = __importStar(require("env-var")); //para validar las variables de entorno
exports.envs = {
    PORT: envvalidator.get('PORT').required().asPortNumber(),
    MAILER_EMAIL: envvalidator.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY: envvalidator.get('MAILER_SECRET_KEY').required().asString(),
    PROD: envvalidator.get('PROD').required().asBool(),
    //mongo
    MONGO_URL: envvalidator.get('MONGO_URL').required().asString(),
    MONGO_USER: envvalidator.get('MONGO_USER').required().asString(),
    MONGO_PASS: envvalidator.get('MONGO_PASS').required().asString(),
    MONGO_DB_NAME: envvalidator.get('MONGO_DB_NAME').required().asString(),
};
//para acceder a estas variables simplemente:
//console.log(envs);

import 'dotenv/config'; //se utiliza pra poder leer las variables de ambiente q creemos en el archivo .env
import * as envvalidator from 'env-var' //para validar las variables de entorno

export const envs = {
    PORT: envvalidator.get('PORT').required().asPortNumber(),
    MAILER_EMAIL: envvalidator.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY: envvalidator.get('MAILER_SECRET_KEY').required().asString(),
    PROD: envvalidator.get('PROD').required().asBool(),

    //mongo
    MONGO_URL: envvalidator.get('MONGO_URL').required().asString(),
    MONGO_USER: envvalidator.get('MONGO_USER').required().asString(),
    MONGO_PASS: envvalidator.get('MONGO_PASS').required().asString(),
    MONGO_DB_NAME: envvalidator.get('MONGO_DB_NAME').required().asString(),

    //postgress
    POSTGRES_PASS: envvalidator.get('POSTGRES_PASS').required().asString(),
    POSTGRES_USER: envvalidator.get('POSTGRES_USER').required().asString(),
    POSTGRES_DB: envvalidator.get('POSTGRES_USER').required().asString()
}

//para acceder a estas variables simplemente:
//console.log(envs);
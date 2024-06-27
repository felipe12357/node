import mongoose from 'mongoose';

interface ConnectionOptions {
    mongoUrl:string,
    dbName:string
}

export class MongoDatabase {
    static async connect(options:ConnectionOptions){
        const {mongoUrl,dbName} = options

        try {
            await mongoose.connect(mongoUrl,{
                dbName
            })
            console.log("mongo connected");

        }catch(error){
            console.log("Mongo connection error");
            throw error;
        } 
    }

    static async disconnect(){
        await mongoose.disconnect();
    }
}
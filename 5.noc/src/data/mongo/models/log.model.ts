import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    level:{ type:String, enum:['low', 'medium', 'hight'],require:true, default:'low'},
    message:{ type:String, require:true},
    origin:{ type:String, require:true},
    createAt:{ type:Date, default: new Date()}
})

export const LogModel = mongoose.model('Log',logSchema);


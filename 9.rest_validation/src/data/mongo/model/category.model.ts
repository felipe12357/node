import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'Name is required'],
        unique: true,
    },
    available:{
        type:Boolean,
        default:false
    },
    //con esto establezco una relacion con la tabla user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
    }
});

export const CategoryModel = mongoose.model('category',categorySchema);
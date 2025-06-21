import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'Name is required'],
        unique: true,
    },
    available:{
        type:Boolean,
        default:false
    },
    price: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
    },
    //con esto establezco una relacion con la tabla user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'category',
        require:true
    }
});

export const ProductModel = mongoose.model('product',productSchema);
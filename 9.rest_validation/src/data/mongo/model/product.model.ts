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
}, {
        toObject: { virtuals: true }
    });


productSchema.set('toJSON',{
    virtuals: true, //agrega el campo id
    versionKey: false, //elimina el campo V_
    transform: function( doc, ret, option) {
        delete ret._id;

        const isNotPopulated = (value: any) => typeof value === 'object' && value !== null && '_id' in value;

        if (isNotPopulated(ret.user)) {
            ret.userId = ret.user;
            delete ret.user;

            ret.categoryId = ret.category;
            delete ret.category;
        }
    }
})

/* productSchema.virtual('productPopulated', {
    virtuals: true, //agrega el campo id
    versionKey: false, //elimina el campo V_
    localField: 'userId',
    foreignField: 'user'
}) */
export const ProductModel = mongoose.model('product',productSchema);
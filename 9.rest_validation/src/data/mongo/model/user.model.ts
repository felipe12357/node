import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'Name is required'],
    },
    email:{
        type:String,
        required: [true,'Email is required'],
        unique: true,
    },
    emailValidated:{
        type:Boolean,
        default: false
    },
    password:{
        type:String,
        required: [true,'Password is required'],
    },
    img: {
        type:String
    },
    role: {
        type: [String],
        default: ['USER_ROLE'],
        enum: ['ADMIN_ROLE','USER_ROLE']
    }
});

userSchema.set('toJSON',{
    virtuals: true, //agrega el campo id
    versionKey: false, //elimina el campo V_
    transform: function( doc, ret, option) {
        delete ret._id;
        delete ret.emailValidated;
        delete ret.password;
    }
})

export const UserModel = mongoose.model('user',userSchema);
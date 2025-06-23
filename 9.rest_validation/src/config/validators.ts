import mongoose from "mongoose";
import { CategoryModel, ProductModel, UserModel } from "../data";


export class Validators {

    static isValidMongoId(id:string) {
        return mongoose.isValidObjectId(id)
    }

    static async uniqueProduct(name:string) {
       const productFound = await ProductModel.findOne( { name: name});
       
        if(productFound)
          throw new Error();
    }

    static async uniqueCategory(name:string) {
        const categoryExists = await CategoryModel.findOne( { name:name});
        if(categoryExists) {
            throw new Error();
        }
    }

    static async uniqueEmail(email:string) {
        const existUser = await UserModel.findOne( { email:email});
        if(existUser) {
            throw new Error();
        }
    }
}
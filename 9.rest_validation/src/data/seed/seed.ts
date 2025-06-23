import { envs } from "../../config/envs";
import { CategoryModel } from "../mongo/model/category.model";
import { ProductModel } from "../mongo/model/product.model";
import { UserModel } from "../mongo/model/user.model";
import { MongoDatabase } from "../mongo/mongo-database";
import { seedData } from "./data";

(async() => {
    await MongoDatabase.connect({mongoUrl:envs.MONGO_URL,dbName:envs.MONGO_DB_NAME})

    await main();

    await MongoDatabase.disconnect();
})();

const randomBetween0X = (x:number) => {
   return Math.floor( Math.random() * x); 
}

async function main(){

    //Delete all
    await Promise.all([
        UserModel.deleteMany(),
        CategoryModel.deleteMany(),
        ProductModel.deleteMany(),
    ])

    //crear usuarios
    const users = await UserModel.insertMany(seedData.users);

    //crear categorias
    const categories = await CategoryModel.insertMany(
        seedData.categories.map( category => ({...category, 
            user: users[randomBetween0X(6)]._id
        }))
    )

    //crear productos
    const products = await ProductModel.insertMany(
        seedData.products.map( product => ({...product, 
            user: users[randomBetween0X(6)]._id, 
            category: categories[randomBetween0X(22)]._id }))
    )

    console.log('seed completed');
}
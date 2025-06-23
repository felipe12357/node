import { Router } from "express";
import { body } from "express-validator";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { AuthMiddleware } from "../auth/auth.middleware";
import { Validators } from "../../config/validators";

export class CategoryRoutes {
    static get routes(): Router {

    const router = Router();
    const categoryService = new CategoryService();
    const categoryController = new CategoryController(categoryService);

    //Body hace la validacion sobre el formato body/json 
    router.post('/',
        AuthMiddleware.validateJWT,
        body(['name']).notEmpty()
          .custom(async(value:string)=> await Validators.uniqueCategory(value)).withMessage('duplicate category'),
        body('available').optional().isBoolean(),
        categoryController.createCategory );

    router.get('/list',
         AuthMiddleware.validateJWT,
        categoryController.getCategories);

    router.get('/list-populated',
         AuthMiddleware.validateJWT,
        categoryController.getCategoriesPopulated);

    return router;
    }
}
import { Router } from "express";
import { body } from "express-validator";
import { AuthMiddleware } from "../auth/auth.middleware";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { Validators } from "../../config/validators";

export class ProductRoutes {
    static get routes(): Router {

    const router = Router();
    const productService = new ProductService();
    const productController = new ProductController(productService);

    //Body hace la validacion sobre el formato body/json 
    router.post('/',
        AuthMiddleware.validateJWT,
        body(['name'])
          .notEmpty().withMessage('missing name property')
          .custom(async(value:string)=> await Validators.uniqueProduct(value)).withMessage('duplicate product'),
        body(['userId'])
            .notEmpty().withMessage('missing userId property')
            .custom((value)=>Validators.isValidMongoId(value)).withMessage('invalid user id'),
        body(['categoryId']).notEmpty().custom((value)=>Validators.isValidMongoId(value)).withMessage('missing categoryId property'),
        body(['price']).optional().isNumeric().withMessage('price most be a number'),
        body('available').optional().isBoolean(),
        productController.createProduct );

    router.get('/list',
         AuthMiddleware.validateJWT,
        productController.getProducts);

    router.get('/list-populated',
         AuthMiddleware.validateJWT,
        productController.getProductsPopulated);

    return router;
    }
}
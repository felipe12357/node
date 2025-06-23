import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { PaginationDto } from "../../domain/dtos/share/pagination.dto";
import { ProductService } from "./product.service";
import { CreateProductDto } from "../../domain/dtos/product/create-product.dto";

export class ProductController {

    constructor( public readonly productService: ProductService) {}

    createProduct = (req: Request, res: Response) => {
        const validation = validationResult(req);

        if (validation.isEmpty()){
            const productDtoType:CreateProductDto = req.body;

            this.productService.createProduct(productDtoType)
                 .then((product) => res.status(201).json(product) )  //201 creacion
                .catch((error:CustomError)=> this.handleError(error,res) );
        }
        else
            res.status(400).send({ errors: `${validation.array()[0].type} ${validation.array()[0].msg}` });
    }

    getProducts = (req: Request, res: Response) => {
        const {page=1, limit=10} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);

        if(error){
           res.status(401).json(error);
        }else {
            this.productService.getProductListV2(paginationDto!)
            .then((productList) => res.json(productList) )
            .catch((error:CustomError)=> this.handleError(error,res) );
        }
    }

    getProductsPopulated= (req: Request, res: Response) => {
        const {page=1, limit=10} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);

        if(error){
           res.status(401).json(error);
        }else {
            this.productService.getProductListPopulated(paginationDto!)
            .then((productList) => res.json(productList) )
            .catch((error:CustomError)=> this.handleError(error,res) );
        }
    }

    private handleError = (error:CustomError,res: Response):void => {
        res.status(error.statusCode).json({error:error.message})
    }
}
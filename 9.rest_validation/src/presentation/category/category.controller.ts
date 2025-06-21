import { validationResult } from "express-validator";
import { CategoryService } from "./category.service";
import { Request, Response } from "express";
import { CreateCategoryDto } from "../../domain/dtos/category/create-category.dto";
import { CustomError } from "../../domain";
import { PaginationDto } from "../../domain/dtos/share/pagination.dto";

export class CategoryController {

    constructor( public readonly categoryService: CategoryService) {}

    createCategory = (req: Request, res: Response) => {
        const validation = validationResult(req);

        if (validation.isEmpty()){
            const categoryDtoType:CreateCategoryDto = req.body;
            this.categoryService.createCategory(categoryDtoType, req.body.user)
                 .then((category) => res.status(201).json(category) )  //201 creacion
                .catch((error:CustomError)=> this.handleError(error,res) );
        }
        else
            res.status(400).send({ errors: `${validation.array()[0].type} ${validation.array()[0].msg}` });
    }

    getCategories = (req: Request, res: Response) => {
        const {page=1, limit=10} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);

        if(error){
           res.status(401).json(error);
        }else {
            this.categoryService.getCategoryList(paginationDto!)
            .then((categoryList) => res.json(categoryList) )
            .catch((error:CustomError)=> this.handleError(error,res) );
        }
    }

    private handleError = (error:CustomError,res: Response):void => {
        res.status(error.statusCode).json({error:error.message})
    }
}
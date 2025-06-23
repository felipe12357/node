import { CategoryModel } from "../../data";
import { CustomError } from "../../domain";
import { CreateCategoryDto } from "../../domain/dtos/category/create-category.dto";
import { PaginatedResponseDto } from "../../domain/dtos/share/paginated-response.dto";
import { PaginationDto } from "../../domain/dtos/share/pagination.dto";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { UserEntity } from "../../domain/entities/user.entity";
import { CategoryType } from "../../domain/types/domain.types";

export class CategoryService {

    constructor(){ }

    public async createCategory(categoryDto: CreateCategoryDto, user: UserEntity): Promise<CategoryEntity>{
        try {
            const newCategory = new CategoryModel({ 
            name: categoryDto.name, available: categoryDto.available, user: user.id });
            await newCategory.save();
            const categoryToSend = CategoryEntity.fromObject(newCategory);
    
            return  categoryToSend;
        } catch (error) {
            throw CustomError.badRequest(`${error}`);
        }
    }

    public async getCategoryListPopulated(pagination:PaginationDto): Promise<PaginatedResponseDto<CategoryType>>{
        const {page, limit} = pagination;
        try { 

            const [total, categories] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find().skip( (page-1) * limit ).limit(limit)
                .populate('user') as unknown as CategoryType[]
            ])

            const response = PaginatedResponseDto.create<CategoryType>(total, categories);
            return response;

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
    

    
    //version utilizando funciones de mongoose para transforma el objeto 
    public async getCategoryListV2(pagination:PaginationDto): Promise<PaginatedResponseDto<CategoryType>>{
        const {page, limit} = pagination;
        try { 

            const [total, categories] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find().skip( (page-1) * limit ).limit(limit)  as unknown as CategoryType[]
            ])


           const response = PaginatedResponseDto.create<CategoryType>(total, categories);
           return response;

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    //version utilizando entidades (clases) para transforma el objeto
    public async getCategoryList(pagination:PaginationDto): Promise<PaginatedResponseDto<CategoryEntity>>{
        const {page, limit} = pagination;
        try { 

            const [total, categories] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find().skip( (page-1) * limit ).limit(limit)
            ])

           const categoryList = categories.map((category) => (CategoryEntity.fromObject(category)));

           const response = PaginatedResponseDto.create<CategoryEntity>(total, categoryList);
           return response;

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}

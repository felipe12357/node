import { ProductModel } from "../../data";
import { CustomError } from "../../domain";
import { CreateProductDto } from "../../domain/dtos/product/create-product.dto";
import { PaginatedResponseDto } from "../../domain/dtos/share/paginated-response.dto";
import { PaginationDto } from "../../domain/dtos/share/pagination.dto";
import { ProductEntity } from "../../domain/entities/product.entity";
import { ProductType } from "../../domain/types/domain.types";

export class ProductService {

    constructor(){ }

    public async createProduct(productDto: CreateProductDto): Promise<ProductEntity>{
        try {
            const newProduct = new ProductModel({ ...productDto, user: productDto.userId, category: productDto.categoryId });
            await newProduct.save();
             const productToSend = ProductEntity.fromObject(newProduct);

            return  productToSend;
        } catch (error) {
            throw CustomError.badRequest(`${error}`);
        }
    }

    public async getProductListPopulated(pagination:PaginationDto): Promise<PaginatedResponseDto<ProductType>>{
        const {page, limit} = pagination;
        try { 

            const [total, products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find().skip( (page-1) * limit ).limit(limit)
                .populate('user')
                .populate('category') as unknown as ProductType[]
            ])

           const response = PaginatedResponseDto.create<ProductType>(total, products);
           return response;

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }


    //version utilizando funciones de mongoose para transforma el objeto 
    public async getProductListV2(pagination:PaginationDto): Promise<PaginatedResponseDto<ProductType>>{
        const {page, limit} = pagination;
        try { 

            const [total, products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find().skip( (page-1) * limit ).limit(limit) as unknown as ProductType[]
            ])

           const response = PaginatedResponseDto.create<ProductType>(total, products);
           return response;

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    //version utilizando entidades (clases) para transforma el objeto
    public async getProductList(pagination:PaginationDto): Promise<PaginatedResponseDto<ProductEntity>>{
        const {page, limit} = pagination;
        try { 

            const [total, products] = await Promise.all([
                await ProductModel.countDocuments(),
                await ProductModel.find().skip( (page-1) * limit ).limit(limit)
            ])

           const productList = products.map((product) => (ProductEntity.fromObject(product)));

           const response = PaginatedResponseDto.create<ProductEntity>(total, productList);
           return response;

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}

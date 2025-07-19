import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { FileService } from "./file.service";
import { UploadedFile } from "express-fileupload";


export class FileController {
    // para probar este endpoint debe hacerse desde postman ya q thunderclient no permite subir imagenes
    constructor( public readonly fileService: FileService ) {}

    uploadFile = (req: Request, res: Response) => {
        if(req.files){
            // console.log(req.files)
            const key = Object.keys(req.files)[0];
            const firstFile = req.files[key] as UploadedFile;
            // console.log(firstFile)
            this.fileService.uploadSingle(firstFile)
                .then( (result:string)=> res.json(result))
                .catch((error:CustomError)=> this.handleError(error, res))
        }
        else {
            res.status(400).json({error: 'Not files selected'})
        }
       
    }

    uploadMultipleFile = (req: Request, res: Response) => {
        if(req.files){
            const fileList:UploadedFile[] = Object.keys(req.files).map( filename => {
                return req.files![filename] as UploadedFile
            });

            this.fileService.uploadMultiple(fileList)
               .then( (result:string[])=> res.json(result))
               .catch((error:CustomError)=> this.handleError(error, res));

        }else {
            res.json('upload multiple file');
        }
    }

    getFile = (req: Request, res: Response) => {
        try {
            const fileRoute = this.fileService.getFile(req.params.imageId);
            res.sendFile(fileRoute);
        } catch(error:unknown) { 
             this.handleError(error as CustomError, res);
        };
    }


    private handleError = (error:CustomError,res: Response):void => {
        res.status(error.statusCode).json({error:error.message})
    }
}
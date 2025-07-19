import { Router } from "express";
import { body } from "express-validator";
import { AuthMiddleware } from "../auth/auth.middleware";
import { Validators } from "../../config/validators";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";

export class FileRoutes {
    static get routes(): Router {

    const router = Router();
    const fileService = new FileService();
    const fileController = new FileController(fileService);

    //type = <user | category | product>
    router.post('/single/:type',
        AuthMiddleware.validateJWT,
        fileController.uploadFile );


    //type = <user | category | product>
    router.post('/multiple/:type',
         AuthMiddleware.validateJWT,
        fileController.uploadMultipleFile);

    router.get('/:imageId',
         AuthMiddleware.validateJWT,
        fileController.getFile);

    return router;
    }
}
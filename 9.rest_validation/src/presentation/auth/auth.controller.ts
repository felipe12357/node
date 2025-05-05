import { Request, Response } from "express";
import { RegisterUserDtoType } from "../../domain/dtos/auth/register-user.dto";
import { AuthService } from "./auth.service";
import { validationResult } from "express-validator";
import { LoginDtoType } from "../../domain/dtos/auth/login.dto";
import { CustomError } from "../../domain";

export class AuthController {

    constructor(
        public readonly authService:AuthService
    ) {

    }

    register = (req: Request, res: Response) => {
        const validation = validationResult(req);

        if (validation.isEmpty()){
            const registerUserDtoType:RegisterUserDtoType = req.body
            this.authService.registerUser(registerUserDtoType)
                .then((user) => res.json(user) )
                .catch((error:CustomError)=> this.handleError(error,res) )
        }
        else
            res.status(400).send({ errors: `${validation.array()[0].type} ${validation.array()[0].msg}` });


       // DE ESTA FORMA SE HACE LA VALIDACION DE LOS PARAMETROS MANUALMENTE
        /* const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if(error)
            res.status(400).json({error});
        else{
            this.authService.registerUser(registerUserDto!)
            .then(() => res.json('registerUserDto') )
            
        } */
    }

    login = (req: Request, res: Response) => {
        const validation = validationResult(req);
        if (validation.isEmpty()){
            const loginDto:LoginDtoType = req.body;
            this.authService.loginUser(loginDto).then((user) => res.json(user) )
            .catch((error:CustomError)=> this.handleError(error,res) )
        }
        else
            res.status(400).send({ errors: `${validation.array()[0].type} ${validation.array()[0].msg}` });
    }

    validate = (req: Request, res: Response) => {
        res.json('validate User');
    }

    private handleError = (error:CustomError,res: Response):void => {
        res.status(error.statusCode).json({error:error.message})
    }
}
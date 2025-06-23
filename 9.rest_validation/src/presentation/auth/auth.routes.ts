import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { body, query, validationResult } from 'express-validator';
import { Validators } from '../../config/validators';

export class AuthRoutes {

  static get routes(): Router {

    const router = Router();
    const authService = new AuthService();
    const authController = new AuthController(authService);

    // Definir las rutas
    router.get('/login', 
      body(['password','email']).notEmpty(),
      body('email').isEmail(),
      body('password').isAlphanumeric(),
      authController.login );

    //Body hace la validacion sobre el formato body/json 
    router.post('/register',
       body(['name','email','password']).notEmpty(),
       body('email').isEmail()
        .custom(async(value:string)=> await Validators.uniqueEmail(value)).withMessage('Email already exists'),
       body('password').isAlphanumeric(),
       authController.register );

    return router;
  }


}
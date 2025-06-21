import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain/entities/user.entity";
import jwt from 'jsonwebtoken';
import { CustomError } from "../../domain";
export class AuthMiddleware {
    // Este middle consulta si el usuario es correcto y si lo es, agrega la informacion del usuario

    static async validateJWT( req: Request, res: Response, next: NextFunction):Promise<void> {

        const authorization = req.header('Authorization');

        if(!authorization){
            res.status(401).json({error: 'Not token provided'});
            return;
        }

        if(!authorization!.startsWith('Bearer ')){
            res.status(401).json({error: 'Invalid Bearer token'});
            return;
        }

        const token = authorization.split(' ')[1] || '';

        // FALTA VALIDAR SI EL TOKEN ESPIRO Y CONTROLAR ESE ERROR
        try {
          const payload = await JwtAdapter.validateToken<{data:{id:string}}>(token);

          const user = await UserModel.findById(payload.data.id);

          if(!user) {
            res.status(401).json({error: 'Invalid token - user'});
            return;
          }

          req.body.user = UserEntity.fromObject(user);

          next(); // esta es la funcion q permite q la peticion continue con su flujo
          //es decir en este caso controlador -> service 
        } catch (error:any) {
          //console.log(error);
          if (error instanceof CustomError)
            res.status(error.statusCode).json({ error: error.message });
          else
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
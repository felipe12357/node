import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { UserModel } from "../../data";
import { CustomError } from "../../domain";
import { LoginDtoType } from "../../domain/dtos/auth/login.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";

export class AuthService {

    constructor(){ }

    public async registerUser( registerUserDto: RegisterUserDto) {
        const existUser = await UserModel.findOne({ email: registerUserDto.email});

        if(existUser)
            throw CustomError.badRequest('Email already exists');

        const encrypterPassword = BcryptAdapter.hash(registerUserDto.password);

        const newUser = new UserModel({ 
            name: registerUserDto.name, email: registerUserDto.email, password: encrypterPassword });
        
        await newUser.save();

        const { password, ...userToSend } = UserEntity.fromObject(newUser);
        return userToSend;
    }

    public async loginUser(loginDtoType: LoginDtoType){
        const existUser = await UserModel.findOne({ email: loginDtoType.email});

        if(existUser) {
           if( BcryptAdapter.compare(loginDtoType.password, existUser.password) ) {
               const { password, ...userToSend } = UserEntity.fromObject(existUser);
              return userToSend;
           } else
            throw CustomError.badRequest('bad credentials');
        }
        throw CustomError.badRequest('bad credentials');
    }
}
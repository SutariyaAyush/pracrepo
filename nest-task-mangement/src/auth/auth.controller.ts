import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialdto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService){}

    @Post('/signup')
    createUser(@Body() authCredentialdto:AuthCredentialdto):Promise<void>{

        return this.authservice.createUser(authCredentialdto)
    }

    @Post('/signin')
    signin(@Body() authCredentialdto:AuthCredentialdto):Promise<{accessToken : string}>{
        
        return this.authservice.signin(authCredentialdto)
    }
}
 
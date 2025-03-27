import { AuthService } from './auth.service';
import { AuthCredentialdto } from './dto/auth-credentials.dto';
export declare class AuthController {
    private authservice;
    constructor(authservice: AuthService);
    createUser(authCredentialdto: AuthCredentialdto): Promise<void>;
    signin(authCredentialdto: AuthCredentialdto): Promise<{
        accessToken: string;
    }>;
}

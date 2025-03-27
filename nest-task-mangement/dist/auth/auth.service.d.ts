import { DataSource } from 'typeorm';
import { AuthCredentialdto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly datasource;
    private jwtservice;
    constructor(datasource: DataSource, jwtservice: JwtService);
    createUser(authCredentialdto: AuthCredentialdto): Promise<void>;
    signin(authCredentialdto: AuthCredentialdto): Promise<{
        accessToken: string;
    }>;
}

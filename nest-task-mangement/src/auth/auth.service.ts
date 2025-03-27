import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AuthCredentialdto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt'
import { NotFoundError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class AuthService {
    constructor(
        private readonly datasource : DataSource,
        private jwtservice : JwtService
    ){}

    async createUser(authCredentialdto:AuthCredentialdto):Promise<void>{
        const userrepo = this.datasource.getRepository(User)
        const {username,password} = authCredentialdto

        const salt= await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password,salt)

        const user =userrepo.create({username,password:hashedPassword})
        try{
            await userrepo.save(user)
        }catch(error){
            if(error.code === '23505'){
                throw new ConflictException('Username already exist')
            }else{
                throw new InternalServerErrorException
            }
        }
    }

    async signin(authCredentialdto:AuthCredentialdto):Promise<{accessToken : string}>{
        const userrepo = this.datasource.getRepository(User)
        const {username,password} = authCredentialdto
        const user = await userrepo.findOne({where:{username}})
        if(!user) throw new NotFoundException('this username not found')

        if(await bcrypt.compare(password,user.password)){
            const payload: JwtPayload={username}
            const accessToken : string = await this.jwtservice.sign(payload)

            return {accessToken}
        }
        else{
            throw new UnauthorizedException('Please enter correct password')
        }
    }
}
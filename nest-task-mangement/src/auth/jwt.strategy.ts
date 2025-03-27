import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { DataSource } from "typeorm";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";

@Injectable()
export class JwtStratergy extends PassportStrategy(Strategy){
    constructor(
        private readonly datasource:DataSource
    ){
        super({
        secretOrKey:'topSecreat51',
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()  
        })
    }

    async validate(payload:JwtPayload):Promise<User>{
        const {username} = payload
        const getrepo = this.datasource.getRepository(User)
        const user = await getrepo.findOne({where:{username}})
        if(!user){
            throw new UnauthorizedException();
        }

        return user
    }
}
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStratergy } from './jwt.strategy';

@Module({
  imports:[
      TypeOrmModule.forFeature([User]),
      PassportModule.register({defaultStrategy:'jwt'}),
      JwtModule.register({
        secret:'topSecreat51',
        signOptions:{
          expiresIn:3600
        }
      })
    ],
  providers: [AuthService,JwtStratergy],
  controllers: [AuthController],
  exports:[JwtStratergy,PassportModule]
})
export class AuthModule {}

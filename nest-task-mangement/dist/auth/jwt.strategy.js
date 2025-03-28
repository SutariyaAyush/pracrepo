"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStratergy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let JwtStratergy = class JwtStratergy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    datasource;
    constructor(datasource) {
        super({
            secretOrKey: 'topSecreat51',
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()
        });
        this.datasource = datasource;
    }
    async validate(payload) {
        const { username } = payload;
        const getrepo = this.datasource.getRepository(user_entity_1.User);
        const user = await getrepo.findOne({ where: { username } });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
exports.JwtStratergy = JwtStratergy;
exports.JwtStratergy = JwtStratergy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], JwtStratergy);
//# sourceMappingURL=jwt.strategy.js.map
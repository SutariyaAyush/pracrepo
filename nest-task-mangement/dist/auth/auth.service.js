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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    datasource;
    jwtservice;
    constructor(datasource, jwtservice) {
        this.datasource = datasource;
        this.jwtservice = jwtservice;
    }
    async createUser(authCredentialdto) {
        const userrepo = this.datasource.getRepository(user_entity_1.User);
        const { username, password } = authCredentialdto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = userrepo.create({ username, password: hashedPassword });
        try {
            await userrepo.save(user);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('Username already exist');
            }
            else {
                throw new common_1.InternalServerErrorException;
            }
        }
    }
    async signin(authCredentialdto) {
        const userrepo = this.datasource.getRepository(user_entity_1.User);
        const { username, password } = authCredentialdto;
        const user = await userrepo.findOne({ where: { username } });
        if (!user)
            throw new common_1.NotFoundException('this username not found');
        if (await bcrypt.compare(password, user.password)) {
            const payload = { username };
            const accessToken = await this.jwtservice.sign(payload);
            return { accessToken };
        }
        else {
            throw new common_1.UnauthorizedException('Please enter correct password');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
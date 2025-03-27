import { Strategy } from "passport-jwt";
import { DataSource } from "typeorm";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";
declare const JwtStratergy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStratergy extends JwtStratergy_base {
    private readonly datasource;
    constructor(datasource: DataSource);
    validate(payload: JwtPayload): Promise<User>;
}
export {};

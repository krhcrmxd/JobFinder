import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { getBearerToken } from "./getBearerToken.util";

export async function getEmailFromReq(req: Request, Jwt: JwtService): Promise<string> {
    const bearerToken = getBearerToken(req);
    const payload = await Jwt.verifyAsync(bearerToken);
    if (!payload) {
        throw new UnauthorizedException("Token is invalid");
    }

    return payload.email;
}

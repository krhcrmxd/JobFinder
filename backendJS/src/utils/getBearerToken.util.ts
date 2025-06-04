import { UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

export function getBearerToken(req: Request): string {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Token is missing or invalid");
        }
        return authHeader.split(" ")[1];
    } catch (e) {
        console.log(e);
    }
}

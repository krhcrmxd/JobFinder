import {
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "@nestjs/jwt";

export default function errorHandler(e: unknown) {
    if (
        e instanceof BadRequestException ||
        e instanceof UnauthorizedException ||
        e instanceof NotFoundException ||
        e instanceof ForbiddenException
    ) {
        throw e;
    } else if (
        e instanceof TokenExpiredError ||
        e instanceof JsonWebTokenError ||
        e instanceof NotBeforeError
    ) {
        throw new UnauthorizedException(e.message);
    } else {
        console.log(e);
    }
}

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtPayloadDto } from 'src/shared/dto/jwt-payload.dto';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request['user'] as JwtPayloadDto;

    if (!user || !user.document) {
      throw new UnauthorizedException('Unauthenticated user or the token does not contain the document field.');
    }

    const userDocument = user.document;
    const resourceDto = request.body;

    if (!resourceDto || !resourceDto.document) {
        throw new ForbiddenException('The body of the request does not contain the document field required for authorization.');
    }

    const resourceDocument = resourceDto.document;
    const isOwner = (userDocument === resourceDocument);

    if (!isOwner) {
      throw new ForbiddenException('Access denied. The provided document does not match the authenticated users document.');
    }

    return true;
  }
}
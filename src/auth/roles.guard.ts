import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
        if (!requiredRoles) {
            return true; // If no roles are required, access is granted
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user; // This should be the authenticated user
        if (!user) {
            throw new UnauthorizedException('User not authenticated');
        }

        return requiredRoles.some(role => user.type === role);
    }
}

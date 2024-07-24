import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';

// Constante para usar como chave de metadata
export const ROLES_KEY = 'roles';

// Decorador para definir os papéis necessários para acessar o recurso
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

// Decorador para obter o papel do usuário (opcional, se você precisar de um decorator para obter dados específicos)
export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user; // Retorna o usuário da requisição
    },
);

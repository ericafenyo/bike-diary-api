import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthenticatedUser {
  uid: string;
}

export const AuthUser = createParamDecorator(
  (param: string, context: ExecutionContext) => {
    const body = context.switchToHttp().getRequest();

    // Just a dummy user. This should be provided by the authentication server
    // TODO: Get user from the authentication server
    const request = {
      user: { uid: '6019fab9c7b7f1ddc2ed6152' },
    };
    console.log(body);

    return param ? request.user[param] : request.user;
  },
);

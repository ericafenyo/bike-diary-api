import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface AuthenticatedUser {
  id: string;
  email: string;
}

export const CurrentUser = createParamDecorator(
  (param, context: ExecutionContext): AuthenticatedUser => {
    const { req } = GqlExecutionContext.create(context).getContext();
    return param ? req.user[param] : req.user;
  },
);

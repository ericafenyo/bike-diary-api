import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  message(): any {
    return {
      message: "Welcome! use '/graphql' endpoint to access the Graphql API",
    };
  }
}

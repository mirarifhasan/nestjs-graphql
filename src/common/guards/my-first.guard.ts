import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class MyFristGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log(context.getArgs());

    return true;
  }
}

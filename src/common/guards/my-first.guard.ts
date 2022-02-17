import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class MyFristGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    // console.log('ctx', ctx);

    const request = ctx.getContext().request;
    // console.log('request', request);

    const Authorization = request.get('a');
    console.log('Token:', Authorization);

    return true;
  }
}

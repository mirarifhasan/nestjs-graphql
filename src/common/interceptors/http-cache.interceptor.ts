import { CACHE_KEY_METADATA, CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const cacheKey = this.reflector.get(CACHE_KEY_METADATA, context.getHandler());
    
    //checking if key passed in decorators
    if (cacheKey) {
      const request = context.switchToHttp().getRequest<Request>();
      /* let user: any = request.user;
      if (!user) {
        return `${cacheKey}-${request.url}`;
      }
 */
      //return `${cacheKey}-${request.url}-${user.user_id}`;
    }

    return super.trackBy(context);
  }
}

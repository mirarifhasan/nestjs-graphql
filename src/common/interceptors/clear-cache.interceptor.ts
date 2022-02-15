import { CACHE_KEY_METADATA, CacheInterceptor, CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ClearCacheInterceptor extends CacheInterceptor {
  intercept(context: ExecutionContext, next: CallHandler):any {
    const cacheKey = this.reflector.get(CACHE_KEY_METADATA, context.getHandler());
    
    return next.handle().pipe(
        map((res) => {
                console.log(this.cacheManager);
        })
      );
  }
}

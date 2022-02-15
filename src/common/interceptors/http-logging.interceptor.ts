import { Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HTTPLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();

    const method = request.method;
    const url = request.originalUrl;

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const request = context.switchToHttp().getRequest();
        let ip =
          request.headers['cf-connecting-ip'] || request.headers['x-forwarded-for'] || request.connection.remoteAddress;
      

          const delay = Date.now() - now;
        console.log(`${ip} | ${response.statusCode} | [${method}] ${url} - ${delay}ms`);
      }),
      catchError((error) => {
        const response = context.switchToHttp().getResponse();
        let ip =
        request.headers['cf-connecting-ip'] || request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    
        const delay = Date.now() - now;
        console.error(`${ip} | ${response.statusCode} | [${method}] ${url} - ${delay}ms`);
        return throwError(error);
      })
    );
  }
}

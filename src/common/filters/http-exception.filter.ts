import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    try {
      let { statusCode, message, error } = exception.getResponse() as any;

      message = typeof message === 'string' ? message : message.join(',');
      response.status(statusCode).json({
        code: statusCode,
        message: message,
        data: [],
      });
    } catch (error) {
      let message = exception.message;
      response.status(500).json({
        code: 500,
        message: message,
        data: [],
      });
    }
  }
}

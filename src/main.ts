import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

import { ApiModule } from './api/api.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { HTTPLoggingInterceptor } from './common/interceptors/http-logging.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

function setupSwagger(app) {
  // Swagger Set up
  let swaggerDocPath = '/api-doc';
  let { SWAGGER_USERNAME, SWAGGER_PASSWORD } = process.env;
  const config = new DocumentBuilder()
    .setTitle('Nest Boilerplate')
    .setDescription('API DOC')
    .setContact('Md. Toufiqul Islam', '', 'toufiq.austcse@gmail.com')
    .setVersion('1.0')
    .build();
  let option: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  const document = SwaggerModule.createDocument(app, config, {
    include: [],
  });
  app.use(
    [swaggerDocPath, swaggerDocPath + `-json`],
    basicAuth({
      challenge: true,
      users: { [SWAGGER_USERNAME]: SWAGGER_PASSWORD },
    })
  );
  SwaggerModule.setup(swaggerDocPath, app, document, option);

  // Swagger Setup End
}

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  app.enableCors();
  // app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      
    })
  );
  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalInterceptors(new HTTPLoggingInterceptor());
  let { PORT, NODE_ENV } = process.env;
  setupSwagger(app);
  await app.listen(PORT || 3000);
  Logger.log(`App Url ${await app.getUrl()}`);
  Logger.log(`App Running in ${NODE_ENV} mode`);
}
bootstrap();

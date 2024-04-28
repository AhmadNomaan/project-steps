import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from './common/constants';

async function bootstrap() {
  const adapter = new FastifyAdapter({
    logger: {
      level: 'error',
    },
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
    { rawBody: true }
  );
  
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalFilters(new MethodNotAllowedExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Project Steps')
    .setDescription('Documentation for Project Steps, a project management tool for startups.')
    .addBearerAuth()
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });

  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha'
    },
    customfavIcon: 'https://nomaan-dev.vercel.app/instagram_avatar_formal_head.png',
  });

  const PORT = AppConfig.PORT ?? 5000;

  await app.listen(PORT, ()=>{
    console.log(`\n ****** server running on http://localhost:${PORT} ****** \n`)
    console.log(`\n ****** swagger running on http://localhost:${PORT}/swagger ****** \n`)
  });
}
bootstrap();

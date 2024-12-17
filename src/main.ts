import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { ConflictInterceptor } from './commom/errors/interceptors/conflict.interceptors'
import { NotFoundInterceptor } from './commom/errors/interceptors/notfound.interceptors'
import { UnauthorizedInterceptor } from './commom/errors/interceptors/unauthorized.interceptors'

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

const port = normalizePort(process.env.SERVER_PORT || '3001')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  )

  app.useGlobalInterceptors(new ConflictInterceptor())
  app.useGlobalInterceptors(new UnauthorizedInterceptor())
  app.useGlobalInterceptors(new NotFoundInterceptor())

  const config = new DocumentBuilder()
    .setTitle('Documentação das rotas')
    .setDescription('Nesta página fica documentado toda rota do sistema...')
    .setVersion('1.0.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Insira o token diretamente sem BEARER',
      },
      'KEY_AUTH',
    )
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  await app.listen(+port)
  console.log(`🚀 Server is running at port: http://localhost:${port} 🚀`)
}

function normalizePort(val: string) {
  const port = parseInt(val, 10)

  if (isNaN(port)) return val

  if (port >= 0) return port

  return false
}

bootstrap()

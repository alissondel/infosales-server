import { NestFactory } from '@nestjs/core'
// import { useContainer } from 'class-validator'

import { AppModule } from './app.module'
import { ConflictInterceptor } from './commom/errors/interceptors/conflict.interceptors'
import { UnauthorizedInterceptor } from './commom/errors/interceptors/unauthorized.interceptors'
import { NotFoundInterceptor } from './commom/errors/interceptors/notfound.interceptors'
import { ValidationPipe } from '@nestjs/common'

const port = normalizePort(process.env.SERVER_PORT || '3001')

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  })

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

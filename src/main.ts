import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  CORS_WHITELIST,
  MAX_AGE,
  PORT,
  REDIS_URL,
  SESSION_SECRET,
} from './app.environments'
import { Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as helmet from 'helmet'
import * as session from 'express-session'
import * as IoRedis from 'ioredis'
import * as connectRedis from 'connect-redis'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const loggerService = app.get(Logger)
  app.enable('trust proxy')
  app.use(helmet())
  app.use((req, res, next) => {
    res.set('Access-Control-Allow-Credentials', 'true')
    next()
  })

  // SESSION
  const RedisStore = connectRedis(session)
  app.set('trust proxy', 1)
  app.use(
    session({
      store: new RedisStore({ client: new IoRedis(REDIS_URL) }),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: MAX_AGE, secure: true, sameSite: 'none' },
    }),
  )

  // CORS
  const corsOptions = {
    origin: function (origin, callback) {
      if (CORS_WHITELIST.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Request not allowed by CORS'))
      }
    },
  }
  app.enableCors(corsOptions)

  // SWAGGER
  const optionsSwagger = new DocumentBuilder()
    .setTitle('NestJS Typescript Boilerplate')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, optionsSwagger)
  SwaggerModule.setup('docs', app, document)

  // RUN
  await app.listen(PORT)
  loggerService.log(`😻 App running on port ${PORT}`)
}
bootstrap()

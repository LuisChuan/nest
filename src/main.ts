import { NestFactory } from '@nestjs/core'
// import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { Response } from './common/response'
import { HttpFilter } from './common/filter'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('接口文档')
    .setDescription('')
    .setVersion('1')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/api-docs', app, document)
  // app.enableVersioning({
  //   type:VersioningType.URI
  // })
  //状态响应拦截器
  app.useGlobalInterceptors(new Response())
  //状态异常拦截器
  app.useGlobalFilters(new HttpFilter())
  //管道验证
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000)
  console.log('启动成功！')
}
bootstrap()

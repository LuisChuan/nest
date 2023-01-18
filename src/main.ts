import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { Response } from './common/response'
import { HttpFilter } from './common/filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type:VersioningType.URI
  })
  //状态响应拦截器
  app.useGlobalInterceptors(new Response())
  //状态异常拦截器
  app.useGlobalFilters(new HttpFilter())
  await app.listen(3000);
  console.log('启动成功！')
}
bootstrap();

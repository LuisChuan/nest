import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserController } from './user/user.controller'
import { UserModule } from './user/user.module'
import { UserService } from './user/user.service'
import { LoginModule } from './login/login.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    UserModule,
    LoginModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '123456',
      host: 'localhost',
      port: 3306,
      database: 'demo',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10, //重试连接数据库的次数
      autoLoadEntities: true //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    })
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService]
})
export class AppModule {}

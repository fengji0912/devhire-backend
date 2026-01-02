import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { JobsModule } from './jobs/jobs.module';
import { Job } from './jobs/job.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',       // MySQL 主机
      port: 3306,              // MySQL 端口
      username: 'root',        // MySQL 用户
      password: '123456',      // MySQL 密码
      database: 'devhire',     // 数据库名
      entities: [User, Job],
      synchronize: true,       // 开发阶段自动建表，生产不要用
    }),
    UsersModule,
    AuthModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

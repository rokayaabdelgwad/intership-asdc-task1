import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma/prisma.service';
@Module({ 
  imports: [ConfigModule.forRoot({ isGlobal: true })], 
  controllers: [UserController],
  providers: [UserService ,PrismaService] 
})
export class AppModule {}

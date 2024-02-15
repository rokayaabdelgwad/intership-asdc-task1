
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDto } from './dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaService } from 'src/prisma/prisma.service';
import { forwardRef } from '@nestjs/common';
@Module({
  // imports:[TypeOrmModule.forFeature([UserDto]),forwardRef(() => PrismaService)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

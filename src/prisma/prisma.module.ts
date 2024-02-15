import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { forwardRef } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
@Global()
@Module({
    imports:[forwardRef(() =>UserService )],
    providers: [PrismaService],
    exports: [PrismaService]
})
export class PrismaModule {}

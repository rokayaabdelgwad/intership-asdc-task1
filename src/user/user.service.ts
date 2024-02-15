// user/user.service.ts
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2'
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(@Inject(forwardRef(() => PrismaService)) private readonly prisma: PrismaService) {}
  
    async createUser(dto: UserDto) {
        const email = dto.email.toString();
        const hash = await argon.hash(dto.password.toString())
        const user = await this.prisma.user.create({
            data: {
                email: email,
                hash
            }
        });
        delete user.hash;
        return user;
    }

    async findAllUsers() {
        return this.prisma.user.findMany();
    }

    async findOne(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    async update(id: number, userData: UserDto) {
        return this.prisma.user.update({
            where: { id },
            data: userData,
        });
    }

    async deleteUser(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        await this.prisma.user.delete({
            where: { id },
        });
        return user;
    }
}

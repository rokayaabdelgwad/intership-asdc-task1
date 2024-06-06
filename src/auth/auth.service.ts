import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signup(dto: AuthDto) {
    const email = dto.email.toString();
    const hash = await argon.hash(dto.password.toString());
    try {
      const user = await this.prisma.user.create({
        data: {
          email: email,
          hash,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('Credentials taken ');
      }
    }
    console.log(error);
  }

  async signin(dto: AuthDto) {
    const email = dto.email.toString();
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new ForbiddenException('the user does not exist');
    }

    const pwMatches = await argon.verify(
      user.hash.toString(),
      dto.password.toString(),
    );
    if (!pwMatches) throw new ForbiddenException(' incorrect password');

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }

  async googleLogin(dto: AuthDto) {
    if (!req.user) throw new ForbiddenException('No user from Google');

    const { email, firstName, lastName, picture } = req.user;
    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await this.prisma.user.create({
        data: { email, firstName, lastName, picture },
      });
    }

    return this.signToken(user.id, user.email);
  }
}

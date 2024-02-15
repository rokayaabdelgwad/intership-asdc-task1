// prisma/prisma.service.ts

import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
@Injectable()
export class PrismaService extends PrismaClient {
    constructor(@Inject(forwardRef(() => UserService)) private  UserService: UserService,config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
                }
            }
        });
    }
}

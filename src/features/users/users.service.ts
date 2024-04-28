import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import PrismaService from 'src/common/database/prisma/prisma.service';
import { PageOptionsDto } from 'src/common/query-params';

@Injectable()
export class UsersService {
    constructor(private dbService: PrismaService) {}

    async validateUser(userId: string) {
        return await this.dbService.users.findUniqueOrThrow({
            where: {
                id: userId
            }
        })
    }


    async getUsers(query: PageOptionsDto) {
        return  await this.dbService.users.findMany()
    }

}

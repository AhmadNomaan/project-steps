import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User_Context } from 'src/common/context.service';
import PrismaService from 'src/common/database/prisma/prisma.service';
import { PageOptionsDto } from 'src/common/query-params';
import { UserReturnEntity } from './users.entity';
import { Utilities } from 'src/common/utils';

@Injectable()
export class UsersService {
    constructor(private dbService: PrismaService) { }

    async validateUser(userId: string) {
        return await this.dbService.users.findUniqueOrThrow({
            where: {
                id: userId
            }
        })
    }

    async getCurrentUser(user: User_Context): Promise<UserReturnEntity> {
        return await this.dbService.users.findUnique({
            where: {
                id: user.id
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                created_at: true,
                updated_at: true,
                companies: true, 
                owned_company_id: true
            }
        })
    }


    async getUsers(company_id: string, query: PageOptionsDto) {
        return await this.dbService.users.findMany({
            where: {
                OR: [
                    {
                        companies: {
                            has: company_id
                        }
                    }, 
                    {
                        owned_company_id: company_id
                    }
                ]
            }
        })
    }


}

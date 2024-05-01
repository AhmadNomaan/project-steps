import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User_Context } from 'src/common/context.service';
import PrismaService from 'src/common/database/prisma/prisma.service';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/query-params';
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


    async getUsers(user: User_Context, pageOptionsDto: PageOptionsDto) {
        const users = await this.dbService.users.findMany({
            where: {
                id:{
                    not: user.id
                },
                OR: [
                    {
                        companies: {
                            has: user.company_id
                        }
                    }, 
                    {
                        owned_company_id: user.company_id
                    }
                ]
            },
            select: {
                id: true, 
                name: true, 
                email: true,
                created_at: true, 
                updated_at: true
            }, 
            skip: pageOptionsDto.skip, 
            take: pageOptionsDto.take
        })

        const total = await this.dbService.users.count({
            where: {
                OR: [
                    {
                        companies: {
                            has: user.company_id
                        }
                    }, 
                    {
                        owned_company_id: user.company_id
                    }
                ]
            },
        })

        const pageMetaDto = new PageMetaDto({ total, pageOptionsDto });

        return new PageDto(users, pageMetaDto);
        
    }


}

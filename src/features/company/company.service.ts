import { ForbiddenException, Injectable } from '@nestjs/common';
import PrismaService from 'src/common/database/prisma/prisma.service';
import { CreateCompanyDto } from './company.dto';
import { User_Context } from 'src/common/context.service';
import { Utilities } from 'src/common/utils';
import { CompanyEntity } from './company.entity';

@Injectable()
export class CompanyService {
    constructor(private readonly dbService: PrismaService) { }

    async createCompany(dto: CreateCompanyDto, user: User_Context) {
        let company: CompanyEntity = await this.dbService.company.findFirst({
            where: {
                email: dto.email,
                name: dto.name
            }
        })

        if (company) throw new ForbiddenException('Company name/email already exists.')

        company = await this.dbService.company.create({
            data: {
                name: dto.name, 
                email: dto.email, 
                country: dto.country,
                created_at: Utilities.currentUTC(), 
                updated_at: Utilities.currentUTC(),
                created_by_id: user.id,
                admin_id: user.id,
            }
        })

        await this.dbService.users.update({
            where: {
                id: user.id,
            }, 
            data: {
                owned_company_id: company.id, 
            }
        })

        return company

    }
}

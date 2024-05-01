import { Body, Controller, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { BaseAuthController } from 'src/common/base-auth.controller';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserContextService } from 'src/common/context.service';
import { CreateCompanyDto } from './company.dto';
import { CompanyEntity } from './company.entity';

@Controller('company')
@ApiTags('Company')
export class CompanyController extends BaseAuthController {
  constructor(private readonly companyService: CompanyService, private readonly contextService: UserContextService) {
    super()
  }

  @Post()
  @ApiCreatedResponse({type: CompanyEntity})
  async createCompany(@Body() dto: CreateCompanyDto){
    const user = this.contextService.userContext
    return await this.companyService.createCompany(dto, user)
  }
}

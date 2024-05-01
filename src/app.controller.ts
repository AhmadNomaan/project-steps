import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { FeatureRequestStatusEnum } from './features/feature-requests/feature-requests.dto';

@Controller()
@ApiTags('Common')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return `Head on over to http://localhost:5000/swagger for API documentation`;
  }

  @Get('feature-request-status-enum')
  async featureRequestStatusEnum() {
    return Object.values(FeatureRequestStatusEnum)
  }
}

import { Controller } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { ApiTags } from '@nestjs/swagger';
import { BaseAuthController } from 'src/common/base-auth.controller';

@Controller('feature')
@ApiTags('Features')
export class FeatureController extends BaseAuthController {
  constructor(private readonly featureService: FeatureService) {
    super()
  }
}

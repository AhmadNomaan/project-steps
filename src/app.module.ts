import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig } from './common/constants';
import { UserContextService } from './common/context.service';
import { AuthModule } from './features/auth/auth.module';
import { CompanyModule } from './features/company/company.module';
import { FeatureRequestsModule } from './features/feature-requests/feature-requests.module';
import { FeatureModule } from './features/feature/feature.module';
import { UsersModule } from './features/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: AppConfig.JWT_SECRET_KEY,
      signOptions: { expiresIn: AppConfig.JWT_TOKEN_EXPIRY },
    }),
    UsersModule,
    FeatureRequestsModule,
    FeatureModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserContextService],
})
export class AppModule { }

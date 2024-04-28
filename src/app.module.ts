import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import { FeatureRequestsModule } from './features/feature-requests/feature-requests.module';
import { FeatureModule } from './features/feature/feature.module';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from './common/constants';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      global: true,
      secret: AppConfig.JWT_SECRET_KEY,
      signOptions: { expiresIn: AppConfig.JWT_TOKEN_EXPIRY },
    }),
    UsersModule, 
    FeatureRequestsModule, 
    FeatureModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

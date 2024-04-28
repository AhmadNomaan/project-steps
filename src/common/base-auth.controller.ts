import { Controller, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/features/auth/jwt-auth.guard";

@Controller()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class BaseAuthController {}
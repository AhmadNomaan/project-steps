import {
    Inject,
    Injectable,
    Scope,
    UnauthorizedException,
  } from '@nestjs/common';
  import { REQUEST } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { FastifyRequest } from 'fastify';
import { UserEntity } from 'src/features/users/users.entity';
  
  export type Token = {
    user_id: Number;
    user: UserEntity;
    iat: Number;
    exp: Number;
  };
  
  export type User_Context = {
    id: string;
    email: string;
    company_id: string | null;
    is_admin: Boolean
  };
  
  @Injectable({ scope: Scope.REQUEST })
  export class UserContextService {
    public token: string;
    public userContext: User_Context;
    public company_id;
  
    constructor(
      @Inject(REQUEST) private readonly request: FastifyRequest,
      private readonly jwt: JwtService,
    ) {
      this.token =
        request.raw.headers.authorization?.replace('Bearer ', '') ?? null;
      if (this.token !== null) {
        const decoded = JSON.parse(JSON.stringify(jwt.decode(this.token)));
        if(!decoded) throw new UnauthorizedException('Invalid Access Token');
        this.userContext = {
          id: decoded.id,
          email: decoded.email,
          company_id: decoded.owned_company_id,
          is_admin: decoded.is_admin
        };
      } else {
        throw new UnauthorizedException('Invalid Access Token');
      }
    }
  }
  
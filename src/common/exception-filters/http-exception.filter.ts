import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { FastifyReply } from "fastify";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response: FastifyReply<any> = context.getResponse<FastifyReply>();
    const status = exception.getStatus();
    response.status(status).send(exception.getResponse());
  }
}

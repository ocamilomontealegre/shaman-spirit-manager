import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { TypeORMError } from "typeorm";
import type { Request, Response } from "express";

@Catch()
export class TypeOrmExceptionFilter implements ExceptionFilter {
  public catch(exception: TypeORMError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const message = (exception as TypeORMError).message;
    const status = 500;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}

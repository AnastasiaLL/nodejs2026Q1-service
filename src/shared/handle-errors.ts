import { NotFoundException, ForbiddenException, UnprocessableEntityException, UnauthorizedException } from "@nestjs/common";

export const httpErrors = {
  notFound: (message: string) => {
    return new NotFoundException(message);
  },

  forbidden: (message: string) => {
    return new ForbiddenException(message);
  },

  unprocessable: (message: string) => {
    return new UnprocessableEntityException(message);
  },

  unauthorized: (message: string) => {
    return new UnauthorizedException(message);
  },
};
import { HttpException } from '@nestjs/common';

export function ApplicationException404(message: string) {
  throw new HttpException(message, 404);
}

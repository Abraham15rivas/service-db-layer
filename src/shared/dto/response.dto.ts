export class ResponseDto<T = any> {
  statusCode: number;
  message: string;
  data?: T;
}
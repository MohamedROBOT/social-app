export class NotFoundException extends Error {
  constructor(message: string) {
    super(message, { cause: 404 });
  }
}

export class UnAuthorizedException extends Error {
  constructor(message: string) {
    super(message, { cause: 401 });
  }
}
export class ConflictException extends Error {
  constructor(message: string) {
    super(message, { cause: 409 });
  }
}
interface IErrorDetails {
  [key: string]: string | PropertyKey | undefined;
}
//Record<string, string>[] represent an array of objects
export class BadRequestException extends Error {
  constructor(
    message: string,
    public details?:IErrorDetails[] ,
  ) {
    super(message, { cause: 400 });
  }
}

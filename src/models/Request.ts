import z from 'zod';

type CustomRequestInit = Omit<RequestInit, 'method' | 'body'>;

type ResponseData = z.ZodTypeAny;

export type RequestInput = RequestInfo | URL;

export interface RequestArgs extends CustomRequestInit {
  url: RequestInput;
}

export interface RequestArgsWithDTO<P = unknown> extends CustomRequestInit {
  url: RequestInput;
  dto?: P;
}

export interface Request {
  Delete<R extends ResponseData = ResponseData>(
    args: RequestArgs,
    schema: R
  ): Promise<z.infer<R>>;
  Delete(args: RequestArgs, schema?: undefined): Promise<void>;

  Get<R extends ResponseData = ResponseData>(
    args: RequestArgs,
    schema: R
  ): Promise<z.infer<R>>;

  Post<P = unknown, R extends ResponseData = ResponseData>(
    args: RequestArgsWithDTO<P>,
    schema: R
  ): Promise<z.infer<R>>;
  Post<P = unknown>(
    args: RequestArgsWithDTO<P>,
    schema?: undefined
  ): Promise<void>;

  Put<P = unknown, R extends ResponseData = ResponseData>(
    args: RequestArgsWithDTO<P>,
    schema: R
  ): Promise<z.infer<R>>;
  Put<P = unknown>(
    args: RequestArgsWithDTO<P>,
    schema?: undefined
  ): Promise<void>;
}

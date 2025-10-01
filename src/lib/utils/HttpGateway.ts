import {
  HttpGatewayBase,
  RequestArgs,
  RequestArgsWithDTO,
} from '@/models/HttpGatewayBase';
import z from 'zod';

class HttpGateway implements HttpGatewayBase {
  private async handleResponse<R extends z.ZodTypeAny = z.ZodTypeAny>(
    schema: R,
    response: Response
  ): Promise<z.infer<R>> {
    const text = await response.text();

    if (!response.ok) {
      if (response.status === 403 && text.includes('API rate limit exceeded')) {
        const resetTime = response.headers.get('x-ratelimit-reset');
        const remaining = resetTime
          ? Math.ceil((parseInt(resetTime, 10) * 1000 - Date.now()) / 1000)
          : 60; // default to 1 minute if header is missing
        return Promise.reject<never>(
          new Error(
            `API rate limit exceeded. Please wait for ${remaining} seconds before trying again.`,
            { cause: 'rate-limit-exceeded' }
          )
        );
      }
      return Promise.reject<never>(new Error('Something went wrong: ' + text));
    }

    if (text.length === 0) {
      return Promise.reject<never>(
        new Error('We expected a response, but got nothing')
      );
    }

    const parsedResponse = JSON.parse(text);

    const validatedResponse = schema.safeParse(parsedResponse);

    if (!validatedResponse.success) {
      return Promise.reject<never>(new Error(validatedResponse.error.message));
    }

    return validatedResponse.data;
  }

  private async handleNoResponse(response: Response): Promise<void> {
    if (response.ok) {
      return undefined;
    }

    const text = await response.text();
    return Promise.reject<void>(new Error('Something went wrong: ' + text));
  }

  private getBodyAndContentType = (
    body?: unknown
  ): [body: BodyInit | undefined, contentType: string | undefined] => {
    if (!body) return [undefined, undefined];
    if (
      body instanceof Blob ||
      body instanceof ArrayBuffer ||
      body instanceof FormData ||
      body instanceof URLSearchParams
    )
      return [body, undefined];
    return [JSON.stringify(body), 'application/json'];
  };

  private getHeaders = ({
    headers,
    contentType,
  }: {
    headers?: HeadersInit;
    contentType?: string;
  }) => {
    return {
      ...headers,
      ...(contentType ? { 'Content-Type': contentType } : null),
    } satisfies HeadersInit;
  };

  public async Delete<R extends z.ZodTypeAny = z.ZodTypeAny>(
    args: RequestArgs,
    schema: R
  ): Promise<z.infer<R>>;
  public async Delete(args: RequestArgs, schema?: undefined): Promise<void>;
  public async Delete<R extends z.ZodTypeAny = z.ZodTypeAny>(
    { url, ...args }: RequestArgs,
    schema?: R
  ) {
    const response = await fetch(url, { ...args, method: 'DELETE' });

    return schema
      ? this.handleResponse(schema, response)
      : this.handleNoResponse(response);
  }

  public async Get<R extends z.ZodTypeAny = z.ZodTypeAny>(
    { url, ...args }: RequestArgs,
    schema: R
  ) {
    const response = await fetch(url, { ...args, method: 'GET' });

    return this.handleResponse(schema, response);
  }

  public async Post<P = unknown, R extends z.ZodTypeAny = z.ZodTypeAny>(
    args: RequestArgsWithDTO<P>,
    schema: R
  ): Promise<z.infer<R>>;
  public async Post<P = unknown>(
    args: RequestArgsWithDTO<P>,
    schema?: undefined
  ): Promise<void>;
  public async Post<P = unknown, R extends z.ZodTypeAny = z.ZodTypeAny>(
    { dto, headers, url, ...args }: RequestArgsWithDTO<P>,
    schema?: R
  ) {
    const [body, contentType] = this.getBodyAndContentType(dto);
    const customHeaders = this.getHeaders({ headers, contentType });

    const response = await fetch(url, {
      ...args,
      body,
      headers: customHeaders,
      method: 'POST',
    });

    return schema
      ? this.handleResponse(schema, response)
      : this.handleNoResponse(response);
  }

  public async Put<P = unknown, R extends z.ZodTypeAny = z.ZodTypeAny>(
    args: RequestArgsWithDTO<P>,
    schema: R
  ): Promise<z.infer<R>>;
  public async Put<P = unknown>(
    args: RequestArgsWithDTO<P>,
    schema?: undefined
  ): Promise<void>;
  public async Put<P = unknown, R extends z.ZodTypeAny = z.ZodTypeAny>(
    { dto, headers, url, ...args }: RequestArgsWithDTO<P>,
    schema?: R
  ) {
    const [body, contentType] = this.getBodyAndContentType(dto);
    const customHeaders = this.getHeaders({ headers, contentType });

    const response = await fetch(url, {
      ...args,
      body,
      headers: customHeaders,
      method: 'PUT',
    });

    return schema
      ? this.handleResponse(schema, response)
      : this.handleNoResponse(response);
  }
}

const httpGateway = new HttpGateway();

export default httpGateway;

type RequestType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

export const makeRequest = async (
  method: RequestType,
  url: string,
  bearerToken?: string
): Promise<[any, Error | null]> => {
  try {
    let headers = {};

    // set Authorization header if we have a token
    if (bearerToken) {
      headers = { ...headers, Authorization: bearerToken };
    }

    const result = await fetch(url, {
      method,
      headers,
    });
    const data = await result.json();
    return [data, null];
  } catch (e) {
    if (e instanceof Error) {
      return [null, e];
    } else {
      return [null, null];
    }
  }
};

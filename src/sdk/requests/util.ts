import logger from '../../logging';

const NAMESPACE: string = 'sdk/requests/util.ts';

type RequestType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

export const makeRequest = async (
  method: RequestType,
  url: string,
  bearerToken?: string,
  bodyObj?: object
): Promise<[any, Error | null]> => {
  let result: Response = null!;

  try {
    let headers = {};

    // set Authorization header if we have a token
    if (bearerToken) {
      headers = { ...headers, Authorization: `Bearer ${bearerToken}` };
    }

    result = await fetch(url, {
      mode: 'cors',
      method,
      headers,
      body: JSON.stringify(bodyObj),
    });

    logger.debug(NAMESPACE, 'Request Result:', { result });

    // error results should also get treated as errors
    if (!result.ok) {
      // objects that are children of Error class
      throw new Error(await result.text());
    }

    const data = await result.json();

    logger.debug(NAMESPACE, 'Request JSON:', { data });

    return [data, null];
  } catch (e) {
    if (e instanceof Error) {
      return [null, e];
    } else {
      return [null, null];
    }
  }
};

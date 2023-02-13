// http://www.restapitutorial.com/httpstatuscodes.html
// https://gist.github.com/subfuzion/669dfae1d1a27de83e69

export const CODES = {
    OK: 200,
    CREATED: 201, // post or put
    ACCEPTED: 202,
    NO_CONTENT: 204,
    FOUND: 302,
    NOT_MODIFIFED: 304,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ACCEPTABLE: 406,
    CONFLICT: 409,
    GONE: 410,
    UNSUPPORTED_MEDIA_TYPE: 415,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
};

/**
 * The endpoint for open api ui
 * @type {string}
 */
export const SWAGGER_API_ROOT = "api/docs";
/**
 * The name given to the api
 * @type {string}
 */
export const SWAGGER_API_NAME = "API";
/**
 * A short description for api
 * @type {string}
 */
export const SWAGGER_API_DESCRIPTION = "API Description";
/**
 * Current version of the api
 * @type {string}
 */
export const SWAGGER_API_CURRENT_VERSION = "1.0";
/**
 * The default authentication method
 * @type {string}
 */
export const SWAGGER_API_AUTH_NAME = "Authorization";
/**
 * Where the SWAGGER_API_AUTH_NAME will be used in the request
 * @type {string}
 */
export const SWAGGER_API_AUTH_LOCATION = "header";
/**
 * Types of api schemes
 * @type {string[]}
 */
export const SWAGGER_API_SCHEMES: Array<"http" | "https"> = ["http", "https"];

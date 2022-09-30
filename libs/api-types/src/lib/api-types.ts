/**
 * Default message response
 */
export interface IMessage {
  message: string;
}

/**
 * Models a typical Login/Register route return body
 */
export interface IJWTResponseBody {
  /**
   * When the token is to expire in seconds
   */
  expiration: number;
  /**
   * A human-readable format of expires
   */
  expirationFormatted: string;
  /**
   * The Bearer token
   */
  token: string;
}

/**
 * Models a typical response for a crud operation
 */
export interface IGenericMessageBody {
  /**
   * Status message to return
   */
  message: string;
}

export enum UserRolesEnum {
  DEFAULT = 'DEFAULT',
  SUDO = 'SUDO',
}

export enum UserActionsEnum {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export interface IUser {
  username: string;
  gravatar?: string;
  roles?: {
    role: UserRolesEnum;
  }[];
  name?: string;
  authenticated: boolean;
  token: string;
}

export enum ApiAuthRoutesEnum {
  LOGIN = '/api/v1/auth/login',
  REGISTER = '/api/v1/auth/register',
}

export enum ApiUsersRoutesEnum {
  GET_USER = '/api/v1/users/user',
  // username is the token to be replaced with a username
  GET_USER_BY_USERNAME = '/api/v1/users/{{username}}',
}

export interface IAuthRegisterPayload {
  email: string;
  username: string;
  name: string;
  password: string;
}

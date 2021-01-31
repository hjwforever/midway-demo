/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  id: number;
}

export interface User {
  id: number;
  name: string;
  email?: string;
  password: string;
  address?: string;
}

export interface Flag {
  flag: number;
}

export interface Result {
  success: boolean;
  msg: string;
  data: number | string;
}

export interface FileResult {
  success: boolean;
  msg: string;
  file: string;
}

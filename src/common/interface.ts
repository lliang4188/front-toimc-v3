export interface UserInfo {
  _id: string;
  username?: string;
  name?: string;
  gender?: string;
  regmark?: string;
  pic?: string;
  isVip: string;
}

export interface LoginInfo {
  username: string;
  password: string;
  code: string;
  sid?: string;
}

export interface RegInfo extends LoginInfo {
  name: string;
  repassword?: string
}

export interface ResetInfo {
  key: string;
  password: string;
  code: string;
  sid: string
}

export interface ForgetInfo {
  username: string;
  code: string;
}

export interface HttpResponse {
  code: number;
  data?: any;
  msg?: string;
  total?: number;
  count?: number;
  favs?: number;
  lastSign?: string;
  isCollect?: boolean;
  token?: string;
  notify?: any;
  userInfo?: any;
}

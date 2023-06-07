// 登录
export interface LoginReq {
  mobile: string; // 登录手机号
  code: string; // 密码(固定246810)
}

export interface LoginRes {
  data: {
    token: string;
  };
  message: string;
}
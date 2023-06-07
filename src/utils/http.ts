import axios, { AxiosResponse } from "axios";
import { getToken, removeToken } from "./token";

interface GlobalResponseBodyStruct<T> {
  st: number;
  data: T;
}

const http = axios.create({
  // baseURL: 'https://some-domain.com/api/',
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000,
  // headers: {'X-Custom-Header': 'foobar'}
});

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response:AxiosResponse<GlobalResponseBodyStruct<any>|any>) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const { data, message} = response.data || {};
  // console.log(message, data);
  return data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  if(error.response.status === 401){
    removeToken()  //删除ls存储的失效token
    setTimeout(() => {
      window.location.href = "http://127.0.0.1:5173/login"; //跳回登录
    }, 1000);
  }
  return Promise.reject(error);
});

export { http }
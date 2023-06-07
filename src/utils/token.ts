//工具模块——封装ls存取token
//3个方法：存，取，删

const key = 'pc-key-token'

const setToken = (token: string) =>{
  return window.localStorage.setItem(key,token)
}

const getToken =()=>{
  return window.localStorage.getItem(key)
}

const removeToken =()=>{
  return window.localStorage.removeItem(key)
}

export{
  setToken,
  getToken,
  removeToken
}
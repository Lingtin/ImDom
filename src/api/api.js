import axios from 'axios';

export const apiUrl = "https://chat.ximiyun.cn";


axios.defaults.withCredentials=true // 默认的
// const apiUrl = "/api";
/**
 * @name login 登陆 
 */
export const Login = (parmes) =>{return axios.get(`${apiUrl}/chat/user/login`,{params: parmes}).then((res) => res.data).catch(error=>error)};

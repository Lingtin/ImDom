import axios from 'axios';

/**
 * @name login 登陆 
 */
export const Login = (parmes) =>{return axios.post('',parmes).then((res) => res.data).catch(error=>error)};

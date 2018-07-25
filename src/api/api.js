import axios from 'axios';

export const apiUrl = "https://chat.ximiyun.cn";


axios.defaults.withCredentials=true // 默认的
// const apiUrl = "/api";
/**
 * @name login 登陆 /chat/user/login
 */
export const Login = (parmes) =>{return axios.get(`${apiUrl}/chat/user/login`,{params: parmes}).then((res) => res.data).catch(error=>error)};

/**
 * @name 查询联系人列表  /chat/user/selectChatRelationList
 */
export const selectChatRelationList = (parmes) =>{return axios.post(`${apiUrl}/chat/user/selectChatRelationList`,parmes).then((res) => res.data).catch(error=>error)};

/**
 * @name 查询账号信息 /chat/user/selectUserInfo
 */
export const selectUserInfo = (parmes) =>{return axios.post(`${apiUrl}/chat/user/selectUserInfo`,parmes).then((res) => res.data).catch(error=>error)};

/**
 * @name 删除联系人 /chat/user/delectChatRelation
 */
export const delectChatRelation = (parmes) =>{return axios.post(`${apiUrl}/chat/user/selectUserInfo`,parmes).then((res) => res.data).catch(error=>error)};

/**
 * @name 查询聊天记录 /chat/user/selectChatLogsList
 */
export const selectChatLogsList = (parmes) =>{return axios.post(`${apiUrl}/chat/user/selectUserInfo`,parmes).then((res) => res.data).catch(error=>error)};

/**
 * @name 连接socket /chat/init
 */
// export const init = (parmes) =>{return axios.post(`${apiUrl}/chat/user/selectUserInfo`,parmes).then((res) => res.data).catch(error=>error)};
/**
 * @name 订阅接收消息 /user/chat/tomessage
 */
// export const delectChatRelation = (parmes) =>{return axios.post(`${apiUrl}/chat/user/selectUserInfo`,parmes).then((res) => res.data).catch(error=>error)};
/**
 * @name 订阅通知消息 /user/chat/toinfo
 */
// export const delectChatRelation = (parmes) =>{return axios.post(`${apiUrl}/chat/user/selectUserInfo`,parmes).then((res) => res.data).catch(error=>error)};
/**
* @name 推送聊天消息 /chat/inmessage
*/
// export const delectChatRelation = (parmes) =>{return axios.post(`${apiUrl}/chat/user/selectUserInfo`,parmes).then((res) => res.data).catch(error=>error)};
/**
* @name 推送消息已读 /chat/messageRead
*/
// export const delectChatRelation = (parmes) =>{return axios.post(`${apiUrl}/chat/user/selectUserInfo`,parmes).then((res) => res.data).catch(error=>error)};
/**
* @name 查询和对方的未读消息总数 /chat/user/selectNotReadCountNumber
*/
// export const delectChatRelation = (parmes) =>{return axios.post(`${apiUrl}/chat/user/selectUserInfo`,parmes).then((res) => res.data).catch(error=>error)};

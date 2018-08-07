import axios from 'axios';
import qs from 'qs';

export const apiUrl = "";
// https://chat.ximiyun.cn
// axios.create({
//     baseURL: '',
//     timeout: 1000,
// });

axios.defaults.headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8 "
};
axios.defaults.withCredentials=true;
/**
 * @name login 登陆 ${apiUrl}/chat/user/login {params: parmes}
 */
export const Login = (parmes) =>{return axios.get(`${apiUrl}/chat/user/login`,{params: parmes}).then((res) => res.data).catch(error=>error)};

/**
 * @name 查询联系人列表  ${apiUrl}/chat/user/selectChatRelationList
 */
export const selectChatRelationList = (parmes) =>{
    return axios.post(`${apiUrl}/chat/user/selectChatRelationList`,qs.stringify(parmes)).then((res) => res.data).catch(error=>error)
};

/**
 * @name 查询账号信息 ${apiUrl}/chat/user/selectUserInfo
 */
export const selectUserInfo = (parmes) =>{return axios.post(`${apiUrl}/chat/user/selectUserInfo`,qs.stringify(parmes)).then((res) => res.data).catch(error=>error)};

/**
 * @name 删除联系人 ${apiUrl}/chat/user/delectChatRelation
 */
export const delectChatRelation = (parmes) =>{return axios.post(`${apiUrl}/chat/user/selectUserInfo`,parmes).then((res) => res.data).catch(error=>error)};

/**
 * @name 查询聊天记录 ${apiUrl}/chat/user/selectChatLogsList
 */
export const selectChatLogsList = (parmes) =>{return axios.post(`${apiUrl}/chat/user/selectChatLogsList`,qs.stringify(parmes)).then((res) => res.data).catch(error=>error)};
/**
 * @name 修改联系人备注 ${apiUrl}/chat/user/updateChatRelationToUserRemark
 */
export const updateChatRelationToUserRemark = (parmes) =>{return axios.post(`${apiUrl}/chat/user/updateChatRelationToUserRemark`,qs.stringify(parmes)).then((res) => res.data).catch(error=>error)};

/**
* @name 推送消息已读 ${apiUrl}/chat/messageRead
*/
export const messageRead = (parmes) =>{return axios.post(`${apiUrl}/chat/messageRead`,qs.stringify(parmes)).then((res) => res.data).catch(error=>error)};

/**
* @name 修改用户信息 ${apiUrl}/chat/user/updateUserInfo
*/
export const updateUserInfo = (parmes) =>{return axios.post(`${apiUrl}/chat/user/updateUserInfo`,qs.stringify(parmes)).then((res) => res.data).catch(error=>error)};

/**
* @name 获取上传签名 ${apiUrl}/chat/user/getUploadSign
*/
export const getUploadSign = (parmes) =>{return axios.post(`${apiUrl}/chat/user/getUploadSign`,qs.stringify(parmes)).then((res) => res.data).catch(error=>error)};

/**
 * @name 连接socket ${apiUrl}/chat/init
 */
// export const init = (parmes) =>{return axios.post(`${apiUrl}/chat/user/selectUserInfo`,parmes).then((res) => res.data).catch(error=>error)};
/**
 * @name 订阅接收消息 /user${apiUrl}/chat/tomessage
 */
// export const delectChatRelation = (parmes) =>{return axios.post(`${apiUrl}/chat/user/selectUserInfo`,parmes).then((res) => res.data).catch(error=>error)};
/**
 * @name 订阅通知消息 /user${apiUrl}/chat/toinfo
 */
// export const delectChatRelation = (parmes) =>{return axios.post(`${apiUrl}/chat/user/selectUserInfo`,parmes).then((res) => res.data).catch(error=>error)};
/**
* @name 推送聊天消息 ${apiUrl}/chat/inmessage
*/
// export const delectChatRelation = (parmes) =>{return axios.post(`${apiUrl}/chat/user/selectUserInfo`,parmes).then((res) => res.data).catch(error=>error)};

/**
* @name 查询和对方的未读消息总数 ${apiUrl}/chat/user/selectNotReadCountNumber
*/
// export const delectChatRelation = (parmes) =>{return axios.post(`${apiUrl}/chat/user/selectUserInfo`,parmes).then((res) => res.data).catch(error=>error)};


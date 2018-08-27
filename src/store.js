import {
  Login,
  apiUrl,
  selectChatRelationList,
  selectUserInfo
} from '@/api/api.js';

import SockJS from 'sockjs-client'
import Stomp from '@stomp/stompjs';
import { Toast } from 'vant';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Toast);
Vue.use(Vuex)

export default new Vuex.Store({
  getters:{
    userList:(state)=>state.userList,
    newMsg:(state)=>state.newMsg
  },
  state: {
    userids:{},
    stompClient:{},
    userInfo:{},
    userList:{},
    bodymsg:{},
    newMsg:{},
    imgUrl:'https://image.ximiyun.cn'
  },
  mutations: {
    addUserIds(state,info){
      state.userids = info;
    },
    addstompClient(state,stompClient){
      state.stompClient = stompClient;
    },
    updateRemake(state,info){
      state.userList[info.index].to_user_remark = info.to_user_remark;
    },
    updateUserInfo(state,info){
      state.userids.nick_name = Boolean(info.nick_name)?info.nick_name:state.userids.nick_name;
      state.userids.user_face = Boolean(info.user_face)?info.user_face:state.userids.user_face;
    }
  },
  actions: {
    init({state,commit,dispatch},searchId){
          Toast.loading({
            duration: 0,       // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: 'spinner',
            message: '加载中'
          });
          Login({token:searchId}).then(({data,success}) => {
              if (success) {
                  commit("addUserIds",data)
                  dispatch("selUserInfo");
                  var stompClient=null;
                  var socket = new SockJS(`${apiUrl}/chat/init`);
                  //使用STOMP子协议的WebSocket客户端
                  stompClient = Stomp.over(socket);
                  stompClient.connect({},function (frame) {
                    // console.log("连接成功")
                    stompClient.subscribe(`${apiUrl}/user/chat/tomessage`,function (response) {
                      var Body = JSON.parse(response.body);
                      state.newMsg=Body;
                      state.userList.map((item)=>{
                        if (Body.to_user_id == item.to_user_id) {
                          item.to_user_id = Body.to_user_id;
                          item.add_time = Body.chat_time;
                          item.finally_chat_message = Body.message;
                        };
                      });
                      
                    });
                  });
                  commit("addstompClient",stompClient)
              };
          });
    },
    selUserInfo({state,commit,dispatch}){ // 获取用户信息
      selectUserInfo({user_id:state.userids.user_id}).then((data) => {
        if (data.success) {
          dispatch("selectChatList");
        }
      });
    },
    selectChatList({state,commit,dispatch}){ // 获取联系人列表
      selectChatRelationList({user_id:state.userids.user_id}).then((data) => {
        if (data.success) {
          state.userList = data.data;
          Toast.clear();
          // 获取上传签名
        }
      })
    }
  }
})

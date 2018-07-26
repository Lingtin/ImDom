import { Login, apiUrl, selectChatRelationList, selectUserInfo } from '@/api/api.js';

import SockJS from 'sockjs-client'
import Stomp from '@stomp/stompjs';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userids:{},
    stompClient:{},
    userInfo:{},
    userList:{}
  },
  mutations: {
    addUserIds(state,info){
      state.userids = info;
    }
  },
  actions: {
    init({state,commit,dispatch}){
          Login({token:'u1'}).then(({data,success}) => {
              if (success) {
                // commit("addUserIds",data)
                  var socket = new SockJS(`${apiUrl}/chat/init`);
                  state.userids = data;
                  dispatch("selUserInfo");
                  //使用STOMP子协议的WebSocket客户端
                  state.stompClient = Stomp.over(socket);
                  state.stompClient.reconnect_delay = 5000;
                  state.stompClient.connect({
                      Upgrade:"$http_upgrade",
                      Connection:"upgrade"
                  },function (frame) {
                      // setConnected(true);
                      //通过stompClient.subscribe订阅/topic/getResponse目标发送的消息，即控制器中的@SendTo
                      state.stompClient.subscribe(`${apiUrl}/user/chat/tomessage`,function (response) {
                          showResponse(JSON.parse(response.body));
                      });
                  });
              };
          }).catch((err)=>{
              console.log(err);
          })
    },
    selUserInfo({state,commit,dispatch}){ // 获取用户信息
      selectUserInfo({user_id:state.userids.user_id}).then((data) => {
        if (data.success) {
          dispatch("selectChatList");
        }
      });
    },
    selectChatList({state,commit}){ // 获取联系人列表
      selectChatRelationList({user_id:state.userids.user_id}).then((data) => {
        if (data.success) {
          state.userList = data.data
        }
      })
    }
  }
})

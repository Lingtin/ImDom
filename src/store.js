import { Login, apiUrl, selectChatRelationList, selectUserInfo } from '@/api/api.js';

import SockJS from 'sockjs-client'
import Stomp from '@stomp/stompjs';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  getters:{
    userList:(state)=>state.userList
  },
  state: {
    userids:{},
    stompClient:{},
    userInfo:{},
    userList:{},
    bodymsg:{}
  },
  mutations: {
    addUserIds(state,info){
      state.userids = info;
    },
    addstompClient(state,stompClient){
      state.stompClient = stompClient;
    }
  },
  actions: {
    init({state,commit,dispatch},searchId){
      console.log(searchId)
          Login({token:searchId}).then(({data,success}) => {
            console.log(success)
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
                      
                      state.userList.to_user_id
                      if (Body.to_user_id) {
                        
                      }
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
    selectChatList({state,commit}){ // 获取联系人列表
      
      selectChatRelationList({user_id:state.userids.user_id}).then((data) => {
        if (data.success) {
          state.userList = data.data
        }
      })
    }
  }
})

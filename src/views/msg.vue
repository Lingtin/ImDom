<template>
  <div class="msg">
    <van-nav-bar class='msg-header'
      :title="title" :fixed="true"
      left-text="返回" :z-index="100"
      left-arrow @click-left="back"
    />
      <div class='msg-centent' id="msgcentent">
        <div class='msg-onload' v-if="data.nextPage != 0"><span @click="onRefresh">加载更多</span></div>
        <template v-for='item in data.list'>
          <div class='meg-send' v-if='item.send_or_receive == 1'>
              <div class='msg-imghead'></div>
              <pre class='msg-messagecon'>{{item.message}}</pre>
          </div>
          
          <div class='msg-received' v-else>
              <div class='msg-imghead'></div>
              <pre class='msg-messagecon'>{{item.message}}</pre>
          </div>
        </template>  
                                                                                                                  
        <!-- <emoji emoji="blush" set="emojione" :size="16" />

        <picker title="Pick your emoji…" emoji="people" /> -->
        <!-- <nimble-picker set="messenger" :data="data" /> -->
        <!-- <picker :custom="customEmojis" :showPreview="false" :showSearch="false" :showSkinTones="false"/> -->
      </div>

     <div class='msg-sendarea'>
        <div class='msg-nav'>
          <div class='msg-plugkuai'>快捷短语</div>
        </div>
        <div class='msg-sendmsg'>
          <div class='msg-input'>
            <textarea class='msg-area' :style='{height:textareaH+"px"}' v-model='msg.message' wrap="hard"></textarea>
          </div>
          <div class='msg-sendbtn'>
            <button class='msg-btn' @click="sendMessage">发送</button>
          </div>
        </div>
     </div>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex';
import {apiUrl,selectChatLogsList,messageRead} from '@/api/api.js';
import { Picker,NimblePicker,Emoji  } from 'emoji-mart-vue'

const customEmojis = [
  {
    name: 'Octocat',
    short_names: ['octocat'],
    text: '',
    emoticons: [],
    keywords: ['github'],
    imageUrl: 'https://assets-cdn.github.com/images/icons/emoji/octocat.png?v7'
  }
]
export default {
  name:"msg",
  data(){
    return {
      isLoading:false,
      msg:{
        my_user_id: "",
        to_user_id: "",
        message: ""
      },
      pageNum:1,
      data:{
        list:[],
        lastPage:1
      },
      disableded:true,
      textareaH:24,
      customEmojis:customEmojis
    }
  },
  components:{Picker,NimblePicker,Emoji},
  computed:{
    ...mapState(["userids","stompClient"]),
    ...mapGetters(["newMsg"]),
    title(){
      return this.msg.to_user_id+'-'+(this.msg.to_is_online == 0?'离线':'在线');
    }
  },
  watch:{
    "msg.message"(val){
      this.disableded=Boolean(val)
      if (val) {
        var height = (val.split("\n").length) * 18;
        height = (val.split("\n").length) > 4?4 * 18 : height;
        this.textareaH = height==18?24:height;
      }
    },
    newMsg(Body){
      if (Body.to_user_id == this.msg.to_user_id) {
        var msg = {
          "chat_time":Body.chat_time,
          "is_read":0,
          "logs_id":"b6d046cd27844786b5c5e6fe751e6e55",
          "message":Body.message,
          "my_user_id":Body.to_user_id,
          "to_user_id":Body.my_user_id,
          "send_or_receive":Body.send_or_receive
        };
        this.data.list.push(msg);
      };
    }
  },
  mounted(){
    this.msg = this.$route.query;
    this.msg.my_user_id = this.userids.user_id;
    this.selectChatLogs();
    window.scrollTo(0,document.body.scrollHeight)
    var msgCentent = document.getElementById("msgcentent");
    msgCentent.scrollTop = msgCentent.scrollHeight
    console.log(msgCentent.scrollTop)
     console.log(msgCentent.offsetHeight)
  },
  methods:{
    sendMessage(){
      this.stompClient.send(`${apiUrl}/chat/inmessage`,{},JSON.stringify(this.msg));
      this.data.list.push({
				"chat_time":1532682200000,
				"is_read":0,
				"logs_id":"fc710088f7224edebd70b285ce8faf58",
				"message":this.msg.message,
				"my_user_id":this.msg.my_user_id,
        "to_user_id":this.msg.to_user_id,
        "send_or_receive":1
      })
      this.msg.message="";
      this.textareaH=24;
    },
    selectChatLogs(){
      this.msg.pageNum = 1;
      selectChatLogsList(this.msg).then((data) => {
        if (data.success) {
          data.data.list=JSON.parse(JSON.stringify(data.data.list.reverse()));
          this.data = data.data;
          this.msgRead();
        }
      });
    },
    back(){
      this.$router.back();
    },
    onRefresh(){
      this.pageNum++
      this.msg.pageNum = this.pageNum;
      selectChatLogsList(this.msg).then((data) => {
        if (data.success) {
          // data.data.list=JSON.parse(JSON.stringify(data.data.list.reverse()));
          data.data.list.forEach((item)=>{
            this.data.list.unshift(item)
          });
          this.data.nextPage = data.data.nextPage;
          this.msgRead();
          this.isLoading = false;
        }else{
          this.isLoading = false;
        }
      });
    },
    msgRead(){ // 消息已读
      var msg = [];
      this.data.list.filter(item=>{
        msg.push(item.logs_id)
      });
      // console.log(msg)
      // messageRead(msg);
      this.stompClient.send("/chat/messageRead",{},JSON.stringify(msg))
    }
  }
}
</script>

<style>
  .van-nav-bar__text:active{
    background: #3EA5FF;
  }
  .van-nav-bar .van-icon,.van-nav-bar__text{
    color: #fff;
  }

</style>

<style lang="scss" scoped>
$HEAD_H:56px;

.msg-header{
  width: 100%;
  height: $HEAD_H;
  background: #3EA5FF;
  text-align: center;
  line-height: $HEAD_H;
  color: #fff;
  outline: none;
}

.msg-centent{
  width: 100%;
  height:100%;
  padding:56px 0 120px 0; 
  overflow-y:auto;
  overflow-x: hidden;
  .msg-onload{
    text-align: center;
    font-size: 14px;
    >span{
      cursor: pointer;
      height: 40px;
      line-height: 40px;
      color: #3EA5FF;
      &:hover{
        color: #3EA5FF;
      }
    }
    
  }
  .meg-send{
    width: 100%;
    clear: both;
    overflow: hidden;
    line-height: 56px;
    .msg-imghead{
      width: 30px;
      height: 30px;
      background: #3EA5FF;
      border-radius:50%;
      float: right;
      margin:8px 14px;
    }

    .msg-messagecon{
      border: 1px solid #ddd;
      max-width: 70vw;
      min-width: 4px;
      float: right;
      // height: 24px;
      margin: 8px 0;
      border-radius: 4px;
      font-size: 14px;
      line-height: 18px;
      color: #333;
      word-wrap: break-word;
      white-space: pre-wrap;
      padding: 4px 8px 4px 6px;
      position: relative;
  //     border-top: 90px solid transparent;
  // border-right: 100px solid black;
  // border-bottom: 100px solid transparent;
      &::before{
        content:'';
        display: block;
        position: absolute;
        top: 4px;
        right: -8px;
        border-top: 7px solid transparent;
        border-left: 8px solid #ddd;
        border-bottom: 8px solid transparent;
      }
      &::after{
        content:'';
        display: block;
        position: absolute;
        top: 4px;
        right: -7px;
        border-top: 7px solid transparent;
        border-left: 8px solid #fff;
        border-bottom: 8px solid transparent;
      }
    }
  }

  .msg-received{
    width: 100%;
    overflow: hidden;
    line-height: 56px;
    clear: both;
    .msg-imghead{
      width: 30px;
      height: 30px;
      background: #3EA5FF;
      border-radius:50%;
      float: left;
      margin:8px 14px;
    }
    .msg-messagecon{
      border: 1px solid #ddd;
      max-width: 200px;
      min-width: 56px;
      float: left;
      // height: 24px;
      margin: 8px 0;
      border-radius: 4px;
      font-size: 14px;
      line-height: 18px;
      color: #333;
      word-wrap: break-word;
      padding: 4px 6px;
      position: relative;
  //     border-top: 90px solid transparent;
  // border-right: 100px solid black;
  // border-bottom: 100px solid transparent;
      &::before{
        content:'';
        display: block;
        position: absolute;
        top: 4px;
        left: -8px;
        border-top: 7px solid transparent;
        border-right: 8px solid #ddd;
        border-bottom: 8px solid transparent;
      }
      &::after{
        content:'';
        display: block;
        position: absolute;
        top: 4px;
        left: -7px;
        border-top: 7px solid transparent;
        border-right: 8px solid #fff;
        border-bottom: 8px solid transparent;
      }
    }
  }
}

.msg-sendarea{
  width: 100%;
  border-top: 1px solid #ddd;
  background: rgb(233, 232, 232);
  font-size: 14px;
  padding: 6px;
  position: fixed;
  bottom: 0;
  left: 0;
  .msg-nav{
    width: 100%;
    height: 20px;
    line-height: 20px;
    >div{
      display: inline-block;
      font-size: 14px;
      color: #666;
      cursor: pointer;
    }
    .msg-plugkuai{
      font-size: 14px;
      color: #666;
    }
  }
  .msg-sendmsg{
    width: 100%;
    height: 56px;
    margin-top:4px; 

    $wi:80px;
    .msg-input{
      width: calc(100% - 80px);
      float: left;
      .msg-area{
        font-size: 16px;
        width: 100%;
        border: none;
        padding:4px;
        line-height: 24px;
        height: 24px;
        resize: none;
        border-radius: 4px;
        outline:none;
        &:focus{
          border:1px solid #3EA5FF;
          box-shadow: 0px 0 2px 2px #ddd;
        }
      }
    }
    
    .msg-sendbtn{
      width: $wi;
      height: 100%;
      float: left;
      .msg-btn{
        cursor: pointer;
        margin-left:17px;
        display:inline-block;
        width: 50px;
        height: 32px;
        background: #3EA5FF;
        border: none;
        outline: none;
        color: #fff;
        border-radius: 4px;
        &:active{
          background: rgb(49, 138, 216);
        }
      }
    }
  }
  
}


.msg-input{
  ::-webkit-scrollbar {
      width: 2px;
      height: 2px;
      background-color: #ddd;
      border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb {
      background-color: #777;
      border-radius: 2px;
  }
}
</style>

<template>
  <div class="msg">
    <van-nav-bar class='msg-header' left-text="返回" 
    :z-index="100" left-arrow @click-left="back">
      <div slot='title'>
          {{title}}<div class='msg-unreload' v-if="unread_message_number!==0">{{unread_message_number}}</div>
      </div>
    </van-nav-bar>
      <div class='msg-centent' id="msgcentent">
        <div class='msg-onload' v-if="data.nextPage != 0"><span @click="onRefresh">加载更多</span></div>
        <template v-for='item in data.list'>
          <div class='msg-time'>{{item.chat_time|FileterDateTime}}</div>
          <div class='meg-send' v-if='item.send_or_receive == 1'>
              <div class='msg-imghead'>
                <img :src="imgUrl+userids.user_face" >
              </div>
              <pre v-if="item.message_type == 1 || item.message_type == ''" class='msg-messagecon' v-html="item.message"></pre>
              <img class="msg-messageimgcon" v-if="item.message_type == 2" :src="'https://image.ximiyun.cn/'+item.message" width="150">
          </div>
          
          <div class='msg-received' v-else>
              <div class='msg-imghead'>
                <img :src="imgUrl+msg.to_user_face" >
              </div>
              <pre v-if="item.message_type == 1" class='msg-messagecon' v-html="item.message"></pre>
              <img class="msg-messageimgcon" v-if="item.message_type == 2" :src="'https://image.ximiyun.cn/'+item.message" width="150">
          </div>
        </template>                                                                                        
        
      </div>
 
     <div class='msg-sendarea'>
        <div class='msg-nav'>
          <div class='msg-plugkuai'>
            <select class="msg-select" v-model="selectonval">
              <option value="">快捷短语</option>
              <option>你好？</option>
            </select>
          </div>
          <a href="javascript:;" ref = 'btn' @click = 'showEmoji = !showEmoji' class="emoji"></a>
          <vue-emoji v-show = 'showEmoji' ref = 'emoji' @select = 'Emojisel' @hide = 'handleHide'></vue-emoji>
          <div class="msg-plugkuai">
            <van-uploader :after-read="onRead" accept="image/gif, image/jpeg">
              <van-icon name="photo" />
            </van-uploader>
          </div>
        </div>
        <div class='msg-sendmsg'>
          <div class='msg-input'>
            <!-- <textarea class='msg-area'  v-model='msg.message' wrap="hard"></textarea> -->
            <div contenteditable="" ref = 'edit' :style='{height:textareaH+"px"}' focus wrap="hard" class='msg-area' id="areatext"></div>
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
import axios from 'axios';
import 'rui-vue-emoji/dist/vue-emoji.css';
import VueEmoji from 'rui-vue-emoji'

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
      showEmoji : false,
      selectonval:"",
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
      customEmojis:customEmojis,
      unread_message_number:0
    }
  },
  components:{VueEmoji},
  computed:{
    ...mapState(["userids","stompClient","imgUrl","userList","UploadSign"]),
    ...mapGetters(["newMsg"]),
    title(){
      return this.msg.to_user_id+'-'+(this.msg.to_is_online == 0?'离线':'在线');
    }
  },
  watch:{
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
        var msgCentent = document.getElementById("msgcentent");
        setTimeout(()=>{ msgCentent.scrollTop = msgCentent.scrollHeight;})
      };
    },
    userList(userList){
      userList.forEach((item)=>{
        if (item.to_user_id == this.msg.to_user_id) {
          this.unread_message_number = item.unread_message_number;
        }
      });
    },
    selectonval(val){
      if(val){
        document.querySelector('#areatext').innerHTML = val;
        this.sendMessage();
      }
    }
  },
  mounted(){
    this.msg = this.$route.query;
    this.msg.my_user_id = this.userids.user_id;
    this.selectChatLogs();
    this.unread_message_number = this.$route.unread_message_number;
    
    this.$refs.emoji.appendTo({
      area: this.$refs.edit,
      btn: this.$refs.btn,
      position: 'top left'
    });
    
    document.querySelector('#areatext').addEventListener("scroll",(e)=>{
      var areatext=document.querySelector('#areatext').innerHTML;
       this.msg.message=areatext;
       this.disableded=Boolean(areatext)
        if (areatext) {
          var height = (areatext.split("</div>").length) * 18;
          height = (areatext.split("</div>").length) > 4?4 * 18 : height;
          this.textareaH = height==18?24:height;
        }
    });

  },
  methods:{
    Emojisel(e){
      document.querySelector('#areatext').appendChild(e);
      this.showEmoji = false;
    },
    hide () {
      this.showEmoji = false;
    },
    handleHide (e) {
      this.hide();
    },
    sendMessage(){
      this.msg.message = document.querySelector('#areatext').innerHTML;
      if(!this.msg.message){return;};
      this.msg.message_type=1;
      this.stompClient.send(`${apiUrl}/chat/inmessage`,{},JSON.stringify(this.msg));
      this.data.list.push({
				"chat_time":1532682200000,
				"is_read":0,
				"logs_id":"fc710088f7224edebd70b285ce8faf58",
				"message":this.msg.message,
				"my_user_id":this.msg.my_user_id,
        "to_user_id":this.msg.to_user_id,
        "message_type":"1",
        "send_or_receive":1
      })
      this.msg.message="";
      document.querySelector('#areatext').innerHTML="";
      this.textareaH=24;
      var msgCentent = document.getElementById("msgcentent");
      setTimeout(()=>{ msgCentent.scrollTop = msgCentent.scrollHeight;})
    },
    selectChatLogs(){
      this.msg.pageNum = 1;
      selectChatLogsList(this.msg).then((data) => {
        if (data.success) {
          data.data.list=JSON.parse(JSON.stringify(data.data.list.reverse()));
          this.data = data.data;
          this.msgRead();
          // 消息至底
          var msgCentent = document.getElementById("msgcentent");
          setTimeout(() => { msgCentent.scrollTop = msgCentent.scrollHeight;});

          this.$store.dispatch("selectChatList");
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
          data.data.list.forEach((item)=>{
            this.data.list.unshift(item)
          });
          this.data.nextPage = data.data.nextPage;
          this.msgRead();

          this.$store.dispatch("selectChatList");
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
      this.stompClient.send("/chat/messageRead",{},JSON.stringify(msg))
    },
    handle(e){
      if (e.target.scrollTop == 0) {
        this.onRefresh();
      };
    },
    onRead(file){ // 上传文件
        getUploadSign({user_id:this.msg.my_user_id}).then(({data,success}) => {
          if (success) {
                var drifilename =this.UploadSign.dir+"/"+ new Date().getTime()+Math.ceil(Math.random()*1000000);
                drifilename = drifilename.substr(1)+"."+file.file.type.split('/')[1];
                var param = new FormData(); //创建form对象
                param.append('name',file.file.name);
                param.append('Filename',file.file.name);
                param.append('key',drifilename);
                param.append('policy',this.UploadSign.policy);
                param.append('OSSAccessKeyId',this.UploadSign.accessid);
                param.append('success_action_status',200);
                param.append('signature',this.UploadSign.signature);
                param.append('file',file.file);
                axios({
                  method: 'post',
                  url: this.UploadSign.host,
                  data:param,
                  headers:{"Content-Type": "multipart/form-data"}
                }).then((data) => {
                  console.log("成功")
                }).catch(err=>{
                  // console.log(err)
                  setTimeout(()=>{ 
                    this.msg.message = drifilename;
                    this.msg.message_type=2;
                    this.stompClient.send(`${apiUrl}/chat/inmessage`,{},JSON.stringify(this.msg));
                    this.data.list.push({
                      "chat_time":1532682200000,
                      "is_read":0,
                      "logs_id":"fc710088f7224edebd70b285ce8faf58",
                      "message":this.msg.message,
                      "my_user_id":this.msg.my_user_id,
                      "to_user_id":this.msg.to_user_id,
                      "send_or_receive":1,
                      "message_type":"2"
                    })
                    this.msg.message="";
                    this.textareaH=24;
                    var msgCentent = document.getElementById("msgcentent");
                    msgCentent.scrollTop = msgCentent.scrollHeight;
                  })
                });


          }
        });
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
@mixin img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  vertical-align: top;
}
.emoji{
    display: inline-block;
    background: url(/img/emoji.f97d5b41.png) no-repeat center;
    width: 16px;
    height: 16px;
    background-size: 100%;
    margin: 0 10px;
    vertical-align: 0px;
}

.msg-header{
  width: 100%;
  height: $HEAD_H;
  background: #3EA5FF;
  text-align: center;
  line-height: $HEAD_H;
  color: #fff;
  outline: none;
  .msg-unreload{
    min-width: 22px;
    height: 18px;
    line-height: 18px;
    font-size: 12px;
    background: #f76666;
    color: #fff;
    border-radius: 10px;
    display: inline-block;
    margin: 0 6px;
    vertical-align: 2px;
  }
}

.msg-centent{
  width: 100vw;
  height: calc(100vh - 213px);
  overflow: auto;
  overflow-x: hidden;
  padding-bottom: 65px;
  .msg-time{
    color: #C9CED3;
    border-radius: 4px;
    width: 120px;
    margin: 0 auto;
    font-size: 12px;
    padding: 4px;
    transform: scale(0.92);
  }
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
  @mixin messagecon{
    border: 1px solid #ddd;
      max-width: 70vw;
      min-width: 4px;
      margin: 8px 0;
      border-radius: 4px;
      font-size: 14px;
      line-height: 18px;
      color: #333;
      word-wrap: break-word;
      white-space: pre-wrap;
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
      >img{
        @include img;
      }
    }

    .msg-messageimgcon{
      float: right;
    }

    .msg-messagecon{
      @include messagecon;
      float: right;
      padding: 4px 8px 4px 6px;
      position: relative;
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
      >img{
        @include img;
      }
    }
    .msg-messageimgcon{
      float: left;
    }
    .msg-messagecon{
      @include messagecon;
      float: left;
      padding: 4px 6px;
      position: relative;
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
    .msg-select{
      font-size: 12px;
      vertical-align: 2px;
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
        background: #fff;
        overflow-y: auto;
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

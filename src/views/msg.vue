<template>
  <div class="msg">
    <div class='msg-header'>
       <div class='msg-headeimg'>
         <!-- <div class='msg-imgbox'></div> -->
       </div>
       <div class='msg-title'>对方昵称</div>
       <div></div>
     </div>

     <div class='msg-centent'>
        <div class='meg-send'>
            <div class='msg-imghead'></div>
            <div class='msg-messagecon'>
              你好啊
            </div>
        </div>

        <div class='msg-received'>
            <div class='msg-imghead'></div>
            <div class='msg-messagecon'>
              hello 美琪
            </div>
        </div>

        <div class='msg-received'>
            <div class='msg-imghead'></div>
            <div class='msg-messagecon'>
             *  从联系人列表入口进入：带入双方用户信息，如果有未读消息，则进入后查询一页聊天记录(10条)，并反馈消息为已读
            </div>
        </div>

        <div class='msg-received'>
            <div class='msg-imghead'></div>
            <div class='msg-messagecon'>
             *  从联系人列表入口进入：带入双方用户信息，如果有未读消息，则进入后查询一页聊天记录(10条)，并反馈消息为已读
            </div>
        </div>

        <div class='msg-received'>
            <div class='msg-imghead'></div>
            <div class='msg-messagecon'>
             *  从联系人列表入口进入：带入双方用户信息，如果有未读消息，则进入后查询一页聊天记录(10条)，并反馈消息为已读
            </div>
        </div>

        <div class='msg-received'>
            <div class='msg-imghead'></div>
            <div class='msg-messagecon'>
             *  从联系人列表入口进入：带入双方用户信息，如果有未读消息，则进入后查询一页聊天记录(10条)，并反馈消息为已读
            </div>
        </div>

        <div class='msg-received'>
            <div class='msg-imghead'></div>
            <div class='msg-messagecon'>
             *  从联系人列表入口进入：带入双方用户信息，如果有未读消息，则进入后查询一页聊天记录(10条)，并反馈消息为已读
            </div>
        </div>
     </div>

     <div class='msg-sendarea'>
        <div class='msg-nav'>
          <div class='msg-plugkuai'>快捷短语</div>
        </div>
        <div class='msg-sendmsg'>
          <div class='msg-input'>
            <textarea class='msg-area'></textarea>
          </div>
          <div class='msg-sendbtn'>
            <button class='msg-btn'>发送</button>
          </div>
        </div>
     </div>
  </div>
</template>

<script>
import { Login } from './../api/api.js';

export default {
  name:"msg",
  data(){
    return {

    }
  },
  mounted(){

  },
  methods:{
    init(){
      
    }
  }
}
</script>


<style lang="scss" scoped>
$HEAD_H:40px;

.msg-header{
  width: 100%;
  height: $HEAD_H;
  background: #3EA5FF;
  text-align: center;
  line-height: $HEAD_H;
  >div{
    float: left;
  }
  .msg-imgbox{
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: inline-block;
    vertical-align: -9px;
  }
  .msg-headeimg{
    width: 18%;
    height: 100%;
  }
  .msg-title{
    color: #fff;
    width: 60%;
    height: 100%;
    font-size:16px;
  }
}

.msg-centent{
  width: 100%;
  height: calc(500px - 100px);
  overflow-y:auto;
  overflow-x: hidden;
  .meg-send{
    width: 100%;
    clear: both;
    overflow: hidden;
    line-height: 40px;
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
      max-width: 200px;
      min-width: 40px;
      float: right;
      // height: 24px;
      margin: 8px 0;
      border-radius: 4px;
      font-size: 12px;
      line-height: 18px;
      color: #333;
      word-wrap: break-word;
      padding: 4px 2px 4px 6px;
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
    line-height: 40px;
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
      min-width: 40px;
      float: left;
      // height: 24px;
      margin: 8px 0;
      border-radius: 4px;
      font-size: 12px;
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
  overflow: hidden;
  border-top: 1px solid #ddd;
  background: rgb(233, 232, 232);
  font-size: 12px;
  padding: 6px;
  .msg-nav{
    width: 100%;
    height: 20px;
    line-height: 20px;
    >div{
      display: inline-block;
      font-size: 12px;
      color: #666;
      cursor: pointer;
    }
    .msg-plugkuai{
      font-size: 12px;
      color: #666;
    }
  }
  .msg-sendmsg{
    width: 100%;
    height: 40px;
    margin-top:4px; 

    $wi:80px;
    .msg-input{
      width: calc(100% - 80px);
      float: left;
      .msg-area{
        font-size: 12px;
        width: 100%;
        height: 24px;
        border: none;
        padding:4px;
        line-height: 24px;
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

</style>

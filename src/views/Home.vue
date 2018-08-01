<template>
  <div class="home">
     <div class='home-header'>
       <div class='home-headeimg'>
         <div class='home-imgbox'></div>
       </div>
       <div class='home-title'>{{userids.my_user_id}}</div>
       <div></div>
     </div>
     <div class='home-list'>
       <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="min-height:60vh;">
         <p v-if="userList.length==0" style='text-align:center;font-size:14px;'>
           暂无消息,下拉刷新试试。
          </p>
          <div class='home-item' v-for='item in userList'>
            <van-cell-swipe :right-width="130">
              <van-cell-group @click="onchatname(item)">
                <div class="img-header">
                  <div class='img-default'></div>
                  <!-- <img src="" class="img-header"> -->
                </div>
                <div class='home-cent'>
                  <div class='home-nickname'>{{item.to_nick_name}}</div>
                  <div class='home-message'>{{item.finally_chat_message}}</div>
                </div>
                <div class='home-time'>{{item.finally_chat_time|FileterTime}}</div>
              </van-cell-group>
              <span slot="right">
                <span class='delclass'>修改备注</span></span>
                <span class='delclass'>删除</span></span>
            </van-cell-swipe>
          </div>
        </van-pull-refresh>
        
     </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import { PullRefresh  } from 'vant';
import {selectChatRelationList} from '@/api/api.js';

export default {
  name: 'home',
  data() {
    return {
      count: 0,
      isLoading: false,
      show:false
    }
  },
  components:{
    [PullRefresh.name]:PullRefresh
  },
  mounted(){
    // 查询联系人列表
    this.$store.dispatch("selectChatList");
  },
  computed:{...mapState(["userids","userList"])},
  methods:{
    onRefresh() {
      setTimeout(() => {
        this.$store.dispatch("selectChatList");
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 500);
    },
    onchatname(item){
      this.$router.push({path:"msg",query:item})
    }
  }
}
</script>

<style lang="scss" scoped>
$HEAD_H:46px;

.home-header{
  width: 100%;
  height: $HEAD_H;
  background: #3EA5FF;
  text-align: center;
  line-height: $HEAD_H;
  z-index: 100;
  >div{
    float: left;
  }
  .home-imgbox{
    width: 28px;
    height: 28px;
    background: green;
    border-radius: 50%;
    display: inline-block;
    vertical-align: -9px;
  }
  .home-headeimg{
    width: 18%;
    height: 100%;
  }
  .home-title{
    color: #fff;
    width: 60%;
    height: 100%;
    font-size:16px;
  }
}

.van-cell-swipe{
  height: 50px;
}

.delclass{
  display: inline-block;
  // margin: 20px 20px;
  background: #ff4848;
  width: 65px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-size: 14px;
}

.home-list{
  // background: #f5f5f5;
  width: 100%;
  color: #333;
  height: calc(100vh - 46px);
  overflow-y:auto;
  .home-item{
    height: 50px;
    border-bottom: 1px solid rgb(235, 235, 235);
    line-height: 43px;
    cursor: pointer;
    &:hover{
      background: #F5F5F5;
    }
    &:active{
      background: #F5F5F5;
    }
    .img-header{
      // width: 46px;
      height: 100%;
      display: inline-block;
      margin: 0 10px;
      .img-default{
        width: 32px;
        height: 32px;
        background: #d1d1d1;
        border-radius:50%; 
        vertical-align: 4px;
        display: inline-block;
      }
    }
    .home-cent{
      display: inline-block;
      .home-nickname{
        line-height: 26px;
        font-size: 14px;
        width: 200px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      .home-message{
        font-size: 14px;
        line-height: 18px;
        transform:scale(0.90,0.90);
        margin-left:-10px;
        width: 220px;
        color: #777;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
    }
    .home-time{
      display: inline-block;
      line-height: 20px;
      font-size:14px;
      vertical-align: top;
      margin-top:4px;
      color: #A59999; 
    }
  }
  
}
</style>


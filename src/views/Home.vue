<template>
  <div class="home">
     <div class='home-header'>
       <div class='home-headeimg'>
         <div class='home-imgbox'>
           <img :src="'https://image.ximiyun.cn'+userids.user_face" v-if='userids.user_face'>
         </div>
       </div>
       <div class='home-title'>{{userids.nick_name}}</div>
       <div></div>
     </div>
     <div class='home-list'>
       <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="min-height:60vh;">
          <div class='Refresh' style='min-height:90vh;'>
            <p v-if="userList.length==0" style='text-align:center;font-size:14px;'>
            暂无消息,下拉刷新试试。
            </p>
            <div class='home-item' v-for='(item,index) in userList'>
              <van-cell-swipe :right-width="160">
                <van-cell-group>
                  <div class="img-header">
                    <img :src="'https://image.ximiyun.cn'+item.to_user_face" v-if='item.to_user_face'>
                    <div class='img-default' v-else></div>
                  </div>
                  <div class='home-cent' @click="onchatname(item)">
                    <div class='home-nickname'>{{item.to_user_remark?item.to_user_remark:item.to_user_id}}</div>
                    <div class='home-message'>
                      {{item.finally_chat_message?item.finally_chat_message:item.to_is_online}}
                    </div>
                  </div>
                  <div class='home-time'>
                    {{item.finally_chat_time|FileterTime}}
                    <span class='home_unreadnum' v-if='item.unread_message_number>0'>{{item.unread_message_number}}</span>
                  </div>
                </van-cell-group>
                <span slot="right">
                  <span class='editclass' @click="showdialog(item,index)">修改备注</span>
                  <span class='delclass' @click="delectRelation(item)">删除</span>
                </span>
              </van-cell-swipe>
            </div>
          </div>
        </van-pull-refresh>
     </div>

    <!-- 修改备注 -->
     <van-dialog v-model="show" show-cancel-button :before-close="beforeClose">
        <div class='dialogtitle'>修改备注</div>
        <van-field v-model="remarkData.to_user_remark" label="备注" placeholder="请输入备注"/>
      </van-dialog>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import { PullRefresh  } from 'vant';
import {selectChatRelationList,delectChatRelation,updateChatRelationToUserRemark} from '@/api/api.js';

export default {
  name: 'home',
  data() {
    return {
      count: 0,
      isLoading: false,
      show:false,
      username:"",
      remarkData:{
          relation_id:"",
          to_user_remark:""
      },
      indexds:0
    }
  },
  mounted(){
    // 查询联系人列表
    this.$store.dispatch("selectChatList");
  },
  computed:{...mapState(["userids","userList"])},
  methods:{
    ...mapMutations(["updateRemake"]),
    onRefresh() {// 下拉刷新
      setTimeout(() => {
        this.$store.dispatch("selectChatList");
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 500);
    },
    onchatname(item){ // link 详情
      this.$router.push({path:"msg",query:item})
    },
    delectRelation(item){// 删除联系人
       this.$dialog.confirm({
          title: '删除联系人',
          message: '确定要删除联系人？'
        }).then(() => {
          // on confirm
           delectChatRelation({relation_id:item.relation_id}).then((data) => {
              if (data.success) {
                this.$toast('删除成功');
              }else{
                this.$toast(data.msg);
              }
            });
        }).catch(() => {
          // on cancel
        });
    },
    showdialog(item,index){ // 显示修改备注dialog
      this.show=true;
      this.indexds=index;
      this.remarkData={
        relation_id:item.relation_id,
        to_user_remark:item.to_user_remark
      }
    },
    beforeClose(action, done) { //修改备注 弹出框关闭
      if (action === 'confirm') {
        console.log(this.remarkData)
        updateChatRelationToUserRemark(this.remarkData).then((data) => {
          if (data.success) {
            // setTimeout(done, 1000);
            // this.userList
            this.updateRemake({
              index:this.indexds,
              to_user_remark:this.remarkData.to_user_remark
            });
            done();
          }else{
            this.$toast(data.msg)
          }
        });
      } else {
        done();
      };
    }
  }
}
</script>

<style lang="scss" scoped>
$HEAD_H:56px;

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
    width: 38px;
    height: 38px;
    background: #ddd(211, 211, 211);
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    >img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
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

.dialogtitle{
  font-size: 16px;
  height:40px;
  line-height: 48px;
  vertical-align: bottom;
  text-align: center;
}

@mixin delclass{
  display: inline-block;
  width: 80px;
  height: 66px;
  line-height: 66px;
  text-align: center;
  color: #fff;
  font-size: 14px;
}

.editclass{
  @include delclass;
  background: #fd9e5e;
}
.delclass{
  @include delclass;
  background: #ff4848;
}

.home-list{
  // background: #f5f5f5;
  width: 100%;
  color: #333;
  height: calc(100vh - 56px);
  overflow-y:auto;
  .home-item{
    border-bottom: 1px solid rgb(235, 235, 235);
    cursor: pointer;
    &:hover{
      background: #F5F5F5;
    }
    &:active{
      background: #F5F5F5;
    }
    .img-header{
      // width: 56px;
      height: 100%;
      display: inline-block;
      margin: 0 10px;
      $wid:46px;

      @mixin default{
        width: $wid;
        height: $wid;
        border-radius: 50%;
      }
      >img{
        @include default;
      }
      .img-default{
        @include default;
        display: inline-block;
        background: #3EA5FF;
      }
    }
    .home-cent{
      display: inline-block;
      margin: 10px;
      .home-nickname{
        line-height: 28px;
        font-size: 16px;
        width: calc(100vw - 146px);
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      .home-message{
        font-size: 14px;
        line-height: 18px;
        width: calc(100vw - 146px);
        color: #777;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
    }
    .home-time{
      display: inline-block;
      line-height: 48px;
      font-size:14px;
      vertical-align: top;
      color: #A59999; 
      position: relative;
      .home_unreadnum{
        position: absolute;
        display: block;
        left:0px;
        bottom: -8px;
        text-align: center;
        min-width: 30px;
        height: 18px;
        line-height: 18px;
        font-size: 12px;
        background: #f76666;
        color: #fff;
        border-radius: 10px;
      }
    }
  }
  
}
</style>


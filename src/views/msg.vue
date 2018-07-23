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
            <div class='msg-messagecon'></div>
        </div>

        <div class='msg-received'>

        </div>
     </div>

     <div class='msg-sendarea'>

     </div>
  </div>
</template>

<script>
export default {
  name:"msg",
  data(){
    return {

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
    background: green;
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
  overflow-y:auto;
  overflow-x: hidden;
  .meg-send{
    width: 100%;
    border: 1px solid #ddd;
    min-height: 40px;
    line-height: 40px;
    text-align: right;
    .msg-imghead{
      width: 30px;
      height: 30px;
      background: #3EA5FF;
      border-radius:50%;
      float: right;
      margin:5px 14px;
    }

    .msg-messagecon{
      border: 1px solid #ddd;
      max-width: 200px;
      min-width: 40px;
      float: right;
      height: 30px;
      margin: 4px 0;
      border-radius: 4px;
      
      &::before{
        content:'';
        display: block;
      }
    }
  }
}

</style>

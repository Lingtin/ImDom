<template>
  <div class="home">
     <div class='home-header'>
       <div class='home-headeimg'>
         <div class='home-imgbox'></div>
       </div>
       <div class='home-title'>title</div>
       <div></div>
     </div>

     <div class='home-list'>
       <div class='home-item'>
         <div class="img-header">
           <div class='img-default'></div>
           <!-- <img src="" class="img-header"> -->
         </div>
         <div class='home-cent'>
           <div class='home-nickname'>高明强</div>
           <div class='home-message'>但是它却不会按照max-width:979px的样式</div>
         </div>
         <div class='home-time'>09:00</div>
       </div>
       <div class='home-item'>
         <div class="img-header">
           <div class='img-default'></div>
           <!-- <img src="" class="img-header"> -->
         </div>
         <div class='home-cent'>
           <div class='home-nickname'>高明强</div>
           <div class='home-message'>但是它却不会按照max-width:979px的样式</div>
         </div>
         <div class='home-time'>09:00</div>
       </div>
       <div class='home-item'>
         <div class="img-header">
           <div class='img-default'></div>
           <!-- <img src="" class="img-header"> -->
         </div>
         <div class='home-cent'>
           <div class='home-nickname'>高明强</div>
           <div class='home-message'>但是它却不会按照max-width:979px的样式</div>
         </div>
         <div class='home-time'>09:00</div>
       </div>
       <div class='home-item'>
         <div class="img-header">
           <div class='img-default'></div>
           <!-- <img src="" class="img-header"> -->
         </div>
         <div class='home-cent'>
           <div class='home-nickname'>高明强</div>
           <div class='home-message'>但是它却不会按照max-width:979px的样式</div>
         </div>
         <div class='home-time'>09:00</div>
       </div>
     </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home'
}
</script>

<style lang="scss" scoped>
$HEAD_H:40px;

.home-header{
  width: 100%;
  height: $HEAD_H;
  background: #3EA5FF;
  text-align: center;
  line-height: $HEAD_H;
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



.home-list{
  // background: #f5f5f5;
  width: 100%;
  min-height: 580px;
  overflow-x: hidden;
  overflow-y: auto;
  color: #333;
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
      // width: 40px;
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
        font-size: 12px;
        width: 200px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      .home-message{
        font-size: 12px;
        line-height: 18px;
        transform:scale(0.90,0.90);
        margin-left:-12px;
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
      font-size:12px;
      vertical-align: top;
      margin-top:4px;
      color: #A59999; 
    }
  }
  
}
</style>


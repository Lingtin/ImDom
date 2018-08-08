<template>
  <div id="app">
    <div class='view'>
        <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    var reg = new RegExp("(^|&)token=([^&]*)(&|$)");
    if (window.location.href.split("?")[1]) {
       var r = window.location.href.split("?")[1].match(reg);
      if(r){
        this.$store.dispatch('init',unescape(r[2]));
      }else{
        this.$store.dispatch('init',"u2");
      }
    }else{
      // alert("请进入正确的请求地址。");
    }
    
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
  box-sizing: border-box;
  -webkit-text-size-adjust:none;
  color: #333;
  overflow-x: hidden;
}
html,body{
  width: 100%;
  height: 100%;
}
input,textarea{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.curpoint{
  cursor: pointer;
}
.view{
  margin: 0 auto;
  // width: 320px;
  // height: 510px;
  // overflow: hidden;
  border-radius:6px 6px 0px 0px;
  box-shadow:0px 0px 8px rgb(173, 173, 173);
}

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #ddd;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background-color: #777;
    border-radius: 4px;
}
</style>

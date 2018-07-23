<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/msg">msg</router-link>
    </div>
    <div class='view'>
        <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
  box-sizing: border-box;
  -webkit-text-size-adjust:none;
}

.view{
  margin: 0 auto;
  width: 320px;
  height: 500px;
  overflow: hidden;
  border-radius:6px;
  box-shadow:0px 0px 8px rgb(173, 173, 173);
}
</style>

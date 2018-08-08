<template>
  <div>
    <emoji emoji="blush" set="messenger" :size="24" Dataserts="Datasets"/>

        <!-- <picker title="Pick your emoji…" emoji="people" /> -->
        <!-- <nimble-picker set="emojione" /> -->
        <picker set="messenger" Dataserts="Datasets" :showPreview="false" :showSearch="false" :showSkinTones="false"/>
  </div>
</template>

<script>
import { Picker,NimblePicker,Emoji  } from 'emoji-mart-vue'

export default {
  data() {
    return {
      count: 0,
    };
  },
  components:{Picker,NimblePicker,Emoji},
  methods: {
   
  }
};
</script>

<style lang="postcss">
.demo-pull-refresh {
  .van-pull-refresh {
    &,
    &__track {
      height: calc(100vh - 50px);
    }
  }
  p {
    margin: 10px 0 0 15px;
  }
}
</style>
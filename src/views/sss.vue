<template>
  <demo-section name="pull-refresh">
    <van-cell-swipe :right-width="65" :left-width="65" :on-close="onClose">
        <span slot="left">选择</span>
        <van-cell-group>
            <van-cell title="单元格" value="内容" />
        </van-cell-group>
        <span slot="right">删除</span>
    </van-cell-swipe>
  </demo-section>
</template>

<script>
import VantDoc, { DemoBlock, DemoSection } from 'vant-doc';
import {Dialog} from 'vant';

export default {
  data() {
    return {
      count: 0,
      isLoading: false
    };
  },
  components:{
      'demo-block':DemoBlock,
      'demo-section':DemoSection
  },
  methods: {
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            instance.close();
          });
          break;
      }
    }
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
<style lang="scss" scoped>
  @import 'src/styles/vars';
  @import 'src/styles/mixins';
  .main-box {
    @include wh(100%, 100%);
    position: relative;
    overflow: hidden;
    min-width:1200px;
    .content-left {
      @include wh(auto, 100%);
      position: relative;
      transition: all 0.5s;
      .main {
        @include wh(100%, 100%);
        overflow: auto;
        background: $body-bg;
      }
      &.content-an {
        margin:0 0 0 250px;
      }
    }
  }
  // 动画
  .slide-both-enter-active,
  .slide-both-leave-active {
    transition: all 0.3s;
  }
  .slide-both-enter {
    opacity: 0;
    transform: scale3d(0.95, 0.95, 0.95);
  }
  .slide-both-leave-to {
    opacity: 0;
    transform: scale3d(0.95, 0.95, 0.95);
  }
</style>
<template>
  <div class="main-box">
    <!--导航-->
    <title-header></title-header>
    <div class="content-left">
      <!--内容部分-->
      <div class="main">
        <transition name="slide-both" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import titleHeader from '@/components/header/titleHeader.vue';

  export default {
    name: 'main',
    computed: {
    },
    data () {
      return {};
    },
    components: {
      titleHeader
    },
    created () {},
    methods: {}
  };
</script>

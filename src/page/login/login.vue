<style lang="less">
  @import 'login';
  canvas{
    display: block;
    width: 100%;
    height: 60%;
  }
</style>

<template>
  <div class="login">
    <canvas ref="canvas"></canvas>
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import LoginForm from '@/components/login-form';
  import canvas from './canvas.js';
  export default {
    mixins: [canvas],
    components: {
      LoginForm
    },
    mounted () {
      // canvas 动画
      try {
        this.init();
      } catch (e) {
      }
    },
    methods: {
      handleSubmit (value) {
        if (value.userName === 'root' && value.password === 'root123') {
          this.$router.push('/main/home');
        } else {
          this.$Notice.info({title: '账户名密码不正确'});
        }
      }
    }
  };
</script>

<style>

</style>

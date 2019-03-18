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
  import MD5 from 'MD5';
  import LoginForm from '@/components/login-form';
  import canvas from './canvas.js';
  import { loginFun } from '@/service/loginService/loginMService';
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
      async handleSubmit (value) {
        if (!value.username) {
          this.$Notice.info({title: '请输入用户名!'});
          return;
        }
        if (!value.password) {
          this.$Notice.info({title: '请输入密码!'});
          return;
        }
        let loginInfo = Object.assign({}, value);
        loginInfo.password = MD5(value.password);
        loginInfo.password = loginInfo.password.toLocaleUpperCase();
        let result = await loginFun(loginInfo);
        let userInfo = {};
        if (result.id) {
          userInfo = result;
          this.$Notice.success({title: '登录成功'});
          this._hyTool.setStore('token', userInfo.token);
          this._hyTool.setStore('userInfo', userInfo);
          this.$router.push('/main/home');
        } else {
          this.$Notice.warning({title: result.message});
        }
      }
    }
  };
</script>

<style>

</style>

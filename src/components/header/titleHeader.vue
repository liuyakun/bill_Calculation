/**
* 描述：头部
*/
<style lang="scss" scoped>
  .main-head {
    background-color: white;
    color: white;
    height: 50px;
    z-index: 2005;
    .menu-title{
      float: left;
    }
    a {
      color: white;
      margin: 0 10px 0 10px;
    }
    a:hover {color: white;}
    .user-content {
      text-align: right;
      padding-right: 10px;
      float: right;
      height: 50px;
      line-height: 60px;
      max-width: 950px;
      min-width: 100px;
      color: black;
      .user-info {
        margin-right: 10px;
        max-width: 60px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #2c2e45;
      }
    }
    .util-tool {
      float: right;
      margin-right: 10px;
      .lock-screen-btn-con {
        color: #2c2e45;
        display: inline-block;
        width: 30px;
        padding: 20px 0px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
</style>
<template>
  <div class="main-head">
    <div class="menu-title">
      <Menu mode="horizontal" :theme="theme1" :active-name="active" @on-select="selectMenu">
        <MenuItem name="/main/home">
          明细
        </MenuItem>
        <MenuItem name="/main/business">
          商家管理
        </MenuItem>
        <MenuItem name="/main/code">
          卡号管理
        </MenuItem>
        <MenuItem name="/main/introducer">
          介绍人管理
        </MenuItem>
        <MenuItem name="/main/defaultCommission" v-show="userInfo.type === 1">
          默认佣金
        </MenuItem>
        <MenuItem name="/main/userManage" v-show="userInfo.type === 1">
          用户管理
        </MenuItem>
      </Menu>
    </div>
    <div class="util-tool">
      <div @click="loginOut" class="lock-screen-btn-con">
        <Tooltip content="退出登录" placement="bottom">
          <Icon type="log-out" :size="20"></Icon>
        </Tooltip>
      </div>
    </div>
    <div class="user-content">
      <a>
        <span class="user-info">欢迎，{{userInfo.nickName}}</span>
        <Avatar src="static/images/user.png"/>
      </a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'titleHeader',
    data () {
      return {
        theme1: 'light',
        userInfo: {}
      };
    },
    computed: {
      active () {
        return this.$route.path;
      }
    },
    async mounted () {
      let userInfoResult = this._hyTool.getStore('userInfo');
      this.userInfo = JSON.parse(userInfoResult);
    },
    methods: {
      selectMenu (value) {
        this.$router.push(value);
      },
      async loginOut () {
        this.$confirm('确定注销登录？', '提示', {
          confirmButtonText: '是的',
          cancelButtonText: '点错了',
          type: 'warning'
        }).then(async () => {
          this._hyTool.removeStore('token');
          this._hyTool.removeStore('userInfo');
          this.$Notice.success({title: '注销成功!'});
          this.$router.push('/login');
        }).catch(() => {
        });
      }
    }
  };
</script>

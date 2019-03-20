/**
* 描述：卡号管理
*/
<template>
  <div class="content">
    <div class="lk-search-bar">
      <Form label-position="right" inline :label-width="60">
        <i-button type="success" icon="plus-round" class="lk-search-button" @click="clickAddOrUpdate()" shape="circle">新增</i-button>
      </Form>
    </div>
    <div class="table-content">
      <el-table
        :data="list"
        v-loading="loading"
        :element-loading-text="loadingText"
        style="width: 100%"
        class="text-center">
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="realName"
          label="姓名"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="realName"
          label="昵称"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="type"
          label="用户类型"
          show-overflow-tooltip
          align="center">
          <template slot-scope="scope">{{scope.row.type | userType}}</template>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="200px" fixed="right">
          <template slot-scope="scope">
            <a v-show="scope.row.type !== 1" @click="clickAddOrUpdate(scope.row)">修改</a>
            <a v-show="scope.row.type !== 1" @click="clickDelete(scope.row)">删除</a>
            <a @click="resetPassword(scope.row.id)">重置密码</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Modal v-model="modalFormShow" :mask-closable="false">
      <p slot="header" class="lk-modal-title">
        <span>修改</span>
      </p>
      <div style="text-align:left" v-if="modalFormShow">
        <Form ref="form" :model="modalFormData" :rules="ruleValidate" :label-width="90">
          <hy-form-item :form="modalFormData" :formRow="modalFormItem"></hy-form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" :loading="modalBtnLoading" @click="addOrUpdateSubmit('form')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="modalFormShow = false">取消</Button>
      </div>
    </Modal>
    <!--重置密码-->
    <Modal v-model="modalFormResetShow" :mask-closable="false">
      <p slot="header" class="hy-modal-title"><span>重置密码</span></p>
      <div style="text-align:left">
        <Form ref="formReset" :model="modalFormResetData" :rules="ruleResetValidate" :label-width="120">
          <FormItem label="新密码" prop="newPassword">
            <i-input type="password" v-model="modalFormResetData.newPassword" :maxlength="18" placeholder="必须包含字母和数字，长度在6-18位"></i-input>
          </FormItem>
          <FormItem label="再次输入密码" prop="confirmNewPassword">
            <i-input type="password" v-model="modalFormResetData.confirmNewPassword" :maxlength="18" placeholder="必须包含字母和数字，长度在6-18位" @on-focus="pasIsFocus=false" @on-blur="pasIsFocus=true"></i-input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" :loading="formLoading" @click="resetSubmit('formReset')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="modalFormResetShow = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import MD5 from 'MD5';
  import HyFormItem from '@/components/formItem/formItem.vue';
  import list from '@/js/mixins/list';
  import { userList, userAdd, userUpdate, userDel, resetPwd } from '@/service/loginService/loginMService';
  export default {
    mixins: [list],
    components: {
      HyFormItem
    },
    data () {
      return {
        title: '新增',
        searchClick: false,
        checkSearchData: {},
        searchData: {},
        loading: false,
        addLoading: false,
        loadingText: '暂无数据',
        modalFormShow: false,
        modalBtnLoading: false,
        modalFormData: {},
        modalFormItem: [],
        ruleValidate: {
          cardName: [
            {required: true, message: '卡号名称不能为空', trigger: 'blur change'}
          ],
          cardNum: [
            {required: true, message: '卡号不能为空', trigger: 'blur change'}
          ]
        },
        formLoading: false,
        modalFormResetShow: false,
        modalFormResetData: {},
        pasIsFocus: false,
        ruleResetValidate: {
          newPassword: [
            {required: true, message: '新密码不能为空', trigger: 'blur change'},
            {pattern: '^(?=.*[a-z])(?=.*\\d)[^]{6,18}$', message: '必须包含字母和数字，长度在6-18位', trigger: 'blur'}
          ],
          confirmNewPassword: [
            {required: true, message: '请再次输入密码', trigger: 'blur change'},
            {validator: (rule, val, callback) => {
              if (this.modalFormResetData.newPassword !== val && this.pasIsFocus) {
                callback('两次输入的密码不一致');
              } else {
                callback();
              }
            }}
          ]
        }
      };
    },
    methods: {
      async _getList () {
        try {
          this.loading = true;
          let para = {page: this.searchData.page, limit: this.searchData.limit};
          if (this.searchClick) this.checkSearchData = Object.assign({}, this.searchData);
          let result = await userList(para, this.checkSearchData);
          this.loading = false;
          this.list = result.dataList || [];
          this.totalElement = result.totalCount;
          this.searchClick = false;
        } catch (e) {
          this.loading = false;
          this.list = [];
          this.totalElement = 0;
        }
      },
      async clickAddOrUpdate (row) {
        if (row) {
          this.title = '修改';
          this.modalFormItem = [
            {key: 'username', title: '用户名'},
            {key: 'realName', title: '姓名'},
            {key: 'nickName', title: '昵称'},
            {key: 'mobile', title: '手机号'}
          ];
          this.ruleValidate = {
            username: [
              {required: true, message: '用户名不能为空', trigger: 'blur change'}
            ],
            realName: [
              {required: true, message: '姓名能为空', trigger: 'blur change'}
            ],
            nickName: [
              {required: true, message: '昵称不能为空', trigger: 'blur change'}
            ],
            mobile: [
              {required: true, message: '手机号不能为空', trigger: 'blur change'}
            ]
          };
          this.modalFormData = Object.assign({}, row);
        } else {
          this.modalFormItem = [
            {key: 'username', title: '用户名'},
            {key: 'password', title: '密码', type: 'password'},
            {key: 'realName', title: '姓名'},
            {key: 'nickName', title: '昵称'},
            {key: 'mobile', title: '手机号'}
          ];
          this.title = '新增';
          this.ruleValidate = {
            username: [
              {required: true, message: '用户名不能为空', trigger: 'blur change'}
            ],
            password: [
              {required: true, message: '密码不能为空', trigger: 'blur change'}
            ],
            realName: [
              {required: true, message: '姓名能为空', trigger: 'blur change'}
            ],
            nickName: [
              {required: true, message: '昵称不能为空', trigger: 'blur change'}
            ],
            mobile: [
              {required: true, message: '手机号不能为空', trigger: 'blur change'}
            ]
          };
          this.modalFormData = {};
        }
        this.modalFormShow = true;
      },
      async addOrUpdateSubmit (name) {
        this.$refs[name].validate(async (valid) => {
          try {
            if (valid) {
              this.modalBtnLoading = true;
              if (this.title === '新增') {
                let payload = Object.assign({}, this.modalFormData);
                payload.password = MD5(payload.password);
                payload.password = payload.password.toLocaleUpperCase();
                await userAdd(payload);
                this.searchClick = true;
                this.searchData = {page: 1, limit: 10};
              } else {
                await userUpdate(this.modalFormData);
              }
              this.$Notice.success({title: this.title + '成功'});
              this.currentChange(1);
              this.modalBtnLoading = false;
              this.modalFormShow = false;
            } else {
              this.$Notice.warning({title: '信息未填写完整'});
            }
          } catch (e) {
            this.modalBtnLoading = false;
          }
        });
      },
      clickDelete (row) {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await userDel({id: row.id});
          this.$Notice.success({title: '删除成功'});
          this.currentChange(1);
        }).catch(() => {
        });
      },
      // 重置密码
      async resetPassword (id) {
        this.$refs.formReset.resetFields();
        this.modalFormResetData = {};
        this.modalFormResetData.id = id;
        this.modalFormResetShow = true;
      },
      resetSubmit (name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            this.formLoading = true;
            try {
              let passInfo = Object.assign({}, this.modalFormResetData);
              passInfo.newPassword = MD5(passInfo.newPassword);
              passInfo.newPassword = passInfo.newPassword.toLocaleUpperCase();
              let para = {id: passInfo.id, newPassword: passInfo.newPassword};
              await resetPwd(para);
              this.$Notice.success({title: '重置成功'});
              this.modalFormResetShow = false;
            } catch (e) {}
            this.formLoading = false;
          }
        });
      }
    }
  };
</script>

/**
* 描述：介绍人管理
*/
<template>
  <div class="content">
    <div class="lk-search-bar">
      <Form label-position="right" inline :label-width="80">
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
          prop="nameReferrer"
          label="介绍人姓名"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="200px" fixed="right">
          <template slot-scope="scope">
            <a @click="clickAddOrUpdate(scope.row)">修改</a>
            <a @click="clickDelete(scope.row)">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Modal v-model="modalFormShow" :mask-closable="false">
      <p slot="header" class="lk-modal-title">
        <span>修改</span>
      </p>
      <div style="text-align:left">
        <Form ref="form" :model="modalFormData" :rules="ruleValidate" :label-width="90">
          <hy-form-item :form="modalFormData" :formRow="modalFormItem"></hy-form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" :loading="modalBtnLoading" @click="addOrUpdateSubmit('form')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="modalFormShow = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import HyFormItem from '@/components/formItem/formItem.vue';
  import list from '@/js/mixins/list';
  import { findOperatePageList, addFun, modifyFun, deleteFun } from '@/service/introducerService/introducerMService';
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
        modalFormItem: [
          {
            key: 'nameReferrer',
            title: '介绍人姓名'
          }
        ],
        ruleValidate: {}
      };
    },
    methods: {
      async _getList () {
        try {
          this.loading = true;
          let para = {
            page: this.searchData.page,
            limit: this.searchData.limit
          };
          if (this.searchClick) this.checkSearchData = Object.assign({}, this.searchData);
          let result = await findOperatePageList(para, this.checkSearchData);
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
      clickAddOrUpdate (row) {
        if (row) {
          this.title = '修改';
          this.modalFormData = Object.assign(row);
        } else {
          this.title = '新增';
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
                await addFun(this.modalFormData);
                this.searchClick = true;
                this.searchData = {page: 1, limit: 10};
              } else {
                await modifyFun(this.modalFormData);
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
          await deleteFun({id: row.id});
          this.$Notice.success({title: '删除成功'});
          this.currentChange(1);
        }).catch(() => {
        });
      }
    }
  };
</script>

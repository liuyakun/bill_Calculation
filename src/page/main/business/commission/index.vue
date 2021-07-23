/**
* 描述：商家 --- 佣金
*/
<template>
  <div class="content">
    <div class="lk-search-bar" style="color: #47bac2; font-size: 18px;">
       {{businessName}} —— 佣金管理
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
          prop="priceMin"
          label="最小价格（元）"
          show-overflow-tooltip
          min-width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="priceMax"
          label="最大价格（元）"
          min-width="120"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="commission"
          label="佣金（元）"
          min-width="120"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="commissionCost"
          label="成本佣金（元）"
          min-width="120"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="200px" fixed="right">
          <template slot-scope="scope">
            <a @click="clickUpdate(scope.row)">修改</a>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <hy-page v-show="pageShow"
               :current-page="searchData.page"
               :page-size="searchData.limit"
               :total-element="totalElement"
               @current-change="currentChange"></hy-page>
    </div>
    <Modal v-model="modalFormShow" :mask-closable="false">
      <p slot="header" class="lk-modal-title">
        <span>修改</span>
      </p>
      <div style="text-align:left">
        <Form ref="form" :model="modalFormData" :rules="ruleValidate" :label-width="120">
          <FormItem label="最小价格（元）" prop="priceMin">
            <i-input v-model="modalFormData.priceMin" placeholder="最小价格" :maxlength="20"></i-input>
          </FormItem>
          <FormItem label="最大价格（元）" prop="priceMax">
            <i-input v-model="modalFormData.priceMax"  placeholder="最大价格" :maxlength="20"></i-input>
          </FormItem>
          <FormItem label="佣金（元）" prop="commission">
            <InputNumber :min="1" v-model="modalFormData.commission" style="width: 100%"></InputNumber>
          </FormItem>
          <FormItem label="成本佣金（元）" prop="commissionCost">
            <InputNumber :min="1" v-model="modalFormData.commissionCost" style="width: 100%"></InputNumber>
          </FormItem>
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
  import { findOperatePageList, modifyFun } from '@/service/commissionService/commissionMService';
  export default {
    mixins: [list],
    components: {
      HyFormItem
    },
    data () {
      return {
        searchClick: false,
        checkSearchData: {},
        businessName: '',
        loading: false,
        loadingText: '暂无数据',
        tableList: [
          {id: 1, priceMin: 10, priceMax: 50, commission: 10, commissionCost: 12}
        ],
        modalFormShow: false,
        modalBtnLoading: false,
        modalFormData: {},
        ruleValidate: {
          commission: [
            {required: true, type: 'number', message: '佣金不能为空', trigger: 'blur'}
          ],
          commissionCost: [
            {required: true, type: 'number', message: '成本佣金不能为空', trigger: 'blur'}
          ]
        }
      };
    },
    created () {
      const res = this.$route.query;
      this.businessName = res.name;
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
          const res = this.$route.query;
          let result = await findOperatePageList(para, {businessId: res.id});
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
      search () {
        this.searchClick = true;
        this.currentChange(1);
      },
      // 点击修改
      clickUpdate (row) {
        this.modalFormData = Object.assign({}, row);
        this.modalFormData.commission = Number(this.modalFormData.commission);
        this.modalFormData.commissionCost = Number(this.modalFormData.commissionCost);
        this.modalFormShow = true;
      },
      async addOrUpdateSubmit (name) {
        this.$refs[name].validate(async (valid) => {
          try {
            if (valid) {
              this.modalBtnLoading = true;
              await modifyFun(this.modalFormData);
              this.$Notice.success({title: '修改成功'});
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
      }
    }
  };
</script>

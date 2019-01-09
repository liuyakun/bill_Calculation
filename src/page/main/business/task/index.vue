/**
* 描述：商家 --- 任务
*/
<template>
  <div class="content">
    <div class="lk-search-bar">
      {{businessName}} ---- 任务
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
          prop="taskDate"
          label="任务日期"
          min-width="150"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="timeDoing"
          label="做单时间"
          min-width="150"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="nameTask"
          :label="businessName"
          min-width="150"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="keywords"
          label="关键词"
          min-width="150"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="buyNum"
          label="拍下件数"
          min-width="100"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价"
          min-width="120"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="spec"
          label="规格"
          min-width="120"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="require"
          label="附属要求"
          min-width="120"
          show-overflow-tooltip
          align="center">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <hy-page v-show="pageShow"
               :current-page="searchData.page"
               :page-size="searchData.limit"
               :total-element="totalElement"
               @current-change="currentChange"></hy-page>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import { findOperatePageList } from '@/service/taskService/taskMService';
  export default {
    mixins: [list],
    data () {
      return {
        searchClick: false,
        checkSearchData: {},
        businessName: '',
        searchData: {},
        loading: false,
        loadingText: '暂无数据',
        tableList: [
          {id: 1, taskDate: '2019-01-05', singleTime: 8, businessUrl: 'www.baidu.com', keyWord: 'keyWord', takenNumber: 5, unitPrice: '145', specifications: 'xxxx', remark: '111'}
        ]
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
      search () {
        this.searchClick = true;
        this.currentChange(1);
      }
    }
  };
</script>

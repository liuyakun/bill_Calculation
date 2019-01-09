/**
* 描述：商家
*/
<template>
  <div class="content">
    <div class="lk-search-bar">
      <Form label-position="right" inline :label-width="60">
        <FormItem label="商家名称">
          <i-input placeholder="商家名称" v-model="searchData.name"></i-input>
        </FormItem>
        <i-button type="success" icon="ios-search" class="lk-search-button" @click="search" shape="circle" :loading="loading">搜索</i-button>
        <i-button type="success" icon="plus-round" class="lk-search-button" @click="add()" shape="circle" :loading="addLoading">导入</i-button>
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
          prop="name"
          label="商家名称"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="codeName"
          label="卡号名称"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="200px" fixed="right">
          <template slot-scope="scope">
            <a @click="clickCommission(scope.row)">佣金</a>
            <a @click="clickTask(scope.row)">任务</a>
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
    <Modal v-model="exportData.show" :mask-closable="false">
      <p slot="header" class="lk-modal-title">
        <span>导入</span>
      </p>
      <div style="text-align:center">
        <Upload
          type="drag"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          ref="upload"
          :format="['xlsx', 'xls']"
          :on-format-error="handleFormatError"
          :before-upload="handleUpload"
          :show-upload-list="false"
          :with-credentials="true"
          action="#">
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #47bac2;"></Icon>
            <p v-if="!exportData.fileName">请将文件拖入其中，或点击上传</p>
            <p v-if="exportData.fileName">可点击或拖拽重新选择上传文件</p>
            <p v-if="exportData.fileName" style="color: #de605b;">文件名称：{{exportData.fileName}}</p>
            <p v-if="exportData.fileSize" style="color: #de605b;">文件大小：{{exportData.fileSize}}</p>
          </div>
        </Upload>
      </div>
      <div slot="footer">
        <Button type="success" :loading="exportData.loading" @click="uploadConmit()">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="exportData.show = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import XLSX from 'xlsx';
  import list from '@/js/mixins/list';
  import { findOperatePageList, importTask } from '@/service/businessService/businessMService';
  export default {
    mixins: [list],
    data () {
      return {
        searchClick: false,
        checkSearchData: {},
        loading: false,
        addLoading: false,
        loadingText: '暂无数据',
        tableList: [
          {id: 1, name: 'xxx淘宝店'}
        ],
        importModalShow: false,
        bindForm: {},
        exportData: {
          show: false,
          partFile: null,
          fileSize: null,
          fileName: null,
          loading: false,
          error: false,
          errorList: [],
          businessName: null
        } // 导入信息
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
      search () {
        this.searchClick = true;
        this.currentChange(1);
      },
      add () {
        this.exportData.businessName = null;
        this.exportData.partFile = null;
        this.exportData.fileSize = null;
        this.exportData.fileName = null;
        this.exportData.loading = false;
        this.exportData.show = true;
      },
      clickCommission (row) {
        this.$router.push({path: '/main/business/commission', query: {id: row.id, name: row.name}});
      },
      clickTask (row) {
        this.$router.push({path: '/main/business/task', query: {id: row.id, name: row.name}});
      },
      handleUpload (file) { // 保存需要上传的文件
        if (file.size > 1024 * 1024 * 5) this.$Notice.warning({title: '文件大小小不能超过5MB。'});
        this.exportData.loading = true;
        this.exportData.partFile = file;
        this.exportData.fileName = file.name;
        this.exportData.businessName = file.name.split('.')[0];
        this.exportData.fileSize = (file.size / 1024).toFixed(4) + 'KB';
        this.exportData.loading = false;
        return false;
      },
      handleFormatError () {
        this.$Notice.warning({title: '文件格式不对。'});
        return false;
      },
      uploadConmit () {
        if (!this.exportData.partFile) {
          this.$Notice.warning({title: '请上传文件。'});
          return;
        }
        this.$Spin.show();
        let wb = null;
        let importArray = [];
        this.exportData.loading = true;
        let f = this.exportData.partFile;
        let reader = new FileReader();
        let _this = this;
        reader.onload = async function (e) {
          try {
            let data = e.target.result;
            wb = XLSX.read(data, {type: 'binary'});
            importArray = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            let array = _this.importFormat(importArray);
            let payload = {
              businessName: _this.exportData.businessName,
              taskList: array
            };
            console.log(payload);
            await importTask(payload);
            _this.$Notice.success({title: '导入成功'});
            _this.exportData.loading = false;
            _this.$Spin.hide();
          } catch (e) {
            _this.exportData.loading = false;
            _this.$Spin.hide();
          }
        };
        reader.readAsBinaryString(f);
      },
      // 导入格式转换
      importFormat (array) {
        try {
          let newArray = [];
          array.forEach(item => {
            newArray.push(
              {
                timeDoing: item['做单时间'],
                nameTask: item[`旺旺：${this.exportData.businessName}`],
                keywords: item['关键词'],
                buyNum: item['拍下件数'],
                price: item['总价格'] || 0,
                spec: item['规格'],
                require: item['附属要求']
              }
            );
          });
          return newArray;
        } catch (e) {
          this.exportData.loading = false;
          this.$Notice.warning({title: '导入文件内容格式不对', desc: '请根据模版上传正确格式的文件'});
        }
      }
    }
  };
</script>

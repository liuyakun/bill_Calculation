/**
* 描述：首页
*/
<style lang="scss">
  @import 'index';
</style>
<template>
  <div class="content" style="height: 90%;">
    <Button style="float: right;" icon="ios-download-outline" type="primary" shape="circle" @click="importData"></Button>
    <div class="clear"></div>
    <Tabs type="card">
      <TabPane label="总计">
        <div class="total-main">
          <div class="row-one">
            <div class="row-one-content"><span>日期</span></div>
            <div class="row-one-content"><span>总单</span></div>
            <div class="row-one-content"><span>总收</span></div>
            <div class="row-one-content"><span>总放</span></div>
            <div class="row-one-content"><span>余</span></div>
            <div class="row-one-content"><span>剩余</span></div>
            <div class="row-one-content"><span>实际收款</span></div>
            <div class="row-one-content"><span>差额</span></div>
            <div class="row-one-content"><span>备注</span></div>
            <div class="clear"></div>
          </div>
          <div class="row-price" v-for="item,index in summaryList" :key="index" :class="index===0?'today-background':''">
            <div class="row-one-content"><span>{{item.dateSummary}}</span></div>
            <div class="row-one-content"><span>{{item.billSum}}</span></div>
            <div class="row-one-content"><span>{{item.receivableSum}}</span></div>
            <div class="row-one-content"><span>{{item.putSum}}</span></div>
            <div class="row-one-content"><span>{{item.residue}}</span></div>
            <div class="row-one-content"><span>{{item.residueLast}}</span></div>
            <div class="row-one-content"><span>{{item.receipt}}</span></div>
            <div class="row-one-content"><span>{{item.balance}}</span></div>
            <div class="row-one-content"><span>{{item.note}}</span></div>
            <div class="clear"></div>
          </div>
          <div class="clear"></div>
        </div>
      </TabPane>
      <TabPane label="每日商家账目">
        <div class="table-content">
          <el-table
            :data="list"
            style="width: 100%"
            class="text-center">
            <el-table-column
              type="index"
              label="序号"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="businessName"
              label="商家名称"
              show-overflow-tooltip
              align="center">
              <template slot-scope="scope">
                <span style="color: #CD853F">{{scope.row.businessName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="billTotal"
              label="单（件）"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="receivable"
              label="应收（元）"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="put"
              label="放（元）"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="receipt"
              label="实收（元）"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="residue"
              label="余（元）"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column label="操作" align="center" width="200px" fixed="right">
              <template slot-scope="scope">
                <a @click="clickUpdate(scope.row)">输入实收</a>
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
      </TabPane>
    </Tabs>
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
  import list from '@/js/mixins/list';
  import HyFormItem from '@/components/formItem/formItem.vue';
  import XLSX from 'xlsx';
  import saveAs from '@/js/libs/FileSaver';
  import { findOperatePageList, modifyFun, getSummary } from '@/service/homeService/homeMService';
  export default {
    mixins: [list],
    components: {
      HyFormItem
    },
    data () {
      return {
        summaryList: [],
        testData: [
          {dateSummary: '2019-01-06', billSum: 80, receivableSum: 19888, putSum: 25558, residue: 90, residueLast: 50, receipt: 20000, balance: 20, note: '11111'},
          {dateSummary: '2019-01-06', billSum: 80, receivableSum: 19888, putSum: 25558, residue: 90, residueLast: 50, receipt: 20000, balance: 20, note: '11111'},
          {dateSummary: '2019-01-06', billSum: 80, receivableSum: 19888, putSum: 25558, residue: 90, residueLast: 50, receipt: 20000, balance: 20, note: '11111'},
          {dateSummary: '2019-01-06', billSum: 80, receivableSum: 19888, putSum: 25558, residue: 90, residueLast: 50, receipt: 20000, balance: 20, note: '11111'},
          {dateSummary: '2019-01-06', billSum: 80, receivableSum: 19888, putSum: 25558, residue: 90, residueLast: 50, receipt: 20000, balance: 20, note: '11111'},
          {dateSummary: '2019-01-06', billSum: 80, receivableSum: 19888, putSum: 25558, residue: 90, residueLast: 50, receipt: 20000, balance: 20, note: '11111'},
          {dateSummary: '2019-01-06', billSum: 80, receivableSum: 19888, putSum: 25558, residue: 90, residueLast: 50, receipt: 20000, balance: 20, note: '11111'},
          {dateSummary: '2019-01-06', billSum: 80, receivableSum: 19888, putSum: 25558, residue: 90, residueLast: 50, receipt: 20000, balance: 20, note: '11111'}
        ],
        importData1: [
          {'商家名称': 'xxx商家', '单': 20, '应收': 1234, '放': 1234, '实收': 1234, '余': 20},
          {'商家名称': 'xxx商家', '单': 20, '应收': 1234, '放': 1234, '实收': 1234, '余': 20},
          {'商家名称': 'xxx商家', '单': 20, '应收': 1234, '放': 1234, '实收': 1234, '余': 20},
          {'商家名称': 'xxx商家', '单': 20, '应收': 1234, '放': 1234, '实收': 1234, '余': 20},
          {'商家名称': 'xxx商家', '单': 20, '应收': 1234, '放': 1234, '实收': 1234, '余': 20}
        ],
        modalFormShow: false,
        modalBtnLoading: false,
        modalFormData: {},
        modalFormItem: [
          {
            key: 'receipt',
            title: '实际收款'
          }
        ],
        ruleValidate: {
          receipts: [
            {required: true, message: '实际收款不能为空', trigger: 'blur change'}
          ]
        },
        searchClick: false,
        checkSearchData: {}
      };
    },
    created () {
      this.getSummary();
    },
    methods: {
      async getSummary () {
        let lowDate = new Date();
        lowDate.setDate(lowDate.getDate() - 15);
        let payload = {
          startTime: this._hyTool.DateFormat(new Date(), 'yyyy-MM-dd'),
          endTime: this._hyTool.DateFormat(new Date(lowDate), 'yyyy-MM-dd')
        };
        let result = await getSummary(payload);
        this.summaryList = result.dataList || [];
        console.log(result);
      },
      async _getList () {
        try {
          this.loading = true;
          let para = {page: this.searchData.page, limit: this.searchData.limit};
          let paylaod = {
            startTime: this._hyTool.DateFormat(new Date(), 'yyyy-MM-dd'),
            endTime: this._hyTool.DateFormat(new Date(), 'yyyy-MM-dd')
          };
          if (this.searchClick) this.checkSearchData = Object.assign({}, this.searchData);
          let result = await findOperatePageList(para, paylaod);
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
      clickUpdate (row) {
        this.modalFormData = Object.assign({}, row);
        this.modalFormData.receipt = this.modalFormData.receipt.toString();
        this.modalFormShow = true;
      },
      addOrUpdateSubmit (name) {
        this.$refs[name].validate(async (valid) => {
          try {
            if (valid) {
              this.modalBtnLoading = true;
              await modifyFun(this.modalFormData);
              this.$Notice.success({title: '设置成功'});
              this.modalBtnLoading = false;
              this.modalFormShow = false;
              this.currentChange(1);
            } else {
              this.$Notice.warning({title: '信息未填写完整'});
            }
          } catch (e) {
            this.modalBtnLoading = false;
          }
        });
      },
      async importData () {
        let payload = {
          startTime: this._hyTool.DateFormat(new Date(), 'yyyy-MM-dd'),
          endTime: this._hyTool.DateFormat(new Date(), 'yyyy-MM-dd')
        };
        let result = await findOperatePageList({page: 1, limit: 200}, payload);
        let temp = result.dataList || [];
        let importData2 = [];
        temp.forEach(item => {
          importData2.push(
            {
              '商家名称': item.businessName,
              '单（件）': item.billTotal,
              '应收（元）': item.receivable,
              '放（元）': item.put,
              '实收（元）': item.receipt,
              '余（元）': item.residue
            }
          );
        });
        let importData1 = this.importFormat2(this.summaryList);
        this.downloadExl(importData1, importData2);
      },
      // 总计
      importFormat2 (dataList) {
        let importList = [];
        for (var i = 0; i < 9; i++) {
          importList.push(['']);
        }
        importList[0].push('日期');
        importList[1].push('总单');
        importList[2].push('总收');
        importList[3].push('总放');
        importList[4].push('余');
        importList[5].push('剩余');
        importList[6].push('实际收款');
        importList[7].push('差额');
        importList[8].push('备注');
        for (let i = 0; i < dataList.length; i++) {
          var temp = dataList[i];
          importList[0].push(temp.dateSummary);
          importList[1].push(temp.billSum);
          importList[2].push(temp.receivableSum);
          importList[3].push(temp.putSum);
          importList[4].push(temp.residue);
          importList[5].push(temp.residueLast);
          importList[6].push(temp.receipt);
          importList[7].push(temp.balance);
          importList[8].push(temp.note);
        }
        return importList;
      },
      downloadExl (data1, data2) {
        try {
          const wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'}; // 这里的数据是用来定义导出的格式类型
          const wb = { SheetNames: ['总计', '每日商家账目'], Sheets: {}, Props: {} };
          wb.Sheets['总计'] = XLSX.utils.json_to_sheet(data1);// 通过json_to_sheet转成单页(Sheet)数据
          // wb.Sheets['总计']['!cols'] = [{width: 15}, {width: 20}, {width: 15}, {width: 15}, {width: 30}, {width: 30}, {width: 15}, {width: 10}, {width: 60}];
          wb.Sheets['每日商家账目'] = XLSX.utils.json_to_sheet(data2);// 通过json_to_sheet转成单页(Sheet)数据
          wb.Sheets['每日商家账目']['!cols'] = [{width: 30}, {width: 15}, {width: 15}, {width: 15}, {width: 15}, {width: 15}];
          saveAs(new Blob([this.s2ab(XLSX.write(wb, wopts))], {type: 'application/octet-stream'}), '账目明细' + '.' + (wopts.bookType === 'biff2' ? 'xls' : wopts.bookType));
          setTimeout(() => {
            this.$Spin.hide();
          }, 3000);
        } catch (e) {
          setTimeout(() => {
            this.$Spin.hide();
          }, 3000);
        }
      },
      s2ab (s) {
        if (typeof ArrayBuffer !== 'undefined') {
          let buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);
          for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
          return buf;
        } else {
          let buf = new Array(s.length);
          for (let i = 0; i !== s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
          return buf;
        }
      }
    }
  };
</script>

/**
* 描述：首页
*/
<style lang="scss">
  @import 'index';
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 160px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-table__expand-icon {
    height: 30px;
  }
</style>
<template>
  <div class="content" style="height: 90%;">
    <Button style="float: right;" icon="ios-download-outline" type="primary" shape="circle" @click="importData"></Button>
    <div class="clear"></div>
    <Tabs type="card" @on-click="clickTab">
      <TabPane label="总计" name="one">
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
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item v-for="item, index in props.row.cardAccountCollectDtos" :key="index + 'card'" :label="`卡号：${item.cardName}`">
                    <span>￥{{ item.cardReceiptSum }}</span>
                  </el-form-item>
                  <el-form-item v-for="item, index in props.row.referrerAccountCollectDtos" :key="index + 'referrerreferrer'" :label="`介绍人：${item.referrerName}`">
                    <span>￥{{ item.referrerReceiptSum }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="dateSummary"
              label="日期"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="billSum"
              label="总单（件）"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="receivableSum"
              label="总收（元）"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="putSum"
              label="总放（元）"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="residue"
              label="余（元）"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="residueLast"
              label="剩余（元）"
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
              prop="balance"
              label="差额（元）"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="note"
              label="备注"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="cardReceiptSum"
              label="账户总额"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="referrerReceiptSum"
              label="介绍人总提成"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column label="操作" align="center" width="200px" fixed="right">
              <template slot-scope="scope">
                <a @click="clickUpdate(scope.row, 1)">输入备注</a>
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
      <TabPane label="每日商家账目" name="two">
        <div class="lk-search-bar">
          <Form label-position="right" inline :label-width="60">
            <FormItem label="查询日期">
              <DatePicker v-model="searchDate" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
            </FormItem>
            <i-button type="success" icon="ios-search" class="lk-search-button" @click="search" shape="circle" :loading="loading">搜索</i-button>
          </Form>
        </div>
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
                <a @click="clickUpdate(scope.row, 2)">输入实收</a>
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
  import { findOperatePageList, modifyFun, getSummary, modifySummary } from '@/service/homeService/homeMService';
  export default {
    mixins: [list],
    components: {
      HyFormItem
    },
    data () {
      return {
        summaryList: [], // 每日
        summaryCodeList: [], // 卡号
        summaryReferrerList: [], // 介绍人
        modalFormShow: false,
        modalBtnLoading: false,
        modalFormData: {},
        modalFormType: 1,
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
        checkSearchData: {},
        searchDate: null,
        tabValue: 'one'
      };
    },
    async created () {
      try {
        let lowDate = new Date();
        lowDate.setDate(lowDate.getDate() + 1);
        this.searchDate = this._hyTool.DateFormat(new Date(lowDate), 'yyyy-MM-dd');
      } catch (e) {
      }
    },
    methods: {
      async _getList () {
        try {
          this.loading = true;
          let para = {page: this.searchData.page, limit: this.searchData.limit};
          if (!this.searchDate) {
            let lowDate = new Date();
            lowDate.setDate(lowDate.getDate() + 1);
            this.searchDate = this._hyTool.DateFormat(new Date(lowDate), 'yyyy-MM-dd');
          }
          let payload = {
            startTime: this._hyTool.DateFormat(new Date(this.searchDate), 'yyyy-MM-dd'),
            endTime: this._hyTool.DateFormat(new Date(this.searchDate), 'yyyy-MM-dd')
          };
          if (this.searchClick) this.checkSearchData = Object.assign({}, this.searchData);
          let result = [];
          if (this.tabValue === 'one') {
            result = await getSummary(para);
            this.list = result.dataList || [];
            this.list.forEach(item => {
              let referrerReceiptSum = 0;
              let cardReceiptSum = 0;
              if (!item.cardAccountCollectDtos) item.cardAccountCollectDtos = [];
              if (!item.referrerAccountCollectDtos) item.referrerAccountCollectDtos = [];
              if (item.cardAccountCollectDtos && item.cardAccountCollectDtos.length) {
                item.cardAccountCollectDtos.forEach(it => {
                  cardReceiptSum = cardReceiptSum + it.cardReceiptSum;
                });
              }
              if (item.referrerAccountCollectDtos && item.referrerAccountCollectDtos.length) {
                item.referrerAccountCollectDtos.forEach(it => {
                  referrerReceiptSum = referrerReceiptSum + it.referrerReceiptSum;
                });
              }
              item.referrerReceiptSum = referrerReceiptSum;
              item.cardReceiptSum = cardReceiptSum;
            });
          } else {
            result = await findOperatePageList(para, payload);
            this.list = result.dataList || [];
          }

          this.loading = false;
          this.totalElement = result.totalCount;
          this.searchClick = false;
        } catch (e) {
          this.loading = false;
          this.list = [];
          this.totalElement = 0;
        }
      },
      clickUpdate (row, type) {
        this.modalFormType = type;
        this.modalFormData = Object.assign({}, row);
        if (type === 1) {
          this.modalFormItem = [
            {key: 'note', title: '备注'}
          ];
        } else {
          this.modalFormItem = [
            {key: 'receipt', title: '实际收款'}
          ];
          this.modalFormData.receipt = this.modalFormData.receipt.toString();
        }
        this.modalFormShow = true;
      },
      addOrUpdateSubmit (name) {
        this.$refs[name].validate(async (valid) => {
          try {
            if (valid) {
              this.modalBtnLoading = true;
              if (this.modalFormType === 1) {
                let payload = {
                  id: this.modalFormData.id,
                  note: this.modalFormData.note
                };
                await modifySummary(payload);
              } else {
                await modifyFun(this.modalFormData);
              }
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
      clickTab (val) {
        this.tabValue = val;
        this.currentChange(1);
      },
      async importData () {
        let lowDate = new Date();
        lowDate.setDate(lowDate.getDate() + 1);
        let payload = {
          startTime: this._hyTool.DateFormat(new Date(), 'yyyy-MM-dd'),
          endTime: this._hyTool.DateFormat(new Date(lowDate), 'yyyy-MM-dd')
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
        let importData1 = [];
        let result2 = await getSummary({page: 1, limit: 15});
        let temp2 = result2.dataList || [];
        temp2.forEach(item => {
          let referrerReceiptSum = 0;
          let cardReceiptSum = 0;
          if (!item.cardAccountCollectDtos) item.cardAccountCollectDtos = [];
          if (!item.referrerAccountCollectDtos) item.referrerAccountCollectDtos = [];
          if (item.cardAccountCollectDtos && item.cardAccountCollectDtos.length) {
            item.cardAccountCollectDtos.forEach(it => {
              cardReceiptSum = cardReceiptSum + it.cardReceiptSum;
            });
          }
          if (item.referrerAccountCollectDtos && item.referrerAccountCollectDtos.length) {
            item.referrerAccountCollectDtos.forEach(it => {
              referrerReceiptSum = referrerReceiptSum + it.referrerReceiptSum;
            });
          }
          item.referrerReceiptSum = referrerReceiptSum;
          item.cardReceiptSum = cardReceiptSum;
        });
        temp2.forEach(item => {
          importData1.push(
            {
              '日期': item.dateSummary,
              '总单（件）': item.billSum,
              '总收（元）': item.receivableSum,
              '总放（元）': item.putSum,
              '余（元）': item.residue,
              '剩余（元）': item.residueLast,
              '差额（元）': item.balance,
              '备注': item.note,
              '账户总额（元）': item.cardReceiptSum,
              '介绍人总提成（元）': item.referrerReceiptSum
            }
          );
        });
        this.downloadExl(importData1, importData2);
      },
      downloadExl (data1, data2) {
        try {
          const wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'}; // 这里的数据是用来定义导出的格式类型
          const wb = { SheetNames: ['总计', '每日商家账目'], Sheets: {}, Props: {} };
          wb.Sheets['总计'] = XLSX.utils.json_to_sheet(data1);// 通过json_to_sheet转成单页(Sheet)数据
          wb.Sheets['总计']['!cols'] = [{width: 15}, {width: 15}, {width: 15}, {width: 15}, {width: 15}, {width: 15}, {width: 15}, {width: 15}, {width: 15}, {width: 20}];
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

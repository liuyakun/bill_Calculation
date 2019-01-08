/**
* 描述：首页
*/
<style lang="scss">
  @import 'index';
</style>
<template>
  <div class="content" style="height: 90%;">
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
      <div class="row-price" v-for="item,index in testData" :key="index" :class="index===0?'today-background':''">
        <div class="row-one-content"><span>{{item.date}}</span></div>
        <div class="row-one-content"><span>{{item.totalList}}</span></div>
        <div class="row-one-content"><span>{{item.totalIncome}}</span></div>
        <div class="row-one-content"><span>{{item.totalLoan}}</span></div>
        <div class="row-one-content"><span>{{item.moreThan}}</span></div>
        <div class="row-one-content"><span>{{item.surplus}}</span></div>
        <div class="row-one-content"><span>{{item.actualReceipts}}</span></div>
        <div class="row-one-content"><span>{{item.difference}}</span></div>
        <div class="row-one-content"><span>{{item.remark}}</span></div>
        <div class="clear"></div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="business-main">
      <div class="business-main-content" v-for="item,index in testData2" :key="index">
        <div class="business-main-content-name"><span>{{item.businessName}}</span></div>
        <div class="business-main-content-title">
          <div class="row-one-content"><span>单</span></div>
          <div class="row-one-content"><span>应收</span></div>
          <div class="row-one-content"><span>放</span></div>
          <div class="row-one-content"><span>实收</span></div>
          <div class="row-one-content"><span>余</span></div>
        </div>
        <div class="business-main-content-price">
          <div class="row-one-content"><span>{{item.price.list}}</span></div>
          <div class="row-one-content"><span>{{item.price.receivable}}</span></div>
          <div class="row-one-content"><span>{{item.price.loan}}</span></div>
          <div class="row-one-content">
            <span v-if="!item.isUpdate">{{item.price.receipts}}</span>
            <InputNumber style="width: 50px" v-else :max="1000000000" :min="1" v-model="item.price.receipts"></InputNumber>
            <i v-show="!item.isUpdate" style="margin-left: 3px;cursor: pointer;" class="el-icon-edit" @click="item.isUpdate = true"></i>
            <i v-show="item.isUpdate" style="margin-left: 3px;cursor: pointer;color: #11b95c;" class="el-icon-check" @click="receiptsSubmit(index)"></i>
          </div>
          <div class="row-one-content"><span>{{item.price.surplus}}</span></div>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        testData: [
          {date: '2019-01-06', totalList: 80, totalIncome: 19888, totalLoan: 25558, moreThan: 90, surplus: 50, actualReceipts: 20000, difference: 20, remark: '11111'},
          {date: '2019-01-06', totalList: 80, totalIncome: 19888, totalLoan: 25558, moreThan: 90, surplus: 50, actualReceipts: 20000, difference: 20, remark: '11111'},
          {date: '2019-01-06', totalList: 80, totalIncome: 19888, totalLoan: 25558, moreThan: 90, surplus: 50, actualReceipts: 20000, difference: 20, remark: '11111'},
          {date: '2019-01-06', totalList: 80, totalIncome: 19888, totalLoan: 25558, moreThan: 90, surplus: 50, actualReceipts: 20000, difference: 20, remark: '11111'},
          {date: '2019-01-06', totalList: 80, totalIncome: 19888, totalLoan: 25558, moreThan: 90, surplus: 50, actualReceipts: 20000, difference: 20, remark: '11111'},
          {date: '2019-01-06', totalList: 80, totalIncome: 19888, totalLoan: 25558, moreThan: 90, surplus: 50, actualReceipts: 20000, difference: 20, remark: '11111'},
          {date: '2019-01-06', totalList: 80, totalIncome: 19888, totalLoan: 25558, moreThan: 90, surplus: 50, actualReceipts: 20000, difference: 20, remark: '11111'},
          {date: '2019-01-06', totalList: 80, totalIncome: 19888, totalLoan: 25558, moreThan: 90, surplus: 50, actualReceipts: 20000, difference: 20, remark: '11111'}
        ],
        testData2: [
          {businessName: '1111111111', price: {list: 8, receivable: 3325, loan: 3325, receipts: 3335, surplus: 25}, isUpdate: false},
          {businessName: '222222222', price: {list: 8, receivable: 3325, loan: 3325, receipts: 3335, surplus: 25}, isUpdate: false},
          {businessName: '33333', price: {list: 8, receivable: 3325, loan: 3325, receipts: 3335, surplus: 25}, isUpdate: false},
          {businessName: '444444', price: {list: 8, receivable: 3325, loan: 3325, receipts: 3335, surplus: 25}, isUpdate: false}
        ]
      };
    },
    methods: {
      receiptsSubmit (index) {
        let result = this.testData2[index];
        this.testData2[index].isUpdate = false;
        console.log(result);
      }
    }
  };
</script>

/**
*	描述：分页组件
*/
<template>
  <div class="padding">
    <ul class="pagination" :class="[`pagination-${size}`]">
      <li class="first" :class="{'disabled': internalCurrentPage == 1}">
        <a href="javascript:void(0)" @click="go(1)">首页</a>
      </li>
      <li
        class="end"
        v-show="hasPrevious">
        <a href="javascript:void(0)" @click="prev()">上一页</a>
      </li>
      <li :class="{'active': internalCurrentPage == i}"
          v-for="(i, index) in pages" :key="index">
        <a href="javascript:void(0)" class="page_btn" @click="go(i)">{{i}}</a>
      </li>
      <li class="end" v-show="hasNextVar">
        <a href="javascript:void(0)" @click="next()">下一页</a>
      </li>
      <li class="end" :class="{'disabled': internalCurrentPage == totalPage}">
        <a href="javascript:void(0)" @click="go(totalPage)">尾页</a>
      </li>
      <li class="end disabled" v-if="showTotal">
        <a href="javascript:void(0)">共{{totalElement}}条</a>
      </li>
    </ul>
  </div>
</template>
<script>
  function oneOf (val, arr) {
    let item = arr.filter(item => item === val);
    return !!item.length;
  }

  export default {
    name: 'hyPage',
    data () {
      return {
        internalCurrentPage: 1
      };
    },
    props: {
      // 当前页
      currentPage: {
        type: Number,
        default: 1
      },
      // 展示多少
      showItem: {
        type: Number,
        default: 5
      },
      limit: {
        type: Number,
        default: 10
      },
      totalElement: {
        type: Number,
        default: 0
      },
      size: {
        validator (val) {
          return oneOf(val, ['small', 'normal', 'tiny']);
        },
        default: 'normal'
      },
      showTotal: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      totalPage: function () {
        return Math.ceil(this.totalElement / this.limit);
      },
      pages: function () {
        let pages = [];
        if (this.internalCurrentPage < this.showItem) {
          let i = Math.min(this.showItem, this.totalPage);
          while (i) {
            pages.unshift(i--);
          }
        } else {
          let middle = this.internalCurrentPage - Math.floor(this.showItem / 2);
          let i = this.showItem;
          let calc = this.totalPage - this.showItem;
          if (middle > calc) {
            middle = calc + 1;
          }
          while (i--) {
            pages.push(middle++);
          }
        }
        return pages;
      },
      hasPrevious: function () {
        return this.internalCurrentPage > 1;
      },
      hasNextVar: function () {
        return this.internalCurrentPage < this.totalPage;
      }
    },
    methods: {
      next () {
        if (this.hasNextVar) {
          this.internalCurrentPage++;
          this.load();
        }
      },
      go (currentPage) {
        if (this.internalCurrentPage === currentPage) return;
        this.internalCurrentPage = currentPage;
        this.load();
      },
      prev () {
        if (this.hasPrevious) {
          this.internalCurrentPage--;
          this.load();
        }
      },
      load () {
        this.$emit('current-change', this.internalCurrentPage);
      }
    },
    watch: {
      'currentPage': {
        immediate: true,
        handler (val) {
          this.internalCurrentPage = val;
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import 'src/styles/vars';
  $background-color: #F1F1F1;
  $active-bg: #47bac2;
  $focus-bg: #3399CC;

  .padding {
    padding: 15px;
    text-align: right;
    .pagination {
      display: inline-block;
      user-select: none;
      &.pagination-normal > li > a{
        padding: 6px 12px;
        &.page_btn {
          width: 31px;
          height: 31px;
          padding: 6px 0;
        }
      }
      &.pagination-tiny > li > a{
        padding: 4px 10px;
        &.page_btn {
          width: 26px;
          height: 26px;
          padding: 4px 0;
        }
      }
      li {
        border: 1px solid $background-color;
        border-radius: 100%;
        background: $background-color;
        float: left;
        margin:0 5px;
        a {
          display: block;
          text-align: center;
          // padding: 6px 12px;
          border-radius: 100%;
          color: #989a9c;
          cursor: pointer;
        }
        &:hover,
        &:focus {
          border-color: $focus-bg;
          background: $focus-bg;
          a {
            color: #FFF;
            i {
              color: #FFF;
            }
          }
        }
        &:active {
          background: $active-bg;
          border-color: $active-bg;
          color: #fff;
        }
        &.active {
          border-color: $active-bg;
          background: $active-bg;
          &:hover,
          &:focus {
            border-color: $focus-bg;
            background: $focus-bg;
            a {
              color: #FFF;
              i {
                color: #FFF;
              }
            }
          }
          &:active {
            background: $active-bg;
            border-color: $active-bg;
            color: #fff;
          }
          a {
            color: #FFF;
            i {
              color: #FFF;
            }
          }
        }
        &.first,
        &.end {
          border-radius: 16px;
          border-color: $active-bg;
          background: $active-bg;
          &:focus,
          &:hover {
            border-color: $focus-bg;
            background: $focus-bg;
            a {
              color: #FFF;
              i {
                color: #FFF;
              }
            }
          }
          &:active {
            background: $active-bg;
            border-color: $active-bg;
            color: #fff;
          }
          a {
            color: #FFFFFF;
            width: auto;
            height: auto;
            line-height: 1.5;
            // padding: 7px 14px;
          }
        }
        &.disabled,
        &.disabled:hover {
          background: #EEEEEE;
          border-color: #EEEEEE;
          a {
            cursor: not-allowed;
            color: #97a1ac;
          }
        }
      }
    }
  }
  .icon-pre {
    position: relative;
    left: -1px;
    color: #97A1AC;
  }
  .icon-next {
    position: relative;
    left: 1px;
    color: #97A1AC;
  }
</style>

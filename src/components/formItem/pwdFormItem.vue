<style lang="scss" scoped>
</style>
<template>
  <div style="transform: translateX(0%) translateZ(0px);">
    <template v-for="f in formRow">
      <FormItem :label="f.title" :prop="f.key">
        <i-input v-model.trim="form[f.key]" :placeholder="f.title"
                 v-if="!f.type || f.type === 'text' || f.type === 'password' || f.type === 'textarea'"
                 onpaste="return false"
                 :type="f.type?f.type:'text'" :disabled="isProperty(f.property,'disabled')"></i-input>
        <i-select v-model="form[f.key]" :placeholder="f.title" filterable clearable v-if="f.type === 'select'"
                  :disabled="isProperty(f.property,'disabled')" :multiple="isProperty(f.property,'multiple')"
                  :remote-method="f.remoteMethod">
          <Option v-for="item in f.array" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
        </i-select>
        <!--<hy-select2 v-if="f.type === 'select2'" v-model="form[f.key]"
                    :defaultValue="form[f.defaultValue]"
                    :defaultLabel="form[f.defaultLabel]"
                    :selectArray="f.array"></hy-select2>-->
        <DatePicker v-model="form[f.key]" :placeholder="f.title"
                    v-if="f.type === 'date' || f.type === 'daterange' || f.type === 'datetime' || f.type === 'datetimerange'"
                    :type="f.type" :format="isProperty(f.property, 'format')"
                    :placement="isProperty(f.property, 'placement')"
                    :editable="false" @on-change="form[f.key]=$event"></DatePicker>
        <RadioGroup v-model="form[f.key]" v-if="f.type === 'radio'">
          <template v-for="item in f.array">
            <Radio :label="item.value">{{item.label}}</Radio>
          </template>
        </RadioGroup>
        <Upload :ref="f.key" :action="f.action" v-if="f.type === 'upload'" :headers="headers"
                :on-success="uploadSuccess" :on-remove="fileRemove">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
        <Cascader v-model="form[f.key]" v-if="f.type === 'cascader'" :data="f.array"></Cascader>
      </FormItem>
    </template>
  </div>
</template>
<script>
  import HySelect2 from '@/components/common/select2/select2';

  export default {
    name: 'pwdFormItem',
    components: {HySelect2},
    data () {
      return {
        headers: {
          'x-access-token': this._hyTool.getStore('token')
        }
      };
    },
    props: {
      form: Object,
      formRow: Array
    },
    created () {
    },
    methods: {
      // 上传成功后传值给form对象
      uploadSuccess () {
        for (let i in this.$refs) {
          if (this.$refs.hasOwnProperty(i)) {
            if (this.$refs[i][0]) {
              this.form[i] = this.$refs[i][0].fileList[0].response.data.filePath + this.$refs[i][0].fileList[0].response.data.fileName;
              this.form[i + '_size'] = this.$refs[i][0].fileList[0].response.data.fileSize;
            }
          }
        }
      },
      // 移除文件时触发
      fileRemove () {
        for (let i in this.$refs) {
          if (this.$refs.hasOwnProperty(i)) {
            this.form[i] = '';
          }
        }
      },
      // 判断是否有此属性
      isProperty (pro, attr) {
        // 如果想要的属性存在 返回该属性值
        if (pro) {
          if (pro[attr]) {
            return pro[attr];
          }
        }
        // 不存在返回默认值
        switch (attr) {
          case 'placement': {
            return 'bottom';
          }
          case 'disabled': {
            return false;
          }
          case 'multiple': {
            return false;
          }
        }
      }
    }
  };
</script>

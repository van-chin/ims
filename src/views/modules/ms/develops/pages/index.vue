<template>
<!--  {{ rule }}-->
  <form-create v-model="value" v-model:api="fApi" :rule="rule" :option="option"></form-create>
</template>

<script lang="ts" setup>



//实例对象
const  fApi =  {};
//表单数据
const  value = {};
//表单生成规则
const rule = [
  {
    type: "select",
    field: "cate_id",
    title: "产品分类",
    value: '',
    options: [
      {"value": "104", "label": "生态蔬菜", "disabled": false},
      {"value": "105", "label": "新鲜水果", "disabled": false},
    ],
    props: {
      multiple: false,
      placeholder:"请选择门店",
      width:'300px',
      style:{
        width:'300px',
      }
    },
  },

  {
    type: 'input',
    field: 'goods_name',
    props: {
      type: "text",
      placeholder:"ddd",
    },

  },

  {
    type: 'datePicker',
    field: 'created_at',
  }
];
    //组件参数配置
    const    option = {
      form:{
        layout: 'inline',
        title: false
      },

  //表单提交事件
  onSubmit: function (formData:any) {
    alert(JSON.stringify(formData))
  }
};

defineOptions({
  name:'develops',
})




</script>

<style lang="less" scoped>
.workbench {
  border: 1px solid gray;
  height: 2000px;
}
</style>



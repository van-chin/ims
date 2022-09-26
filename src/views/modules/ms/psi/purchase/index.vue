<template>
  <div class="workbench">

<!--    {{ states.lists }}-->

    <div class="flex justify-between">
      <form-create v-model="value" v-model:api="fApi" :rule="rule" :option="option"></form-create>

      <a-space>
        <a-button @click="onStorage">入库</a-button>
        <a-button>导出</a-button>
      </a-space>
    </div>



    <div class="mt-16px">
      <a-table
          :pagination="false"
          :dataSource="states.lists" bordered :columns="states.columns"
          :row-selection="{ selectedRowKeys: [], }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
          <span>
            <a>编辑</a>
            <a-divider type="vertical" />
            <a @click="onStockUp">备货</a>
            <a-divider type="vertical" />
          </span>
          </template>
        </template>
        <template #footer>
          <div class="flex justify-between ">
            <div>
              <a-space>
                <a-button type="primary" @click="onStockUp">备货</a-button>
<!--                <a-button >其他操作</a-button>-->
              </a-space>
            </div>
            <div>
              <a-pagination  v-bind="states.paginations" @change="onPaginationChange" />
            </div>
          </div>
        </template>
      </a-table>


    </div>






  </div>


  <a-modal v-model:visible="storageVisible" title="入库" width="1000px" >
    <div >
      <div  class="mb-4">
        <a-alert
            closable
            message="需求说明"
            description="入库 可以手动录入 条（形）码，或通过扫码抢 扫描录入 条（形）码，录入之后通过 入列 按钮或自动 把 条（形）码 做为参数请求相关接口后，把返回的数据 插入到 待入库列表 中"
            type="info"
        />
      </div>

      <a-input-search
          placeholder="请输入条形码或用扫码抢进行扫描"
          enter-button="入列"
      />
    </div>
    <a-table class="mt-4" :dataSource="dataSource" bordered :columns="columns"
             :row-selection="{ selectedRowKeys: [], }"
    >
      <template #title>
        待入库列表
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <span>
            <a>删除</a>


          </span>
        </template>
      </template>
      <template #footer>
        <div class="flex justify-between ">
          <div>
            <a-space>
              <a-button type="primary">删除</a-button>
            </a-space>
          </div>
          <div>
            <a-pagination :current="1" show-quick-jumper show-size-changer :total="500" />
          </div>
        </div>
      </template>
    </a-table>

    <template #footer>
      <a-tooltip placement="topLeft" title="取消时，需要有，确认提示" arrow-point-at-center>
        <a-button key="back" @click="storageVisible = false">取消</a-button>
      </a-tooltip>

      <a-tooltip placement="topLeft" title="入库时，同样需要有 确认提示，确认入库之后，入库按钮需要有 loading 效果，入库完成之后，提示入库结果，并关闭入库弹窗" arrow-point-at-center>
        <a-button key="submit" type="primary" @click="storageVisible = false"  >入库</a-button>
      </a-tooltip>


    </template>
  </a-modal>


  <a-modal v-model:visible="stockUpVisible" title="备货" width="1000px" >
    <div >
      <div  class="mb-4">
        <a-alert
            closable
            message="需求说明"
            description="备货打码 1. 选择一个 出货客户（门店）2.确认已选择的物品/商品 名称、数量等信息生成 条码、二维码标签"
            type="info"
        />
      </div>

      <a-select
          ref="select"

          style="width: 100%"

      >
        <a-select-option value="740">绵阳-华医惠康谨肤凯德店</a-select-option>
        <a-select-option value="687">成都天府三街美肤中心</a-select-option>
        <a-select-option value="615">乐山-东坡店-华医惠康美肤中心</a-select-option>
        <a-select-option value="101">其他客户门店...1</a-select-option>
        <a-select-option value="101">........</a-select-option>
        <a-select-option value="101">其他客户门店...N</a-select-option>
      </a-select>
    </div>

    <a-table class="mt-4" :dataSource="stockUpDataSource" bordered :columns="stockUpColumns"
             :row-selection="{ selectedRowKeys: [], }"
    >
      <template #title>
        已选择的商品货物列表
      </template>
      <template #bodyCell="{ column, record }">


        <template v-if="column.key === 'out_quantity'">
          <a-input-number id="inputNumber" size="small" :min="1" :max="10" />
        </template>
        <template v-if="column.key === 'action'">
          <span>
            <a>删除</a>
          </span>
        </template>
      </template>

      <template #footer>
        <div class="flex justify-between ">
          <div>
            <a-space>
              <a-button type="primary">删除</a-button>
            </a-space>
          </div>
          <div>
            <a-pagination :current="1" show-quick-jumper show-size-changer :total="500" />
          </div>
        </div>
      </template>
    </a-table>

    <template #footer>
      <a-tooltip placement="topLeft" title="取消时，需要有，确认提示" arrow-point-at-center>
        <a-button key="back" @click="stockUpVisible = false">取消</a-button>
      </a-tooltip>
      <a-tooltip placement="topLeft" title="入库时，同样需要有 确认提示，确认入库之后，入库按钮需要有 loading 效果，入库完成之后，提示入库结果，并关闭入库弹窗" arrow-point-at-center>
        <a-button key="submit" type="primary" @click="stockUpVisible = false" >备货</a-button>
      </a-tooltip>
    </template>
  </a-modal>

</template>

<script lang="ts" setup>

import useGoodStore from "@/stores/modules/goodStore";
const goodStore = useGoodStore();
defineOptions({
  name:'purchaseIndex',
})



const loadList = (params:any) => {
  goodStore.getGoods(params);

  // goodStore.stockup({
  //   customer_id:1,
  //   storages:[
  //     {
  //       good_id:4,
  //       barcode:6901028042055,
  //       quantity:2,
  //     },
  //     {
  //       good_id:5,
  //       barcode:6901285991219,
  //       quantity:20,
  //     }
  //   ]
  // });


}

loadList({});

const states = computed(() => {
  return {
    lists: goodStore.lists,
    paginations:goodStore.paginations,
    columns:goodStore.columns,
  };
});

const onPaginationChange = async (page: number, pageSize: number) => {
  // let v = cuss.getFieldsValue()
  // page = parseInt(v.per_page) !== pageSize ? 1 : page;
  // await cuss.setFieldsValue({
  //   page,
  //   per_page: pageSize,
  // });
  loadList({
    page:1,
    per_page:pageSize,
  })
}

//实例对象
const  fApi =  {};
//表单数据
const  value = {};
//表单生成规则
const rule = [
  {
    type:"cascader",
    title:"商品分类",
    field:"category_id",
    value:[],
    props:{
      placeholder:'商品分类',
      options:[{
        value: 'beijing',
        label: '存货类',
        children: [
          {
            value: 'gugong',
            label: '口腔药品'
          },
          {
            value: 'tiantan',
            label: '药品'
          },
          {
            value: 'wangfujing',
            label: '微针'
          }
        ]
      }, {
        value: 'jiangsu',
        label: '耗材类',
        children: [
          {
            value: 'nanjing',
            label: '口腔耗材',
            children: [
              {
                value: 'fuzimiao',
                label: '理疗耗材',
              }
            ]
          },
          {
            value: 'suzhou',
            label: '办公类',
            children: [
              {
                value: 'zhuozhengyuan',
                label: '工作服',
              },
              {
                value: 'shizilin',
                label: '日常用品',
              }
            ]
          }
        ]
      }]
    }
  },
  {
    type: "select",
    field: "supplier_id",
    title: "供应商",
    value: '成都聚兴诚科技有限公司',
    options: [
      {"value": "104", "label": "四川美笑脸医疗器械有限公司", "disabled": false},
      {"value": "105", "label": "上药控股四川生物制品有限公司", "disabled": false},
      {"value": "106", "label": "成都聚兴诚科技有限公司", "disabled": false},
    ],
    props: {
      placeholder:'供应商',
      width:'300px',
      style:{
        width:'300px',
      }
    },
  },

  {
    type: 'input',
    field: 'keywords',
    props: {
      type: "text",
      placeholder:" 可按 条码/名称/品牌 搜索",
    },
  },
];
//组件参数配置
const    option = {
  form:{
    layout: 'inline',
    title: false
  },

  submitBtn:{
    innerText:'查询'
  },

  //表单提交事件
  onSubmit: function (formData:any) {
    console.info('data =>',JSON.stringify(formData));
    loadList(formData);
  }
};

const storageVisible = ref<boolean>(false);
const stockUpVisible = ref<boolean>(false);

const onStorage = () => {

  storageVisible.value = true;
}

const onStockUp = () => {

  stockUpVisible.value = true;
}

const dataSource = [
  {
    id: '1',
    bar_code:'123456789',
    in_quantity:1,
    category: '存货类 / 酸类',
    name: '芯丝翠20%甘醇酸',
    quantity: 199,
  },
  {
    id: '2',
    bar_code:'123456789',
    in_quantity:2,
    category: '存货类 / 妆品',
    name: '芯丝翠20%甘醇酸',
    quantity: 199,
  },
];

const labelSource = [
  {
    id: '1',
    bar_code:'123456789',
    in_quantity:1,
    category: '存货类 / 酸类',
    name: '芯丝翠20%甘醇酸',
    quantity: 199,
  },
  {
    id: '2',
    bar_code:'123456789',
    in_quantity:2,
    category: '存货类 / 妆品',
    name: '芯丝翠20%甘醇酸',
    quantity: 199,
  },
];

const labelColumns =  [
  {
    title: '生成的条码数据',
    dataIndex: 'bar_code',
    key: 'bar_code',
  },
  {
    title: '生成的二维码数据',
    dataIndex: 'in_quantity',
    key: 'in_quantity',
  },
  // {
  //   title: '可使用次数',
  //   dataIndex: 'category',
  //   key: 'category',
  // },
  // {
  //   title: '是否激活',
  //   dataIndex: 'name',
  //   key: 'name',
  // },
  // {
  //   title: '库存量',
  //   dataIndex: 'quantity',
  //   key: 'quantity',
  // },

];

const stockUpDataSource = [
  {
    id: '1',
    bar_code:'123456789',
    in_quantity:1,
    category: '存货类 / 酸类',
    name: '芯丝翠20%甘醇酸',
    quantity: 199,
  },
  {
    id: '2',
    bar_code:'123456789',
    in_quantity:2,
    category: '存货类 / 妆品',
    name: '芯丝翠20%甘醇酸',
    quantity: 199,
  },
];

const columns =  [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '条码',
    dataIndex: 'barcode',
    key: 'barcode',
  },
  {
    title: '入库数量',
    dataIndex: 'in_quantity',
    key: 'in_quantity',
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '库存',
    dataIndex: 'stock',
    key: 'stock',
  },
  {
    title: '生产厂家',
    dataIndex: 'manufacturer',
    key: 'manufacturer',
  },
  {
    title: '品牌',
    dataIndex: 'brand',
    key: 'brand',
  },

  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '规格',
    dataIndex: 'specification',
    key: 'specification',
  },
  {
    title: '单位',
    dataIndex: 'unit',
    key: 'unit',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  },
];

const stockUpColumns =  [
  {
    title: '条码',
    dataIndex: 'bar_code',
    key: 'bar_code',
  },
  {
    title: '出库数量',
    dataIndex: 'out_quantity',
    key: 'out_quantity',
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '库存量',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: '...',
    dataIndex: 'address',
    key: 'address',
  },

  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  },
];

</script>

<style lang="less" scoped>
.workbench {
  //border: 1px solid gray;
  //height: 2000px;
}
</style>



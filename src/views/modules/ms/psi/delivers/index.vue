<template>
  <div class="workbench">

    <div class="flex justify-between">
      <form-create v-model="value" v-model:api="fApi" :rule="rule" :option="option"></form-create>
      <a-space>
<!--        <a-button @click="onStorage">入库</a-button>-->
<!--        <a-button>导出</a-button>-->

        <a-button @click="pickup" >备货</a-button>
      </a-space>
    </div>

    <div class="mt-16px">
      <a-table
          :pagination="false"
          row-key="id"
          :dataSource="states.lists" bordered :columns="states.columns"
               :row-selection="{ selectedRowKeys: [], }"
      >

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
          <span>
            <a>查看</a>
            <a-divider type="vertical" />
            <a>取消</a>
             <a-divider type="vertical" />
             <a>下载</a>

            <a-divider type="vertical" />
            <a @click="onStockUp">发货</a>

          </span>
          </template>
        </template>
        <template #expandedRowRender="{ record }">
          <p style="margin: 0">
            <a-table :dataSource="record.labels" bordered :columns="states.labelColumns" >
              <template #bodyCell="{ column, record,text }">

                <template v-if="column.key === 'qrcode'">

                  <a-tooltip>
                    <template #title>
                     {{ text }}
                    </template>
                    <a-avatar shape="square" :size="64" :src="record.qrcode_url">

                    </a-avatar>

                  </a-tooltip>


<!--                  {{ text }}-->
                </template>
                <template v-if="column.key === 'disabled'">
                  {{ text === true ? '是' : '否'}}
                </template>
                <template v-if="column.key === 'activate'">

                  {{ text === true ? '是' : '否'}}
                </template>
              </template>
            </a-table>


          </p>
        </template>
        <template #footer>
          <div class="flex justify-between ">
            <div>
              <a-space>
                <a-button  @click="onStockUp">取消</a-button>
                <a-button  @click="onStockUp">发货</a-button>
<!--                <a-button >其他操作</a-button>-->
              </a-space>
            </div>
            <div>
              <a-pagination :current="1" show-quick-jumper show-size-changer :total="500" />
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


  <a-modal v-model:visible="stockUpVisible" title="发货" width="1200px" >
    <div >
      <div  class="mb-4">
        <a-alert
            closable
            message="需求说明"
            description="选择一条或多条 备货单 进行发货 可选输入物流单号"
            type="info"
        />
      </div>


    </div>

    <a-table class="mt-4"

             :pagination="false"

             :dataSource="stockUpDataSource" bordered :columns="stockUpColumns"
             :row-selection="{ selectedRowKeys: [], }"
    >
      <template #title>
        已选择的备货单列表
      </template>
      <template #bodyCell="{ column, record }">


        <template v-if="column.key === 'tracking_company'">
          <a-select
              placeholder="请选择物流公司"
              size="small"
              allow-clear
              style="width: 100px;"
          >
            <a-select-option value="740">顺丰速运</a-select-option>
            <a-select-option value="687">邮政EMS</a-select-option>
            <a-select-option value="615">圆通快递</a-select-option>
            <a-select-option value="101">申通快递</a-select-option>
            <a-select-option value="101">........</a-select-option>
            <a-select-option value="101">韵达快递</a-select-option>
          </a-select>
        </template>

        <template v-if="column.key === 'tracking_no'">
          <a-input id="tracking_no" allow-clear size="small" placeholder="请输入物流单号" />
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



import usePickngStore from "@/stores/modules/pickingStore";
import useGoodStore from "@/stores/modules/goodStore";
const pickngStore = usePickngStore();
const goodStore = useGoodStore();
defineOptions({
  name:'purchaseIndex',
})

// With async/await
// const generateQR = async text => {
//   console.info('text =>',text);
//   try {
//     console.log(await QRCode.toDataURL(text))
//   } catch (err) {
//     console.error(err)
//   }
// }



// generateQR(123);

const pickup = () => {
  goodStore.stockup({
    customer_id:1,
    storages:[
      {
        good_id:4,
        barcode:6901028042055,
        quantity:2,
      },
      {
        good_id:5,
        barcode:6901285991219,
        quantity:20,
      }
    ]
  });
}

const loadList = (params:any) => {
  pickngStore.getPickings(params);

}

loadList({});

const states = computed(() => {
  return {
    lists: pickngStore.lists,
    paginations:pickngStore.paginations,
    columns:pickngStore.columns,
    labelColumns:pickngStore.labelColumns,
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
    type: "select",
    field: "supplier_id",
    value: '绵阳-华医惠康谨肤凯德店',
    options: [
      {"value": "740", "label": "绵阳-华医惠康谨肤凯德店", "disabled": false},
      {"value": "687", "label": "成都天府三街美肤中心", "disabled": false},
      {"value": "615", "label": "乐山-东坡店-华医惠康美肤中心", "disabled": false},
    ],
    props: {
      placeholder:'客户/门店',
      width:'300px',
      style:{
        width:'300px',
      }
    },
  },

  {
    type: "RangePicker",
    field: "section_day",
    title: "活动日期",
    value: ['2018-02-20 12:12:12', '2018-03-20 12:12:12'],
    props: {
      type: "datetimerange",
      placeholder:['备货开始时间','备货结束时间'],
    }
  },

  {
    type: 'input',
    field: 'keywords',
    props: {
      type: "text",
      placeholder:" 可按 条码/名称/批次号 搜索",
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
    alert(JSON.stringify(formData))
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
    batch_no:'20220916123213',
    shop:'成都天府三街美肤中心',
    bar_code:'123456789',
    in_quantity:3,
    category: '存货类 / 酸类',
    name: '芯丝翠20%甘醇酸',
    quantity: 199,
  },
  {
    id: '2',
    batch_no:'20220916123213',
    shop:'成都天府三街美肤中心',
    bar_code:'123456789',
    in_quantity:2,
    category: '存货类 / 妆品',
    name: '芯丝翠20%甘醇酸',
    quantity: 199,
  },
];

const labelSource = [
  {
    id: 1,
    bar_code:'123456789',
    use_number:10,
    used_number:2,
    capacity:'100ML',
    disabled:true,
    activate:false,
    in_quantity:1,
    category: '存货类 / 酸类',
    name: '芯丝翠20%甘醇酸',
    quantity: 199,
  },
  {
    id: 2,
    bar_code:'123456789',
    use_number:10,
    used_number:2,
    capacity:'100ML',
    disabled:false,
    activate:true,
    in_quantity:1,
    category: '存货类 / 酸类',
    name: '芯丝翠20%甘醇酸',
    quantity: 199,
  },
  {
    id: 3,
    bar_code:'123456789',
    use_number:10,
    used_number:2,
    capacity:'100ML',
    disabled:false,
    activate:true,
    in_quantity:1,
    category: '存货类 / 酸类',
    name: '芯丝翠20%甘醇酸',
    quantity: 199,
  },
];




// <a-select-option value="740">绵阳-华医惠康谨肤凯德店</a-select-option>
//     <a-select-option value="687">成都天府三街美肤中心</a-select-option>
//     <a-select-option value="615">乐山-东坡店-华医惠康美肤中心</a-select-option>
//     <a-select-option value="101">其他客户门店...1</a-select-option>
// <a-select-option value="101">........</a-select-option>
// <a-select-option value="101">其他客户门店...N</a-select-option>

const stockUpDataSource = [
  {
    id: '1',
    bar_code:'123456789',
    batch_no:'20220916123213',
    shop:'绵阳-华医惠康谨肤凯德店',
    out_quantity:10,
    in_quantity:1,
    category: '存货类 / 酸类',
    name: '芯丝翠20%甘醇酸',
    quantity: 199,
  },
  {
    id: '2',
    bar_code:'123456789',
    batch_no:'20220916123213',
    shop:'成都天府三街美肤中心',
    out_quantity:10,
    in_quantity:1,
    category: '存货类 / 酸类',
    name: '芯丝翠20%甘醇酸',
    quantity: 199,
  },
];

const columns =  [
  {
    title: '备货批次号',
    dataIndex: 'batch_no',
    key: 'batch_no',
  },
  {
    title: '出库门店',
    dataIndex: 'shop',
    key: 'shop',
  },
  {
    title: '条码',
    dataIndex: 'bar_code',
    key: 'bar_code',
  },
  {
    title: '出库数量',
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
    title: '...',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '品牌',
    dataIndex: 'address',
    key: 'address',
  },

  {
    title: '...',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '规格',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  },
];

const stockUpColumns =  [
  {
    title: '备货批次号',
    dataIndex: 'batch_no',
    key: 'batch_no',
  },
  {
    title: '出库门店',
    dataIndex: 'shop',
    key: 'shop',
  },
  {
    title: '条码',
    dataIndex: 'bar_code',
    key: 'bar_code',
  },
  {
    title: '出库数量',
    dataIndex: 'out_quantity',
    key: 'out_quantity',
    align:'center'
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
    title: '...',
    dataIndex: 'address',
    key: 'address',
  },

  {
    title: '物流分司',
    dataIndex: 'tracking_company',
    key: 'tracking_company',
  },

  {
    title: '物流单号',
    dataIndex: 'tracking_no',
    key: 'tracking_no',
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



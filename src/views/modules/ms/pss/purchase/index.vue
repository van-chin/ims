<template>
  <a-row
      :gutter="16"
      class="filters table-filter-bar"
      type="flex"
      justify="space-between"
      align="middle"
  >
    <a-col class="inline-form" :span="20">
      <a-form layout="inline">
        <a-form-item>
          <a-space direction="vertical" :size="12">
            <a-cascader
                placeholder="物料分类"
                style="width: 300px"
                @change="filtersCategoryIdsChange"
                v-model:value="filterData.category_ids"
                :field-names="{
                label: 'name',
                value: 'id',
                children: 'children',
              }"
                :options="states.materialCategories"
            />
          </a-space>
        </a-form-item>
      </a-form>
    </a-col>
    <a-col class="right-action" :span="4">
      <a-button type="primary" v-privilege="258" @click="enterTheWarehouse"
      >入库</a-button
      >
    </a-col>
  </a-row>
  <div>
    <a-table
        :row-selection="{
        selectedRowKeys: state.selectedRowKeys,
        onChange: onSelectChange,
      }"
        bordered
        :data-source="dataSource"
        :columns="columns"
        id="table"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'name'">
          <div class="editable-cell">
            <div
                v-if="editableData[record.key]"
                class="editable-cell-input-wrapper"
            >
              <a-input
                  v-model:value="editableData[record.key].name"
                  @pressEnter="save(record.key)"
              />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || ' ' }}
            </div>
          </div>
        </template>
        <template v-if="column.dataIndex === 'barcode'">
          <div class="editable-cell">
            <div
                v-if="editableData[record.key]"
                class="editable-cell-input-wrapper"
            >
              <a-input
                  v-model:value="editableData[record.key].barcode"
                  @pressEnter="save(record.key)"
              />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || ' ' }}
            </div>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <a @click="edit(record.key)"> 编辑 </a><a-divider type="vertical" />
          <a @click="save(record.key)"> 保存 </a><a-divider type="vertical" />
          <a-popconfirm
              v-if="dataSource.length"
              title="确认删除该条数据吗?"
              @confirm="onDelete(record.key)"
          >
            <a>删除</a>
          </a-popconfirm>
        </template>
      </template>
      <!-- <template #title> header栏 </template> -->
      <template #footer>
        <a-button
            type="primary"
            :disabled="!hasSelected"
            :loading="state.loading"
            @click="start"
        >
          发货 </a-button
        ><a-divider type="vertical" />
        <!-- <a-button
          class="editable-add-btn"
          style="margin-bottom: 8px"
          @click="handleAdd"
          >增加行</a-button
        ><a-divider type="vertical" /> -->
        <span>
          <template v-if="hasSelected">
            {{ `已选中 ${state.selectedRowKeys.length} 项` }}
          </template>
          <template v-else> 已选中0项 </template>
        </span>
      </template>
    </a-table>
  </div>
  <a-modal
      :mask-closable="false"
      v-model:visible="showWarehouse"
      title="扫码入库"
      width="1200px"
      @ok="handleOk"
  >
    <div class="container p-px-4">
      <a-form>
        <a-form-item>
          <a-alert
              description="可以手动录入条码或通过扫码抢扫描录入码"
              type="info"
              show-icon
          />
        </a-form-item>
        <a-form-item>
          <a-input-search
              placeholder="请输入条形码或用扫码抢进行扫描"
              enter-button="入库"
              @search="pressEnter"
          />
        </a-form-item>
        <a-form-item>
          <a-table
              bordered
              :data-source="inDataSource"
              :columns="columns2"
              id="table"
          >
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex === 'name'">
                {{ text || ' ' }}
              </template>
              <template v-if="column.dataIndex === 'Batch'">
                {{ text || ' ' }}
              </template>
              <template v-if="column.dataIndex === 'operation'">
                <a-popconfirm
                    v-if="dataSource.length"
                    title="确认删除该条数据吗?"
                    @confirm="onDelete(record.key)"
                >
                  <a>删除</a>
                </a-popconfirm>
              </template>
              <template v-if="column.dataIndex === 'inStock'">
                <a-input-number
                    @change="(e) => input(e, index)"
                    v-model:value="submitData[index].stock"
                    :min="1"
                />
              </template>
            </template>
            <template #title> 待入库列表 </template>
            <!-- <template #footer>
              <a-button
                type="primary"
                style="margin-bottom: 8px"
                @click="handleAdd"
                >增加行</a-button
              >
            </template> -->
          </a-table>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
  <a-modal
      ok-text="保存"
      cancel-text="取消"
      @ok="savePlan"
      :mask-closable="false"
      @cancel="cancelPlan"
      v-model:visible="showShip"
      title="备货"
      width="1200px"
  >
    <div class="container p-px-4">
      <a-form>
        <a-form-item>
          <a-alert description="选择要备货的门店" type="info" show-icon />
        </a-form-item>
        <a-form-item>
          <a-tree-select
              v-model:value="department_id"
              show-search
              style="width: 365px"
              placeholder="请选择门店"
              allow-clear
              :field-names="{ children: 'children', label: 'title', value: 'id' }"
              :default-value="null"
              tree-default-expand-all
              :tree-data="states.terminal"
          >
          </a-tree-select>
        </a-form-item>
        <a-form-item>
          <a-table
              bordered
              :data-source="shipDataSource"
              :columns="columns"
              id="table"
          >
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex === 'inStock'">
                <a-input-number
                    v-model:value="record.inStock"
                    :max="record.stock"
                    @change="(e) => input2(e, record.barcode, index)"
                />
              </template>
              <template v-if="column.dataIndex === 'operation'">
                <a-popconfirm
                    v-if="shipDataSource.length"
                    title="确认删除该条数据吗?"
                    @confirm="onDelete2(record.key)"
                >
                  <a>删除</a>
                </a-popconfirm>
              </template>
            </template>
            <template #title> 待入库列表 </template>
            <!-- <template #footer>
              <a-button
                type="primary"
                style="margin-bottom: 8px"
                @click="handleAdd"
                >增加行</a-button
              >
            </template> -->
          </a-table>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import * as dayjs from 'dayjs'
import * as XLSX from 'xlsx'
import useplansStore from '@/stores/modules/plans'
import { message } from 'ant-design-vue'
import usePlsStore from '@/stores/modules/pls'
import useCategoriesStore from '@/stores/modules/categoriesStore'

const PlsStore = usePlsStore()

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '条码',
    dataIndex: 'barcode',
    align: 'center',
  },
  {
    title: '入库数量',
    dataIndex: 'inStock',
    align: 'center',
  },
  {
    title: '分类',
    dataIndex: 'classification',
    align: 'center',
  },
  {
    title: '商品/货品名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '库存',
    dataIndex: 'stock',
    align: 'center',
  },
  {
    title: '生产厂家',
    dataIndex: 'manufacturer',
    align: 'center',
  },
  {
    title: '品牌',
    dataIndex: 'brand',
    align: 'center',
  },
  {
    title: '价格',
    dataIndex: 'price',
    align: 'center',
  },
  {
    title: '规格',
    dataIndex: 'specification',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: '20%',
  },
]
const columns2 = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '条码',
    dataIndex: 'barcode',
    align: 'center',
  },
  {
    title: '入库数量',
    dataIndex: 'inStock',
    align: 'center',
  },
  {
    title: '分类',
    dataIndex: 'classification',
    align: 'center',
  },
  {
    title: '商品/货品名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '库存',
    dataIndex: 'stock',
    align: 'center',
  },
  {
    title: '生产厂家',
    dataIndex: 'manufacturer',
    align: 'center',
  },
  {
    title: '品牌',
    dataIndex: 'brand',
    align: 'center',
  },
  {
    title: '价格',
    dataIndex: 'price',
    align: 'center',
  },
  {
    title: '规格',
    dataIndex: 'specification',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: '20%',
  },
]
const states = computed(() => {
  return {
    terminal: plansStore.terminals,
    materialCategories: categoriesStore.materialCategories,
  }
})
const dataSource = ref([])
const count = computed(() => dataSource.value.length + 1)
const editableData = reactive({})

const edit = (key: string) => {
  editableData[key] = cloneDeep(
      dataSource.value.filter((item) => key === item.key)[0]
  )
}

// 保存
const save = (key: string) => {
  Object.assign(
      dataSource.value.filter((item) => key === item.key)[0],
      editableData[key]
  )
  delete editableData[key]
}

// 删除
const onDelete = (key: string) => {
  inDataSource.value = inDataSource.value.filter((item) => item.key !== key)
}

const onDelete2 = (key: string) => {
  shipDataSource.value = shipDataSource.value.filter((item) => item.key !== key)
}

const now = dayjs().format('YYYY-MM-DD')
// 增加
const handleAdd = () => {
  const newData = {
    key: `${count.value}`,
    name: `Edward King ${count.value}`,
    barcode: '123456789',
    classification: '办公',
    inStock: 199,
    brand: '晨光',
    specification: '支',
  }
  dataSource.value.push(newData)
}
const ship = (a) => {
  console.log('🚀224行 a ➡️', a)
}
const ranges = {
  今天: () => {
    return [dayjs().startOf('day'), dayjs().endOf('day')]
  },
  昨天: () => {
    return [
      dayjs().startOf('day').subtract(1, 'day'),
      dayjs().endOf('day').subtract(1, 'day'),
    ]
  },
  前天: () => {
    return [
      dayjs().startOf('day').subtract(2, 'day'),
      dayjs().endOf('day').subtract(2, 'day'),
    ]
  },
  本周: () => {
    return [dayjs().startOf('week').add(1, 'day'), dayjs().endOf('day')]
  },
  上周: () => {
    return [
      dayjs().startOf('week').subtract(1, 'week').add(1, 'day'),
      dayjs().endOf('week').subtract(1, 'week').add(1, 'day'),
    ]
  },
  本月: () => {
    return [dayjs().startOf('month'), dayjs().endOf('day')]
  },
}
type Key = string | number
const state = reactive<{
  selectedRowKeys: Key[]
  loading: boolean
}>({
  selectedRowKeys: [], // Check here to configure the default column
  loading: false,
})
const hasSelected = computed(() => state.selectedRowKeys.length > 0)
const showShip = ref(false)
const shipDataSource = ref([])
const start = () => {
  state.loading = true
  showShip.value = true
  // ajax request after empty completing
  // setTimeout(() => {
  //   state.loading = false
  //   state.selectedRowKeys = []
  // }, 1000)
  console.log('🚀364行 ship1.value ➡️', ship1.value)
  shipDataSource.value = ship1.value
  state.loading = false
}

const ship1 = ref([])
const onSelectChange = (selectedRowKeys: Key[]) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys)
  state.selectedRowKeys = selectedRowKeys
  ship1.value = []
  dataSource.value.map((item) => {
    // console.log('🚀368行 item ➡️', item)
    item.key = item.id
    if (selectedRowKeys.includes(item.key)) {
      ship1.value.push(item)
    }
  })
  console.log('🚀375行 ship1.value ➡️', ship1.value)
}

const showWarehouse = ref(false)
const enterTheWarehouse = () => {
  showWarehouse.value = true
}

const inDataSource = ref([])

const submitData = ref([])
const pressEnter = async (e: number | string) => {
  console.log('🚀377行 e ➡️', e)
  const isExist = inDataSource.value.some((item) => item.barcode === e)
  if (isExist) {
    message.error('该商品已存在')
    return
  }
  const data1 = await PlsStore.fetch({ barcode: e })
  console.log('🚀516行 data1 ➡️', data1)
  const data = reactive({
    id: data1.id,
    key: data1.id,
    barcode: `${e}`,
    classification: data1.classification,
    name: data1.name,
    stock: data1.stock,
    manufacturer: data1.manufacturer,
    brand: data1.brand,
    price: data1.price,
    specification: data1.specification,
  })
  const newArr = inDataSource.value.concat(data)
  // console.log('🚀410行 newArr ➡️', newArr)
  submitData.value = []
  newArr.map((item) => {
    submitData.value.push({
      barcode: item.barcode,
      stock: 1,
    })
  })
  inDataSource.value = newArr
  console.log('🚀412行 inDataSource.value ➡️', inDataSource.value)
}
const filterData = ref({
  category_ids: [],
  department_id: '',
})
const department_id = ref('')
const plansStore = useplansStore()
plansStore.fetchTerminals()
const categoriesStore = useCategoriesStore()

const filtersCategoryIdsChange = (value) => {
  if (value) {
    filterData.value.category_ids = value[value.length - 1]
  } else {
    filterData.value.category_ids = undefined
  }
  console.log(
      '🚀563行 states.value.materialCategories ➡️',
      states.value.materialCategories
  )
}

const handleOk = () => {
  console.log('🚀589行 submitData.value ➡️', submitData.value)
  PlsStore.create(submitData.value)
      .then((res) => {
        console.log('🚀599行 res ➡️', res)
      })
      .catch((err) => {
        console.log('🚀601行 err ➡️', err)
        message.error(err)
      })
}

const input = (e, index) => {
  console.log('🚀521行 e ➡️', e)
  console.log('🚀523行 index ➡️', index)
  // inDataSource.value[index].stock = e
  // 复制inDataSource.value[index].barcode属性
  // submitData.value[index].stock = e
  // submitData.value[index].barcode = e
  // submitData.value[index].stock = e
  console.log('🚀597行 submitData.value ➡️', submitData.value)
}
const stockupdata = ref([])
const input2 = (e, i, index) => {
  console.log('🚀585行 e ➡️', e)
  console.log('🚀585行 i ➡️', i)
  stockupdata.value[index] = {
    barcode: i,
    stock: e,
  }

  console.log('🚀592行 stockupdata.value ➡️', stockupdata.value)
}
const savePlan = () => {
  PlsStore.stockup(stockupdata.value).catch((err) => {
    console.log('🚀601行 err ➡️', err)
    message.error(err)
  })
}
onMounted(() => {
  PlsStore.list().then((r) => {
    console.log('🚀551行 r ➡️', r)
    dataSource.value = []
    dataSource.value = r
    // dataSource.value 的key值等于id
    dataSource.value.map((item) => {
      item.key = item.id
    })
  })
  categoriesStore.fetchMaterialCategories({ pid: 361, is_show_tree: 1 })
})
</script>
<style lang="less">
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>

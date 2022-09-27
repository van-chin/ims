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
</template>

<script lang="ts" setup>
import usePlsStore from '@/stores/modules/pls'
import useCategoriesStore from '@/stores/modules/categoriesStore'

const PlsStore = usePlsStore()
const states = computed(() => {
  return {
    terminal: PlsStore.terminals,
    materialCategories: PlsStore.materialCategories,
  }
})

type Key = string | number

const state = reactive<{
  selectedRowKeys: Key[]
  loading: boolean
}>({
  selectedRowKeys: [], // Check here to configure the default column
  loading: false,
})
const hasSelected = computed(() => state.selectedRowKeys.length > 0)

const filterData = ref({
  category_ids: [],
  department_id: '',
})

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

const showWarehouse = ref(false)
const enterTheWarehouse = () => {
  showWarehouse.value = true
}
</script>

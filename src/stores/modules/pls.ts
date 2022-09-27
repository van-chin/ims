import { defineStore } from 'pinia'
import api from '@/api/modules/ihiss/pls'
import { pssHttp } from '@/utils/http/axios'
const usePlsStore = defineStore('pls', {
  state: () => {
    return {
      filtering: false,
      lists: [],
      pagination: {
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        showLessItems: true,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showTotal: (total: any) => {
          return `总共 ${total} 条数据`
        },
      },
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '顾客',
          dataIndex: 'user',
          key: 'user',
          // width: 250,
          slots: { customRender: 'user' },
        },
        {
          title: '回访人',
          dataIndex: 'admin',
          key: 'admin',
          slots: { customRender: 'admin' },
        },
        // {
        //   title: "会员",
        //   key: "user",
        //   dataIndex: "user",
        //   slots: { customRender: "user" },
        // },
        {
          title: '下次回访时间',
          key: 'next_time_at',
          dataIndex: 'next_time_at',
        },
        // {
        //   title: '回访状态',
        //   key: 'status',
        //   dataIndex: 'status',
        // },

        {
          title: '操作',
          key: 'action',
          slots: { customRender: 'action' },
        },
      ],
    }
  },

  actions: {
    async fetch(params: any) {
      const rs = await api.index(params)
      return rs
    },

    async create(params: any) {
      const rs = await api.create(params)
      return rs
    },
    async stockup(params: any) {
      const rs = await api.stockup(params)
      return rs
    },
    async update(params: any) {
      const rs = await api.update(params)
      return rs
    },
    async delete(params: any) {
      await api.delete(params)
    },

    // async show(params: any) {
    //   const rs = await pssHttp.get({
    //     url: `/pss/goods`,
    //   })
    //   console.log('🚀86行 rs ➡️', rs)
    //   this.lists = rs
    //   return rs
    // },
    async list(params: any) {
      const i = await api.show(params)
      console.log('🚀92行 i ➡️', i)
      return i
    },
  },
})
export default usePlsStore

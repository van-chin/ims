import { pssHttp as defHttp } from '@/utils/http/axios'
//回访计划接口
const resource = '/goods/barcode'

export default {
  //查询
  index: (payload: any) => {
    return defHttp.get(
      {
        url: resource,
        params: payload,
      },
      {
        isTransformResponse: true,
      }
    )
  },
  show: (payload: any) => {
    return defHttp.get(
      {
        url: '/goods',
        params: payload,
      },
      {
        isTransformResponse: true,
      }
    )
  },
  create: (payload: any) => {
    return defHttp.post({
      url: '/goods/storage',
      params: payload,
    })
  },
  stockup: (payload: any) => {
    return defHttp.post({
      url: '/goods/stockup',
      params: payload,
    })
  },
  update: (payload: any) => {
    return defHttp.put({
      url: `${resource}/${payload.id}`,
      params: payload,
    })
  },
  revisit: (payload: any) => {
    return defHttp.put({
      url: `${resource}/revisit`,
      params: payload,
    })
  },
  delete: (payload: any) => {
    return defHttp.delete({
      url: `${resource}/${payload.id}`,
    })
  },
}

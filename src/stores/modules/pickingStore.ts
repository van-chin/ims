import { defineStore } from "pinia";
// import type { ErrorMessageMode } from '/#/axios';
import {pickingListApi} from "@/api/modules/ms/pickingApi"

import type { adminInfo,LoginParams } from "@/models/adminModel"

import { NOT_FOUND_ROUTE } from "@/router/routes/basic";

import { listToTree } from "@/utils/helper/treeHelper";

import { getAuthCache, setAuthCache } from "@/utils/auth";


import {
    ACCESS_TOKEN_KEY,
    USER_INFO_KEY,
    NAV_MENUS_KEY,
    VIEW_NODES_KEY,
    AUTH_OPERATIONS,
} from "@/enums/cacheEnum";
// import { UserInfo, AdminInfo } from "#/stores";
import type { RoleEnum } from "@/enums/roleEnum";

import { router } from "@/router";

import { PageEnum } from "@/enums/pageEnum";
import { isArray } from "@/utils/is";

import { h } from "vue";
import { store } from "@/stores";

import { coerceTruthyTargetToArray } from "@/utils";
import Node from "@/utils/node";
import type {pickingInfo} from "@/models/pickingModel";
import QRCode from 'qrcode';
// import type { ColumnType } from 'ant-design-vue';

import  type {  TableColumnType,PaginationProps }  from 'ant-design-vue'


interface PickingsState {
    filtering: boolean;
    lists: pickingInfo[];

    cuLoading: boolean;
    columns:TableColumnType[];
    labelColumns:TableColumnType[];
    paginations: PaginationProps;
}
// console.info('api.login =>',login);
 const usePickngStore = defineStore("pickings", {
     state: (): PickingsState => ({
         cuLoading: false,
         filtering: false,
         lists: [],
         paginations: {
             current:1,
             pageSize:2,
             total: 0,
             showSizeChanger: true,
             showQuickJumper: true,
             showLessItems: true,
             pageSizeOptions: ['2','10', '20', '30', '40', '50'],
             showTotal: (total: any) => {
                 return `总共 ${total} 条数据`
             },
         },
         columns:[
             {
                 title: '批次号',
                 dataIndex: 'batch_number',
                 key: 'batch_number',
                 align:'center'
             },
             {
                 title: '出库门店',
                 dataIndex: 'customer_id',
                 key: 'customer_id',
             },
             {
                 title: '条码',
                 dataIndex: 'barcode',
                 key: 'barcode',
             },
             {
                 title: '出库数量',
                 dataIndex: 'quantity',
                 key: 'quantity',
             },
             {
                 title: '分类',
                 dataIndex: 'category',
                 key: 'category',
             },
             {
                 title: '名称',
                 dataIndex: ['good','name'],
                 key: 'name',
             },
             {
                 title: '...',
                 dataIndex: 'address',
                 key: 'address',
             },
             {
                 title: '品牌',
                 dataIndex: ['good','brand'],
                 key: 'brand',
             },
             {
                 title: '规格',
                 dataIndex: ['good','specification'],
                 key: 'specification',
             },
             {
                 title: '单位',
                 dataIndex: ['good','unit'],
                 key: 'unit',
             },
             {
                 title: '操作',
                 dataIndex: 'action',
                 key: 'action',
             },
         ],
         labelColumns:[
             {
                 title: 'ID',
                 dataIndex: 'id',
                 key: 'id',
                 align:'center',
             },
             {
                 title: '条码',
                 dataIndex: 'barcode',
                 key: 'barcode',
                 align:'center',
             },
             {
                 title: '二维码',
                 dataIndex: 'qrcode',
                 key: 'qrcode',
                 align:'center',
             },
             {
                 title: '容量',
                 dataIndex: 'capacity',
                 key: 'capacity',
                 align:'center',
             },

             {
                 title: '可使用次数',
                 dataIndex: 'total_number',
                 key: 'total_number',
                 align:'center',
             },
             {
                 title: '已使用次数',
                 dataIndex: 'used_number',
                 key: 'used_number',
                 align:'center',
             },
             {
                 title: '是否禁用',
                 dataIndex: 'disabled',
                 key: 'disabled',
                 align:'center',
             },
             {
                 title: '是否激活',
                 dataIndex: 'activate',
                 key: 'activate',
                 align:'center',
             },
             // {
             //   title: '库存量',
             //   dataIndex: 'quantity',
             //   key: 'quantity',
             // },

         ],
     }),


     actions: {
         async getPickings(params:any):Promise<pickingInfo | null> {
             const { data,meta }  = await pickingListApi(params);
             this.lists = data;
             data.forEach((picking)=>{
                 picking.labels.forEach((label)=>{
                     console.info('label.qrcode =>',label.qrcode);
                     QRCode.toDataURL(JSON.stringify(label.qrcode))
                        .then((url:string) => {
                            label.qrcode_url = url;
                          // console.log('url =>',url);
                        })
                        .catch((err:any) => {
                          console.error(err)
                        })
                 })
             })
             this.paginations.total = meta.total;
             return  null;
         },

     },




});

export default usePickngStore;

// Need to be used outside the setup
export function useGoodStoreWithOut() {
    return usePickngStore(store);
}

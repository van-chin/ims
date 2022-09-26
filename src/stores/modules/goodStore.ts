import { defineStore } from "pinia";
// import type { ErrorMessageMode } from '/#/axios';
import {goodListApi, goodStockupApi, goodStorageApi} from "@/api/modules/ms/goodApi"

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

import type { goodInfo } from "@/models/goodModel"

import { h } from "vue";
import { store } from "@/stores";

import { coerceTruthyTargetToArray } from "@/utils";
import Node from "@/utils/node";



interface GoodsState {
    filtering: boolean;
    lists: goodInfo[];
    paginations: object;
    cuLoading: boolean;
    columns:any[];
}
// console.info('api.login =>',login);
 const useGoodStore = defineStore("goods", {
    state: (): GoodsState => ({
        filtering: false,
        cuLoading: false,
        lists: [],
        columns:[
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
        ],
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

    }),

    getters: {


    },

    actions: {
        async getGoods(params:any):Promise<goodInfo | null> {
            console.info('adminStore.login.loginParams =>',params);
           const { data,meta }  = await goodListApi(params);
           console.info('data =>',data);
            this.lists = data;
            this.paginations.total = meta.total;
            return  null;
        },

        async storage(params:any) {
            console.info('storage =>',params);
            const data = await goodStorageApi(params);
            console.info('data =>',data);

            return  null;
        },

        async stockup(params:any) {
            console.info('storage =>',params);
            const data = await goodStockupApi(params);
            console.info('data =>',data);

            return  null;
        },






    },
});

export default useGoodStore;

// Need to be used outside the setup
export function useGoodStoreWithOut() {
    return useGoodStore(store);
}

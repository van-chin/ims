import { goodHttp as defHttp } from '@/utils/http/axios';

// import {  defHttp } from '@/utils/http/axios';

import type {  ErrorMessageMode } from '#/axios';

import type { goodInfo } from "@/models/goodModel"

/**
 * @description: getUserInfo
 */
export function goodListApi(params:any) {
    // return defHttp.get<goodInfo[]>({
    //     url: '/goods'
    // }, { errorMessageMode: 'none' });
    return defHttp.get({
        url: '/goods',
        params,
    }, { isTransformResponse:false });
}


/**
 * @description: getUserInfo
 */
export function goodStorageApi(params:any) {
    // return defHttp.get<goodInfo[]>({
    //     url: '/goods'
    // }, { errorMessageMode: 'none' });
    return defHttp.post({
        url: '/goods/storage',
        params,
    });
}

/**
 * @description: getUserInfo
 */
export function goodStockupApi(params:any) {
    // return defHttp.get<goodInfo[]>({
    //     url: '/goods'
    // }, { errorMessageMode: 'none' });
    return defHttp.post({
        url: '/goods/stockup',
        params,
    });
}


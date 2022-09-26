import { defHttp } from '@/utils/http/axios';

import type {  ErrorMessageMode } from '#/axios';

import type { LoginParams,LoginResultModel,adminInfo } from "@/models/adminModel"

enum Api {
    Login = '/admins/login',
    Logout = '/admins/logout',
    info = '/admins/info',
}

/**
 * @description: admin login api
 */
export function loginApi(params: LoginParams, mode:ErrorMessageMode = 'modal') {
    return defHttp.post<LoginResultModel>(
        {
            url: Api.Login,
            params,
        },
        {
            errorMessageMode: mode,
        },
    );
}


/**
 * @description: getUserInfo
 */
export function adminInfoApi() {
    return defHttp.post<adminInfo>({ url: Api.info }, { errorMessageMode: 'none' });
}
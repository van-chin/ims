import { defHttp } from '@/utils/http/axios';

import type {  ErrorMessageMode } from '#/axios';

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
    access_token: string;
    expires_in: number;
    refresh_token: string
    token_type: string;
}

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
    account: string;
    password: string;
}

enum Api {
    Login = '/admins/login',
    Logout = '/admins/logout',
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
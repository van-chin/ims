/**
 * @description: Login interface parameters
 */
export interface LoginParams {
    account: string;
    password: string;
}

export interface RoleInfo {
    roleName: string;
    value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
    // id: string | number;
    token_type:string;
    expires_in:number;
    refresh_token:string;
    access_token: string;
    role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface adminInfo {
    // id:number;
    // name:string;
    // nick_name:string;
    // email:string;
    // position_id?:number;
    // position_name?:number;
    // avatar:string;
    admin:any;
    nodes:any;
    operations:any;


    // roles: RoleInfo[];
    // homePath:string;
    // // 用户id
    // userId: string | number;
    // // 用户名
    // username: string;
    // // 真实名字
    // realName: string;
    // // 介绍
    // desc?: string;
}

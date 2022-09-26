import { defineStore } from "pinia";
import type { ErrorMessageMode } from '/#/axios';
import { loginApi,adminInfoApi } from "@/api/modules/ms/adminApi"

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



interface AdminsState {
    access_token?: string;
    adminInfo: any;
    roleList: RoleEnum[];
    sessionTimeout?: boolean;
    lastUpdateTime: number;
    navMenus: any;
    filtering: boolean;
    lists: [];
    pagination: object;

    cuLoading: boolean;

}
// console.info('api.login =>',login);
 const useAdminStore = defineStore("admins", {
    state: (): AdminsState => ({
        access_token: undefined,
        adminInfo: {},
        lastUpdateTime: 0,
        sessionTimeout: false,
        roleList: [],
        navMenus: [],
        filtering: false,
        cuLoading: false,
        lists: [],
        pagination: {
            total: 0,
        },
    }),

    getters: {
        getAdminInfo(): adminInfo {
            return this.adminInfo || getAuthCache<adminInfo>(USER_INFO_KEY) || {};
        },
        getNavMenus() {


            console.info(this.navMenus);



            if(this.navMenus.length) {
                return  this.navMenus;
            } else {
                const menus = getAuthCache(NAV_MENUS_KEY)
                const siderMenuProps = {
                    cachePrefix: 'path-data-',
                    children: 'children',
                    options: 'options',
                    label: 'name',
                    value: 'id',
                    icon: 'icon',
                    leaf: 'leaf',
                    disabled: 'disabled',
                }
                const truthyedNavMenus = coerceTruthyTargetToArray(menus).map(
                    (nodeData) => new Node(nodeData, siderMenuProps)
                )

                // debugger
                return truthyedNavMenus;
            }

            // return this.navMenus || getAuthCache<string>(NAV_MENUS_KEY);
        },

    },

    actions: {
        setAccessToken(access_token: string | undefined) {
            this.access_token = access_token ? access_token : ''; // for null or undefined value
            setAuthCache(ACCESS_TOKEN_KEY, access_token);
        },
        getAccessToken(): string {


            return this.access_token || getAuthCache<string>(ACCESS_TOKEN_KEY);
        },
        // getCurrentNavMenus(): string {
        //     return this.navMenus || getAuthCache<string>(NAV_MENUS_KEY);
        // },
        async login(params:LoginParams & {
            goHome?: boolean;
            mode?: ErrorMessageMode;
        }):Promise<adminInfo | null> {
            console.info('adminStore.login.loginParams =>',params);

            const { goHome = true, mode, ...loginParams } = params;

           const data = await loginApi(loginParams,mode);

            const { access_token } = data;



            this.setAccessToken(access_token);

            return this.afterLoginAction(goHome);

           // console.info('data =>',data);



        },

        async afterLoginAction(goHome?: boolean): Promise<adminInfo | null> {
            if (!this.getAccessToken) return null;
            // get user info
            // const adminInfo = await this.getAdminInfoAction();

            const adminInfo = await this.getAdminInfoAction()

            const { admin, nodes, operations } = adminInfo;
            setAuthCache(AUTH_OPERATIONS, operations)


            const navMenuNodes = nodes.filter(
                (item: any) => item.type === 1 || item.type === 2
            )
            const menus = listToTree(navMenuNodes)

            setAuthCache(NAV_MENUS_KEY, menus)

            const siderMenuProps = {
                cachePrefix: 'path-data-',
                children: 'children',
                options: 'options',
                label: 'name',
                value: 'id',
                icon: 'icon',
                leaf: 'leaf',
                disabled: 'disabled',
            }
            const truthyedNavMenus = coerceTruthyTargetToArray(menus).map(
                (nodeData) => new Node(nodeData, siderMenuProps)
            )
            // console.info('truthyedNavMenus =>',truthyedNavMenus);

            this.navMenus = truthyedNavMenus
            // console.info('this.navMenus =>',this.navMenus);
            // setAuthCache(NAV_MENUS_KEY, truthyedNavMenus);

            const viewNodes = nodes.filter((item: any) => item.type === 1)
            // Persistent.setLocal('VIEW_NODES',viewNodes);

            setAuthCache(VIEW_NODES_KEY, viewNodes)



            const sessionTimeout = this.sessionTimeout;
            if (sessionTimeout) {
                // this.setSessionTimeout(false);
                console.info('sessionTimeout =>',sessionTimeout);
            } else {
                // const permissionStore = usePermissionStore();
                // if (!permissionStore.isDynamicAddedRoute) {
                //     const routes = await permissionStore.buildRoutesAction();
                //     routes.forEach((route) => {
                //         router.addRoute(route as unknown as RouteRecordRaw);
                //     });
                //     router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
                //     permissionStore.setDynamicAddedRoute(true);
                // }

                const views = import.meta.glob('/src/views/modules/ms/**/*.vue',{eager:true})

                Object.keys(views).forEach((file) => {
                    const filePath = file
                        .replace('/src/views/modules/ms/', '')
                        .replace('.vue', '')

                    // console.info('filePath =>',filePath);

                    viewNodes.forEach((item: any) => {
                        // console.info('item.options.file_path =>',item.options.file_path,item.name);
                        if (filePath === item.options.file_path) {
                            console.info(item);
                            const currentRoutePath = `/ms/${item.options.path}`
                            // console.info('route path =>',currentRoutePath);
                            router.addRoute('ms', {
                                name: item.options.name,
                                path: currentRoutePath,
                                meta: {
                                    key: item.id,
                                    icon:'ant-design:appstore-outlined',
                                    // title: t('routes.dashboard.analysis'),
                                    title: item.options.meta?.title,
                                },
                                component: views[file].default,
                            })
                        }
                    })
                })

                router.addRoute('',NOT_FOUND_ROUTE);

                goHome && (await router.replace(PageEnum.BASE_HOME));
                // goHome && (await router.replace(adminInfo?.homePath || PageEnum.BASE_HOME));
            }
            return adminInfo;
        },

        async getAdminInfoAction(): Promise<adminInfo | null> {
            if (!this.getAccessToken) return null;
            const adminInfo = await adminInfoApi();

            console.info('adminInfo =>',adminInfo);
            // const { roles = [] } = adminInfo;
            // if (isArray(roles)) {
            //     const roleList = roles.map((item) => item.value) as RoleEnum[];
            //     // this.setRoleList(roleList);
            // } else {
            //     adminInfo.roles = [];
            //     // this.setRoleList([]);
            // }
            // this.setUserInfo(adminInfo);
            return adminInfo;
        },
    },
});

export default useAdminStore;

// Need to be used outside the setup
export function useAdminStoreWithOut() {
    return useAdminStore(store);
}

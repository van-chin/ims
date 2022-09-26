import type { Router, RouteRecordRaw,RouteRecordName ,RouteLocationNormalized} from 'vue-router';

import { PageEnum } from '@/enums/pageEnum';

import { RootRoute } from '@/router/routes';

import { NOT_FOUND_ROUTE } from "@/router/routes/basic";


// console.info('PAGE_NOT_FOUND_ROUTE',PAGE_NOT_FOUND_ROUTE);

import { useAdminStoreWithOut } from '@/stores/modules/adminStore';

import { getAuthCache, setAuthCache } from "@/utils/auth";
import { VIEW_NODES_KEY } from "@/enums/cacheEnum";
import {router} from "@/router";

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const ROOT_PATH = RootRoute.path;

const whitePathList: PageEnum[] = [LOGIN_PATH,PageEnum.BASE_HOME];

const useAuthGuard = (router:Router) => {
    const adminsStore = useAdminStoreWithOut();

    router.beforeEach(async(to:RouteLocationNormalized,from:RouteLocationNormalized,next)=> {

        if(to.path === from.path) {
            next();
            return;
        }

        if(whitePathList.includes(<PageEnum>to.path)) {
            next();
            return;
        }

        if(!router.hasRoute(<RouteRecordName>to.name)) {
            const viewNodes = getAuthCache(VIEW_NODES_KEY);
            if(viewNodes) {
                // @ts-ignore
                const views = import.meta.glob('/src/views/modules/ms/**/*.vue',{eager:true})
                Object.keys(views).forEach((file) => {
                    const filePath = file
                        .replace('/src/views/modules/ms/', '')
                        .replace('.vue', '')

                    // @ts-ignore
                    viewNodes.forEach((item: any) => {
                        // console.info('item.options.file_path =>',item.options.file_path,item.name);
                        if (filePath === item.options.file_path) {
                            // console.info(item);
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
                next(to);
                return;
            }
        }

        next();

    })
}

export default useAuthGuard;
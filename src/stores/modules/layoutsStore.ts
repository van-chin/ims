import { defineStore } from "pinia";

import { getAuthCache } from "@/utils/auth";

import type { LayoutsConfig } from "#/config";

import { router } from "@/router";

import {store} from "@/stores";

import { includes } from "lodash-es";


// import api from "/@/api/purchases";

interface layoutsState {
    layoutsConfig: LayoutsConfig;
    tiggerIcon?: string;
    collapsed: boolean | undefined;
    headerBrandVisible: boolean;
    selectedKeys: number[];
    menuSelectedKeys: number[];
    openKeys: number[];
    preOpenKeys: number[];
    navMenus: number[];
    topMenus: any[];
    statuses: any[];
    tabBarTabs: any[];
    activeRouteKey:number;
    breadcrumbRoutes: any[];
}

const useLayoutsStore = defineStore("layouts", {
    state: (): layoutsState => {
        return {
            // layoutsConfig:
            //     Persistent.getLocal(LAYOUTS_CFG_KEY) || ({} as LayoutsConfig),

            layoutsConfig: {
              msLayout:{
                  inlineCollapsed:false,
                  asiderDrawerVisible:false,
              }
            },
            tiggerIcon: "ant-design:menu-fold-outlined",
            collapsed: undefined,
            headerBrandVisible: false,
            selectedKeys: [999],
            menuSelectedKeys: [999],
            openKeys: [],
            preOpenKeys: [],
            navMenus: [],

            topMenus: [],
            statuses: [
                {
                    id: 0,
                    value: 0,
                    key: 0,
                    title: "已拒绝",
                },
                {
                    id: 1,
                    value: 1,
                    key: 1,
                    title: "待提审",
                },
                {
                    id: 2,
                    value: 2,
                    key: 2,
                    title: "待审核",
                },
                {
                    id: 2,
                    value: 2,
                    key: 2,
                    title: "待采购",
                },
                {
                    id: 3,
                    value: 3,
                    key: 3,
                    title: "待交付",
                },
                {
                    id: 4,
                    value: 4,
                    key: 4,
                    title: "待确认",
                },
                {
                    id: 5,
                    value: 5,
                    key: 5,
                    title: "已完成",
                },
            ],
            tabBarTabs: [
                {
                    icon: "ant-design:home-outlined",
                    name: "dashboard",
                    path: "/ms/dashboard/analysis",
                    full_path: "/ms/dashboard/analysis",
                    label: "分析页",
                    key: 173,
                    selected:true,
                },
            ],
            activeRouteKey:173,

            breadcrumbRoutes: [
                {
                    icon: "ant-design:home-outlined",
                    name: "dashboard",
                    path: "/ms/dashboard/analysis",
                    full_path: "/ms/dashboard/analysis",
                    label: "分析页",
                    key: 173,
                    selected:true,

                },
            ],
        };
    },

    getters: {
        getLayoutsConfig(): LayoutsConfig {
            return this.layoutsConfig || ({} as LayoutsConfig);
        },
        tabBarTabsGetter():any {
            return this.tabBarTabs;
        },
        activeRouteKeyGetter():number {
            return this.activeRouteKey;
        }


    },

    actions: {
        msAsiderDrawerVisible(visible:boolean) {
            console.info('toggleAsiderDrawer => store',visible);
          this.layoutsConfig.msLayout.asiderDrawerVisible =  !this.layoutsConfig.msLayout.asiderDrawerVisible
        },

        msAddTabBarTab(data:any) {
          console.info('msAddTabBarTab =>data.key',includes(this.tabBarTabs,data.meta.key));

          let findedIndex = this.tabBarTabs.findIndex((tab,index)=> tab.key === data.meta.key);

          if(findedIndex >= 0) {
              console.info('已经打开过了');
          } else {
              this.tabBarTabs.push({
                  key:data.meta.key,
                  label:data.meta.title,
                  full_path:data.fullPath,
                  path:data.path,
                  name:data.name,
                  icon:data.meta.icon,
                  selected:true,
              });
              this.changeActiveRouteKey(data.meta.key);
          }

        },

        changeActiveRouteKey(activeKey:number) {
            this.activeRouteKey = activeKey;
            this.menuSelectedKeys = [activeKey];

            // router.push()

            let findedIndex = this.tabBarTabs.findIndex((tab)=>tab.key === activeKey);

            // this.tabBarTabs[findedIndex];

            console.info('router =>',router);
            router.push({path:this.tabBarTabs[findedIndex].full_path});
        },

        msToggleAsider() {

            this.layoutsConfig.msLayout.inlineCollapsed =  !this.layoutsConfig.msLayout.inlineCollapsed
        },
        setLayouts(config: DeepPartial<LayoutsConfig>, scope: string = "ms") {
            console.info("config =>", config);
            console.info("scope =>", scope);

            this.layoutsConfig.msLayout.inlineCollapsed = config.msLayout?.inlineCollapsed;

            // this.layoutsConfig = deepMerge(this.layoutsConfig || {}, config);
            // Persistent.setLocal(LAYOUTS_CFG_KEY, this.layoutsConfig);
            // LAYOUTS_CFG_KEY
        },

        addTabBarTabate(key: number) {
            // let currentData = JSON.parse(localStorage.getItem(`path-data-${key}`));
            let currentData = getAuthCache(`path-data-${key}`);
            // console.info("currentData 4 =>", currentData);
            let currentItem = currentData.slice(-1)[0];
            // console.info("currentItem =>", currentItem);
            localStorage.setItem("last_selected_id", currentItem.id);
            // console.info("currentItem.path  =>",'/consoles/', currentItem.options.path);
            router.push(`/consoles/${currentItem.options.path}`).then(() => {
                localStorage.setItem("current_selected_id", key);
            });
            // console.info("currentData ..0 =>", currentData);

            this.changeBreadcrumbRoutes(currentData);

            this.changeTabBarTabs(currentItem);

            this.menuSelectedKeys = [key];
            return key;
        },
        changeBreadcrumbRoutes(breadcrumbRoutes: any) {
            localStorage.setItem(
                "breadcrumb-routes",
                JSON.stringify(breadcrumbRoutes)
            );
            this.breadcrumbRoutes = breadcrumbRoutes;
        },
        changeTabBarTabs(currentItem: any) {
            let tabBarTabsFindIndex = this.tabBarTabs.findIndex(
                (item) => item.id === currentItem.id
            );

            if (tabBarTabsFindIndex < 0) {
                this.tabBarTabs.forEach((item) => {
                    item.selected = false;
                });
                this.tabBarTabs.push({
                    id: currentItem.id,
                    pid: currentItem.pid,
                    path: currentItem.path,
                    label: currentItem.label,
                    value: currentItem.value,
                    level: currentItem.level,
                    icon: currentItem.icon,
                    name: currentItem.name,
                    selected: true,
                });
            } else {
                this.tabBarTabs.forEach((item) => {
                    item.selected = false;
                });
                this.tabBarTabs[tabBarTabsFindIndex].selected = true;
            }
            localStorage.setItem("tab-bar-tabs", JSON.stringify(this.tabBarTabs));

            console.info("this.tabBarTabs =>", this.tabBarTabs);
        },

        deleteTabBarTabate({ index }) {
            let key = localStorage.getItem("last_selected_id");

            if (
                localStorage.getItem("last_selected_id") ===
                localStorage.getItem("current_selected_id")
            ) {
                key = 173;
            }
            console.info("key =>", key);
            this.tabBarTabs.splice(index, 1);
            let currentData = JSON.parse(localStorage.getItem(`path-data-${key}`));
            let currentItem = currentData.slice(-1)[0];
            localStorage.setItem("last_selected_id", currentItem.id);

            router.push(`/consoles/${currentItem.options.path}`).then(() => {
                localStorage.setItem("current_selected_id", key);
            });

            this.changeBreadcrumbRoutes(currentData);

            this.changeTabBarTabs(currentItem);

            this.menuSelectedKeys = [key];

            return key;
        },
        collapsingMenu() {
            this.collapsed = !this.collapsed;
            this.openKeys = this.collapsed ? [] : this.preOpenKeys;
        },
    },
});

export default useLayoutsStore;


// Need to be used outside the setup
export function useLayoutsStoreWithOut() {
    return useLayoutsStore(store);
}
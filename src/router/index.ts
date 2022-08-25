import type { RouteRecordRaw } from "vue-router";
import type { App } from "vue";

import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

import { basicRoutes, asyncRoutes } from "./routes";

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
getRouteNames(basicRoutes);

const routes = [...asyncRoutes, ...basicRoutes];

// console.info("routes =>", routes);

// app router
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: routes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// console.log("asyncRoutes =>", asyncRoutes);

// console.log("basicRoutes =>", basicRoutes);

// console.info("router =>", router);

// router.addRoute()

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// config router
export function setupRouter(app: App<Element>) {
  app.use(router);
}

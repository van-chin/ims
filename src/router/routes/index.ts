import type { AppRouteRecordRaw, AppRouteModule } from "@/router/types";

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from "@/router/routes/basic";

import { mainOutRoutes } from "./mainOut";


// @ts-ignore
const modules = import.meta.glob("./modules/**/*.ts", {
  eager: true,
});

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || undefined;

  if(mod !== undefined) {
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
  }
});


export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];


export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  component: () => import("@/views/index.vue"),
  meta: {
    title: "Index",
  }
};

export const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/sys/login/Login.vue"),
  meta: {
    title: "routes.basic.login",
  },
};

// Basic routing without permission
export const basicRoutes = [
  RootRoute,
  LoginRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];

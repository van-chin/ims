import type { AppRouteRecordRaw } from "@/router/types";

import {
  REDIRECT_NAME,
  //   LAYOUT,
  EMPTY_LAYOUT,
  EXCEPTION_COMPONENT,
  PAGE_NOT_FOUND_NAME,
  PAGE_NOT_FOUND_COMPONENT,
} from "@/router/constant";


export const NOT_FOUND_ROUTE = {
  path: "/:pathMatch(.*)*",
  name: PAGE_NOT_FOUND_NAME,
  component: PAGE_NOT_FOUND_COMPONENT,
  meta: {
    title: "ErrorPage",
    hideBreadcrumb: true,
    hideMenu: true,
  },
}

export const EXCEPTION_ROUTE = {
  path: "/:path(.*)*",
  name: PAGE_NOT_FOUND_NAME,
  component: EXCEPTION_COMPONENT,
  meta: {
    title: "ErrorPage",
    hideBreadcrumb: true,
    hideMenu: true,
  },
}
// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: "/:path(.*)*",
  name: PAGE_NOT_FOUND_NAME,
  component: EMPTY_LAYOUT,
  meta: {
    title: "ErrorPage",
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    EXCEPTION_ROUTE,
  ],
};

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: "/redirect",
  component: EMPTY_LAYOUT,
  name: "RedirectTo",
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: "/redirect/:path(.*)",
      name: REDIRECT_NAME,
      component: () => import("@/views/sys/redirect/index.vue"),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ],
};

export const ERROR_LOG_ROUTE: AppRouteRecordRaw = {
  path: "/error-log",
  name: "ErrorLog",
  component: EMPTY_LAYOUT,
  redirect: "/error-log/list",
  meta: {
    title: "ErrorLog",
    hideBreadcrumb: true,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: "list",
      name: "ErrorLogList",
      component: () => import("@/views/sys/error-log/index.vue"),
      meta: {
        title: "routes.basic.errorLogList",
        hideBreadcrumb: true,
        currentActiveMenu: "/error-log",
      },
    },
  ],
};

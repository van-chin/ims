import type { AppRouteModule } from "@/router/types";
import { EMPTY_LAYOUT } from "@/router/constant";

const tests: AppRouteModule = {
  path: "/tests",
  name: "Tests",
  component: EMPTY_LAYOUT,
  redirect: "/tests/index",
  meta: {
    hideChildrenInMenu: true,
    icon: "simple-icons:about-dot-me",
    title: "routes.tests",
    orderNo: 100000,
  },
  children: [
    {
      path: "index",
      name: "Test.Index",
      component: () => import("@/views/modules/tests/index.vue"),
      meta: {
        title: "test",
        icon: "simple-icons:about-dot-me",
      },
    },
  ],
};

export default tests;

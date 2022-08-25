import type { AppRouteModule } from "@/router/types";
import { EMPTY_LAYOUT } from "@/router/constant";

const demos: AppRouteModule = {
  path: "/demo",
  name: "Demo",
  component: EMPTY_LAYOUT,
  redirect: "/demo/index",
  meta: {
    hideChildrenInMenu: true,
    icon: "simple-icons:about-dot-me",
    title: "routes.tests",
    orderNo: 100000,
  },
  children: [
    {
      path: "index",
      name: "Demo.Index",
      component: () => import("@/views/modules/tests/index.vue"),
      meta: {
        title: "Demo.test",
        icon: "simple-icons:about-dot-me",
      },
    },
  ],
};

export default demos;

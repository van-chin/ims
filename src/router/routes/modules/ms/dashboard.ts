import type { AppRouteModule } from "@/router/types";
import { MS_LAYOUT } from "@/router/constant";

const preffix = "/ms";

const dashboard: AppRouteModule = {
  path: `${preffix}/dashboard`,
  name: "dashboard",
  component: MS_LAYOUT,
  redirect: "/ms/dashboard/analysis",
  meta: {
    hideChildrenInMenu: true,
    icon: "simple-icons:about-dot-me",
    title: "dashboard.analysis",
    orderNo: 999,
  },
  children: [
    {
      path: "analysis",
      name: "ms.dashboard.analysis",
      component: () => import("@/views/modules/ms/dashboard/analysis.vue"),
      meta: {
        title: "ms.dashboard.analysis",
        icon: "simple-icons:about-dot-me",
      },
    },
  ],
};

export default dashboard;

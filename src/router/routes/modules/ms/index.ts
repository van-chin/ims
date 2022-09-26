import type { AppRouteModule } from "@/router/types";
import { MS_LAYOUT } from "@/router/constant";

const preffix = "/ms";

const dashboard: AppRouteModule = {
  path: `${preffix}`,
  name: "ms",
  component: MS_LAYOUT,
  redirect: "/ms/dashboard",
  meta: {
    hideChildrenInMenu: true,
    icon: "simple-icons:about-dot-me",
    title: "dashboard.analysis",
    orderNo: 999,
  },
  children: [

  ],
};

export default dashboard;

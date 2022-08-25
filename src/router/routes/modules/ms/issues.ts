// import type { AppRouteModule } from "@/router/types";
// import { MS_LAYOUT } from "@/router/constant";

// const preffix = "/ms";

// const issues: AppRouteModule = {
//   path: `${preffix}/issues`,
//   name: "issues",
//   component: MS_LAYOUT,
//   redirect: "/ms/issues/requirements",
//   meta: {
//     hideChildrenInMenu: true,
//     icon: "simple-icons:about-dot-me",
//     title: "dashboard.analysis",
//     orderNo: 999,
//   },
//   children: [
//     {
//       path: "requirements",
//       name: "ms.issues.requirements",
//       component: () =>
//         import("@/views/modules/ms/issues/requirements/index.vue"),
//       meta: {
//         title: "ms.issues.requirements",
//         icon: "simple-icons:about-dot-me",
//       },
//     },
//     {
//       path: "assignments",
//       name: "ms.issues.assignments",
//       component: () =>
//         import("@/views/modules/ms/issues/assignments/index.vue"),
//       meta: {
//         title: "ms.issues.assignments",
//         icon: "simple-icons:about-dot-me",
//       },
//     },
//     {
//       path: "bug-tracking",
//       name: "ms.issues.bug-tracking",
//       component: () =>
//         import("@/views/modules/ms/issues/bug-tracking/index.vue"),
//       meta: {
//         title: "ms.issues.bug-tracking",
//         icon: "simple-icons:about-dot-me",
//       },
//     },
//   ],
// };

// export default issues;

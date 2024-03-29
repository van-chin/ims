export const REDIRECT_NAME = "Redirect";

export const PARENT_LAYOUT_NAME = "ParentLayout";

export const PAGE_NOT_FOUND_NAME = "PageNotFound";

export const EXCEPTION_COMPONENT = () =>
  import("@/views/sys/exception/Exception.vue");

export const PAGE_NOT_FOUND_COMPONENT = () =>
    import("@/views/sys/exception/pageNotFound.vue");

/**
 * @description: default layout
 */
// export const LAYOUT = () => import("@/layouts/default/Login.vue");

export const EMPTY_LAYOUT = () => import("@/layouts/empty/index.vue");

export const MS_LAYOUT = () => import("@/layouts/ms/index.vue");

/**
 * @description: parent-layout
 */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: PARENT_LAYOUT_NAME,
      });
    });
};

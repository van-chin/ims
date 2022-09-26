import type { Router, RouteLocationNormalized } from 'vue-router';

import useAuthGuard from "./authGuard"
import useNprogressGuard from "./nprogressGuard"

import useStateGuard from "./stateGuard"

// Don't change the order of creation
export function setupRouterGuard(router: Router) {

    // console.info('setupRouterGuard....');
    useAuthGuard(router);
    useNprogressGuard(router);
    useStateGuard(router);
    // createPageGuard(router);
    // createPageLoadingGuard(router);
    // createHttpGuard(router);
    // createScrollGuard(router);
    // createMessageGuard(router);
    // createProgressGuard(router);
    // createPermissionGuard(router);
    // createParamMenuGuard(router); // must after createPermissionGuard (menu has been built.)
    // createStateGuard(router);
}
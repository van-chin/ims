import type { Router, RouteRecordRaw,RouteRecordName ,RouteLocationNormalized} from 'vue-router';
import {useLayoutsStoreWithOut} from "@/stores/modules/layoutsStore";
import {useAdminStoreWithOut} from "@/stores/modules/adminStore";


const layoutsStore = useLayoutsStoreWithOut();


const useStateGuard = (router:Router) => {


    // router.beforeEach(()=> {
    //     console.info('StateGuard.beforeEach')
    //     // nProgress.start();
    //
    // })

    router.afterEach((to, from)=>{
        console.info('StateGuard.afterEach.to =>',to);

        console.info('StateGuard.afterEach.from =>',from);

        layoutsStore.msAddTabBarTab(to);
        // console.info()
        // nProgress.done();
    })
}

export default useStateGuard;
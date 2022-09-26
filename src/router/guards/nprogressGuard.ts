import type { Router, RouteRecordRaw,RouteRecordName ,RouteLocationNormalized} from 'vue-router';

// @ts-ignore
import nProgress from 'nprogress';

const useNprogressGuard = (router:Router) => {


    router.beforeEach(()=> {
        nProgress.start();

    })

    router.afterEach(()=>{
        nProgress.done();
    })
}

export default useNprogressGuard;
import { useAppProviderContext } from '@/components/Application';
import { computed, unref } from 'vue';

export function useAppInject() {
    const values = useAppProviderContext()


    console.info('useAppInject.values =>',values)

    return {
        getIsMobile: computed(() => unref(values.isMobile)),
        screenCls: computed(() => unref(values.screenCls)),
        realWidth: computed(() => unref(values.realWidth)),
    };
}

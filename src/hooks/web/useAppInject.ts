import { useAppProviderContext } from '@/components/Application';
import { computed, unref } from 'vue';

export function useAppInject() {
    const values = useAppProviderContext()

    return {
        getIsMobile: computed(() => unref(values.isMobile)),
        screenCls: computed(() => unref(values.screenCls)),
        realWidth: computed(() => unref(values.realWidth)),
    };
}

import type { InjectionKey, Ref } from 'vue';
import { createContext, useContext } from '@/hooks/core/useContext';

export interface AppProviderContextProps {
    screenCls: Ref<string>;
    prefixCls: Ref<string>;
    isMobile: Ref<boolean>;
    realWidth: Ref<number>;
}

const key: InjectionKey<AppProviderContextProps> = Symbol();

export function createAppProviderContext(context: AppProviderContextProps) {
    return createContext<AppProviderContextProps>(context, key);
}

export function useAppProviderContext() {
    return useContext<AppProviderContextProps>(key);
}

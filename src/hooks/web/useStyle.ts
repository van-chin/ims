import { useAppProviderContext } from '@/components/Application';

export function useStyle(scope: string) {
    const values = useAppProviderContext();

    // console.info('values =>',values);


    // const $style = cssModule ? useCssModule() : {};

    // const style: Record<string, string> = {};
    // if (cssModule) {
    //   Object.keys($style).forEach((key) => {
    //     // const moduleCls = $style[key];
    //     const k = key.replace(new RegExp(`^${values.prefixCls}-?`, 'ig'), '');
    //     style[lowerFirst(k)] = $style[key];
    //   });
    // }
    return {
        // prefixCls: computed(() => `${values.prefixCls}-${scope}`),
        prefixCls: `${values.prefixCls}-${scope}`,
        prefixVar: values.prefixCls,
        screenCls: values.screenCls,
        // style,
    };
}

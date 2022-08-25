<template>
  <div :class="[props.prefixCls,screenCls]">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import {prefixCls as stylesSettingPrefixCls} from '@/settings/stylesSetting';

import {createAppProviderContext} from './useAppContext';
import {createBreakpointListen} from '@/hooks/event/useBreakpoint';
import {useAppStore} from '@/stores/modules/appStore';

import {MenuModeEnum, MenuTypeEnum} from '@/enums/menuEnum';
import useLayoutsStore from "@/stores/modules/layoutsStore";

defineOptions({
  name:'AppProvider',
  inheritAttrs:false,
})

const props = defineProps({
  /**
   * class style prefix
   */
  prefixCls: { type: String, default: stylesSettingPrefixCls },
})

const isMobile = ref(false);
const isSetState = ref(false);

const currentWidth = ref(0);

const currentRealWidth = ref(0);

const screenCls = ref('screen');

const appStore = useAppStore();

const layoutsStore = useLayoutsStore();

// Monitor screen breakpoint information changes
createBreakpointListen(({ screenMap, sizeEnum, width,screen,realWidth }) => {
  screenCls.value = `screen-${screen.value?.toLowerCase()}`
  currentWidth.value = width.value;
  currentRealWidth.value = realWidth.value;
  const smWidth = screenMap.get(sizeEnum.SM);
  if (smWidth) {
    isMobile.value = width.value - 1 < smWidth;
  }
  handleRestoreState();

  console.info('screen =>',screen.value,sizeEnum);

  if(screen.value === sizeEnum.MD) {
    layoutsStore.setLayouts({
      msLayout:{
        inlineCollapsed:true,
      }
    })
  } else {
    layoutsStore.setLayouts({
      msLayout:{
        inlineCollapsed:false,
      }
    })
  }
});

const { prefixCls } = toRefs(props);


// Inject variables into the global
createAppProviderContext({ prefixCls, isMobile,screenCls,realWidth:currentRealWidth });


/**
 * Used to maintain the state before the window changes
 */
function handleRestoreState() {

  // console.info('screenCls =>',screenCls.value);

  // if(screenCls.value)

  if (unref(isMobile)) {
    if (!unref(isSetState)) {
      isSetState.value = true;
      const {
        menuSetting: {
          type: menuType,
          mode: menuMode,
          collapsed: menuCollapsed,
          split: menuSplit,
        },
      } = appStore.getProjectConfig;
      appStore.setProjectConfig({
        menuSetting: {
          type: MenuTypeEnum.SIDEBAR,
          mode: MenuModeEnum.INLINE,
          split: false,
        },
      });
      appStore.setBeforeMiniInfo({ menuMode, menuCollapsed, menuType, menuSplit });
    }
  } else {
    if (unref(isSetState)) {
      isSetState.value = false;
      const { menuMode, menuCollapsed, menuType, menuSplit } = appStore.getBeforeMiniInfo;
      appStore.setProjectConfig({
        menuSetting: {
          type: menuType,
          mode: menuMode,
          collapsed: menuCollapsed,
          split: menuSplit,
        },
      });
    }
  }
}

</script>

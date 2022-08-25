<template>
  <div :class="prefixCls">
    <Icon :class="`${prefixCls}-logo`" size="32"  :icon="props.icon"></Icon>
    <span :class="`${prefixCls}-name`">{{ props.name }}</span>

    <span :class="`${prefixCls}-trigger`">
      <Icon  size="20"  :icon="`ant-design:menu-unfold-outlined`"></Icon>
    </span>

  </div>
</template>

<script lang="ts" setup>

import { Icon } from "@/components/Icon";
import {useStyle} from "@/hooks/web/useStyle";

const { prefixCls } = useStyle("app-logo");

defineOptions({
  name:'AppLogo',
  inheritAttrs:false,
})

const props = defineProps({
  /**
   * App Name
   */
  name: { type: String, default: '华医惠康' },
  /**
   * App Name
   */
  icon: { type: String, default: 'ant-design:appstore-outlined' },
})
// ant-design:appstore-outlined

</script>


<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-app-logo';

.@{prefix-cls} {
  width: 100%;

  @apply flex justify-center items-center;
  &-logo {
    cursor: pointer;
  }
  &-name {
    cursor: pointer;
    @apply ml-6px  <md:hidden;
  //@apply w-210px flex flex-col md:(w-210px min-w-210px) sm:(w-80px) <sm:hidden;
  }
  &-trigger {
    //border: 1px solid  red;
    cursor: pointer;
    @apply ml-6px sm:hidden;
  }
}
</style>

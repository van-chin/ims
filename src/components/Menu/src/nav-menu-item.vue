<template>
  <a-sub-menu
    v-bind="$attrs"
    v-if="children && children.length"
    :key="tmpData[props.props.value]"
  >
    <template #title>
      <Icon :icon="tmpData[props.props.icon]"></Icon>
      <span>{{ tmpData[props.props.label] }}</span>
    </template>
    <nav-menu-item
      v-for="item in children"
      :data="item"
      :props="props.props"
      :key="item[props.props.value]"
    ></nav-menu-item>
  </a-sub-menu>
  <a-menu-item v-bind="$attrs" :key="tmpData[props.props.value]" v-else>
    <Icon :icon="tmpData[props.props.icon]"></Icon>
    <span>{{ tmpData[props.props.label] }}</span>
  </a-menu-item>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import { Icon } from "@/components/Icon";

defineOptions({
  name: "NavMenuItem",
});

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  props: {
    type: Object,
    default: () => ({
      children: "children",
      label: "label",
      value: "value",
      icon: "icon",
      leaf: "leaf",
      disabled: "disabled",
    }),
  },
});

let children = computed(() => {
  return props.data[props.props.children] || false;
});
let tmpData = computed(() => {
  return props.data;
});
</script>

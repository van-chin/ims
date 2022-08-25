<template>
  <a-menu style="width: 100%" v-bind="$attrs">
    <nav-menu-item
      v-for="item in state.menu"
      :data="item"
      :props="props.props"
      :key="item.id"
    ></nav-menu-item>
  </a-menu>
</template>

<script lang="ts" setup>
import NavMenuItem from "@/components/Menu/src/nav-menu-item.vue";

console.info("InMenuItem =>", NavMenuItem);
defineOptions({
  name: "NavMenu",
});
const props = defineProps({
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
  data: {
    type: Array,
    default: () => [],
  },
});

const { data } = toRefs(props);
// let menus = ref([]);
let state = reactive({
  menu: [],
});

const initMenus = (data:any) => {
  state.menu = data;
};

watch(
  data,
  (data) => {
    initMenus(data);
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

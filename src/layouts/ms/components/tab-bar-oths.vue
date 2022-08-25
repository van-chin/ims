<template>
  <!-- {{states.tabBarTabs}} -->
  <div :class="prefixCls">
    <a-tabs
        v-model:activeKey="activeKey"

        :style="{ height: '200px' }"
        @tabScroll="callback"
    >
      <a-tab-pane v-for="i in 30" :key="i" :tab="`Tab-${i}`"></a-tab-pane>
    </a-tabs>
  </div>

  <div :class="prefixCls">
    <div :class="`${prefixCls}-left`">
      <span
          :class="[`${prefixCls}-left-prev`]"
          @click="tabBarTransition('prev')"
      >
        <Icon icon="ant-design:left-outlined"></Icon>
      </span>
    </div>
    <div :class="`${prefixCls}-bar`" ref="tabBarRef">
      <ul
          :class="`${prefixCls}-bar-tabs`"
          :id="`${prefixCls}-bar-tabs`"
          :style="tabbarTabsStyle"
          ref="tabBarTabsRef"
      >
        <li
            :class="[
            `${prefixCls}-bar-tabs-item`,
            {
              'ims-console-layout-right-header-tabbar-bar-tabs-selected':
                item.selected === true,
            },
          ]"
            v-for="(item, index) in states.tabBarTabs"
            :key="item.value"
        >
          <Icon
              :icon="item.icon"
              class="icon"
              @click="menuSelected(item.value)"
          ></Icon>
          <span class="title" @click="menuSelected(item.value)">{{
              item.label
            }}</span>
          <Icon
              icon="ant-design:close-outlined"
              class="close"
              v-if="index !== 0"
              @click="deleteItem(item.value, index)"
          ></Icon>
        </li>
      </ul>
    </div>
    <div :class="`${prefixCls}-right`">
      <span
          :class="[`${prefixCls}-right-item`, `${prefixCls}-right-next`]"
          class="ims-layout-header-tabbar-next ims-layout-header-tabbar-right-item"
          @click="tabBarTransition('next')"
      >
        <Icon icon="ant-design:right-outlined"></Icon>
      </span>
      <span :class="[`${prefixCls}-right-item`, `${prefixCls}-right-refresh`]">
        <Icon icon="ant-design:redo-outlined"></Icon>
      </span>

      <a-dropdown
          trigger="click"
          placement="bottomRight"
          :overlayStyle="{
          minWidth: '100px',
        }"
          :class="[`${prefixCls}-right-item`, `${prefixCls}-right-dropdown`]"
      >
        <span>
          <Icon icon="ant-design:down-outlined"></Icon>
        </span>
        <template v-slot:overlay>
          <a-menu>
            <a-menu-item :key="item.key" v-for="item in drCloses">
              <Icon :icon="item.icon"></Icon>
              {{ item.label }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>


import {Icon} from "@/components/Icon";
import type { TabsProps } from 'ant-design-vue';
import useLayoutsStore from "@/stores/modules/layoutsStore";
import {useStyle} from "@/hooks/web/useStyle";

// ims-
const {prefixCls} = useStyle("ms-layout-main-header-nav-tabs-bar");

const layoutsStore = useLayoutsStore();


const callback: TabsProps['onTabScroll'] = val => {
  console.log(val);
};

const activeKey = ref(1);

// defineOptions({
//   name:'MsLayoutTabsBar',
//   inheritAttrs:false,
// })

let bs = ref(null);

let states = computed(() => {
  return {
    tabBarTabs: layoutsStore.tabBarTabs,
  };
});

const tabbarTabsStyle = ref({
  transform: "",
});

const drCloses = [
  {
    icon: "ant-design:vertical-left-outlined",
    key: "close-left",
    label: "关闭左侧",
  },
  {
    icon: "ant-design:vertical-right-outlined",
    key: "close-right",
    label: "关闭右侧",
  },
  {
    icon: "ant-design:vertical-align-middle-outlined",
    key: "close-others",
    label: "关闭其他",
  },
  {
    icon: "ant-design:close-outlined",
    key: "close-all",
    label: "关闭全部",
  },
];

const defaultIndex =
    parseInt(localStorage.getItem("current_selected_id")) || 126;
let selectedKeys = ref([defaultIndex]);

let tabBarRef = ref(null);
let tabBarTabsRef = ref(null);

const menuSelected = (key: any) => {
  layoutsStore.addTabBarTabate(key);
};

const deleteItem = (key: any, index: number) => {
  layoutsStore.deleteTabBarTabate({key: key, index: index});
  //   store
  //     .dispatch("layouts/deleteTabBarTabate", { key: key, index: index })
  //     .then((rsp) => {
  //       console.info("rsp =>", rsp);
  //       calcTabBarItems();
  //       bs.value.refresh();
  //       // state.selectedKeys = [rsp];
  //       //   state.selectedKeys = [key];
  //     });
};

const tabBarTransition = (type: string) => {
  // if (type === "prev") {
  //   bs.value.scrollBy(-130, 0);
  // } else {
  //   bs.value.scrollBy(130, 0);
  // }
};

const calcTabBarItems = () => {
  let itemOffsetWidth = 0;
  let tabBarTabsRefHTMLCollection = Array.from(tabBarTabsRef.value.children);
  tabBarTabsRefHTMLCollection.forEach((item) => {
    itemOffsetWidth += item.offsetWidth;
  });
  tabBarTabsRef.value.style.width = `${itemOffsetWidth}px`;
};

onMounted(async () => {
  await nextTick();
  calcTabBarItems();
});
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-ms-layout-main-header-nav-tabs-bar";

.@{prefix-cls} {
  //border: 1px solid red;
  height: 48px;
  //border-top: 1px solid red;
  border-top: 1px solid #f0f0f0;
@apply flex justify-center items-center;

  &-left {
    height: 100%;
    border-right: 1px solid #f0f0f0;
  @apply flex justify-center items-center px-16px;

    &-prev {
      cursor: pointer;

    }
  }

  &-bar {
    //border: 1px solid red;
    flex: 1;
  }

  &-right {
    height: 100%;
    @apply flex justify-center;

    &-item {
      //height: 48px;
      @apply flex justify-center items-center;
      cursor: pointer;
      width: 48px;
      box-sizing: border-box;
      padding: 0 16px;
      text-align: center;
      border-left: 1px solid #f0f0f0;
    }
  }
}
</style>

<template>
  <a-row type="flex" style="width: 100%">
    <a-col :xs="24" :sm="24" :md="16" :xl="16">
      <div :class="`${prefixCls}-breadcrumb`">
        breadcrumb
        <!--        <a-breadcrumb>-->
        <!--          <a-breadcrumb-item>-->
        <!--            <Icon icon="ant-design:appstore-outlined"></Icon>-->
        <!--            <span>首页</span>-->
        <!--          </a-breadcrumb-item>-->
        <!--          <template v-for="item in states.breadcrumbRoutes" :key="item.value">-->
        <!--            <a-breadcrumb-item v-if="item.children">-->
        <!--              <Icon icon="ant-design:appstore-outlined"></Icon>-->
        <!--              <span>{{ item.name }}</span>-->

        <!--              <template v-slot:overlay>-->
        <!--                <in-menu-->
        <!--                  :data="item.children"-->
        <!--                  @click="menuSelected"-->
        <!--                  v-model:selectedKeys="states.menuSelectedKeys"-->
        <!--                  :props="breadcrumbMenuProps"-->
        <!--                ></in-menu>-->
        <!--              </template>-->
        <!--            </a-breadcrumb-item>-->

        <!--            <a-breadcrumb-item v-else>-->
        <!--              <Icon icon="ant-design:appstore-outlined"></Icon>-->
        <!--              <span>{{ item.name }}</span>-->
        <!--            </a-breadcrumb-item>-->
        <!--          </template>-->
        <!--        </a-breadcrumb>-->
      </div>
    </a-col>
    <a-col :xs="0" :sm="0" :md="8" :xl="8">
      <div :class="`${prefixCls}-copyright`">
        <!--        Copyright-->
        <!--        <span>-->
        <!--          <Icon icon="ant-design:copyright-circle-outlined"></Icon>&nbsp;&nbsp;-->
        <!--        </span>-->
        V{{ version }} Build At {{ lastBuildTime }}
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { useStyle } from "@/hooks/web/useStyle";

import useLayoutsStore from "@/store/modules/layoutsStore";
import { Icon } from "@/components/Icon";
import InMenu from "@/components/InMenu";

const { pkg, lastBuildTime } = __APP_INFO__;
const { version } = pkg;

const layoutsStore = useLayoutsStore();

const { prefixCls } = useStyle("console-layout-right-footer");

const breadcrumbMenuProps = ref({
  children: "children",
  label: "name",
  value: "id",
  icon: "icon",
  leaf: "leaf",
  disabled: "disabled",
});

let states = computed(() => {
  return {
    breadcrumbRoutes: layoutsStore.breadcrumbRoutes,
    menuSelectedKeys: layoutsStore.menuSelectedKeys,
  };
});

const menuSelected = ({ key }) => {
  console.info("cb-menuSelected =>", key);
  layoutsStore.addTabBarTabate(key);
};
</script>

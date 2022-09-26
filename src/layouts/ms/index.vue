<template>
<div :class="prefixCls">

  <a-drawer
      v-if="getIsMobile"
      v-model:visible="layoutsConfig.msLayout.asiderDrawerVisible"
      width="210"
      :closable="false"
      :bodyStyle="navMenuDrawerBodyStyle"
      :headerStyle="navMenuDrawerHeaderStyle"
      class="ms-layout-nav-menu-drawer"

      placement="left"

  >
    <template #title>
      <app-logo :atDrawer="true"></app-logo>
    </template>
    <nav-menu
        :data="states.navMenus"
        :mode="`inline`"
        theme="dark"
        @select="onMenuSelect"
        class="asider-menu"
        :props="siderMenuProps"
        v-model:openKeys="states.openKeys"
        v-model:selectedKeys="states.menuSelectedKeys"
    ></nav-menu>

  </a-drawer>

  <div :class="`${prefixCls}-asider`" :style="asiderStyles"  v-else >
    <div :class="`${prefixCls}-asider-header`" >
      <app-logo></app-logo>
    </div>
    <div :class="`${prefixCls}-asider-menu`">
      <div :class="`${prefixCls}-asider-menu-wrapper`">
        <nav-menu
            :data="states.navMenus"
            :mode="`inline`"
            theme="dark"
            @select="onMenuSelect"
            :inline-collapsed="states.layoutsConfig.msLayout.inlineCollapsed"
            class="asider-menu"
            :props="siderMenuProps"
            v-model:openKeys="states.openKeys"
            v-model:selectedKeys="states.menuSelectedKeys"
        ></nav-menu>
      </div>
    </div>
    <div  :class="`${prefixCls}-asider-footer`" >
      <Icon icon="ant-design:menu-fold-outlined" @click="toggleAsider"></Icon>

    </div>
  </div>

  <div  :class="`${prefixCls}-main`" >
    <div  :class="`${prefixCls}-main-header`">
      <div :class="`${prefixCls}-main-header-nav-menu-bar`">
        <div :class="`${prefixCls}-main-header-nav-menu-bar-app-logo`">
          <app-logo></app-logo>
        </div>
        <div :class="`${prefixCls}-main-header-nav-menu-bar-menu`">
          <nav-menu
              :data="states.topMenus"
              mode="horizontal"
              class="nav-menu"
              :props="siderMenuProps"
              :inline-collapsed="states.collapsed"
              v-model:openKeys="states.openKeys"
              v-model:selectedKeys="states.menuSelectedKeys"
          ></nav-menu>
        </div>
        <div :class="`${prefixCls}-main-header-nav-menu-bar-oths`" >
<!--          header-nav-menu-bar-oths-->
        </div>
        <div :class="`${prefixCls}-main-header-nav-menu-bar-actions`">
          <AppSearcher></AppSearcher>

          <AppHelper></AppHelper>
          <notification></notification>

          <user-info></user-info>

          <AppLocalePicker></AppLocalePicker>

          <system-setting></system-setting>
        </div>
      </div>
      <TabBar></TabBar>
    </div>
    <div :class="`${prefixCls}-main-content`"  id="ims-ms-layout-main-content" >

      <router-view></router-view>

      <a-back-top :target="getBackTopTarget">
        <div class="ant-back-top-inner">
          <Icon
              size="32px"
              icon="ant-design:vertical-align-top-outlined"
          ></Icon>
        </div>
      </a-back-top>
    </div>
    <div :class="`${prefixCls}-main-footer`" >footer</div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { useStyle } from "@/hooks/web/useStyle";
import { AppLogo } from "@/components/Application";
import useLayoutsStore from "@/stores/modules/layoutsStore";
import NavMenu from "@/components/Menu";
import useAdminStore from "@/stores/modules/adminStore";

import { useAppInject } from '@/hooks/web/useAppInject';
import { Icon } from "@/components/Icon";

import SystemSetting from "./components/system-setting.vue";

import Notification from "./components/notification.vue";

import UserInfo from "./components/user-info.vue";

import AppLocalePicker from "./components/app-locale-picker.vue";

import AppHelper from "./components/app-helper.vue";

import AppSearcher from "./components/app-searcher.vue";

import TabBar from "./components/tab-bar.vue";

const { prefixCls } = useStyle("ms-layout");

const layoutsStore = useLayoutsStore();
import { getAuthCache, setAuthCache } from "@/utils/auth";
const adminStore = useAdminStore();

const layoutsConfig = layoutsStore.getLayoutsConfig;

import { router } from "@/router";

const { getIsMobile,screenCls,realWidth } = useAppInject();

const drawerVisible = ref<boolean>(false);

const toggleMenuDrawer = () => {
  if(getIsMobile.value) {
    drawerVisible.value = !drawerVisible.value;
  }
}
const onMenuSelect = ({key} ) => {
  // console.info('onMenuSelect.item =>',item);
  console.info('onMenuSelect.key =>',key);

  console.info('onMenuSelect.router =>',router);
  let currentData = getAuthCache(`path-data-${key}`);
  // console.info("currentData 4 =>", currentData);
  let currentItem = currentData.slice(-1)[0];

  console.info('onMenuSelect.currentItem =>',currentItem);

  router.push(`/ms/${currentItem.options.path}`).then(() => {
    localStorage.setItem("current_selected_id", key);
  });


  // router.push(`/ms/${currentItem.options.path}`).then(() => {
  //   localStorage.setItem("current_selected_id", key);
  // });

  // console.info('onMenuSelect.selectedKeys =>',selectedKeys);
}

const getBackTopTarget = () => {
  return document.querySelector("#ims-ms-layout-main-content");
};

const siderMenuProps = ref({
  cachePrefix: "path-data-",
  children: "children",
  label: "name",
  value: "id",
  icon: "icon",
  leaf: "leaf",
  disabled: "disabled",
});

const topMenuProps = ref({
  children: "children",
  label: "title",
  value: "id",
  icon: "icon",
  leaf: "leaf",
  disabled: "disabled",
});

const navMenuDrawerBodyStyle = {
  padding:0,
  backgroundColor:'#001529',
}

const navMenuDrawerHeaderStyle = {

  height:'48px',
  color:'#fff',
  textAlign:'center',
  backgroundColor:'#001529',
  borderBottom:'1px solid transparent'
}

// CSS Modules


const toggleAsider = () => {
  layoutsStore.msToggleAsider();
}


const cssModules = useCssModule('abc')

console.info('cssModules =>',cssModules);


// const asiderStyles = reactive({
//   width:'210px',
// })

const asiderStyles = computed(()=>{
  if(layoutsConfig.msLayout.inlineCollapsed) {
    return {
      width: '80px !important',
      minWidth:'80px !important'
    }
  } else {
    return {
      width: '210px !important',
      minWidth:'210px !important'
    }
  }
});

//

const states = computed(() => {
  return {
    tiggerIcon: layoutsStore.tiggerIcon,
    collapsed: layoutsStore.collapsed,
    headerBrandVisible: layoutsStore.headerBrandVisible,
    selectedKeys: layoutsStore.selectedKeys,
    openKeys: layoutsStore.openKeys,
    preOpenKeys: layoutsStore.preOpenKeys,
    layoutsConfig:layoutsStore.getLayoutsConfig,

    menuSelectedKeys: layoutsStore.menuSelectedKeys,
    navMenus: adminStore.getNavMenus,
    topMenus: layoutsStore.topMenus,
  };
});

</script>

<style lang="less" module>
.span1 {
  color: green;
  font-size: 30px;
}

.span2 {
  color: green;
  font-size: 30px;
}

</style>

<style lang="less" module="abc">
.span21 {
  color: green;
  font-size: 30px;
}

.span22 {
  color: green;
  font-size: 30px;
}

</style>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-ms-layout';

.@{prefix-cls} {

  width: 100%;
  height: 100vh;

  @apply flex;
  &-asider {
    background-color: #001529;
    @apply w-210px flex flex-col md:(w-210px) sm:(w-80px) <sm:hidden;



    &-header {
      //box-shadow: 0 1px 4px 1px #001529;
      box-shadow: 0 0 4px #242424;
      z-index: 999;
      @apply h-48px flex justify-center items-center text-white;
    }
    &-menu {
      @apply flex-1 overflow-hidden;
      &-wrapper {
        height: calc(100vh - 96px);
        overflow: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
          //width: 0;
          display: none;
        }
      }
    }

    &-footer {
      z-index: 999;
      box-shadow: 0 0 4px #242424;
      @apply h-48px flex justify-center items-center text-white;
    }
  }

  &-main {
    @apply flex-1 flex flex-col;

    &-header {
      z-index: 999;
      box-shadow:0 1px 4px #cbcbcb;
      @apply h-96px;
      &-nav-menu-bar {

        @apply h-48px flex ;



        &-app-logo {
          //border: 1px solid red;
          @apply flex justify-center items-center sm:hidden;

        }

        &-menu {
          @apply  <sm:w-60px <lg:w-180px lg:w-370px <xl:w-425px xl:w-550px;
          .nav-menu {
            border-bottom: 1px solid transparent;
            height: 48px;
          }
        }

         &-oths {
            @apply flex-1;
         }

        &-actions {
          @apply flex justify-center items-center;
          //border: 1px solid red;
        }
      }



      //&-nav-tabs-bar {
      //
      //  height: 48px;
      //  border-top: 1px solid #f0f0f0;
      //  @apply flex items-center;
      //
      //  &-items {
      //  @apply flex-1 border-1 border-gray-500;
      //
      //  }
      //
      //  &-items {
      //  @apply flex-1 border-1 border-gray-500;
      //
      //  }
      //
      //  &-items {
      //    @apply flex-1 border-1 border-gray-500;
      //
      //  }
      //}

    }

    &-content {
      padding: 16px 16px 32px 16px;
      background-color: #f0f2f5;

      overflow: auto;

      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        //width: 0;
        display: none;

      }

      .ant-back-top {
        bottom: 82px;
        right: 16px;
      }
      .ant-back-top-inner {
        // border: 1px solid red;
        height: 40px;
        width: 40px;
        line-height: 40px;
        border-radius: 4px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1088e9;
        color: #fff;

      }

      @apply flex-1;
    }

    &-footer {
      z-index: 999;
      box-shadow: 0px 0px 4px #0f0f0f;
      @apply h-48px flex items-center justify-between px-16px;
    }

    //
  }
}

</style>

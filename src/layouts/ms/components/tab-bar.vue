<template>
  <!-- {{states.tabBarTabs}} -->

  <div :class="prefixCls">
<!--    {{ states.activeRouteKey }}-->
    <a-tabs
        ref="tabsBar"
        :class="`${prefixCls}-tabs`"
        v-model:activeKey="states.activeRouteKey"
        @tabScroll="callback"
        @tabClick="onTabClick"
        @change="onTabChange"
        @onNextClick="onTabNextClick"
    >
      <template #leftExtra >
        <div class="left-extra">
          <span class="action" @click="prevTab">
            <Icon icon="ant-design:left-outlined"></Icon>
          </span>
        </div>
      </template>
      <a-tab-pane v-for="(tab,index) in states.tabBarTabs" :key="tab.key" >
        <template #tab>
          <Icon class="tab-icon" :icon="`ant-design:appstore-outlined`"></Icon>
          <span class="title">{{ tab.label }}</span>
          <Icon class="close"  :icon="`ant-design:close-outlined`"></Icon>
        </template>
      </a-tab-pane>
      <template #rightExtra>
        <div class="right-extra">
          <span class="action" @click="nextTab"><Icon icon="ant-design:right-outlined"></Icon></span>
          <span class="action"><Icon icon="ant-design:redo-outlined"></Icon></span>
          <a-dropdown
              trigger="click"
              placement="bottomRight"
              :overlayStyle="{minWidth:'100px'}"
              :class="[`${prefixCls}-right-item`, `${prefixCls}-right-dropdown`]"
          >
            <span class="action">
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
      </template>

    </a-tabs>
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


const tabsBar = ref();

const callback: TabsProps['onTabScroll'] = val => {
  // console.log(val);
};
const activeKey = ref(1);

const states = computed(() => {
  return {
    tabBarTabs: layoutsStore.tabBarTabsGetter,
    activeRouteKey: layoutsStore.activeRouteKey,

  };
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


const onTabNextClick = () => {
  console.info('onTabNextClick =>');
}

const nextTab = () => {
  let elm = tabsBar.value.$el.children[0].children[1].children[0];
  console.info('elm.style.transform =>',elm.style.transform);
  let transformXy = elm.style.transform.replace('translate(','').replace(')','').replaceAll('px','').split(', ');
  let transformX = parseFloat(transformXy[0]);
  console.info('transformX =>',transformX);
  if(transformX === 0 ) {
    return false;
  }

  if(Math.abs(transformX) < 145 ) {

    elm.style.transform = `translate(0px, 0px)`;

    return false;
  }

  elm.style.transform = `translate(${transformX + 145}px, 0px)`;

}

const prevTab = () => {
  let elm = tabsBar.value.$el.children[0].children[1].children[0];
  let allTabs  = elm.getElementsByClassName('ant-tabs-tab');

  // let allTabsWidth = 0;
  // for (let i = 0;i < allTabs.length;i++) {
  //   allTabsWidth += allTabs[i].offsetWidth;
  // }
  // allTabs.forEach((item)=>{
  //   console.info('item =>',item);
  // })
  // console.info('elm',elm.children.getElementsByClassName('.ant-tabs-tab'));
  let transformXy = elm.style.transform.replace('translate(','').replace(')','').replaceAll('px','').split(', ');
  let transformX = parseFloat(transformXy[0]);
  // console.info('allTabsWidth =>',allTabsWidth);
  // console.info('transformX =>',transformX);

  // if(allTabsWidth)

  elm.style.transform = `translate(${transformX - 145}px, 0px)`;

}

const onTabClick = () => {
  // console.info('onTabClick');
}

const onTabChange = (activeKey:number) => {
  console.info('onTabChange',activeKey);

  layoutsStore.changeActiveRouteKey(activeKey);
}

// defineOptions({
//   name:'MsLayoutTabsBar',
//   inheritAttrs:false,
// })


</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-ms-layout-main-header-nav-tabs-bar";
.@{prefix-cls} {
  @apply <sm:  w-screen sm: (w-[calc(100vw-80px)])  md: (w-[calc(100vw-210px)]);
  &-tabs {
    ::v-deep(.ant-tabs-nav) {
      height: 48px;
      .ant-tabs-extra-content {
        //border: 1px solid red;
        .left-extra {
          .action {
            padding: 0 16px;
            height: 48px;
            display: inline-flex;
            border-left: 1px solid #f6f6f6;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            &:hover {
              cursor: pointer;
              background: #f9f9f9;
            }
          }

        }

        .right-extra{
          //border: 1px solid red;
          .action {
            padding: 0 16px;

            height: 48px;
            display: inline-flex;
            border-left: 1px solid #f6f6f6;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            &:hover {
              cursor: pointer;
              background: #f9f9f9;
            }

          }
        }
      }

      &:after {
        position: absolute;
        right: 0;
        left: 0;
        top:0;
        border-top: 1px solid #f0f0f0;
        content: '';
      }

      &:before {
        border-bottom: none !important;
        //border-bottom: 1px solid red;
      }

      .ant-tabs-nav-wrap {
        box-sizing: border-box;
        .ant-tabs-nav-list {
          box-sizing: border-box;
          //height: 49px;
          .ant-tabs-tab {
            padding: 0 16px;
            @apply flex flex-row justify-center items-center;
            margin: 0;
            .ant-tabs-tab-btn {
              @apply inline-flex flex-row justify-center items-center;
              .tab-icon {
                margin-right: 4px;
                vertical-align: middle !important;
              }

              .close {
                color: #1e1e1e;
                margin-right: 0 !important;
                margin-left: 4px;
                &:hover {
                  color: red;
                }
              }
            }
            box-sizing: border-box;
            //
            border-left: 1px solid #f6f6f6;
            &:hover {
              background-color: #f6f6f6;
              .close {
                color: #1e1e1e;
              }
            }
          }
          .ant-tabs-tab-active {
            background-color: #f6f6f6;
          }
        }
      }
    }

  }

}
</style>

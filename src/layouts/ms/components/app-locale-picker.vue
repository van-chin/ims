<template>
  <a-dropdown placement="bottom">
    <span class="action ant-dropdown-trigger">
      <icon icon="ant-design:translation-outlined" class="notification" />
    </span>
    <template #overlay>
      <a-menu>
        <a-menu-item v-for="(locale, index) in locales" :key="index">
          <span class="icon"
            ><Icon :icon="locale.icon" class="notification"></Icon
          ></span>
          <span class="label">{{ locale.label }}</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { Icon } from "@/components/Icon";

// import { useCSSModule } from "vue";

// const $style = useCSSModule();

// console.info("style =>", $style);

const locales = {
  "zh-CN": {
    lang: "zh-CN",
    label: "简体中文",
    icon: "twemoji:flag-china",
    title: "语言",
  },
  "zh-TW": {
    lang: "zh-TW",
    label: "繁体中文",
    icon: "twemoji:flag-china",
    title: "語言",
  },
  "en-US": {
    lang: "en-US",
    label: "English",
    icon: "icon-park-outline:english",
    title: "Language",
  },
};

let notificationVisible = ref<boolean>(false);

const notificationData = [
  {
    title: "你推荐的 曲妮妮 已通过第三轮面试",
  },
  {
    title: "左侧图标用于区分不同的类型",
  },
  {
    title: "内容不要超过两行字，超出时自动截断",
  },
  {
    title: "你收到了 14 份新周报",
  },
  {
    title: "曲丽丽 评论了你",
  },
  {
    title: "vvv",
  },
  {
    title: "vvv",
  },
];
</script>

<style lang="less" module>
.notifications {
  // border: 1px solid red;
  width: 350px;
  background: #fff;
  // padding: 16px;
  border-radius: 4px;
  box-shadow: 0 6px 16px -8px rgba(0, 0, 0, 0.08),
    0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03);

  .tabsbar {
    border: 1px solid red;
  }
}

.listitem {
  // border: 1px solid red;
  padding: 12px 24px;
  &:hover {
    background: #e6f7ff;
  }
}

.lists {
  // border: 1px solid red;
  height: 280px;
  overflow: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    //width: 0;
    display: none;
  }
}

.operations {
  // border: 1px solid red;
  height: 46px;
  line-height: 46px;
  text-align: center;
  display: flex;

  .operation {
    flex: 50%;
    // border: 1px solid red;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
}
</style>

<style lang="less" scoped>
.action {
  // border: 1px solid red;
  height: 48px;
  // line-height: 48px;
  cursor: pointer;
  padding: 0 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;

  &:hover {
    cursor: pointer;

    background: #f9f9f9;

    // background: red;
  }
}
</style>

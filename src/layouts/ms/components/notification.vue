<template>
  <a-dropdown
    :trigger="['click']"
    placement="bottom"
    v-model:visible="notificationVisible"
    overlayClassName="system-notifications"
  >
    <span class="action ant-dropdown-trigger">
      <a-badge :count="14" :offset="[2, -5]">
        <Icon icon="ant-design:bell-outlined" class="notification"></Icon>
      </a-badge>
    </span>
    <template #overlay>
      <div :class="$style.notifications">
        <a-tabs centered>
          <a-tab-pane key="1" tab="通知 (2)"> </a-tab-pane>
          <a-tab-pane key="2" tab="消息 (9)"> </a-tab-pane>
          <a-tab-pane key="3" tab="待办 (3)"> </a-tab-pane>
        </a-tabs>
        <div :class="$style.lists">
          <a-list
            item-layout="horizontal"
            :data-source="notificationData"
            class="0001"
          >
            <template v-slot:renderItem="{ item }">
              <a-list-item :class="$style.listitem">
                <a-list-item-meta
                  description="这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像"
                >
                  <template v-slot:title>
                    <a href="https://www.antdv.com/">
                      {{ item.title }}
                    </a>
                  </template>
                  <template v-slot:avatar>
                    <a-avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </div>

        <div
          class="cursor-pointer flex justify-center items-center h-46px divide-x border-t-1"
        >
          <div
            class="operation flex-1 flex justify-center"
            hover="text-red-500"
          >
            清空
          </div>
          <div
            class="operation flex-1 flex justify-center"
            hover="text-blue-500"
          >
            查看更多
          </div>
        </div>
      </div>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { Icon } from "@/components/Icon";

// import { useCSSModule } from "vue";

// const $style = useCSSModule();

// console.info("style =>", $style);

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

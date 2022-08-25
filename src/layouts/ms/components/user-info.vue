<template>
  <a-dropdown placement="bottom">
    <span class="action">
      <a-avatar :src="currentUserInfo.avatar" size="small" class="avatar">
      </a-avatar>
      <span class="nickname ml-4px">{{ currentUserInfo.nickname }}</span>
    </span>
    <template #overlay>
      <a-menu>
        <a-menu-item key="profile"
          ><Icon icon="gg:profile" style="margin-right: 6px"></Icon>
          <span>个人设置</span>
        </a-menu-item>
        <a-menu-item key="logout">
          <Icon icon="ri:logout-circle-r-line" style="margin-right: 6px"></Icon>
          <span>退出登录</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { Icon } from "@/components/Icon";

defineOptions({
  name: "currentUserInfo",
});

let currentUserInfo = reactive({
  id: 1,
  nickname: "Van",
  avatar:
    "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
});
</script>

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

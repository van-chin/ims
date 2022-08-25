<template>
  <a-tooltip>
    <template v-slot:title> 设置 </template>
    <span class="action" @click="settingDrawerToggleVisible">
      <Icon icon="ant-design:setting-outlined"></Icon>
    </span>
  </a-tooltip>

  <a-drawer
    title="设置"
    placement="right"
    width="400"
    v-model:visible="settingDrawerVisible"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>

<script lang="ts" setup>
import { Icon } from "@/components/Icon";
const settingDrawerVisible = ref<boolean>(false);
const settingDrawerToggleVisible = () => {
  settingDrawerVisible.value = !settingDrawerVisible.value;
};
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

  //@apply <md:hidden;

  &:hover {
    cursor: pointer;

    background: #f9f9f9;
  }

  .notification {
    padding: 4px;
    vertical-align: middle;
  }

  .avatar {
    margin-right: 8px;
  }
}
</style>

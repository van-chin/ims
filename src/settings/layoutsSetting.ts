import type { LayoutsConfig } from "#/config";
import {
  MenuTypeEnum,
  MenuModeEnum,
  TriggerEnum,
  MixSidebarTriggerEnum,
} from "@/enums/menuEnum";
import { CacheTypeEnum } from "@/enums/cacheEnum";
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum,
} from "@/enums/appEnum";
import {
  SIDE_BAR_BG_COLOR_LIST,
  HEADER_PRESET_BG_COLOR_LIST,
} from "./stylesSetting";
import { primaryColor } from "../../build/config/themeConfig";

// ! You need to clear the browser cache after the change
const setting: LayoutsConfig = {
  msLayout: {
    asiderWidth: 210,
    inlineCollapsed: false,
  },
};

export default setting;

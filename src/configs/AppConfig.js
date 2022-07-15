import { SIDE_NAV_LIGHT, NAV_TYPE_TOP, DIR_LTR } from "constants/ThemeConstant";
import { env } from "./EnvironmentConfig";

export const APP_NAME = "MitiveLane";
export const API_BASE_URL = env.API_ENDPOINT_URL;
export const APP_PREFIX_PATH = "/home";
export const AUTH_PREFIX_PATH = "/auth";
export const PRE_PREFIX_PATH = "/support";

export const THEME_CONFIG = {
  navType: NAV_TYPE_TOP,
  mobileNav: false,
  sideNavTheme: SIDE_NAV_LIGHT,
  navCollapsed: false,
  topNavColor: "#3e82f7",
  headerNavColor: "",
  locale: "en",
  currentTheme: "light",
  direction: DIR_LTR,
};

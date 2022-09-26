export enum PageEnum {
  // basic login path
  BASE_LOGIN = '/login',
  // redirect_uri
  QY_WECHAT_REDIRECT_URI = '/login/qywechat',
  DINGTALK_REDIRECT_URI = '/login/dingtalk',
  DINGTALK_BIND_REDIRECT_URI = '/bind/dingtalk',
  // basic home path
  // BASE_HOME = '/dashboard',
  BASE_HOME = '/ms/dashboard/analysis',
  // BASE_HOME = '/console/dashboard/analysis/index',
  // BASE_HOME = '/consoles/dashboard/analysis',
  // BASE_HOME = '/consoles/dashboard/analysis/index',
  // error page path
  ERROR_PAGE = '/exception',
  // error log page path
  ERROR_LOG_PAGE = '/error-log/list',
}

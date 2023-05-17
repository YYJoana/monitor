import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/All",
    children: [
      {
        path: "All",
        name: "All",
        component: () => import("@/views/All/index"),
        meta: { title: "总览", icon: "工作看板" },
      },
    ],
  },
  // {
  //   path: "/All",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "All",
  //       name: "All",
  //       component: () => import("@/views/All/index"),
  //       meta: { title: "总览", icon: "工作看板" },
  //     },
  //   ],
  // },

  // {
  //   path: "WGCLOUD",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "http://www.wgstart.com/",
  //       meta: { title: "WGCLOUD" },
  //     },
  //   ],
  // },

  {
    path: "/Resource",
    component: Layout,
    name: "Resource",
    meta: { title: "资源管理", icon: "dashboard" },
    children: [
      {
        path: "hostManager",
        name: "hostManager",
        component: () => import("@/views/hostManager/index"),
        meta: { title: "主机管理", icon: "el-icon-s-platform" },
      },
      // {
      //   path: "processManager",
      //   name: "processManager",
      //   component: () => import("@/views/processManager/index"),
      //   meta: { title: "进程管理", icon: "24gl-list3" },
      // },
      {
        path: "port",
        name: "port",
        component: () => import("@/views/port/index"),
        meta: { title: "端口监测", icon: "el-icon-s-help" },
      },
      {
        path: "monitor",
        name: "monitor",
        component: () => import("@/views/monitor/index"),
        meta: { title: "自定义监控项", icon: "el-icon-chat-round" },
      },
    ],
  },

  {
    path: "/dataMonitor",
    component: Layout,
    name: "dataMonitor",
    alwaysShow: true,
    meta: { title: "数据监控", icon: "el-icon-s-data" },
    children: [
      {
        path: "Mysql",
        name: "Mysql",
        component: () => import("@/views/Mysql/index"),
        meta: { title: "Mysql", icon: "数据库" },
      },
      // {
      //   path: "tableManager",
      //   name: "tableManager",
      //   component: () => import("@/views/tableManager/index"),
      //   meta: { title: "数据表管理", icon: "数据表" },
      // },
    ],
  },

  {
    path: "/middle",
    component: Layout,
    name: "middle",
    alwaysShow: true,
    meta: { title: "中间件", icon: "数据表" },
    children: [
      {
        path: "Redis",
        name: "Redis",
        component: () => import("@/views/Redis/index"),
        meta: { title: "Redis", icon: "el-icon-more" },
      },
      // {
      //   path: "tableManager",
      //   name: "tableManager",
      //   component: () => import("@/views/tableManager/index"),
      //   meta: { title: "数据表管理", icon: "数据表" },
      // },
    ],
  },

  {
    path: "/serve",
    component: Layout,
    name: "serve",
    alwaysShow: true,
    meta: { title: "服务接口检测", icon: "el-icon-connection    " },
    children: [
      {
        path: "serveManager",
        name: "serveManager",
        component: () => import("@/views/serveManager/index"),
        meta: { title: "服务器接口管理", icon: "el-icon-postcard" },
      },
    ],
  },

  {
    path: "/anomaly",
    component: Layout,
    name: "anomaly",
    meta: { title: "异常检测", icon: "el-icon-bell" },
    children: [
      {
        path: "hostAnomaly",
        name: "hostAnomaly",
        component: () => import("@/views/hostAnomaly/index"),
        meta: { title: "主机检测", icon: "el-icon-monitor" },
      },
      {
        path: "netAnomaly",
        name: "netAnomaly",
        component: () => import("@/views/netAnomaly/index"),
        meta: { title: "网络检测", icon: "el-icon-cpu" },
      },
    ],
  },

  {
    path: "/systemInformation",
    component: Layout,
    name: "systemInformation",
    alwaysShow: true,
    meta: { title: "系统信息", icon: "el-icon-document-copy" },
    children: [
      {
        path: "logInformation",
        name: "logInformation",
        component: () => import("@/views/logInformation/index"),
        meta: { title: "日志信息", icon: "el-icon-document" },
      },
    ],
  },

  {
    path: "/email",
    component: Layout,
    name: "email",
    alwaysShow: true,
    meta: { title: "邮件警告", icon: "el-icon-message" },
    children: [
      {
        path: "email",
        name: "email",
        component: () => import("@/views/email/index"),
        meta: { title: "警告通知", icon: "圆形未选中" },
      },
    ],
  },

  {
    path: "/board",
    component: Layout,
    children: [
      {
        path: "http://wsyu.xkxy.xyz:9528/static/screen/index.html",
        meta: { title: "公众看板", icon: "工作看板" },
      },
    ],
  },

  // {
  //   path: "/EStools",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "EStools",
  //       name: "EStools",
  //       component: () => import("@/views/EStools/index"),
  //       meta: { title: "ES监控工具", icon: "圆形未选中" },
  //     },
  //   ],
  // },
  // {
  //   path: "help",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "http://www.wgstart.com/docs.html",
  //       meta: { title: "帮助", icon: "帮助" },
  //     },
  //   ],
  // },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;

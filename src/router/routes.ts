export const constantRoute = [
  // Login 页面
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "Login",
    meta: {
      title: "登录",
      hidden: true,
      icon: "Loading",
    },
  },
  // Home 首页
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "Layout",
    meta: {
      title: "layout",
      hidden: true,
      icon: "Avatar",
    },
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        name: "Home",
        meta: {
          title: "首页",
          hidden: false,
          icon: "HomeFilled",
        },
      },
    ],
  },
  // Screen 大屏页
  {
    path: "/screen",
    component: () => import("@/views/screen/index.vue"),
    name: "Screen",
    meta: {
      title: "大屏",
      hidden: false,
      icon: "Monitor",
    },
  },
  // 权限管理
  {
    path: "/acl",
    component: () => import("@/layout/index.vue"),
    name: "Acl",
    meta: {
      title: "权限管理",
      hidden: false,
      icon: "Lock",
    },
    redirect: "/acl/user",
    children: [
      {
        path: "/acl/user",
        component: () => import("@/views/acl/user/index.vue"),
        name: "User",
        meta: {
          title: "用户管理",
          hidden: false,
          icon: "User",
        },
      },
      {
        path: "/acl/role",
        component: () => import("@/views/acl/role/index.vue"),
        name: "Role",
        meta: {
          title: "角色管理",
          hidden: false,
          icon: "UserFilled",
        },
      },
      {
        path: "/acl/permission",
        component: () => import("@/views/acl/permission/index.vue"),
        name: "Permission",
        meta: {
          title: "菜单管理",
          hidden: false,
          icon: "Memo",
        },
      },
    ],
  },
  // 商品管理
  {
    path: "/product",
    component: () => import("@/layout/index.vue"),
    name: "Product",
    meta: {
      title: "商品管理",
      hidden: false,
      icon: "Goods",
    },
    redirect: "/product/trademark",
    children: [
      {
        path: "/product/trademark",
        component: () => import("@/views/product/trademark/index.vue"),
        name: "Trademark",
        meta: {
          title: "品牌管理",
          hidden: false,
          icon: "ShoppingCartFull",
        },
      },
      {
        path: "/product/attr",
        component: () => import("@/views/product/attr/index.vue"),
        name: "Attr",
        meta: {
          title: "属性管理",
          hidden: false,
          icon: "Histogram",
        },
      },
      {
        path: "/product/spu",
        component: () => import("@/views/product/spu/index.vue"),
        name: "Spu",
        meta: {
          title: "SPU管理",
          hidden: false,
          icon: "Shop",
        },
      },
      {
        path: "/product/sku",
        component: () => import("@/views/product/sku/index.vue"),
        name: "Sku",
        meta: {
          title: "SKU管理",
          hidden: false,
          icon: "Shop",
        },
      },
    ],
  },
  // 404 报错
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
    meta: {
      title: "404",
      hidden: true,
      icon: "WarnTriangleFilled",
    },
  },
  // 不存在路由重定向
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
    meta: {
      title: "任意路由",
      hidden: true,
      icon: "WarningFilled",
    },
  },
];

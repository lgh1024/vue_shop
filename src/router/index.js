import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    // 路由重定向
    {path: "/", redirect: "login"},
    {path: "/login", component: Login},
    {
      path: "/home",
      component: Home,
      redirect: "/welcome",
      children: [
        {path: "/welcome", component: () => import('../components/Welcome.vue')},
        {path: "/users", component: () => import('../components/user/Users.vue')},
        {path: "/rights", component: () => import('../components/power/Rights.vue')},
        {path: "/roles", component: () => import('../components/power/Roles.vue')},
        {path: '/categories', component: () => import('../components/goods/Cate.vue')},
        {path: '/params', component: () => import('../components/goods/Params.vue')},
        {path: '/goods', component: () => import('../components/goods/List.vue')},
        {path: '/goods/add', component: () => import('../components/goods/Add.vue')},
        {path: '/orders', component: () => import('../components/order/Order.vue')},
        {path: '/reports', component: () => import('../components/report/Report.vue')}
      ],
    },
  ],
});

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路劲跳转而来
  // next 是一个函数,代表放行
  // next() 放行   ---   next('/login') 强制跳转
  if (to.path === "/login") return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem("token");
  if (!tokenStr) return next("/login");
  next();
});

export default router;

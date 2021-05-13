import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: '/',
    redirect: '/hello'
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/components/Login"),
  },
  {
    path: "/hello",
    name: "Hello",
    component: () => import("@/components/HelloWorld")
  },
  {
    path: "/Frame",
    name: "Frame",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../components/Frame"),
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});
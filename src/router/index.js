import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: '/',
    redirect: '/frame'
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
    path: "/frame",
    name: "Frame",
    component: () => import("../components/Frame"),
    children: [
      {
        path: '/selection',
        name: 'Selection',
        component: () => import("@/components/Selection")
      },
      {
        path: '/drop',
        name: 'Drop',
        component: () => import("@/components/Drop")
      },{
        path: '/history',
        name: 'History',
        component: () => import("@/components/History")
      },{
        path: '/changeInfo',
        name: 'ChangeInfo',
        component: () => import("@/components/ChangeInfo")
      },{
        path: '/changePwd',
        name: 'ChangePwd',
        component: () => import("@/components/ChangePwd")
      },
    ]
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});
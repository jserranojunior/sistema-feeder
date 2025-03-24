import { reactive } from "vue";

export const store = reactive({
  routes: [
    {
      name: "notfound",
      path: "/:catchAll(.*)*",
      meta: {
        id: 0,
      },
      component: () => import("../../pages/ErrorNotFound.vue"),
    },
    {
      name: "/home",
      path: "/home",
      meta: {
        id: 1,
      },
      component: () => import("../../pages/IndexPage.vue"),
    },
    {
      name: "login",
      path: "/login",
      meta: {
        id: 2,
      },
      component: () => import("../../pages/LoginPage.vue"),
    },
    {
      name: "cadastro",
      path: "/cadastro",
      meta: {
        id: 3,
      },
      component: () => import("../../pages/RegisterPage.vue"),
    },
    {
      name: "/",
      path: "/",
      meta: {
        id: 4,
      },
      component: () => import("../../pages/Notas.vue"),
    },
    {
      name: "usuarios",
      path: "/usuarios",
      meta: {
        id: 5,
      },
      component: () => import("../../pages/UsersPage.vue"),
    },
  ],
});

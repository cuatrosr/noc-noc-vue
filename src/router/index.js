import { createWebHistory, createRouter } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import EmployeeView from "@/views/EmployeeView.vue";
import EmailView from "@/views/EmailView.vue";
import ChangePassword from "@/views/ChangePassword.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "Register",
    component: EmployeeView,
  },
  {
    path: "/verify-email",
    name: "VerifyEmail",
    component: EmailView,
  },
  {
    path: "/change-password",
    name: "ChangePassword",
    component: ChangePassword,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  if (
    to.name !== "Login" &&
    to.name !== "VerifyEmail" &&
    to.name !== "ChangePassword" &&
    !isAuthenticated
  )
    next({ name: "Login" });
  else next();
});

export default router;

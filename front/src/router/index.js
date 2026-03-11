import { createRouter, createWebHistory } from "vue-router"

import LoginView from "../views/LoginView.vue"
import DashboardView from "../views/DashboardView.vue"
import EmployeesView from "../views/EmployeesView.vue"
import DepartmentsView from "../views/DepartmentsView.vue"
import PositionsView from "../views/PositionsView.vue"
import UsersView from "../views/UsersView.vue"

const routes = [

  { path: "/login", component: LoginView },

  { path: "/", component: DashboardView },

  { path: "/employees", component: EmployeesView },

  { path: "/departments", component: DepartmentsView },

  { path: "/positions", component: PositionsView },

  { path: "/users", component: UsersView }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token")
  if (!token && to.path !== "/login") {
    next("/login")
  } else {
    next()
  }
})

export default router
<script setup>
import { computed } from "vue"
import { useAuthStore } from "./stores/authStore"
import { useRouter } from "vue-router"

const auth = useAuthStore()
const router = useRouter()

const isAuthenticated = computed(() => auth.token !== null)

function logout() {
  auth.logout()
  router.push("/login")
}
</script>

<template>

<!-- LOGIN -->
<div v-if="!isAuthenticated">
  <router-view />
</div>

<!-- SISTEMA -->
<div v-else class="layout">

<header class="navbar">
<h2>Sistema RH</h2>

<button @click="logout">
Logout
</button>
</header>

<div class="main">

<aside class="sidebar">

<router-link to="/">Home</router-link>

<router-link to="/employees">Funcionários</router-link>

<router-link to="/departments">Departamentos</router-link>

<router-link to="/positions">Cargos</router-link>

<router-link to="/users">Usuários</router-link>

</aside>

<section class="content">

<router-view />

</section>

</div>

</div>

</template>

<style>

.layout {
display: flex;
flex-direction: column;
height: 100vh;
}

.navbar {
display: flex;
justify-content: space-between;
align-items: center;
background: #1e293b;
color: white;
padding: 12px 20px;
}

.main {
display: flex;
flex: 1;
}

.sidebar {
width: 220px;
background: #f1f5f9;
display: flex;
flex-direction: column;
padding: 20px;
gap: 12px;
}

.sidebar a {
text-decoration: none;
color: #1e293b;
}

.content {
flex: 1;
padding: 25px;
}

</style>
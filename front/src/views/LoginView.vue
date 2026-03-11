<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../stores/authStore"
import api from "../api/api"

const email = ref("")
const password = ref("")
const showPassword = ref(false)

const router = useRouter()
const auth = useAuthStore()

async function login() {
  try {

    const response = await api.post("/users/login", {
      email: email.value,
      password: password.value
    })

    auth.setToken(response.data.token)

    router.push("/")

  } catch (error) {
    alert("Login inválido")
  }
}

</script>

<template>

<div class="login-container">

<h1>Login</h1>

<input
v-model="email"
type="email"
placeholder="Email"
/>

<div class="password-field">

<input
v-model="password"
:type="showPassword ? 'text' : 'password'"
placeholder="Senha"
/>

<button
type="button"
@click="showPassword = !showPassword"
>
{{ showPassword ? "Ocultar" : "Mostrar" }}
</button>

</div>

<button @click="login">
Entrar
</button>

</div>

</template>

<style>

.login-container {
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 12px;
}

input {
padding: 8px;
width: 200px;
}

.password-field {
display: flex;
gap: 6px;
}

button {
padding: 6px 12px;
cursor: pointer;
}

</style>
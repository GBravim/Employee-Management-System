<script setup>
import { ref, onMounted } from "vue"
import api from "../api/api"

const users = ref([])

const form = ref({
  name: "",
  email: "",
  role: "VIEWER",
  password: "",
  newPassword: "",
  confirmPassword: ""
})

const editingId = ref(null)
const showForm = ref(false)
const searchEmail = ref("")

async function loadUsers() {
  const response = await api.get("/users")
  users.value = response.data
}

function toggleForm() {
  showForm.value = !showForm.value
  if (!showForm.value) resetForm()
}

function resetForm() {
  editingId.value = null
  form.value = {
    name: "",
    email: "",
    role: "VIEWER",
    password: "",
    newPassword: "",
    confirmPassword: ""
  }
}

function isDuplicateEmail(email) {
  const lowerEmail = email.trim().toLowerCase()

  return users.value.some(
    (u) => u.email.toLowerCase() === lowerEmail && u.id !== editingId.value
  )
}

async function saveUser() {

  const emailTrimmed = form.value.email.trim()
  const nameTrimmed = form.value.name.trim()

  if (!nameTrimmed || !emailTrimmed || (!editingId.value && !form.value.password)) {
    alert("Nome, Email e Senha são obrigatórios para novo usuário")
    return
  }

  if (isDuplicateEmail(emailTrimmed)) {
    alert("Já existe um usuário com este email")
    return
  }

  try {

    const payload = {
      name: nameTrimmed,
      email: emailTrimmed,
      role: form.value.role
    }

    if (!editingId.value) {

      payload.password = form.value.password
      await api.post("/users/register", payload)

    } else {

      if (form.value.newPassword || form.value.confirmPassword) {

        if (form.value.newPassword !== form.value.confirmPassword) {
          alert("As senhas não conferem")
          return
        }

        payload.password = form.value.newPassword
      }

      await api.put(`/users/${editingId.value}`, payload)
    }

    resetForm()
    showForm.value = false
    loadUsers()

  } catch (error) {
    alert("Erro ao salvar usuário: " + (error.response?.data?.error || error.message))
  }
}

function editUser(user) {

  editingId.value = user.id

  form.value = {
    name: user.name,
    email: user.email,
    role: user.role,
    password: "",
    newPassword: "",
    confirmPassword: ""
  }

  showForm.value = true
}

async function deleteUser(id) {

  if (!confirm("Deseja realmente deletar este usuário?")) return

  try {

    await api.delete(`/users/${id}`)
    loadUsers()

  } catch (error) {

    alert("Erro ao deletar usuário: " + (error.response?.data?.error || error.message))

  }
}

async function searchUserByEmail() {

  const email = searchEmail.value.trim()

  if (!email) {
    loadUsers()
    return
  }

  try {

    const response = await api.get(`/users/email/${encodeURIComponent(email)}`)

    users.value = response.data ? [response.data] : []

  } catch {

    users.value = []

  }
}

onMounted(loadUsers)
</script>

<template>

<h1>Usuários</h1>

<div class="top-bar">

  <div class="search">
    <input v-model="searchEmail" placeholder="Buscar por Email" />
    <button @click="searchUserByEmail">Buscar</button>
  </div>

  <button @click="toggleForm">
    {{ showForm ? "Fechar Cadastro" : "Novo Usuário" }}
  </button>

</div>

<!-- FORM -->

<div v-if="showForm" class="form">

<h2>{{ editingId ? "Editar Usuário" : "Novo Usuário" }}</h2>

<div class="form-row">
  <input v-model="form.name" placeholder="Nome" />
  <input v-model="form.email" placeholder="Email" />
</div>

<div class="form-row">

  <input
    v-if="!editingId"
    v-model="form.password"
    type="password"
    placeholder="Senha"
  />

  <select v-model="form.role">
    <option value="VIEWER">VIEWER</option>
    <option value="MANAGER">MANAGER</option>
    <option value="ADMIN">ADMIN</option>
  </select>

</div>

<!-- ALTERAÇÃO DE SENHA -->

<div v-if="editingId">

<h3>Alterar Senha</h3>

<div class="form-row">

  <input
    v-model="form.newPassword"
    type="password"
    placeholder="Nova senha"
  />

  <input
    v-model="form.confirmPassword"
    type="password"
    placeholder="Confirmar senha"
  />

</div>

</div>

<div class="form-actions">

  <button @click="saveUser">
    {{ editingId ? "Atualizar" : "Salvar" }}
  </button>

  <button v-if="editingId" @click="resetForm">
    Cancelar
  </button>

</div>

</div>

<hr>

<table>

<thead>

<tr>
  <th>Nome</th>
  <th>Email</th>
  <th>Role</th>
  <th>Ações</th>
</tr>

</thead>

<tbody>

<tr v-for="user in users" :key="user.id">

  <td>{{ user.name }}</td>
  <td>{{ user.email }}</td>
  <td>{{ user.role }}</td>

  <td>

    <button @click="editUser(user)">
      Editar
    </button>

    <button @click="deleteUser(user.id)">
      Deletar
    </button>

  </td>

</tr>

</tbody>

</table>

</template>

<style>

.top-bar{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:15px;
}

.search{
display:flex;
gap:6px;
}

.form{
display:flex;
flex-direction:column;
gap:10px;
margin-bottom:20px;
}

.form-row{
display:flex;
gap:10px;
}

.form-actions{
display:flex;
gap:10px;
}

table{
width:100%;
border-collapse:collapse;
}

th,td{
border:1px solid #ccc;
padding:8px;
}

button{
cursor:pointer;
padding:6px 12px;
}

</style>
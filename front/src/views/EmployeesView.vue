<script setup>
import { ref, onMounted } from "vue"
import api from "../api/api"

const employees = ref([])
const departments = ref([])
const positions = ref([])

const form = ref({
  fullName: "",
  email: "",
  cpf: "",
  departmentId: "",
  positionId: "",
  salary: null,
  active: true
})

const editingId = ref(null)
const showForm = ref(false)
const searchEmail = ref("")

// Carrega funcionários
async function loadEmployees() {
  const response = await api.get("/employees")
  employees.value = response.data
}

// Carrega departamentos e cargos para selects
async function loadDepartments() {
  const response = await api.get("/departments")
  departments.value = response.data
}

async function loadPositions() {
  const response = await api.get("/positions")
  positions.value = response.data
}

// Salvar funcionário
async function saveEmployee() {
  if (!form.value.fullName || !form.value.email || !form.value.salary) {
    alert("Nome, Email e Salário são obrigatórios")
    return
  }

  const dataToSend = {
    ...form.value,
    hireDate: new Date() // define data atual
  }

  try {
    if (editingId.value) {
      await api.put(`/employees/${editingId.value}`, dataToSend)
    } else {
      await api.post("/employees", dataToSend)
    }
    resetForm()
    showForm.value = false
    loadEmployees()
  } catch (error) {
    alert("Erro ao salvar funcionário: " + error.response?.data?.error || error.message)
  }
}

// Editar funcionário
function editEmployee(employee) {
  editingId.value = employee.id
  form.value = { 
    fullName: employee.fullName,
    email: employee.email,
    cpf: employee.cpf,
    departmentId: employee.departmentId,
    positionId: employee.positionId,
    salary: employee.salary,
    active: employee.active
  }
  showForm.value = true
}

// Deletar funcionário
async function deleteEmployee(id) {
  if (!confirm("Deseja realmente deletar este funcionário?")) return
  await api.delete(`/employees/${id}`)
  loadEmployees()
}

// Resetar formulário
function resetForm() {
  editingId.value = null
  form.value = {
    fullName: "",
    email: "",
    cpf: "",
    departmentId: "",
    positionId: "",
    salary: 0,
    active: true
  }
  showForm.value = false
}

// Busca por email
async function searchEmployee() {
  if (!searchEmail.value) {
    loadEmployees()
    return
  }

  try {
    const response = await api.get(`/employees/email/${searchEmail.value}`)
    employees.value = response.data ? [response.data] : []
  } catch (error) {
    employees.value = []
  }
}

onMounted(() => {
  loadEmployees()
  loadDepartments()
  loadPositions()
})
</script>

<template>
<h1>Funcionários</h1>

<!-- Top Bar: Buscar + Novo -->
<div class="top-bar">
  <div class="search">
    <input v-model="searchEmail" placeholder="Buscar por Email" />
    <button @click="searchEmployee">Buscar</button>
  </div>

  <button @click="showForm = !showForm">
    {{ showForm ? "Fechar Novo Cadastro" : "Novo Cadastro" }}
  </button>
</div>

<!-- Formulário de Novo/Editar -->
<div v-if="showForm" class="form">
  <h2>{{ editingId ? "Editar Funcionário" : "Novo Funcionário" }}</h2>

  <div class="form-row">
    <input v-model="form.fullName" placeholder="Nome" />
    <input v-model="form.email" placeholder="Email" />
    <div class="form-row">
      <label>
        <input type="checkbox" v-model="form.active" /> Funcionário ativo
      </label>
    </div>
  </div>

  <div class="form-row">
    <input v-model="form.cpf" placeholder="CPF" />
    <select v-model="form.departmentId">
      <option value="" disabled>Departamento</option>
      <option v-for="dept in departments" :key="dept.id" :value="dept.id">
        {{ dept.name }}
      </option>
    </select>

    <select v-model="form.positionId">
      <option value="" disabled>Cargo</option>
      <option v-for="pos in positions" :key="pos.id" :value="pos.id">
        {{ pos.title }}
      </option>
    </select>

    <input type="number" v-model.number="form.salary" placeholder="Salário" />
  </div>

  <div class="form-actions">
    <button @click="saveEmployee">Salvar</button>
    <button v-if="editingId" @click="resetForm">Cancelar</button>
  </div>
</div>

<hr>

<!-- Tabela de Funcionários -->
<table>
  <thead>
    <tr>
      <th>Nome</th>
      <th>Email</th>
      <th>CPF</th>
      <th>Departamento</th>
      <th>Cargo</th>
      <th>Salário</th>
      <th>Status</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="employee in employees" :key="employee.id">
      <td>{{ employee.fullName }}</td>
      <td>{{ employee.email }}</td>
      <td>{{ employee.cpf }}</td>
      <td>{{ employee.department?.name || employee.departmentId }}</td>
      <td>{{ employee.position?.title || employee.positionId }}</td>
      <td>{{ employee.salary }}</td>
      <td>{{ employee.active ? "Ativo" : "Inativo" }}</td>
      <td>
        <button @click="editEmployee(employee)">Editar</button>
        <button @click="deleteEmployee(employee.id)">Deletar</button>
      </td>
    </tr>
  </tbody>
</table>
</template>

<style>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.search {
  display: flex;
  gap: 6px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 10px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
}

button {
  cursor: pointer;
  padding: 6px 12px;
}
</style>
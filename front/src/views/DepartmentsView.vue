<script setup>
import { ref, onMounted } from "vue"
import api from "../api/api"

const departments = ref([])
const form = ref({ name: "" })
const editingId = ref(null)
const showForm = ref(false)

// Carrega todos os departamentos
async function loadDepartments() {
  const response = await api.get("/departments")
  departments.value = response.data
}

// Alterna visibilidade do formulário
function toggleForm() {
  showForm.value = !showForm.value
  if (!showForm.value) resetForm()
}

// Validação para nome duplicado
function isDuplicateName(name) {
  const lowerName = name.trim().toLowerCase()
  return departments.value.some(
    (dept) =>
      dept.name.toLowerCase() === lowerName &&
      dept.id !== editingId.value
  )
}

// Salva departamento (novo ou edição)
async function saveDepartment() {
  const nameTrimmed = form.value.name.trim()
  if (!nameTrimmed) {
    alert("O nome do departamento é obrigatório")
    return
  }

  if (isDuplicateName(nameTrimmed)) {
    alert("Já existe um departamento com este nome")
    return
  }

  try {
    if (editingId.value) {
      await api.put(`/departments/${editingId.value}`, { name: nameTrimmed })
    } else {
      await api.post("/departments", { name: nameTrimmed })
    }
    resetForm()
    showForm.value = false
    loadDepartments()
  } catch (error) {
    alert("Erro ao salvar departamento: " + error.response?.data?.error || error.message)
  }
}

// Edita departamento existente
function editDepartment(department) {
  editingId.value = department.id
  form.value = { name: department.name }
  showForm.value = true
}

// Deleta departamento
async function deleteDepartment(id) {
  if (!confirm("Deseja realmente deletar este departamento?")) return
  try {
    await api.delete(`/departments/${id}`)
    loadDepartments()
  } catch (error) {
    alert("Erro ao deletar departamento: " + error.response?.data?.error || error.message)
  }
}

function resetForm() {
  editingId.value = null
  form.value = { name: "" }
  showForm.value = false
}

onMounted(loadDepartments)
</script>

<template>
  <h1>Departamentos</h1>

  <button @click="toggleForm">
    {{ showForm ? "Fechar Novo Cadastro" : "Novo Cadastro" }}
  </button>

  <!-- Formulário de cadastro/edição -->
  <div v-if="showForm" class="form">
    <input v-model="form.name" placeholder="Nome do departamento" />
    <div class="form-actions">
      <button @click="saveDepartment">
        {{ editingId ? "Atualizar" : "Salvar" }}
      </button>
      <button v-if="editingId" @click="resetForm">Cancelar</button>
    </div>
  </div>

  <hr>

  <!-- Lista de departamentos -->
  <ul>
    <li v-for="department in departments" :key="department.id">
      {{ department.name }}
      <button @click="editDepartment(department)">Editar</button>
      <button @click="deleteDepartment(department.id)">Deletar</button>
    </li>
  </ul>
</template>

<style>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 15px 0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
}

button {
  cursor: pointer;
  padding: 6px 12px;
}
</style>
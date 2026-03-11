<script setup>
import { ref, onMounted } from "vue"
import api from "../api/api"

const positions = ref([])
const form = ref({ title: "" })
const editingId = ref(null)
const showForm = ref(false)

async function loadPositions() {
  const response = await api.get("/positions")
  positions.value = response.data
}

function toggleForm() {
  showForm.value = !showForm.value
  if (!showForm.value) resetForm()
}

async function savePosition() {
  try {
    if (editingId.value) {
      await api.put(`/positions/${editingId.value}`, form.value)
    } else {
      await api.post("/positions", form.value)
    }
    resetForm()
    loadPositions()
  } catch (error) {
    alert("Erro ao salvar o cargo: " + error.response?.data?.error || error.message)
  }
}

function editPosition(position) {
  editingId.value = position.id
  form.value = { title: position.title }
  showForm.value = true
}

async function deletePosition(id) {
  if (!confirm("Tem certeza que deseja deletar este cargo?")) return
  await api.delete(`/positions/${id}`)
  loadPositions()
}

function resetForm() {
  editingId.value = null
  form.value = { title: "" }
  showForm.value = false
}

onMounted(loadPositions)
</script>

<template>
<h1>Cargos</h1>

<!-- Botão Novo cadastro -->
<button @click="toggleForm">
  {{ showForm ? "Cancelar" : "Novo Cadastro" }}
</button>

<!-- Formulário de cadastro/edição -->
<div v-if="showForm" class="form">
  <input v-model="form.name" placeholder="Nome do cargo" />

  <div class="form-actions">
    <button @click="savePosition">
      {{ editingId ? "Atualizar" : "Salvar" }}
    </button>
  </div>
</div>

<hr>

<!-- Lista de cargos -->
<ul>
  <li v-for="position in positions" :key="position.id">
    {{ position.title }}
    <button @click="editPosition(position)">Editar</button>
    <button @click="deletePosition(position.id)">Deletar</button>
  </li>
</ul>
</template>

<style>
.form {
  display: flex;
  gap: 10px;
  margin: 10px 0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
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
}
</style>
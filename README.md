# Sistema de Gestão de Funcionários

O sistema permite o **cadastro, edição, listagem e exclusão** de funcionários, departamentos, cargos e usuários, além de um controle básico de autenticação.

---

# Tecnologias Utilizadas

### Backend

* Node.js
* Express
* Prisma ORM
* SQLite
* bcrypt

### Frontend

* Vue.js 3
* Axios

### Ferramentas

* npm
* Prisma Studio

---

# Funcionalidades do Sistema

* Autenticação

* Gestão de Funcionários

* Gestão de Departamentos

* Gestão de Cargos

* Gestão de Usuários

---

# Estrutura do Projeto

```
project/
│
├── back/                 # Backend Node.js
│   ├── prisma/           # Prisma schema e seed
|   └── src/
│       ├── controllers/
│       ├── docs/
│       ├── middleware/
│       ├── routes/
│       ├── services/
│       ├── validations/
│       ├── .env
│       └── server.js
│
├── front/                # Frontend Vue.js
│   └── src/
│       ├── api/
│       ├── assets/
│       ├── components/
│       ├── router/
│       ├── stores/
│       ├── views/
│       ├── App.vue
│       └── main.js
│
└── README.md
```

---

### Instalação do Projeto

# Configuração do Backend

Acesse a pasta:

```
cd ../seu-repositorio/back
```

Instale as dependências:

```
npm install
```

Configure o banco de dados e execute as migrations:

```
npx prisma migrate dev
```

O banco SQLite será criado automaticamente.

Execute o servidor:

```
npm run dev
```

O Backend estará disponível em:

```
http://localhost:3000/
```
---

# Configuração do Frontend

Abra outro terminal e acesse:

```
cd ../seu-repositorio/front
```

Instale as dependências:

```
npm install
```

Execute o projeto:

```
npm run dev
```

O frontend estará disponível normalmente em:

```
http://localhost:5173/
```

---

# Seed Inicial

Ao rodar as migrations, o sistema cria automaticamente um usuário administrador:

```
Email: admin@admin.com
Senha: Admin@123
```

Este usuário pode acessar o sistema e gerenciar os demais usuários.

---


# Resetar Banco de Dados

Caso seja necessário recriar o banco:

```
npx prisma migrate reset
```

---

# Licença

Este projeto foi desenvolvido para fins acadêmicos.

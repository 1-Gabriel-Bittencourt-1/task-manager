# Gestor de Tarefas


Aplicação web para organizar tarefas (criar, listar, atualizar e excluir). Projeto pensado para demonstrar domínio de CRUD completo, separação de camadas e integração front-end/back-end.


---


## Objetivo
- Consolidar fundamentos de desenvolvimento web full‑stack.
- Praticar padrões simples e claros (REST, rotas, controllers, componentes reutilizáveis).
- Entregar algo utilizável e fácil de entender.


---


## Tecnologias
- **Front-end:** HTML, CSS, JavaScript
- **Banco:** nenhum
- **Outros:** Git, Docker (opcional)


---


## CODIGOS

---

- index.html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Manager</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Task Manager</h1>
    <form id="task-form">
      <input type="text" id="task-input" placeholder="Digite sua tarefa" required>
      <button type="submit">Adicionar</button>
    </form>
    <ul id="task-list"></ul>
  </div>
  <script src="script.js"></script>
</body>
</html>

---

- style.css
body {
  font-family: Arial, sans-serif;
  background: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  background: #fff;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  width: 300px;
}

h1 {
  text-align: center;
}

#task-form {
  display: flex;
  gap: 10px;
}

#task-form input {
  flex: 1;
  padding: 5px;
}

#task-form button {
  padding: 5px 10px;
}

#task-list {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

#task-list li {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}

#task-list li.completed {
  text-decoration: line-through;
  color: gray;
}

---

- script.js
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.textContent = taskText;

  const completeBtn = document.createElement('button');
  completeBtn.textContent = '✔';
  completeBtn.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✖';
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(li);
  });

  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = '';
});

---

## Como executar
- Cole os seguintes codigos em uma pasta "Task-Manager" ou seu nome de preferencia
- Cada um em seu formato (index.html / style.css / script.js)
- Abra o index.html no seu navegador padrão

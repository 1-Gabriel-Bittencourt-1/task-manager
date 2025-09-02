const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const statusSelect = document.getElementById('status'); // pega o select de prioridade

// Array para armazenar tarefas
let tasks = [];

// Referências do histórico
const historyTab = document.getElementById('historyTab') || document.createElement('div');
historyTab.id = 'historyTab';
historyTab.textContent = 'Histórico';
historyTab.style.position = 'fixed';
historyTab.style.top = '10px';
historyTab.style.right = '10px';
historyTab.style.cursor = 'pointer';
historyTab.style.padding = '5px 10px';
historyTab.style.backgroundColor = '#7b1113';
historyTab.style.color = 'white';
historyTab.style.borderRadius = '5px';
document.body.appendChild(historyTab);

const historyDiv = document.getElementById('history') || document.createElement('div');
historyDiv.id = 'history';
historyDiv.style.display = 'none';
historyDiv.style.position = 'fixed';
historyDiv.style.top = '50px';
historyDiv.style.right = '10px';
historyDiv.style.width = '300px';
historyDiv.style.maxHeight = '80%';
historyDiv.style.overflowY = 'auto';
historyDiv.style.background = '#f0f0f0';
historyDiv.style.padding = '10px';
historyDiv.style.borderRadius = '5px';
historyDiv.style.boxShadow = '0 0 10px gray';
document.body.appendChild(historyDiv);

// Função para renderizar todas as tarefas na tela
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.className = task.completed ? 'Concluída' : task.status; // prioridade ou concluída

    // Botão concluir/desconcluir
    const completeBtn = document.createElement('button');
    completeBtn.textContent = '✔';
    completeBtn.addEventListener('click', () => {
      task.completed = !task.completed; // toggle
      renderTasks();
      renderHistory();
    });

    // Botão deletar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
      renderHistory();
    });

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  renderHistory();
}

// Adicionar tarefa
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    status: statusSelect.value, // prioridade
    completed: false,
    comment: '',
    classify: ''
  };
  tasks.push(newTask);
  taskInput.value = '';
  renderTasks();
});

// Renderiza o histórico
historyTab.onclick = () => {
  historyDiv.style.display = historyDiv.style.display === 'none' ? 'block' : 'none';
};

function renderHistory() {
  historyDiv.innerHTML = '<h3>Histórico de Tarefas</h3>';
  tasks.filter(t => t.completed).forEach(task => {
    const div = document.createElement('div');
    div.className = 'history-item';
    div.style.borderBottom = '1px solid #ccc';
    div.style.marginBottom = '5px';
    div.style.paddingBottom = '5px';
    div.innerHTML = `
      <div>${task.text} <span class="classify" style="font-size:0.8em;color:#555;font-weight:bold;">${task.classify || 'Sem classificação'}</span></div>
      <input type="text" placeholder="Adicionar comentário" value="${task.comment}" onchange="updateComment(${task.id}, this.value)">
      <input type="text" placeholder="Classificar tarefa" value="${task.classify}" onchange="updateClassify(${task.id}, this.value)">
    `;
    historyDiv.appendChild(div);
  });
}

// Atualizar comentário
function updateComment(id, value) {
  const task = tasks.find(t => t.id === id);
  if (task) task.comment = value;
}

// Atualizar classificação
function updateClassify(id, value) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.classify = value;
    renderHistory(); // atualiza visual
  }
}

// Inicializa render
renderTasks();
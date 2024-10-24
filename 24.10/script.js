function toggleForm() {
    const loginCard = document.querySelector('.login-card');
    const registerCard = document.querySelector('.register-card');
    
    // Alterna a exibição entre as telas de login e cadastro
    loginCard.style.display = (loginCard.style.display === 'none') ? 'block' : 'none';
    registerCard.style.display = (registerCard.style.display === 'none') ? 'block' : 'none';
}

function login() {
    // Lógica de login (substitua pelo seu método de autenticação)
    document.querySelector('.login-card').style.display = 'none';
    document.querySelector('.register-card').style.display = 'none';
    document.querySelector('.main-screen').style.display = 'block';
}

function register() {
    // Lógica de cadastro (substitua pelo seu método de registro)
    alert('Cadastro realizado com sucesso!');
    toggleForm(); // Retorna à tela de login após o cadastro
}

function logout() {
    alert('Você saiu do sistema.');
    document.querySelector('.main-screen').style.display = 'none'; // Oculta a tela principal
    document.querySelector('.login-card').style.display = 'block'; // Exibe a tela de login
}

function showTab(tabId) {
    const cards = document.querySelectorAll('.card');
    const tabs = document.querySelectorAll('.tab');

    cards.forEach(card => {
        card.classList.remove('active');
    });
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    document.querySelector(`.tab[onclick="showTab('${tabId}')"]`).classList.add('active');
}

function viewTasks(projectName) {
    alert('Visualizando tarefas do ' + projectName);
}

function deleteProject(projectName) {
    alert('Projeto ' + projectName + ' excluído.');
}

function editTask(taskName) {
    alert('Editando ' + taskName);
}

function deleteTask(taskName) {
    alert('Tarefa ' + taskName + ' excluída.');
}
function addProject(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Captura os valores dos campos
    const projectName = document.getElementById('project-name').value;
    const projectStatus = document.getElementById('project-status').value;

    // Seleciona a tabela de projetos em andamento
    const projectTable = document.querySelector('#ongoing-projects tbody');

    // Cria uma nova linha para o projeto
    const newRow = document.createElement('tr');

    // Cria as células para o nome do projeto, status e ações
    const nameCell = document.createElement('td');
    nameCell.textContent = projectName;

    const statusCell = document.createElement('td');
    statusCell.textContent = projectStatus;

    const actionsCell = document.createElement('td');
    
    // Botão "Ver Tarefas"
    const viewButton = document.createElement('button');
    viewButton.textContent = 'Ver Tarefas';
    viewButton.onclick = function() {
        viewTasks(projectName);
        // Exibe a aba de tarefas do projeto
        showTab('project-tasks');

    };

    // Botão "Excluir Projeto"
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.onclick = function() {
        deleteProject(projectName, newRow);
    };

    // Adiciona os botões à célula de ações
    actionsCell.appendChild(viewButton);
    actionsCell.appendChild(deleteButton);

    // Adiciona as células à linha
    newRow.appendChild(nameCell);
    newRow.appendChild(statusCell);
    newRow.appendChild(actionsCell);

    // Adiciona a nova linha à tabela
    projectTable.appendChild(newRow);

    // Limpa o formulário
    document.getElementById('project-form').reset();

    // Opcional: Mostrar uma mensagem de sucesso
    
    return false;
}

function deleteProject(projectName, row) {
    // Confirmação antes de excluir o projeto
    if (confirm('Tem certeza de que deseja excluir o projeto "' + projectName + '"?')) {
        row.remove(); // Remove a linha da tabela
        alert('Projeto "' + projectName + '" excluído.');
    }
}
// Armazena as tarefas para cada projeto
let projectTasks = {};

// Função para adicionar tarefa a um projeto
function addTaskToProject(projectName, taskName, taskStatus) {
    if (!projectTasks[projectName]) {
        projectTasks[projectName] = [];
    }
    projectTasks[projectName].push({
        name: taskName,
        status: taskStatus
    });
}

// Função para exibir as tarefas do projeto selecionado
function viewTasks(projectName) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Limpa a lista de tarefas

    if (projectTasks[projectName] && projectTasks[projectName].length > 0) {
        projectTasks[projectName].forEach((task, index) => {
            const taskRow = document.createElement('tr');

            // Coluna do nome da tarefa
            const nameCell = document.createElement('td');
            nameCell.textContent = task.name;
            taskRow.appendChild(nameCell);

            // Coluna do status da tarefa
            const statusCell = document.createElement('td');
            statusCell.textContent = task.status;
            taskRow.appendChild(statusCell);

            // Coluna das ações
            const actionsCell = document.createElement('td');
            
            // Botão "Editar"
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = function() {
                editTask(task.name, projectName);
            };
            actionsCell.appendChild(editButton);

            // Botão "Excluir"
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = function() {
                deleteTask(task.name, projectName, index);
            };
            actionsCell.appendChild(deleteButton);

            taskRow.appendChild(actionsCell);
            taskList.appendChild(taskRow);
        });
    } else {
        const emptyRow = document.createElement('tr');
        const emptyCell = document.createElement('td');
        emptyCell.textContent = 'Nenhuma tarefa encontrada para este projeto.';
        emptyCell.setAttribute('colspan', '3');
        emptyRow.appendChild(emptyCell);
        taskList.appendChild(emptyRow);
    }

    // Exibe a aba de tarefas
    showTab('project-tasks');
}

// Função para cadastrar tarefa
function addTask(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Captura os valores do formulário
    const taskName = document.getElementById('task-name').value;
    const taskStatus = document.getElementById('task-status').value;
    const projectName = document.getElementById('current-project').value; // Supõe-se que este campo já foi preenchido

    // Adiciona a tarefa ao projeto
    addTaskToProject(projectName, taskName, taskStatus);

    // Atualiza a lista de tarefas
    viewTasks(projectName);

    // Limpa o formulário
    document.getElementById('task-form').reset();

    return false;
}

// Função para excluir tarefa
function deleteTask(taskName, projectName, taskIndex) {
    if (confirm('Tem certeza que deseja excluir a tarefa "' + taskName + '" do projeto "' + projectName + '"?')) {
        projectTasks[projectName].splice(taskIndex, 1); // Remove a tarefa pelo índice
        viewTasks(projectName); // Atualiza a lista de tarefas
        alert('Tarefa "' + taskName + '" excluída com sucesso.');
    }
}

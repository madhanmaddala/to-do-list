document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const taskCounter = document.getElementById('task-counter');
    let tasks = [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.add('task-item');
            if (task.completed) {
                li.classList.add('completed');
            }
            li.innerHTML = `
                <div class="task-text">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}" class="task-checkbox">
                    ${task.text}
                </div>
                <div class="task-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
        updateTaskCounter();
    }

    // Update task counter
    function updateTaskCounter() {
        const completedTasks = tasks.filter(task => task.completed).length;
        taskCounter.textContent = `${completedTasks}/${tasks.length}`;
    }

    // Add task function
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    }

    // Add task event listener for button
    addTaskBtn.addEventListener('click', addTask);

    // Add task event listener for Enter key
    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default action (like form submission)
            addTask();
        }
    });

    // Task list click event listener
    taskList.addEventListener('change', (event) => {
        if (event.target.classList.contains('task-checkbox')) {
            const index = event.target.dataset.index;
            tasks[index].completed = event.target.checked;
            renderTasks();
        }
    });

    // Task list click event listener for delete and edit
    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const index = Array.from(taskList.children).indexOf(event.target.closest('li'));
            tasks.splice(index, 1);
            renderTasks();
        }
        if (event.target.classList.contains('edit-btn')) {
            // Handle editing task
            const index = Array.from(taskList.children).indexOf(event.target.closest('li'));
            const newText = prompt('Edit task:', tasks[index].text);
            if (newText !== null) {
                tasks[index].text = newText;
                renderTasks();
            }
        }
    });
});

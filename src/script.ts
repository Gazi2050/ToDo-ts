interface Task {
    text: string;
    date: string;
}

document.getElementById('taskForm')?.addEventListener('submit', (e) => {
    e.preventDefault()

    const taskText = (<HTMLInputElement>document.getElementById('taskText')).value;
    const taskDate = (<HTMLInputElement>document.getElementById('taskDate')).value;

    const task: Task = {
        text: taskText,
        date: taskDate
    }

    const tasks = getTask();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    displayTasks();

    (<HTMLInputElement>document.getElementById("taskText")).value = "";
    (<HTMLInputElement>document.getElementById("taskDate")).value = "";
})

function getTask(): Task[] {
    const taskString = localStorage.getItem('tasks');
    if (taskString) {
        return JSON.parse(taskString)
    }
    else {
        return [];
    }
}

function displayTasks(): void {
    const taskList = document.getElementById('task-list');
    if (!taskList) {
        return;
    }
    const tasks = getTask();
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No task added';
        taskList.appendChild(li);
    } else {
        tasks.forEach((task: Task, index: number) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${task.text}`;

            // Style for task text
            li.style.marginBottom = "10px";
            li.style.padding = "10px";
            li.style.border = "1px solid #ccc";
            li.style.borderRadius = "5px";
            li.style.backgroundColor = "#f9f9f9";
            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.alignItems = "center";

            const taskDate = document.createElement("span");
            taskDate.textContent = task.date

            // Style for task date
            taskDate.style.fontSize = "12px";
            taskDate.style.color = "#666";
            taskDate.style.marginRight = "10px";

            const deleteBtn = document.createElement('button')
            deleteBtn.textContent = 'Delete';

            // Style for delete button
            deleteBtn.style.backgroundColor = "#f44336";
            deleteBtn.style.color = "white";
            deleteBtn.style.border = "none";
            deleteBtn.style.padding = "5px 10px";
            deleteBtn.style.borderRadius = "3px";
            deleteBtn.style.cursor = "pointer";

            deleteBtn.addEventListener('click', () => {
                deleteTask(index);
                displayTasks();
            });

            li.appendChild(taskDate);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        })
    }
}

function deleteTask(index: number): void {
    const tasks = getTask();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

displayTasks();
function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const saved = localStorage.getItem('todos');
    if (saved) {
        return JSON.parse(saved);
    }
    return [];
}


let todos = loadTodos();

function renderTodos() {
    var ul = document.getElementById("todo-list");
    ul.innerHTML = '';
    todos.forEach(function(todo, index) {
        var li = document.createElement("li");
        li.className = "todo-item";

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "todo-checkbox";
        checkbox.checked = todo.checked;
        checkbox.onchange = function() {
            todos[index].checked = checkbox.checked;
            saveTodos(todos);
        };
        
        var span = document.createElement("span");
        span.textContent = todo.text;
        span.className = "todo-text";

        var removeBtn = document.createElement("button");
        removeBtn.className = "icon-btn";
        removeBtn.innerHTML = `
        <svg width="28" height="32" viewBox="0 0 512 512" fill="none" stroke="#7a4c1e" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
        <rect x="104" y="152" width="304" height="312" rx="32" fill="rgba(122,76,30,0.2)"/>
        <rect x="184" y="56" width="144" height="48" rx="24" fill="rgba(122,76,30,0.1)" />
        <line x1="200" y1="200" x2="200" y2="400"/>
        <line x1="256" y1="200" x2="256" y2="400"/>
        <line x1="312" y1="200" x2="312" y2="400"/>
        <path d="M104 152 L408 152" />
        <rect x="96" y="104" width="320" height="48" rx="24"/>
        </svg>
        `;
        removeBtn.onclick = function() {
            todos.splice(index, 1);
            saveTodos(todos);
            renderTodos();
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(removeBtn);
        ul.appendChild(li);
    });
}

function addTodo() {
    var input = document.getElementById("todo-input");
    var val = input.value.trim();
    if (val.length > 0) {
        todos.push({ text: val, checked: false });
        saveTodos(todos);
        renderTodos();
        input.value = "";
    }
}

document.addEventListener('DOMContentLoaded', renderTodos);

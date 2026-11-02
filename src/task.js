
// ===== Day 2, Block 1: arrays and object records =====

// Sample data (5 tasks, unique ids)
const sampleTasks = [
    { id: 1, title: "Read brief", completed: false, priority: "high", createdAt: "2026-11-01" },
    { id: 2, title: "Draft outline", completed: true, priority: "medium", createdAt: "2026-11-01" },
    { id: 3, title: "Write tests", completed: false, priority: "high", createdAt: "2026-11-02" },
    { id: 4, title: "Review code", completed: false, priority: "low", createdAt: "2026-11-02" },
    { id: 5, title: "Submit work", completed: true, priority: "medium", createdAt: "2026-11-02" }
];

// Blank title or duplicate id: throws an Error. Returns a new array.
function addTask(tasks, newTask) {
    if (!newTask.title || !newTask.title.trim()) {
        throw new Error("Task title is required.");
    }
    if (tasks.some(task => task.id === newTask.id)) {
        throw new Error("Task ID already exists.");
    }
    return [...tasks, {
        ...newTask,
        completed: false,
        title: newTask.title.trim()
    }];
}

// Missing id: returns the tasks unchanged. Returns a new array.
function completeTask(tasks, id) {
    return tasks.map(task =>
        task.id === id ? { ...task, completed: true } : task
    );
}

// Missing id: returns the tasks unchanged. Returns a new array.
function deleteTask(tasks, id) {
    return tasks.filter(task => task.id !== id);
}

// Blank title or missing id: throws an Error. Returns a new array.
function renameTask(tasks, id, newTitle) {
    if (typeof newTitle !== "string" || !newTitle.trim()) {
        throw new Error("New title cannot be empty.");
    }
    if (!tasks.some(task => task.id === id)) {
        throw new Error("Task not found.");
    }
    return tasks.map(task =>
        task.id === id ? { ...task, title: newTitle.trim() } : task
    );
}

// ===== Challenge 5: immutable toggle =====
// Unknown id: returns every task unchanged. Never changes the original.
function toggleTask(tasks, id) {
    return tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
}

// ===== Tests =====
const taskSnapshot = JSON.stringify(sampleTasks);

const toggledTasks = toggleTask(sampleTasks, 1);
console.log("Toggled task 1:", toggledTasks[0].completed);                                    // true
console.log("Original unchanged:", taskSnapshot === JSON.stringify(sampleTasks));            // true
console.log("Unknown id keeps all:", JSON.stringify(toggleTask(sampleTasks, 99)) === taskSnapshot); // true

console.log("Added:", addTask(sampleTasks, { id: 6, title: "  New task  ", priority: "low" }).length); // 6
console.log("Completed task 1:", completeTask(sampleTasks, 1)[0].completed);                 // true
console.log("Deleted task 2:", deleteTask(sampleTasks, 2).length);                           // 4
console.log("Renamed task 3:", renameTask(sampleTasks, 3, "Write more tests")[2].title);

try {
    addTask(sampleTasks, { id: 7, title: "   ", priority: "low" });
    console.log("FAIL: blank title should throw");
} catch (error) {
    console.log("PASS: blank title -", error.message);
}

try {
    addTask(sampleTasks, { id: 1, title: "Duplicate id", priority: "low" });
    console.log("FAIL: duplicate id should throw");
} catch (error) {
    console.log("PASS: duplicate id -", error.message);
}

try {
    renameTask(sampleTasks, 99, "Ghost");
    console.log("FAIL: unknown id should throw");
} catch (error) {
    console.log("PASS: unknown id -", error.message);
}

console.log("Original still unchanged:", taskSnapshot === JSON.stringify(sampleTasks));      // true
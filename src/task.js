
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
// ===== Day 2, Block 2: array methods as readable tools =====

// Step 21: filter, map, find
const openTasks = sampleTasks.filter(task => !task.completed);
const openTitles = openTasks.map(task => task.title);
const taskThree = sampleTasks.find(task => task.id === 3);
console.log("Open titles:", openTitles);          // ["Read brief", "Write tests", "Review code"]
console.log("Task 3:", taskThree.title);          // Write tests

// Step 22: some and every
const hasHighPriority = sampleTasks.some(task => task.priority === "high");
const allDone = sampleTasks.every(task => task.completed);
console.log("Any high priority:", hasHighPriority);   // true
console.log("All complete:", allDone);               // false

// Step 23: reduce, completed tasks counted by priority
const completedByPriority = sampleTasks.reduce((counts, task) => {
    if (task.completed) {
        counts[task.priority] = (counts[task.priority] || 0) + 1;
    }
    return counts;
}, {});
console.log("Completed by priority:", completedByPriority);  // { medium: 2 }

// Step 24: the same chain, written with named steps
const openTitlesChained = sampleTasks.filter(task => !task.completed).map(task => task.title);
console.log("Chain matches named steps:", JSON.stringify(openTitlesChained) === JSON.stringify(openTitles)); // true
// ===== Challenge 6: purchase summary =====
// Empty list: returns zeros and null. Tie for most expensive: the first one wins.
function summarizePurchases(purchases) {
    if (purchases.length === 0) {
        return { total: 0, count: 0, average: 0, mostExpensive: null };
    }
    const total = purchases.reduce((sum, purchase) => sum + purchase.price, 0);
    let mostExpensive = purchases[0];
    for (const purchase of purchases) {
        if (purchase.price > mostExpensive.price) {
            mostExpensive = purchase;
        }
    }
    return { total, count: purchases.length, average: total / purchases.length, mostExpensive };
}

console.log("Summary:", summarizePurchases([{ name: "Pen", price: 2 }, { name: "Book", price: 10 }, { name: "Bag", price: 8 }]));
console.log("Empty:", summarizePurchases([]));
console.log("One item:", summarizePurchases([{ name: "Pen", price: 2 }]));
console.log("Tie:", summarizePurchases([{ name: "A", price: 9 }, { name: "B", price: 9 }]).mostExpensive.name); // A
// ===== Day 2, Block 3: classes =====

class Task {
    #completed = false;

    constructor(id, title, priority = "normal") {
        if (typeof title !== "string" || !title.trim()) {
            throw new Error("Title is required");
        }
        this.id = id;
        this.title = title.trim();
        this.priority = priority;
    }

    get completed() { return this.#completed; }
    complete() { this.#completed = true; }
    toggle() { this.#completed = !this.#completed; }
    rename(newTitle) {
        if (typeof newTitle !== "string" || !newTitle.trim()) {
            throw new Error("Title is required");
        }
        this.title = newTitle.trim();
    }
    describe() { return `${this.title} (${this.priority})`; }
}

class TaskList {
    #tasks = [];

    add(task) {
        if (this.findById(task.id)) throw new Error("Task ID already exists.");
        this.#tasks.push(task);
    }
    remove(id) { this.#tasks = this.#tasks.filter(task => task.id !== id); }
    findById(id) { return this.#tasks.find(task => task.id === id); }
    getOpenTasks() { return this.#tasks.filter(task => !task.completed); }
}

const demoTask = new Task(10, "Study classes", "high");
console.log("New task completed?", demoTask.completed);        // false
demoTask.complete();
console.log("After complete():", demoTask.completed);          // true
console.log("Describe:", demoTask.describe());                 // Study classes (high)

const demoList = new TaskList();
demoList.add(new Task(1, "First"));
demoList.add(new Task(2, "Second"));
demoList.findById(1).complete();
console.log("Open tasks:", demoList.getOpenTasks().length);    // 1

// ===== Challenge 7: inheritance and composition =====

class Reminder extends Task {
    constructor(id, title, priority, dueDate) {
        super(id, title, priority);
        this.dueDate = dueDate;
    }
    describe() { return `${super.describe()} due ${this.dueDate}`; }
}

const demoReminder = new Reminder(11, "Submit work", "high", "2026-11-03");
console.log("Reminder:", demoReminder.describe());             // Submit work (high) due 2026-11-03

// Composition: a plain task with optional reminder data attached
const composedTask = { task: new Task(12, "Call mentor"), reminder: { dueDate: "2026-11-04" } };
console.log("Composition:", composedTask.task.describe(), composedTask.reminder.dueDate);

// ===== Challenge 8: task statistics =====
// Empty list: completionRate is 0.
function getTaskStats(tasks) {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const byPriority = tasks.reduce((counts, task) => {
        counts[task.priority] = (counts[task.priority] || 0) + 1;
        return counts;
    }, {});
    return {
        total,
        completed,
        open: total - completed,
        completionRate: total === 0 ? 0 : Math.round((completed / total) * 100),
        byPriority
    };
}

const stats = getTaskStats(sampleTasks);
console.log("Stats:", stats);   // total 5, completed 2, open 3, completionRate 40, byPriority { high: 2, medium: 2, low: 1 }
console.log("Total = completed + open:", stats.total === stats.completed + stats.open);                                   // true
console.log("Priority counts sum to total:", Object.values(stats.byPriority).reduce((a, b) => a + b, 0) === stats.total); // true
console.log("Empty list:", getTaskStats([]));   // total 0, completionRate 0
// ===== Day 2, Block 4: repository, helper and tests =====

// Step 31: one named helper for repeated title validation
function validateTitle(title) {
    if (typeof title !== "string" || !title.trim()) {
        throw new Error("Title is required");
    }
    return title.trim();
}

// Step 29: storage-shaped operations. Task owns behaviour, the repository owns the collection.
class TaskRepository {
    #tasks = [];

    save(task) {
        if (this.findById(task.id)) throw new Error("Task ID already exists.");
        this.#tasks.push(task);
        return task;
    }
    findById(id) { return this.#tasks.find(task => task.id === id); }
    getAll() { return [...this.#tasks]; }
    getOpen() { return this.#tasks.filter(task => !task.completed); }
}

// Step 30: manual tests (create, complete, filter open, reject invalid title)
const repo = new TaskRepository();
repo.save(new Task(1, "Write notes", "high"));
repo.save(new Task(2, "Push code", "low"));
console.log("Created:", repo.getAll().length === 2 ? "PASS" : "FAIL");

repo.findById(1).complete();
console.log("Complete:", repo.findById(1).completed === true ? "PASS" : "FAIL");
console.log("Filter open:", repo.getOpen().length === 1 ? "PASS" : "FAIL");

try {
    new Task(3, "   ", "low");
    console.log("Invalid title: FAIL (should have thrown)");
} catch (error) {
    console.log("Invalid title: PASS -", error.message);
}

// Step 32: edge cases
console.log("Empty list stats:", getTaskStats([]).completionRate === 0 ? "PASS" : "FAIL");
console.log("One item stats:", getTaskStats([new Task(9, "Solo")]).total === 1 ? "PASS" : "FAIL");

try {
    repo.save(new Task(1, "Duplicate id"));
    console.log("Duplicate id: FAIL (should have thrown)");
} catch (error) {
    console.log("Duplicate id: PASS -", error.message);
}

console.log("Unknown id:", repo.findById(99) === undefined ? "PASS" : "FAIL");
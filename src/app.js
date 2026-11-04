const itemName = "Notebook";
const price = 12.5;
const quantity = 3;
const subtotal = price * quantity;
const tax = subtotal * 0.08;
console.log(`${itemName}: $${(subtotal + tax).toFixed(2)}`);
console.log(typeof "text", typeof 42, typeof true, typeof undefined, typeof null);

let discount = 0;
discount = 0.1;
console.log(discount);

console.log(Number("12"), Number("abc"));
console.log(Number.isFinite(Number("12")), Number.isFinite(Number("abc")));

console.log(2 + 3 * 4, (2 + 3) * 4);
const totalMinutes = 60;
const hours =Math.floor(137 / 60);
const minutes = 137 % 60;
console.log(`${hours} hours and ${minutes} minutes`);

function getDiscountedTotal(total, member) {
    if (!Number.isFinite(total) || total < 0) {
        return null;
    }

    if (member && total >= 50) {
        return total * 0.9;
    }

    return total;
}

function gradeLabel(score) {
    if (!Number.isFinite(score) || score < 0 || score > 100) {
        return "Invalid";
    }

    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";

    return "F";
}

// Discount tests
console.log("Discount tests:");
console.log(getDiscountedTotal(49.99, true));
console.log(getDiscountedTotal(50, true));
console.log(getDiscountedTotal(80, false));
console.log(getDiscountedTotal(80, true));
console.log(getDiscountedTotal(-10, true));

// Grade tests
console.log("Grade tests:");
console.log(gradeLabel(89));
console.log(gradeLabel(90));
console.log(gradeLabel(0));
console.log(gradeLabel(100));
console.log(gradeLabel(-1));
console.log(gradeLabel(101));

// TASK 1: Calculate prices and count prices above 20

const prices = [5, 12, 25, 8, 30];

let total = 0;
let count = 0;

if (prices.length === 0) {
    console.log("No prices available");
} else {
    for (const price of prices) {
        total += price;

        if (price > 20) {
            count++;
        }
    }

    console.log("Total:", total);
    console.log("Prices above 20:", count);
}

// TASK 2: FizzBuzz
function fizzBuzz(limit) {
    const results = [];

    for (let i = 1; i <= limit; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            results.push("FizzBuzz");
        } else if (i % 3 === 0) {
            results.push("Fizz");
        } else if (i % 5 === 0) {
            results.push("Buzz");
        } else {
            results.push(i);
        }
    }

    return results;
}

// Test FizzBuzz
console.log("FizzBuzz 15:", fizzBuzz(15));
console.log("FizzBuzz 16:", fizzBuzz(16));
// ===== Block 4: functions and testable logic =====


// ===== Block 4: functions and testable logic =====

function calculateLineTotal(price, quantity) {
    if (
        !Number.isFinite(price) ||
        !Number.isInteger(quantity) ||
        price < 0 ||
        quantity < 0
    ) {
        throw new Error("Price and quantity must be valid non-negative numbers.");
    }
    return price * quantity;
}

function applyLineDiscount(lineTotal, quantity) {
    return quantity > 5 ? lineTotal * 0.95 : lineTotal;
}

function calculateTax(subtotal, taxRate) {
    if (
        !Number.isFinite(subtotal) ||
        !Number.isFinite(taxRate) ||
        subtotal < 0 ||
        taxRate < 0
    ) {
        throw new Error("Invalid subtotal or tax rate.");
    }
    return subtotal * taxRate;
}

function formatMoney(amount) {
    if (!Number.isFinite(amount)) {
        throw new Error("Amount must be a valid number.");
    }
    return amount.toFixed(2);
}

function printReceipt(items) {
    if (!Array.isArray(items)) {
        throw new Error("Items must be an array.");
    }

    let subtotal = 0;
    const taxRate = 0.08;

    for (const item of items) {
        if (!item) {
            throw new Error("Invalid item.");
        }
        const lineTotal = calculateLineTotal(item.price, item.quantity);
        subtotal += applyLineDiscount(lineTotal, item.quantity);
    }

    // Tax is calculated AFTER all line discounts
    const tax = calculateTax(subtotal, taxRate);
    const total = subtotal + tax;

    return `Subtotal: $${formatMoney(subtotal)}
Tax: $${formatMoney(tax)}
Total: $${formatMoney(total)}`;
}

// ===== Manual tests =====

function runTest(testName, testFunction) {
    try {
        testFunction();
        console.log("PASS: " + testName);
    } catch (error) {
        console.log("FAIL: " + testName + " - " + error.message);
    }
}

function expectThrow(fn) {
    try {
        fn();
    } catch (error) {
        return;
    }
    throw new Error("Expected an error but none was thrown.");
}

// Test 1: discount before tax. Tax on the discounted subtotal (670 x 0.08) is 53.60.
// Tax calculated before the discount (700 x 0.08) would be 56.00, so a pass proves the order.
runTest("Discount before tax", () => {
    const result = printReceipt([
        { price: 100, quantity: 6 },
        { price: 50, quantity: 2 }
    ]);
    const expected = `Subtotal: $670.00
Tax: $53.60
Total: $723.60`;
    if (result !== expected) throw new Error("Incorrect discounted cart calculation.");
});

// Test 2: zero quantity
runTest("Zero quantity", () => {
    const expected = `Subtotal: $0.00
Tax: $0.00
Total: $0.00`;
    if (printReceipt([{ price: 10, quantity: 0 }]) !== expected) {
        throw new Error("Incorrect zero quantity calculation.");
    }
});

// Test 3: decimal price
runTest("Decimal price", () => {
    const expected = `Subtotal: $39.98
Tax: $3.20
Total: $43.18`;
    if (printReceipt([{ price: 19.99, quantity: 2 }]) !== expected) {
        throw new Error("Incorrect decimal price calculation.");
    }
});

// Test 4: negative price must throw
runTest("Negative price is rejected", () => {
    expectThrow(() => printReceipt([{ price: -5, quantity: 2 }]));
});

// Test 5: decimal quantity must throw
runTest("Decimal quantity is rejected", () => {
    expectThrow(() => printReceipt([{ price: 10, quantity: 2.5 }]));
});

// Test 6: text price must throw
runTest("Text price is rejected", () => {
    expectThrow(() => printReceipt([{ price: "abc", quantity: 1 }]));
});
// ===== Day 3, Block 2: events and filters =====
const taskListElement = document.querySelector("#task-list");
const searchInput = document.querySelector("#search");
const filterSelect = document.querySelector("#status-filter");
const taskForm = document.querySelector("#task-form");
const titleInput = document.querySelector("#title");
const statsElement = document.querySelector("#stats");
const undoButton = document.querySelector("#undo-button");
const backupStatus = document.querySelector("#backup-status");
// One source of truth. Handlers change this, then render() shows it.
let currentTasks = [...sampleTasks];
let currentQuery = "";
let currentFilter = "all";
let lastDeleted = null;   // { task, index } for the most recent delete only

// Challenge 10: pure function. Composes search and status filtering, returns a view.
function getVisibleTasks(tasks, query, status) {
    const cleaned = query.trim().toLowerCase();
    return tasks
        .filter(task => !cleaned || task.title.toLowerCase().includes(cleaned))
        .filter(task => {
            if (status === "open") return !task.completed;
            if (status === "completed") return task.completed;
            return true;
        });
}

function renderTasks(tasksToShow) {
    taskListElement.textContent = "";

    if (tasksToShow.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.textContent = "No tasks yet.";
        taskListElement.append(emptyItem);
        return;
    }

    for (const task of tasksToShow) {
        const item = document.createElement("li");
        const label = document.createElement("span");
        label.textContent = `${task.title} (${task.priority}) `;
        if (task.completed) {
            label.classList.add("completed");
        }

        const toggleButton = document.createElement("button");
        toggleButton.type = "button";
        toggleButton.textContent = task.completed ? "Undo" : "Complete";
        toggleButton.dataset.action = "toggle";
        toggleButton.dataset.taskId = task.id;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.dataset.action = "delete";
        deleteButton.dataset.taskId = task.id;

        item.append(label, toggleButton, deleteButton);
        taskListElement.append(item);
    }
}

function render() {
    renderTasks(getVisibleTasks(currentTasks, currentQuery, currentFilter));
    undoButton.hidden = lastDeleted === null;
    const stats = getTaskStats(currentTasks);
    statsElement.textContent =
        `Total ${stats.total} | Open ${stats.open} | Done ${stats.completed} (${stats.completionRate}%)`;
}

// Event delegation: one listener on the list handles every button
taskListElement.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const id = Number(button.dataset.taskId);
    if (button.dataset.action === "toggle") {
        currentTasks = toggleTask(currentTasks, id);
    }
       if (button.dataset.action === "delete") {
        const index = currentTasks.findIndex(task => task.id === id);
        if (index !== -1) {
            lastDeleted = { task: currentTasks[index], index: index };
            currentTasks = deleteTask(currentTasks, id);
        }
    }
    render();
});

// Challenge 11: validation is separate from the DOM.
// Returns the cleaned title, or a list of errors. Duplicates ignore case and surrounding spaces.
function validateTaskInput(rawTitle, tasks) {
    const errors = [];
    const value = String(rawTitle || "").trim();

    if (value.length < 1) {
        errors.push("Please enter a task title.");
    } else if (value.length > 80) {
        errors.push("Title must be 80 characters or fewer.");
    }

    const isDuplicate = tasks.some(
        task => task.title.trim().toLowerCase() === value.toLowerCase()
    );
    if (value && isDuplicate) {
        errors.push("That task already exists.");
    }

    return { value, errors };
}

const titleError = document.querySelector("#title-error");

taskForm.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(taskForm);
    const priority = formData.get("priority");
    const result = validateTaskInput(formData.get("title"), currentTasks);

    if (result.errors.length > 0) {
        titleError.textContent = result.errors[0];
        titleInput.setAttribute("aria-invalid", "true");
        titleInput.focus();
        return;
    }

    const newId = Math.max(0, ...currentTasks.map(task => task.id)) + 1;
    currentTasks = addTask(currentTasks, {
        id: newId,
        title: result.value,
        priority: priority,
        createdAt: new Date().toISOString().slice(0, 10)
    });

    titleError.textContent = "";
    titleInput.removeAttribute("aria-invalid");
    taskForm.reset();
    statusElement.textContent = `Added: ${result.value}`;
    titleInput.focus();
    render();
});

searchInput.addEventListener("input", () => {
    currentQuery = searchInput.value;
    render();
});

filterSelect.addEventListener("change", () => {
    currentFilter = filterSelect.value;
    render();
});

render();

// Challenge 10 checks
const visibleSnapshot = JSON.stringify(currentTasks);
console.log("Open count:", getVisibleTasks(currentTasks, "", "open").length);            // 3
console.log("Completed count:", getVisibleTasks(currentTasks, "", "completed").length);  // 2
console.log("Search + open:", getVisibleTasks(currentTasks, "WRITE", "open").length);    // 1
console.log("Source unchanged:", visibleSnapshot === JSON.stringify(currentTasks));      // true

// Challenge 11 checks
console.log("Duplicate exact:", validateTaskInput("Write tests", sampleTasks).errors.length);              // 1
console.log("Duplicate spaced and cased:", validateTaskInput(" write tests ", sampleTasks).errors.length); // 1
console.log("Distinct title:", validateTaskInput("Write docs", sampleTasks).errors.length);                // 0
console.log("Blank title:", validateTaskInput("   ", sampleTasks).errors.length);                          // 1
// ===== Day 4: suggestions with explicit async state =====
const suggestButton = document.querySelector("#suggest-button");
const suggestionsList = document.querySelector("#suggestions-list");
const suggestionsStatus = document.querySelector("#suggestions-status");

// State is one of: idle, loading, success, error. Only one is shown at a time.
let suggestionState = "idle";
let suggestionItems = [];
let latestRequest = 0;

function renderSuggestions() {
    suggestionsList.textContent = "";
    suggestButton.disabled = suggestionState === "loading";

    if (suggestionState === "loading") {
        suggestionsStatus.textContent = "Loading suggestions...";
    } else if (suggestionState === "error") {
        suggestionsStatus.textContent = "Could not load suggestions. Your tasks are safe. Try again.";
        suggestButton.textContent = "Retry";
    } else if (suggestionState === "success") {
        suggestionsStatus.textContent = suggestionItems.length ? "" : "No suggestions found.";
        suggestButton.textContent = "Reload suggestions";
        suggestionItems.forEach((suggestion, index) => {
            const item = document.createElement("li");
            const button = document.createElement("button");
            button.type = "button";
            button.dataset.index = index;
            button.textContent = suggestion.title;
            item.append(button);
            suggestionsList.append(item);
        });
    } else {
        suggestionsStatus.textContent = "";
    }
}

async function handleLoadSuggestions() {
    if (suggestionState === "loading") return;

    const requestId = ++latestRequest;
    suggestionState = "loading";
    renderSuggestions();

    try {
        const items = await loadSuggestions();
        if (requestId !== latestRequest) return;   // stale response is ignored
        suggestionItems = items;
        suggestionState = "success";
    } catch (error) {
        if (requestId !== latestRequest) return;
        console.error("Suggestions failed", error);
        suggestionState = "error";
    }
    renderSuggestions();
}

suggestButton.addEventListener("click", handleLoadSuggestions);

// Clicking a suggestion copies it into the form. It never overwrites local tasks.
suggestionsList.addEventListener("click", event => {
    const button = event.target.closest("button[data-index]");
    if (!button) return;
    titleInput.value = suggestionItems[Number(button.dataset.index)].title;
    titleInput.focus();

});
// ===== Challenge 15: undo delete =====
// Transitions: delete -> remember {task, index}. Undo -> restore at that position and clear.
// A new delete replaces the remembered one, so only the most recent delete can be undone.
function restoreDeleted(tasks, entry) {
    const copy = [...tasks];
    copy.splice(Math.min(entry.index, copy.length), 0, entry.task);
    return copy;
}

undoButton.addEventListener("click", () => {
    if (!lastDeleted) return;
    currentTasks = restoreDeleted(currentTasks, lastDeleted);
    lastDeleted = null;
    persist();
    render();
});

// Two sequential deletions: only the second can be undone
const undoDemo = [{ id: 1, title: "A" }, { id: 2, title: "B" }, { id: 3, title: "C" }];
const entryA = { task: undoDemo[0], index: 0 };
const afterA = deleteTask(undoDemo, 1);
const entryB = { task: afterA[0], index: 0 };
const afterB = deleteTask(afterA, 2);
console.log("After two deletes:", afterB.map(t => t.id).join(","));                      // 3
console.log("Undo restores only B:", restoreDeleted(afterB, entryB).map(t => t.id).join(",")); // 2,3

// ===== Challenge 16: JSON export and import =====
function parseImport(text) {
    let data;
    try {
        data = JSON.parse(text);
    } catch (error) {
        return { ok: false, error: "The file is not valid JSON." };
    }
    if (!Array.isArray(data)) {
        return { ok: false, error: "The file must contain a list of tasks." };
    }
    if (data.length === 0) {
        return { ok: false, error: "The file contains no tasks." };   // rule: empty imports are rejected
    }
    if (!data.every(isValidTask)) {
        return { ok: false, error: "Some tasks are missing required fields." };
    }
    const ids = new Set(data.map(task => task.id));
    if (ids.size !== data.length) {
        return { ok: false, error: "Task ids must be unique." };
    }
    return { ok: true, tasks: data };
}

document.querySelector("#export-button").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(currentTasks, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tasks.json";
    link.click();
    URL.revokeObjectURL(url);
    backupStatus.textContent = "Exported tasks.json.";
});

const importFile = document.querySelector("#import-file");
importFile.addEventListener("change", async () => {
    const file = importFile.files[0];
    if (!file) return;

    const result = parseImport(await file.text());
    if (!result.ok) {
        backupStatus.textContent = `Import failed: ${result.error} Your tasks are unchanged.`;
    } else if (confirm(`Replace your ${currentTasks.length} tasks with ${result.tasks.length} imported tasks?`)) {
        currentTasks = result.tasks;
        lastDeleted = null;
        persist();
        render();
        backupStatus.textContent = `Imported ${result.tasks.length} tasks.`;
    } else {
        backupStatus.textContent = "Import cancelled. Your tasks are unchanged.";
    }
    importFile.value = "";
});

// Import checks
console.log("Valid import:", parseImport('[{"id":1,"title":"A","completed":false,"priority":"low"}]').ok);  // true
console.log("Malformed import:", parseImport("not-json").ok);                                               // false
console.log("Empty import:", parseImport("[]").ok);                                                         // false
console.log("Invalid structure:", parseImport('[{"id":"x"}]').ok);                                          // false
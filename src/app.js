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
// Version 1: Math.floor and %
const totalMinutes = 137;
const hours = Math.floor(totalMinutes / 60);
const minutes = totalMinutes % 60;
console.log(`${hours} hours and ${minutes} minutes`);

// Version 2: subtraction instead of %
const hours2 = Math.floor(totalMinutes / 60);
const minutes2 = totalMinutes - hours2 * 60;
console.log(`${hours2} hours and ${minutes2} minutes`);
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
const statusElement = document.querySelector("#status");

// One source of truth. Handlers change this, then render() shows it.
const loadResult = loadTasks(sampleTasks);
let currentTasks = loadResult.tasks;
if (loadResult.notice) {
    statusElement.textContent = loadResult.notice;
}

function persist() {
    if (!saveTasks(currentTasks)) {
        statusElement.textContent = "Could not save your tasks. Changes may be lost on reload.";
    }
}
let currentQuery = "";
let currentFilter = "all";

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
        currentTasks = deleteTask(currentTasks, id);
    }
    persist();
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
       persist();
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
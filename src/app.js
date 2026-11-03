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
// ===== Day 3, Block 1: render and search =====
const taskListElement = document.querySelector("#task-list");
const searchInput = document.querySelector("#search");

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
        item.textContent = `${task.title} (${task.priority})`;
        if (task.completed) {
            item.classList.add("completed");
        }
        taskListElement.append(item);
    }
}

// Challenge 9: case-insensitive search. Returns a view; the stored tasks never change.
function searchTasks(tasks, query) {
    const cleaned = query.trim().toLowerCase();
    if (!cleaned) {
        return tasks;
    }
    return tasks.filter(task => task.title.toLowerCase().includes(cleaned));
}

renderTasks(sampleTasks);

searchInput.addEventListener("input", () => {
    renderTasks(searchTasks(sampleTasks, searchInput.value));
});

console.log("Search empty:", searchTasks(sampleTasks, "").length);          // 5
console.log("Search mixed case:", searchTasks(sampleTasks, "WrItE").length); // 1
console.log("Search with spaces:", searchTasks(sampleTasks, "  write  ").length); // 1
console.log("Search no match:", searchTasks(sampleTasks, "zzz").length);     // 0
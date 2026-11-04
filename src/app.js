// ===== Day 1, Block 1: values and operators =====
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

// ===== Challenge 1: minutes to hours =====
// Version 1: Math.floor and %
const totalMinutes = 137;
const hours = Math.floor(totalMinutes / 60);
const minutes = totalMinutes % 60;
console.log(`${hours} hours and ${minutes} minutes`);

// Version 2: subtraction instead of %
const hours2 = Math.floor(totalMinutes / 60);
const minutes2 = totalMinutes - hours2 * 60;
console.log(`${hours2} hours and ${minutes2} minutes`);

// ===== Day 1, Block 2: conditions =====
function getDiscountedTotal(total, member) {
    if (!Number.isFinite(total) || total < 0) {
        return null;
    }
    if (member && total >= 50) {
        return total * 0.9;
    }
    return total;
}

// Challenge 2: grade labels
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

console.log("Discount tests:");
console.log(getDiscountedTotal(49.99, true));
console.log(getDiscountedTotal(50, true));
console.log(getDiscountedTotal(80, false));
console.log(getDiscountedTotal(80, true));
console.log(getDiscountedTotal(-10, true));

console.log("Grade tests:");
console.log(gradeLabel(89));
console.log(gradeLabel(90));
console.log(gradeLabel(0));
console.log(gradeLabel(100));
console.log(gradeLabel(-1));
console.log(gradeLabel(101));

// ===== Day 1, Block 3: loops =====
// An empty list gives a total of 0 and a count of 0.
function summarizePrices(priceList) {
    let sum = 0;
    let above20 = 0;
    for (const p of priceList) {
        sum += p;
        if (p > 20) {
            above20++;
        }
    }
    return { total: sum, countAbove20: above20 };
}

const prices = [5, 12, 25, 8, 30];
const priceSummary = summarizePrices(prices);
console.log("Total:", priceSummary.total);
console.log("Prices above 20:", priceSummary.countAbove20);
console.log("Empty list:", summarizePrices([]));

const reducedTotal = prices.reduce((sum, p) => sum + p, 0);
console.log("Total with reduce:", reducedTotal);

// Challenge 3: FizzBuzz. The combined check comes first because an else-if chain
// stops at the first true condition.
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

console.log("FizzBuzz 15:", fizzBuzz(15));
console.log("FizzBuzz 16:", fizzBuzz(16));

// ===== Day 1, Block 4: functions and testable logic =====
function calculateLineTotal(unitPrice, qty) {
    if (
        !Number.isFinite(unitPrice) ||
        !Number.isInteger(qty) ||
        unitPrice < 0 ||
        qty < 0
    ) {
        throw new Error("Price and quantity must be valid non-negative numbers.");
    }
    return unitPrice * qty;
}

// Challenge 4: quantities above 5 get 5% off that line
function applyLineDiscount(lineTotal, qty) {
    return qty > 5 ? lineTotal * 0.95 : lineTotal;
}

function calculateTax(amount, taxRate) {
    if (
        !Number.isFinite(amount) ||
        !Number.isFinite(taxRate) ||
        amount < 0 ||
        taxRate < 0
    ) {
        throw new Error("Invalid subtotal or tax rate.");
    }
    return amount * taxRate;
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

    let receiptSubtotal = 0;
    const taxRate = 0.08;

    for (const item of items) {
        if (!item) {
            throw new Error("Invalid item.");
        }
        const lineTotal = calculateLineTotal(item.price, item.quantity);
        receiptSubtotal += applyLineDiscount(lineTotal, item.quantity);
    }

    // Tax is calculated AFTER all line discounts
    const receiptTax = calculateTax(receiptSubtotal, taxRate);
    const receiptTotal = receiptSubtotal + receiptTax;

    return `Subtotal: $${formatMoney(receiptSubtotal)}
Tax: $${formatMoney(receiptTax)}
Total: $${formatMoney(receiptTotal)}`;
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

// Tax on the discounted subtotal (670 x 0.08) is 53.60.
// Tax before the discount (700 x 0.08) would be 56.00, so a pass proves the order.
runTest("Discount before tax", () => {
    const result = printReceipt([
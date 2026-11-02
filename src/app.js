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


// 1. Calculate line total and apply discount
function calculateLineTotal(price, quantity) {
    if (
        !Number.isFinite(price) ||
        !Number.isInteger(quantity) ||
        price < 0 ||
        quantity < 0
    ) {
        throw new Error(
            "Price and quantity must be valid non-negative numbers."
        );
    }

    let lineTotal = price * quantity;

    // Quantities above 5 receive a 5% discount
    if (quantity > 5) {
        lineTotal = lineTotal * 0.95;
    }

    return lineTotal;
}


// 2. Calculate tax
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


// 3. Format money to 2 decimal places
function formatMoney(amount) {
    if (!Number.isFinite(amount)) {
        throw new Error("Amount must be a valid number.");
    }

    return amount.toFixed(2);
}


// 4. Build the receipt
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

        const lineTotal = calculateLineTotal(
            item.price,
            item.quantity
        );

        subtotal += lineTotal;
    }

    // Calculate tax AFTER all discounts
    const tax = calculateTax(subtotal, taxRate);

    const total = subtotal + tax;

    // Return the formatted receipt
    return `Subtotal: $${formatMoney(subtotal)}
Tax: $${formatMoney(tax)}
Total: $${formatMoney(total)}`;
}


// 5. Manual test helper
function runTest(testName, testFunction) {
    try {
        testFunction();
        console.log("PASS: " + testName);
    } catch (error) {
        console.log("FAIL: " + testName + " - " + error.message);
    }
}


// TEST 1: Discounted cart and tax order
runTest("Discount before tax", () => {
    const result = printReceipt([
        { price: 100, quantity: 6 },
        { price: 50, quantity: 2 }
    ]);

    const expected = `Subtotal: $670.00
Tax: $53.60
Total: $723.60`;

    if (result !== expected) {
        throw new Error("Incorrect discounted cart calculation.");
    }
});


// TEST 2: Zero quantity
runTest("Zero quantity", () => {
    const result = printReceipt([
        { price: 10, quantity: 0 }
    ]);

    const expected = `Subtotal: $0.00
Tax: $0.00
Total: $0.00`;

    if (result !== expected) {
        throw new Error("Incorrect zero quantity calculation.");
    }
});


// TEST 3: Decimal price
runTest("Decimal price", () => {
    const result = printReceipt([
        { price: 19.99, quantity: 2 }
    ]);

    const expected = `Subtotal: $39.98
Tax: $3.20
Total: $43.18`;

    if (result !== expected) {
        throw new Error("Incorrect decimal price calculation.");
    }
});


// TEST 4: Negative price
runTest("Negative price", () => {
    let errorCaught = false;

    try {
        printReceipt([
            { price: -5, quantity: 2 }
        ]);
    } catch (error) {
        errorCaught = true;
    }

    if (!errorCaught) {
        throw new Error("Negative price should throw an error.");
    }
});


// TEST 5: Decimal quantity
runTest("Decimal quantity", () => {
    let errorCaught = false;

    try {
        printReceipt([
            { price: 10, quantity: 2.5 }
        ]);
    } catch (error) {
        errorCaught = true;
    }

    if (!errorCaught) {
        throw new Error("Decimal quantity should throw an error.");
    }
});


// TEST 6: Text instead of price
runTest("Invalid text price", () => {
    let errorCaught = false;

    try {
        printReceipt([
            { price: "abc", quantity: 1 }
        ]);
    } catch (error) {
        errorCaught = true;
    }

    if (!errorCaught) {
        throw new Error("Text price should throw an error.");
    }
});

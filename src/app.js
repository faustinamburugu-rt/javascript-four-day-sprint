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
const reducedTotal = prices.reduce(
    (sum, price) => sum + price,
    0
);

console.log("Total with reduce:", reducedTotal);
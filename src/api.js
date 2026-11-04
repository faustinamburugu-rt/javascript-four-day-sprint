// ===== Day 4: fetch, promises and untrusted data =====
const TODOS_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts?_limit=5";

// HTTP errors do not reject fetch, so check response.ok before parsing
async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
}

// Challenge 14: pure function. Accepts an array, keeps objects with a non-empty string title,
// limits to five, and returns a consistent shape.
function normalizeSuggestions(data) {
    if (!Array.isArray(data)) {
        return [];
    }
    return data
        .filter(item => item !== null
            && typeof item === "object"
            && typeof item.title === "string"
            && item.title.trim() !== "")
        .slice(0, 5)
        .map(item => ({ title: item.title.trim() }));
}

// Challenge 13: two independent requests run together with Promise.all, then are combined.
// If either request rejects, Promise.all rejects, so the caller shows an error and retry.
async function loadSuggestions() {
    const [todos, posts] = await Promise.all([
        fetchJson(TODOS_URL),
        fetchJson(POSTS_URL)
    ]);
    return [
        ...normalizeSuggestions(todos).slice(0, 3),
        ...normalizeSuggestions(posts).slice(0, 2)
    ];
}

// Challenge 14 checks
console.log("Normalize null:", normalizeSuggestions(null).length);                              // 0
console.log("Normalize wrong types:", normalizeSuggestions([1, "a", null, { title: 5 }]).length); // 0
console.log("Normalize empty title:", normalizeSuggestions([{ title: "   " }]).length);          // 0
console.log("Normalize over five:", normalizeSuggestions(Array.from({ length: 8 }, (_, i) => ({ title: "T" + i }))).length); // 5
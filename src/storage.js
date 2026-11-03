// ===== Day 3, Block 4: localStorage with recovery =====
const STORAGE_KEY = "jsSprint.tasks.v1";

function isValidTask(task) {
    return task !== null
        && typeof task === "object"
        && Number.isFinite(task.id)
        && typeof task.title === "string"
        && task.title.trim() !== ""
        && typeof task.completed === "boolean"
        && typeof task.priority === "string";
}

function saveTasks(tasks) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        return true;
    } catch (error) {
        console.error("Save failed", error);
        return false;
    }
}

// Recovery rule:
// - Nothing saved yet: start with the fallback tasks.
// - Not valid JSON, not an array, or any invalid task: start with an empty list and a notice.
function loadTasks(fallback) {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw === null) {
            return { tasks: [...fallback], notice: "" };
        }
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || !parsed.every(isValidTask)) {
            return { tasks: [], notice: "Saved data was invalid and has been reset." };
        }
        return { tasks: parsed, notice: "" };
    } catch (error) {
        console.error("Load failed", error);
        return { tasks: [], notice: "Saved data was corrupted and has been reset." };
    }
}
// Class representing a task with async processing
class Task {
    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.completed = false;
    }

    async process() {
        // Simulate async work
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.completed = true;
        return this;
    }
}

// Task manager using modern JavaScript features
class TaskManager {
    constructor() {
        this.tasks = new Map();
    }

    addTask(description) {
        const id = Date.now();
        const task = new Task(id, description);
        this.tasks.set(id, task);
        return id;
    }

    async processTask(id) {
        const task = this.tasks.get(id);
        if (!task) {
            throw new Error(`Task ${id} not found`);
        }
        return await task.process();
    }

    getTaskStatus(id) {
        const task = this.tasks.get(id);
        return task
            ? {
                  id: task.id,
                  description: task.description,
                  completed: task.completed,
              }
            : null;
    }
}

// Example usage
async function main() {
    const manager = new TaskManager();

    // Add some tasks
    const task1Id = manager.addTask("Learn JavaScript");
    const task2Id = manager.addTask("Build a website");

    // Process tasks
    console.log("Processing tasks...");
    await Promise.all([manager.processTask(task1Id), manager.processTask(task2Id)]);

    // Check status
    console.log("Task 1 status:", manager.getTaskStatus(task1Id));
    console.log("Task 2 status:", manager.getTaskStatus(task2Id));
}

main().catch(console.error);

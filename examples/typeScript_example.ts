// Task status type
type TaskStatus = 'pending' | 'processing' | 'completed';

// Task interface
interface Task {
    id: number;
    title: string;
    status: TaskStatus;
    completedAt?: Date;
}

// Generic task processor
class TaskProcessor<T extends Task> {
    private tasks: T[] = [];
    private nextId = 1;

    addTask(title: string): T {
        const task = {
            id: this.nextId++,
            title,
            status: 'pending'
        } as T;
        
        this.tasks.push(task);
        return task;
    }

    async processTask(task: T): Promise<void> {
        task.status = 'processing';
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate work
        task.status = 'completed';
        task.completedAt = new Date();
    }

    async processAllTasks(): Promise<void> {
        const promises = this.tasks.map(task => this.processTask(task));
        await Promise.all(promises);
    }

    getTasks(): T[] {
        return [...this.tasks];
    }
}

// Extended task type with priority
interface PrioritizedTask extends Task {
    priority: number;
}

// Task manager with prioritized tasks
class PrioritizedTaskManager extends TaskProcessor<PrioritizedTask> {
    addTask(title: string, priority: number): PrioritizedTask {
        const task = super.addTask(title);
        task.priority = priority;
        return task;
    }

    getTasksByPriority(): PrioritizedTask[] {
        return this.getTasks().sort((a, b) => b.priority - a.priority);
    }
}

// Example usage
async function main() {
    const manager = new PrioritizedTaskManager();

    // Add tasks with priorities
    manager.addTask("Learn TypeScript", 1);
    manager.addTask("Build an app", 2);

    // Process tasks concurrently
    console.log("Processing tasks...");
    await manager.processAllTasks();

    // Print final status
    console.log("\nFinal task status (sorted by priority):");
    for (const task of manager.getTasksByPriority()) {
        console.log(`- ${task.title}: ${task.status}`);
        if (task.completedAt) {
            console.log(`  Completed at: ${task.completedAt}`);
        }
    }
}

main().catch(console.error); 
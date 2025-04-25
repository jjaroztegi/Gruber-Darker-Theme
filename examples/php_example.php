<?php

declare(strict_types=1);

// Interface for task operations
interface TaskOperations {
    public function process(): void;
    public function getStatus(): string;
}

// Abstract base class for tasks
abstract class BaseTask implements TaskOperations {
    protected string $title;
    protected string $status = 'pending';
    
    public function __construct(string $title) {
        $this->title = $title;
    }
    
    public function getTitle(): string {
        return $this->title;
    }
    
    public function getStatus(): string {
        return $this->status;
    }
}

// Concrete task implementation
class SimpleTask extends BaseTask {
    public function process(): void {
        $this->status = 'processing';
        sleep(1); // Simulate work
        $this->status = 'completed';
    }
}

// Task manager using modern PHP features
class TaskManager {
    private array $tasks = [];
    
    public function addTask(string $title): SimpleTask {
        $task = new SimpleTask($title);
        $this->tasks[] = $task;
        return $task;
    }
    
    public function processTasks(): void {
        foreach ($this->tasks as $task) {
            $task->process();
            echo sprintf(
                "Task '%s' is now %s\n",
                $task->getTitle(),
                $task->getStatus()
            );
        }
    }
    
    public function getTasks(): array {
        return $this->tasks;
    }
}

// Example usage
$manager = new TaskManager();

// Add tasks
$task1 = $manager->addTask("Learn PHP");
$task2 = $manager->addTask("Build a website");

// Process tasks
echo "Processing tasks...\n";
$manager->processTasks();

// Print final status
echo "\nFinal task status:\n";
foreach ($manager->getTasks() as $task) {
    echo sprintf(
        "- %s: %s\n",
        $task->getTitle(),
        $task->getStatus()
    );
} 
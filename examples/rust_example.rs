use std::time::{Duration, SystemTime};
use tokio::time::sleep;

// Task status enum
#[derive(Debug, Clone, Copy, PartialEq)]
enum TaskStatus {
    Pending,
    Processing,
    Completed,
}

// Task struct
#[derive(Debug, Clone)]
struct Task {
    id: u32,
    title: String,
    status: TaskStatus,
    completed_at: Option<SystemTime>,
}

impl Task {
    fn new(id: u32, title: String) -> Self {
        Task {
            id,
            title,
            status: TaskStatus::Pending,
            completed_at: None,
        }
    }

    async fn process(&mut self) {
        self.status = TaskStatus::Processing;
        sleep(Duration::from_secs(1)).await; // Simulate work
        self.status = TaskStatus::Completed;
        self.completed_at = Some(SystemTime::now());
    }
}

// Task manager
struct TaskManager {
    tasks: Vec<Task>,
    next_id: u32,
}

impl TaskManager {
    fn new() -> Self {
        TaskManager {
            tasks: Vec::new(),
            next_id: 1,
        }
    }

    fn add_task(&mut self, title: String) -> &Task {
        let task = Task::new(self.next_id, title);
        self.next_id += 1;
        self.tasks.push(task);
        self.tasks.last().unwrap()
    }

    async fn process_all_tasks(&mut self) {
        let mut handles = vec![];
        
        for task in &mut self.tasks {
            let task_clone = task.clone();
            let handle = tokio::spawn(async move {
                let mut task = task_clone;
                task.process().await;
                task
            });
            handles.push(handle);
        }

        for handle in handles {
            if let Ok(processed_task) = handle.await {
                if let Some(task) = self.tasks.iter_mut().find(|t| t.id == processed_task.id) {
                    *task = processed_task;
                }
            }
        }
    }

    fn get_tasks(&self) -> &[Task] {
        &self.tasks
    }
}

#[tokio::main]
async fn main() {
    let mut manager = TaskManager::new();

    // Add tasks
    manager.add_task("Learn Rust".to_string());
    manager.add_task("Build an app".to_string());

    // Process tasks concurrently
    println!("Processing tasks...");
    manager.process_all_tasks().await;

    // Print final status
    println!("\nFinal task status:");
    for task in manager.get_tasks() {
        println!("- {}: {:?}", task.title, task.status);
        if let Some(completed_at) = task.completed_at {
            println!("  Completed at: {:?}", completed_at);
        }
    }
} 
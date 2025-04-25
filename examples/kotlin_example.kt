import kotlinx.coroutines.*
import java.time.LocalDateTime

// Data class for a task
data class Task(
    val id: Int,
    val title: String,
    var status: TaskStatus = TaskStatus.PENDING
)

// Enum for task status
enum class TaskStatus {
    PENDING, IN_PROGRESS, COMPLETED
}

// Task manager class
class TaskManager {
    private val tasks = mutableListOf<Task>()
    
    suspend fun addTask(title: String): Task {
        val task = Task(
            id = tasks.size + 1,
            title = title
        )
        tasks.add(task)
        return task
    }
    
    suspend fun processTask(task: Task) {
        task.status = TaskStatus.IN_PROGRESS
        delay(1000) // Simulate work
        task.status = TaskStatus.COMPLETED
    }
    
    fun getTasks(): List<Task> = tasks.toList()
}

// Main function using coroutines
suspend fun main() = coroutineScope {
    val manager = TaskManager()
    
    // Add tasks
    val task1 = manager.addTask("Learn Kotlin")
    val task2 = manager.addTask("Build an app")
    
    // Process tasks concurrently
    launch {
        manager.processTask(task1)
        println("Task 1 completed at ${LocalDateTime.now()}")
    }
    
    launch {
        manager.processTask(task2)
        println("Task 2 completed at ${LocalDateTime.now()}")
    }
    
    // Wait for all tasks to complete
    delay(2000)
    
    // Print final status
    manager.getTasks().forEach { task ->
        println("Task ${task.id}: ${task.title} - ${task.status}")
    }
} 
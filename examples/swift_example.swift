import Foundation

// Task status enum
enum TaskStatus: String {
    case pending = "pending"
    case processing = "processing"
    case completed = "completed"
}

// Property wrapper for task ID
@propertyWrapper
struct AutoIncrement {
    private static var currentId = 0
    
    var wrappedValue: Int {
        get {
            AutoIncrement.currentId
        }
        set {
            AutoIncrement.currentId = newValue
        }
    }
    
    init() {
        AutoIncrement.currentId += 1
    }
}

// Task protocol
protocol TaskProtocol {
    var id: Int { get }
    var title: String { get }
    var status: TaskStatus { get set }
    var completedAt: Date? { get set }
    func process() async
}

// Task class
class Task: TaskProtocol {
    @AutoIncrement var id: Int
    let title: String
    var status: TaskStatus
    var completedAt: Date?
    
    init(title: String) {
        self.title = title
        self.status = .pending
    }
    
    func process() async {
        status = .processing
        try? await Task.sleep(nanoseconds: 1_000_000_000) // 1 second
        status = .completed
        completedAt = Date()
    }
}

// Task manager
actor TaskManager {
    private var tasks: [Task] = []
    
    func addTask(title: String) -> Task {
        let task = Task(title: title)
        tasks.append(task)
        return task
    }
    
    func processAllTasks() async {
        await withTaskGroup(of: Void.self) { group in
            for task in tasks {
                group.addTask {
                    await task.process()
                }
            }
        }
    }
    
    func getTasks() -> [Task] {
        tasks
    }
}

// Main function
@main
struct Main {
    static func main() async {
        let manager = TaskManager()
        
        // Add tasks
        let task1 = await manager.addTask(title: "Learn Swift")
        let task2 = await manager.addTask(title: "Build an app")
        
        // Process tasks concurrently
        print("Processing tasks...")
        await manager.processAllTasks()
        
        // Print final status
        print("\nFinal task status:")
        for task in await manager.getTasks() {
            print("- \(task.title): \(task.status.rawValue)")
            if let completedAt = task.completedAt {
                print("  Completed at: \(completedAt)")
            }
        }
    }
} 
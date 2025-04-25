using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// Simple class to represent a task
public class TodoItem
{
    public int Id { get; set; }
    public string Title { get; set; }
    public bool IsCompleted { get; set; }
}

class Program
{
    static async Task Main()
    {
        var todos = new List<TodoItem>
        {
            new TodoItem { Id = 1, Title = "Learn C#", IsCompleted = false },
            new TodoItem { Id = 2, Title = "Build an app", IsCompleted = true },
            new TodoItem { Id = 3, Title = "Write tests", IsCompleted = false }
        };

        // LINQ query example
        var completedTasks = todos.Where(t => t.IsCompleted)
                                .Select(t => t.Title)
                                .ToList();

        Console.WriteLine("Completed tasks:");
        foreach (var task in completedTasks)
        {
            Console.WriteLine($"- {task}");
        }

        // Async operation simulation
        await ProcessTasksAsync(todos);
    }

    static async Task ProcessTasksAsync(List<TodoItem> todos)
    {
        foreach (var todo in todos.Where(t => !t.IsCompleted))
        {
            Console.WriteLine($"Processing: {todo.Title}");
            await Task.Delay(1000); // Simulate work
            todo.IsCompleted = true;
            Console.WriteLine($"Completed: {todo.Title}");
        }
    }
} 
# Task class with attribute accessors
class Task
  attr_reader :id, :title, :status, :completed_at
  
  def initialize(id, title)
    @id = id
    @title = title
    @status = 'pending'
    @completed_at = nil
  end
  
  def process
    @status = 'processing'
    sleep(1) # Simulate work
    @status = 'completed'
    @completed_at = Time.now
  end
end

# Task manager using Ruby features
class TaskManager
  def initialize
    @tasks = []
    @next_id = 1
  end
  
  def add_task(title)
    task = Task.new(@next_id, title)
    @next_id += 1
    @tasks << task
    task
  end
  
  def process_tasks
    threads = @tasks.map do |task|
      Thread.new do
        task.process
        puts "Task '#{task.title}' is now #{task.status}"
      end
    end
    
    threads.each(&:join)
  end
  
  def tasks
    @tasks.dup
  end
end

# Example usage
manager = TaskManager.new

# Add tasks
task1 = manager.add_task("Learn Ruby")
task2 = manager.add_task("Build a website")

# Process tasks concurrently
puts "Processing tasks..."
manager.process_tasks

# Print final status
puts "\nFinal task status:"
manager.tasks.each do |task|
  puts "- #{task.title}: #{task.status}"
  puts "  Completed at: #{task.completed_at}" if task.completed_at
end 
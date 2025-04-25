from dataclasses import dataclass
from typing import List, Optional
import asyncio
from datetime import datetime

@dataclass
class Task:
    id: int
    title: str
    status: str = "pending"
    completed_at: Optional[datetime] = None

class TaskManager:
    def __init__(self):
        self.tasks: List[Task] = []
        self._next_id = 1
    
    def add_task(self, title: str) -> Task:
        task = Task(id=self._next_id, title=title)
        self._next_id += 1
        self.tasks.append(task)
        return task
    
    async def process_task(self, task: Task) -> None:
        task.status = "processing"
        await asyncio.sleep(1)  # Simulate work
        task.status = "completed"
        task.completed_at = datetime.now()
    
    async def process_all_tasks(self) -> None:
        tasks = [self.process_task(task) for task in self.tasks]
        await asyncio.gather(*tasks)
    
    def get_tasks(self) -> List[Task]:
        return self.tasks.copy()

async def main():
    manager = TaskManager()
    
    # Add tasks
    task1 = manager.add_task("Learn Python")
    task2 = manager.add_task("Build an app")
    
    # Process tasks concurrently
    print("Processing tasks...")
    await manager.process_all_tasks()
    
    # Print final status
    print("\nFinal task status:")
    for task in manager.get_tasks():
        print(f"- {task.title}: {task.status}")
        if task.completed_at:
            print(f"  Completed at: {task.completed_at}")

if __name__ == "__main__":
    asyncio.run(main()) 
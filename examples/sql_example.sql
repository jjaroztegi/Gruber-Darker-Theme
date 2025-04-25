-- Create tables
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    priority INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample data
INSERT INTO users (username, email) VALUES
    ('john_doe', 'john@example.com'),
    ('jane_smith', 'jane@example.com');

INSERT INTO tasks (user_id, title, priority) VALUES
    (1, 'Learn SQL', 1),
    (1, 'Build a database', 2),
    (2, 'Write documentation', 1),
    (2, 'Test queries', 3);

-- Update task status
UPDATE tasks 
SET status = 'completed', 
    completed_at = CURRENT_TIMESTAMP 
WHERE title = 'Learn SQL';

-- Complex query with joins and aggregation
SELECT 
    u.username,
    COUNT(t.id) as total_tasks,
    SUM(CASE WHEN t.status = 'completed' THEN 1 ELSE 0 END) as completed_tasks,
    AVG(t.priority) as avg_priority
FROM users u
LEFT JOIN tasks t ON u.id = t.user_id
GROUP BY u.id, u.username
HAVING COUNT(t.id) > 0
ORDER BY total_tasks DESC;

-- Subquery example
SELECT title, status, priority
FROM tasks
WHERE priority > (
    SELECT AVG(priority)
    FROM tasks
)
ORDER BY priority DESC;

-- Create an index for better performance
CREATE INDEX idx_tasks_user_status ON tasks(user_id, status); 
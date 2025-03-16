-- Single-line comment in SQL

/*
 * Multi-line comment
 * for documentation
 */

-- DDL statements (Data Definition Language)

-- Create a new table named 'Employees'
CREATE TABLE Employees (
    employee_id INT PRIMARY KEY, -- Primary key constraint
    first_name VARCHAR(50) NOT NULL, -- Not null constraint
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE, -- Unique constraint
    hire_date DATE,
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id) -- Foreign key constraint
);

-- Create a table named 'Departments'
CREATE TABLE Departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL
);

-- DML statements (Data Manipulation Language)

-- Insert data into Departments table
INSERT INTO Departments (department_id, department_name) VALUES
(1, 'Sales'),
(2, 'Marketing'),
(3, 'Engineering');

-- Insert data into Employees table
INSERT INTO Employees (employee_id, first_name, last_name, email, hire_date, salary, department_id) VALUES
(101, 'John', 'Doe', 'john.doe@example.com', '2023-08-01', 60000.00, 1),
(102, 'Jane', 'Smith', 'jane.smith@example.com', '2023-09-15', 75000.00, 2),
(103, 'Peter', 'Jones', 'peter.jones@example.com', '2023-10-20', 80000.00, 3);

-- DQL statements (Data Query Language)

-- Select all columns from Employees table
SELECT * FROM Employees;

-- Select specific columns and apply a WHERE clause
SELECT first_name, last_name, salary
FROM Employees
WHERE department_id = 2 AND salary > 70000; -- AND, OR, NOT operators

-- Use ORDER BY clause to sort results
SELECT first_name, last_name, hire_date
FROM Employees
ORDER BY hire_date DESC; -- ASC for ascending, DESC for descending

-- Use aggregate functions and GROUP BY clause
SELECT department_id, COUNT(*) AS employee_count, AVG(salary) AS average_salary
FROM Employees
GROUP BY department_id
HAVING AVG(salary) > 70000; -- HAVING clause for filtering groups

-- DCL statements (Data Control Language) - Example (DBMS specific)
-- GRANT SELECT, INSERT ON Employees TO user1;
-- REVOKE DELETE ON Departments FROM user2;

-- TCL statements (Transaction Control Language) - Example
-- START TRANSACTION;
-- UPDATE Employees SET salary = salary * 1.1 WHERE department_id = 1;
-- COMMIT; -- or ROLLBACK; to undo changes

-- Common SQL functions
SELECT UPPER(first_name), LOWER(last_name), LENGTH(email)
FROM Employees;

-- Join example (INNER JOIN)
SELECT Employees.first_name, Employees.last_name, Departments.department_name
FROM Employees
INNER JOIN Departments ON Employees.department_id = Departments.department_id;

-- Subquery example
SELECT first_name, last_name
FROM Employees
WHERE department_id IN (SELECT department_id FROM Departments WHERE department_name = 'Engineering');

-- Comment at the end of the file
-- End of SQL example
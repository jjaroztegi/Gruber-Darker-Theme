#!/usr/bin/env swift

// Single-line comment in Swift

/*
 * Multi-line comment
 * for documentation
 */

import Foundation // Import Foundation framework

// Constant declaration
let greetingMessage = "Hello, Swift!"

// Class definition
class Vehicle {
    var numberOfWheels: Int
    var color: String

    // Initializer (Constructor)
    init(wheels: Int, color: String) {
        self.numberOfWheels = wheels
        self.color = color
    }

    // Method to describe vehicle
    func describe() -> String {
        return "A \(color) vehicle with \(numberOfWheels) wheels."
    }

    // Deinitializer (Destructor - automatically called when instance is deallocated)
    deinit {
        print("Vehicle object being deinitialized")
    }
}

// Function definition
func calculateArea(length: Double, width: Double) -> Double {
    return length * width
}

// Structure definition (Structs are value types in Swift)
struct Point {
    var x: Double
    var y: Double
}

// Enumeration definition (Enums are type-safe in Swift)
enum Status: String {
    case pending = "Pending"
    case running = "Running"
    case completed = "Completed"
    case failed = "Failed"
}

// Main execution (Swift scripts can run top-level code directly)

    // Variable declarations and initializations
    var age = 30
    let piValue = 3.14159
    var userName = "SwiftCoder"
    var isActive = true
    var fruits = ["apple", "banana", "orange"]
    var configDict = ["theme": "light", "fontSize": 14]

    // Output to console
    print(greetingMessage)
    print("Age is \(age)")

    // Conditional statement (if-else if-else)
    if age > 40 {
        print("Age is over 40")
    } else if age == 30 {
        print("Age is exactly 30")
    } else {
        print("Age is under 30")
    }

    // Loop example (for-in loop)
    print("Fruits:")
    for fruit in fruits {
        print(fruit)
    }

    // Function call
    let area = calculateArea(length: 10.5, width: 5.0)
    print("Area: \(area)")

    // Object instantiation and method call
    let car = Vehicle(wheels: 4, color: "Red")
    print(car.describe())

    // Struct example
    let origin = Point(x: 0.0, y: 0.0)
    print("Origin point at x:\(origin.x), y:\(origin.y)")

    // Enum example
    let taskStatus = Status.running
    print("Task status: \(taskStatus.rawValue)") // Accessing raw value of enum
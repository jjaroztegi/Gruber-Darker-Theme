#!/usr/bin/env kotlin

// Single-line comment in Kotlin

/*
 * Multi-line comment
 * for documentation
 */

// Constant declaration (top-level)
const val APP_NAME = "Kotlin Example App"

// Class definition
class Person(var firstName: String, var lastName: String, var age: Int) {
    // Member function (method)
    fun fullName(): String {
        return "$firstName $lastName"
    }

    // Secondary constructor
    constructor(firstName: String, lastName: String) : this(firstName, lastName, 0) {
        println("Secondary constructor called for $firstName $lastName")
    }

    // Init block (executed when an instance is created)
    init {
        println("Person object created: ${fullName()}, Age: $age")
    }
}

// Function definition (top-level)
fun calculateTax(amount: Double, taxRate: Double = 0.07): Double { // Default parameter value
    return amount * taxRate
}

// Extension function (adds a function to an existing class)
fun String.removeFirstLastChar(): String =  this.substring(1, this.length - 1)

// Data class (automatically generates equals(), hashCode(), toString(), etc.)
data class Product(val name: String, val price: Double, val category: String)

// Enum class
enum class LogLevel {
    INFO, WARNING, ERROR
}

// Main function - entry point
fun main() {
    // Variable declarations and initializations (using 'val' for immutable, 'var' for mutable)
    val message: String = "Hello, Kotlin!"
    var counter = 10
    val discountRate = 0.20
    val userName = "KotlinUser"
    val isActive = true
    val numbersList = listOf(1, 2, 3, 4, 5) // Immutable list
    val configMap = mapOf("theme" to "dark", "version" to "1.2") // Immutable map

    // Output to console
    println(message)
    println("Counter: $counter")

    // Conditional statement (if-else if-else)
    if (counter > 15) {
        println("Counter is greater than 15")
    } else if (counter == 10) {
        println("Counter is exactly 10")
    } else {
        println("Counter is less than 10")
    }

    // Loop example (for loop iterating through a list)
    println("Numbers in list:")
    for (number in numbersList) {
        println(number)
    }

    // Function call
    val taxAmount = calculateTax(150.0) // Using default tax rate
    println("Tax amount: $taxAmount")

    // Object instantiation and method call
    val person1 = Person("John", "Doe", 35)
    println("Full name: ${person1.fullName()}")

    val person2 = Person("Jane", "Smith") // Using secondary constructor
    println("Person 2 name: ${person2.fullName()}")

    // Extension function usage
    val originalString = "ExampleString"
    val modifiedString = originalString.removeFirstLastChar()
    println("Modified string: $modifiedString")

    // Data class example
    val product1 = Product("Laptop", 1200.0, "Electronics")
    println("Product details: $product1") // toString() is automatically generated

    // Enum class example
    val currentLogLevel = LogLevel.WARNING
    println("Current log level: $currentLogLevel")
}
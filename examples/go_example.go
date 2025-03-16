package main

import "fmt"

// Single-line comment in Go

/*
 * Multi-line comment
 * for documentation
 */

// Constant declaration
const message string = "Hello, Go!"

// Function definition
func main() {
	// Variable declarations and initializations
	var count int = 100
	var ratio float64 = 0.75
	var name string = "Go User"
	var isOpen bool = true
	sliceOfInts := []int{10, 20, 30, 40, 50}
	mapOfStrings := map[string]string{"key1": "value1", "key2": "value2"}

	// Output to console
	fmt.Println(message)
	fmt.Printf("Count is: %d\n", count)

	// Conditional statement (if-else-if)
	if count > 100 {
		fmt.Println("Count is greater than 100")
	} else if count == 100 {
		fmt.Println("Count is exactly 100")
	} else {
		fmt.Println("Count is less than 100")
	}

	// Loop example (for loop)
	fmt.Println("Slice elements:")
	for index, value := range sliceOfInts {
		fmt.Printf("Index: %d, Value: %d\n", index, value)
	}

	// Map iteration
	fmt.Println("Map entries:")
	for key, value := range mapOfStrings {
		fmt.Printf("Key: %s, Value: %s\n", key, value)
	}

	// Function call
	product := multiply(count, 2)
	fmt.Printf("Product of count and 2 is: %d\n", product)
}

// Another function definition
func multiply(a int, b int) int {
	return a * b
}
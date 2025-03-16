#include <iostream>
#include <vector>
#include <string>

// Single-line comment in C++

/*
 * Multi-line comment
 * for documentation
 */

#define MAX_VALUE 100 // Preprocessor directive and constant

// Function declaration
int add(int a, int b);

// Class definition
class Rectangle {
public:
    // Constructor
    Rectangle(int width, int height) : width_(width), height_(height) {}

    // Method to calculate area
    int getArea() const {
        return width_ * height_;
    }

    // Method to set width
    void setWidth(int width) {
        width_ = width;
    }

    // Method to get width
    int getWidth() const {
        return width_;
    }

private:
    int width_;  // Private member variable
    int height_; // Private member variable
};

// Main function - entry point
int main() {
    // Variable declaration and initialization
    int num1 = 10;
    float num2 = 3.14f;
    double num3 = 2.71828;
    char initial = 'J';
    std::string message = "Hello, C++!";
    bool flag = true;
    std::vector<int> numbers = {1, 2, 3, 4, 5};

    // Output to console
    std::cout << message << std::endl;
    std::cout << "Number 1: " << num1 << std::endl;

    // Conditional statement
    if (num1 > 0) {
        std::cout << "num1 is positive" << std::endl;
    } else {
        std::cout << "num1 is not positive" << std::endl;
    }

    // Loop example (for loop)
    std::cout << "Numbers in vector: ";
    for (int number : numbers) {
        std::cout << number << " ";
    }
    std::cout << std::endl;

    // Object instantiation and method call
    Rectangle rect(5, 10);
    std::cout << "Rectangle Area: " << rect.getArea() << std::endl;
    rect.setWidth(7);
    std::cout << "New Rectangle Width: " << rect.getWidth() << std::endl;

    // Function call
    int sum = add(num1, 5);
    std::cout << "Sum: " << sum << std::endl;

    return 0; // Successful program termination
}

// Function definition
int add(int a, int b) {
    return a + b;
}
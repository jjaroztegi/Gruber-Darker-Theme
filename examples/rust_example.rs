#!/usr/bin/env rust

// Single-line comment in Rust

/*
 * Multi-line comment
 * for documentation
 */

// Constant declaration (static constant)
static MAX_ATTEMPTS: u32 = 5;

// Function definition
fn greet_user(name: &str) -> String {
    format!("Hello, {}!", name) // String formatting, returns a String
}

// Struct definition
struct Rectangle {
    width: u32,
    height: u32,
}

// Implementation block for Rectangle struct (methods)
impl Rectangle {
    // Associated function (like static method, no 'self' parameter)
    fn square(size: u32) -> Rectangle {
        Rectangle { width: size, height: size }
    }

    // Method (takes 'self' as first parameter)
    fn area(&self) -> u32 {
        self.width * self.height
    }

    // Mutable method (takes '&mut self')
    fn set_width(&mut self, new_width: u32) {
        self.width = new_width;
    }
}

// Enum definition
enum Color {
    Red,
    Green,
    Blue,
    Rgb(u8, u8, u8), // Enum variant with tuple data
    Cmyk { cyan: u8, magenta: u8, yellow: u8, black: u8 }, // Enum variant with struct data
}

// Trait definition (like interface in other languages)
trait Shape {
    fn perimeter(&self) -> f64;
}

// Implement the Shape trait for Rectangle (need to convert u32 to f64 for perimeter calculation)
impl Shape for Rectangle {
    fn perimeter(&self) -> f64 {
        (2 * (self.width + self.height)) as f64 // Type casting u32 to f64
    }
}


// Main function - entry point
fn main() {
    // Variable declarations and initializations (let bindings - immutable by default)
    let message = "Hello, Rust!"; // Type inferred as &str
    let mut count: i32 = 0;      // Mutable variable, explicitly typed as i32
    let price: f64 = 99.99;       // f64 is 64-bit floating point
    let is_active = true;         // Type inferred as bool
    let numbers_vec = vec![10, 20, 30, 40, 50]; // Vector (resizable array)
    let config_map = std::collections::HashMap::from([ // HashMap (dictionary)
        ("theme", "light"),
        ("version", "1.0"),
    ]);

    // Output to console
    println!("{}", message); // Using '{}' for Display formatting
    println!("Count: {}", count);

    // Conditional statement (if-else if-else)
    if count > 5 {
        println!("Count is greater than 5");
    } else if count == 0 {
        println!("Count is zero");
    } else {
        println!("Count is between 1 and 5");
    }

    // Loop example (for loop iterating through a vector)
    println!("Numbers in vector:");
    for number in &numbers_vec { // Borrowing each element (no ownership transfer)
        println!("{}", number);
    }

    // Function call
    let greeting = greet_user("Rustacean");
    println!("{}", greeting);

    // Struct instantiation and method call
    let mut rect1 = Rectangle { width: 30, height: 50 };
    println!("Rectangle area: {}", rect1.area());
    rect1.set_width(40); // Mutable method call
    println!("Updated rectangle area after width change: {}", rect1.area());

    // Associated function call
    let square1 = Rectangle::square(25);
    println!("Square area: {}", square1.area());

    // Enum example
    let color1 = Color::Rgb(255, 0, 0); // Red color using RGB variant
    match color1 { // Match expression (like switch but more powerful)
        Color::Red => println!("Color is Red"),
        Color::Green => println!("Color is Green"),
        Color::Blue => println!("Color is Blue"),
        Color::Rgb(r, g, b) => println!("Color is RGB({}, {}, {})", r, g, b),
        Color::Cmyk{cyan, magenta, yellow, black} => println!("Color is CMYK({}, {}, {}, {})", cyan, magenta, yellow, black),
    }

    // Trait example
    println!("Rectangle perimeter: {}", rect1.perimeter());
}
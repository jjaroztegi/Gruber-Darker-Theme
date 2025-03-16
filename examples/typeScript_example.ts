// This is a single-line comment in TypeScript - Gruber Darker theme

/**
 * This is a multi-line comment in TypeScript, styled with Gruber Darker.
 * It describes the following example file, showcasing various TypeScript features.
 */

// Define an interface
interface Person {
    firstName: string;
    lastName: string;
    age?: number; // Optional property
}

// Define an enum
enum Color {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE",
}

// Class definition
class Greeter {
    private greeting: string; // Private member

    constructor(message: string) {
        this.greeting = message;
    }

    // Method to greet a person
    greetPerson(person: Person): string {
        const fullName = `${person.firstName} ${person.lastName}`; // Template literal
        let ageMessage = ""; // let variable

        if (person.age !== undefined) { // Conditional statement
            ageMessage = ` and is ${person.age} years old`;
        }

        console.log(`Color is: ${Color.Green}`); // Enum usage and console log

        return `${this.greeting}, ${fullName}${ageMessage}!`; // Return string
    }
}

// Function to process an array of numbers
function processNumbers(numbers: number[]): number {
    let sum: number = 0; // Explicit type annotation for sum

    for (let i = 0; i < numbers.length; i++) { // For loop
        sum += numbers[i]; // Addition assignment operator
    }
    return sum;
}

// Arrow function example
const multiply = (a: number, b: number): number => {
    return a * b; // Multiplication operator
};


// Example usage
const user: Person = { // Object literal implementing Person interface
    firstName: "John",
    lastName: "Doe",
    age: 30,
};

const anotherUser: Person = {
    firstName: "Jane",
    lastName: "Smith",
};

const greeterInstance = new Greeter("Hello"); // Creating an instance of Greeter class

const greetingMessage = greeterInstance.greetPerson(user);
console.log(greetingMessage);

const anotherGreeting = greeterInstance.greetPerson(anotherUser);
console.log(anotherGreeting);

const numbersArray: number[] = [1, 2, 3, 4, 5]; // Array of numbers
const sumOfNumbers = processNumbers(numbersArray);
console.log(`Sum of numbers: ${sumOfNumbers}`);

const product = multiply(5, 10);
console.log(`Product: ${product}`);
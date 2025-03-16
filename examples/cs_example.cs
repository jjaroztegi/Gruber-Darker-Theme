using System;
using System.Collections.Generic;

namespace ExampleApp
{
    // Single-line comment in C#
    /*
     * Multi-line comment
     * for documentation
     */

    // Class definition
    public class Program
    {
        // Constant declaration
        private const string GREETING_MESSAGE = "Hello, C#!";

        // Entry point method
        public static void Main(string[] args)
        {
            // Variable declarations and initializations
            int number = 42;
            double pi = 3.14159;
            float price = 19.99f;
            char grade = 'A';
            string name = "Alice";
            bool isActive = true;
            List<string> colors = new List<string> { "Red", "Green", "Blue" };

            // Output to console
            Console.WriteLine(GREETING_MESSAGE);
            Console.WriteLine($"The number is: {number}");

            // Conditional statement (if-else)
            if (number > 40)
            {
                Console.WriteLine("Number is greater than 40.");
            }
            else
            {
                Console.WriteLine("Number is not greater than 40.");
            }

            // Loop example (foreach loop)
            Console.WriteLine("Colors:");
            foreach (string color in colors)
            {
                Console.WriteLine(color);
            }

            // Method call
            int squaredNumber = Square(number);
            Console.WriteLine($"Square of {number} is: {squaredNumber}");

            // Object instantiation and method call
            var calculator = new Calculator();
            int result = calculator.Add(5, 3);
            Console.WriteLine($"5 + 3 = {result}");
        }

        // Method definition
        static int Square(int num)
        {
            return num * num;
        }
    }

    // Another class example
    public class Calculator
    {
        // Public method
        public int Add(int a, int b)
        {
            return a + b;
        }
    }
}
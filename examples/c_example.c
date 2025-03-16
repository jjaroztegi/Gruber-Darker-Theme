// C example file - Gruber Darker theme

/**
* @file c_example.c 
* @version 1.0 
* @date 2000-01-01 
*
* @copyright Copyright (c) 2000 
*/

#include <stdio.h>  // Standard input/output library - Header inclusion
#include <stdlib.h> // Standard library - Header inclusion

// --- Structure definition ---
typedef struct {
    int id;         // Integer member
    char name[50];  // Character array member (string)
} Person;

// --- Function declaration ---
Person* createPerson(int id, const char* name);
void printPerson(const Person* p);
int calculateSum(int a, int b);

// --- Global constant ---
const int MAX_VALUE = 100;

// --- Main function - Entry point of the program ---
int main() {
    // Variable declarations
    int num1 = 10;
    int num2 = 20;
    int sum;
    Person *person1, *person2;

    // Function call to calculate sum
    sum = calculateSum(num1, num2);
    printf("Sum of %d and %d is: %d\n", num1, num2, sum); // Output using printf

    // --- Conditional statement (if-else) ---
    if (sum > MAX_VALUE) {
        printf("Sum is greater than MAX_VALUE (%d)\n", MAX_VALUE);
    } else {
        printf("Sum is not greater than MAX_VALUE (%d)\n", MAX_VALUE);
    }

    // --- Loop (for loop) ---
    printf("Numbers from 1 to 5:\n");
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i); // Output numbers in loop
    }
    printf("\n");

    // --- Memory allocation and structure usage ---
    person1 = createPerson(1, "Alice"); // Function call to create a Person struct
    person2 = createPerson(2, "Bob");   // Function call to create another Person struct

    printf("\nPerson details:\n");
    printPerson(person1); // Function call to print Person details
    printPerson(person2); // Function call to print Person details

    // --- Memory deallocation ---
    free(person1); // Free dynamically allocated memory
    free(person2); // Free dynamically allocated memory

    return 0; // Return success code
}

// --- Function definition: createPerson ---
Person* createPerson(int id, const char* name) {
    Person* newPerson = (Person*)malloc(sizeof(Person)); // Dynamic memory allocation
    if (newPerson == NULL) { // Error handling for memory allocation failure
        fprintf(stderr, "Memory allocation failed!\n"); // Error output to stderr
        exit(1); // Exit with error code
    }
    newPerson->id = id; // Assign id to the structure member
    strcpy(newPerson->name, name); // Copy name to the structure member
    return newPerson; // Return pointer to the newly created Person structure
}

// --- Function definition: printPerson ---
void printPerson(const Person* p) {
    printf("ID: %d, Name: %s\n", p->id, p->name); // Print Person's id and name
}

// --- Function definition: calculateSum ---
int calculateSum(int a, int b) {
    return a + b; // Return the sum of two integers
}
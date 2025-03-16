#include <stdio.h>
#include <stdlib.h>

// Define a constant
#define MAX_SIZE 100

// Function prototype
void print_message(const char *message);

int main() {
    // Variable declaration
    int number = 42;
    char text[] = "Hello, World!";

    // Pointer example
    int *ptr = &number;

    // Conditional statement
    if (*ptr > 10) {
        printf("Number is greater than 10.\n");
    }

    // Loop example
    for (int i = 0; i < 5; i++) {
        printf("Loop iteration: %d\n", i);
    }

    // Function call
    print_message(text);

    return 0;
}

// Function definition
void print_message(const char *message) {
    printf("Message: %s\n", message);
}

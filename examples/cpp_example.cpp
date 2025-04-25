#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

// Template class for a simple stack
template <typename T> class Stack {
private:
    std::vector<T> items;

public:
    void push(T item) {
        items.push_back(item);
    }

    T pop() {
        if (items.empty()) {
            throw std::runtime_error("Stack is empty");
        }
        T item = items.back();
        items.pop_back();
        return item;
    }

    bool empty() const {
        return items.empty();
    }

    size_t size() const {
        return items.size();
    }
};

int main() {
    // Integer stack example
    Stack<int> intStack;
    intStack.push(1);
    intStack.push(2);
    intStack.push(3);

    std::cout << "Integer stack size: " << intStack.size() << std::endl;
    while (!intStack.empty()) {
        std::cout << "Popped: " << intStack.pop() << std::endl;
    }

    // String stack example
    Stack<std::string> strStack;
    strStack.push("Hello");
    strStack.push("World");

    std::cout << "\nString stack size: " << strStack.size() << std::endl;
    while (!strStack.empty()) {
        std::cout << "Popped: " << strStack.pop() << std::endl;
    }

    return 0;
}
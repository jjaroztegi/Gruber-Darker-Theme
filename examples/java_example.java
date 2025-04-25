package examples;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

// Generic class for a data container
class DataContainer<T> {
    private List<T> items;

    public DataContainer() {
        this.items = new ArrayList<>();
    }

    public void add(T item) {
        items.add(item);
    }

    public List<T> getItems() {
        return new ArrayList<>(items);
    }

    public List<T> filter(Predicate<T> predicate) {
        return items.stream()
                .filter(predicate::test)
                .collect(Collectors.toList());
    }
}

// Functional interface for filtering
interface Predicate<T> {
    boolean test(T t);
}

public class java_example {
    public static void main(String[] args) {
        // Create a container for strings
        DataContainer<String> stringContainer = new DataContainer<>();
        stringContainer.add("Hello");
        stringContainer.add("World");
        stringContainer.add("Java");

        // Filter strings longer than 4 characters
        List<String> longStrings = stringContainer.filter(s -> s.length() > 4);
        System.out.println("Long strings: " + longStrings);

        // Create a container for integers
        DataContainer<Integer> intContainer = new DataContainer<>();
        intContainer.add(1);
        intContainer.add(2);
        intContainer.add(3);
        intContainer.add(4);
        intContainer.add(5);

        // Filter even numbers
        List<Integer> evenNumbers = intContainer.filter(n -> n % 2 == 0);
        System.out.println("Even numbers: " + evenNumbers);
    }
}
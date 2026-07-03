#include <initializer_list>
#include <iostream>

template<class T>
class Sequence {
public:
    Sequence(std::initializer_list<T> values) {
        std::cout << "size=" << values.size() << '\n';
        for (const auto& value : values) {
            std::cout << value << ' ';
        }
        std::cout << '\n';
    }
};

int main() {
    Sequence<int> numbers{1, 2, 3, 4};
    Sequence<char> letters{'a', 'b', 'c'};
    Sequence<double> weights{2.5, 3.0, 4.5};

    std::initializer_list<int> values = {10, 20, 30};
    std::cout << "copied size=" << values.size() << '\n';
}

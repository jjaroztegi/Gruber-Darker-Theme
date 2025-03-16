<?php
#!/usr/bin/env php
<?php
// Single-line comment in PHP
# Another single-line comment style

/*
 * Multi-line comment
 * for documentation
 */

// Constant definition
define("SITE_NAME", "Example PHP Site");

// Function definition
function greetUser($username) {
    return "Hello, " . htmlspecialchars($username) . ", welcome to " . SITE_NAME . "!";
}

// Class definition
class Product {
    public $name;      // Public property
    private $price;    // Private property
    protected $category; // Protected property

    // Constructor
    public function __construct($name, $price, $category) {
        $this->name = $name;
        $this->price = $price;
        $this->category = $category;
    }

    // Method to get price
    public function getPrice() {
        return $this->price;
    }

    // Method to set price
    public function setPrice($newPrice) {
        $this->price = $newPrice;
    }

    // Static method example
    public static function getDefaultCurrency() {
        return "USD";
    }
}

// Main execution block
// In PHP, top-level code is common in script files
    // Variable declarations and initializations
    $count = 50;
    $rate = 0.05;
    $userName = "PHP User";
    $isActive = true;
    $items = array("Laptop", "Keyboard", "Mouse");
    $config = ['db_host' => 'localhost', 'db_user' => 'root'];

    // Output to browser/console
    echo "<h1>" . SITE_NAME . "</h1>";
    echo "<p>" . greetUser($userName) . "</p>";

    // Conditional statement (if-elseif-else)
    if ($count > 60) {
        echo "<p>Count is greater than 60</p>";
    } elseif ($count == 50) {
        echo "<p>Count is exactly 50</p>";
    } else {
        echo "<p>Count is less than 50</p>";
    }

    // Loop example (foreach loop)
    echo "<p>Items:</p><ul>";
    foreach ($items as $item) {
        echo "<li>" . $item . "</li>";
    }
    echo "</ul>";

    // Function call
    $greeting = greetUser($userName);
    echo "<p>" . $greeting . "</p>";

    // Object instantiation and method call
    $product1 = new Product("Smartphone", 499.99, "Electronics");
    echo "<p>Product: " . $product1->name . ", Price: " . $product1->getPrice() . Product::getDefaultCurrency() . "</p>";
    $product1->setPrice(479.99);
    echo "<p>Updated Price: " . $product1->getPrice() . Product::getDefaultCurrency() . "</p>";

?>
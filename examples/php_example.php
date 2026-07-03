<?php

class Product
{
    public function __construct(
        public readonly string $name,
        public readonly float $price,
    ) {}

    public static function fromJson(string $json): static
    {
        $data = json_decode($json, true);
        return new static($data['name'], $data['price']);
    }

    public static function fromXml(string $xml): static
    {
        $element = new SimpleXMLElement($xml);
        return new static((string) $element->name, (float) $element->price);
    }
}

$product = Product::fromJson('{"name":"Keyboard","price":79.99}');
$backup = Product::fromXml('<product><name>Mouse</name><price>29.50</price></product>');
echo $product->name . PHP_EOL;
echo $product->price . PHP_EOL;
echo $backup->name . PHP_EOL;

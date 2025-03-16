#!/usr/bin/env ruby

# Single-line comment in Ruby

=begin
Multi-line comment
for documentation
=end

# Constant declaration
GREETING = "Hello, Ruby!"

# Class definition
class Book
  # Constructor
  def initialize(title, author)
    @title = title
    @author = author
  end

  # Getter method for title
  def title
    @title
  end

  # Setter method for title
  def title=(new_title)
    @title = new_title
  end

  # Method to display book info
  def display_info
    puts "Title: #{@title}, Author: #{@author}"
  end
end

# Function definition (in Ruby, methods outside classes are also common)
def calculate_sum(num1, num2)
  return num1 + num2
end

# Main execution block
if __FILE__ == $0
  # Variable declarations and initializations
  number = 15
  price = 29.95
  name = "Rubyist"
  is_active = true
  colors = ["red", "green", "blue"]
  options = {:font_size => 12, :theme => "dark"}

  # Output to console
  puts GREETING
  puts "The number is #{number}"

  # Conditional statement (if-elsif-else)
  if number > 20
    puts "Number is greater than 20"
  elsif number == 15
    puts "Number is exactly 15"
  else
    puts "Number is less than 15"
  end

  # Loop example (each iterator)
  puts "Colors are:"
  colors.each do |color|
    puts color
  end

  # Method call
  sum_result = calculate_sum(number, 7)
  puts "Sum result: #{sum_result}"

  # Object instantiation and method call
  book1 = Book.new("The Ruby Way", "Hal Fulton")
  book1.display_info
  book1.title = "Updated Ruby Way" # Using setter
  puts "Updated title: #{book1.title}" # Using getter
end
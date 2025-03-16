// Comment example
import React, { useState, useEffect } from "react";

/**
 * Multiline comment
 * For documentation
 */
const API_KEY = "abc123"; // String constant

// Class definition
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }

  static createAnonymous() {
    return new Person("Anonymous", 0);
  }
}

// Function with async/await
async function fetchUserData(userId) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

// Arrow function with object destructuring
const processUser = ({ id, name, email }) => {
  const formattedUser = {
    userId: `user_${id}`,
    displayName: name.toUpperCase(),
    contact: email || "No email provided",
  };

  return formattedUser;
};

// Conditional and loops
function analyzeNumbers(numbers) {
  let sum = 0;
  let max = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }

  const average = numbers.length > 0 ? sum / numbers.length : 0;

  return { sum, average, max };
}

// React component
function UserProfile({ user, theme = "light" }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData(user.id).then((data) => {
      setUserData(data);
      setIsLoading(false);
    });
  }, [user.id]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={`profile-card ${theme}`}>
      <h2>{userData.name}</h2>
      <p>{userData.bio}</p>
    </div>
  );
}

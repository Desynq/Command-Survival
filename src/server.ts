class Person {
	name: string;  // Property with a string type
	age: number;   // Property with a number type

	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}

	greet(): void {  // Method with a void return type
		console.log(`Hello, my name is ${this.name}.`);
	}
}

// Usage:
const person = new Person("Alice", 25);
person.greet(); // Output: Hello, my name is Alice.
import * as readline from "readline-sync";

//CALCULATOR
 function calculator() :void {
    console.log("**SIMPLE CALCULATOR**");
const num1 : number = parseFloat(readline.question("enter the first number:"))  //converts input num to float

const operator :string = readline.question("Enter the operator /n (+,-,*,/)")  //takes operator as input

const num2 :number = parseFloat(readline.question("enter second number:")) //readline takes input from user and readline.question is a builtin func to take questions

let result : number;

switch(operator){
    case "+":
        result = num1 + num2;
        break;
    case "-" :
        result = num1 - num2;
        break;                  
    case "*" :
        result = num1 * num2;
        break;
    case "/" :
        if(num2 ==0){
            console.log("Error: Division by zero is not allowed.");
            return; // Exit the function to avoid further calculations
        }  
        result = num1 / num2;
        break;  
        
     default:
        console.log("Invalid operator");
        return; // Exit the function for invalid operator   
}

console.log(`Result: ${num1} ${operator } ${num2} = ${result}`); //template literals


}

calculator
 
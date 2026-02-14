// simple_calculator.js

// Для браузера (используйте prompt)
function simpleBrowserCalculator() {
    console.log("=== ПРОСТОЙ КАЛЬКУЛЯТОР ===");
    
    let num1 = parseFloat(prompt("Введите первое число:"));
    let operator = prompt("Введите оператор (+, -, *, /):");
    let num2 = parseFloat(prompt("Введите второе число:"));
    
    let result;
    let validOperation = true;
    
    switch(operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 !== 0) {
                result = num1 / num2;
            } else {
                console.log("Ошибка: деление на ноль!");
                validOperation = false;
            }
            break;
        default:
            console.log("Ошибка: неверный оператор!");
            validOperation = false;
    }
    
    if (validOperation) {
        console.log(`Результат: ${num1} ${operator} ${num2} = ${result}`);
        alert(`Результат: ${result}`);
    }
}

// Для Node.js (раскомментируйте для использования)
/*
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function simpleNodeCalculator() {
    console.log("=== ПРОСТОЙ КАЛЬКУЛЯТОР ===");
    
    rl.question("Введите первое число: ", (num1) => {
        rl.question("Введите оператор (+, -, *, /): ", (operator) => {
            rl.question("Введите второе число: ", (num2) => {
                num1 = parseFloat(num1);
                num2 = parseFloat(num2);
                
                let result;
                let validOperation = true;
                
                switch(operator) {
                    case '+': result = num1 + num2; break;
                    case '-': result = num1 - num2; break;
                    case '*': result = num1 * num2; break;
                    case '/': 
                        if (num2 !== 0) {
                            result = num1 / num2;
                        } else {
                            console.log("Ошибка: деление на ноль!");
                            validOperation = false;
                        }
                        break;
                    default:
                        console.log("Ошибка: неверный оператор!");
                        validOperation = false;
                }
                
                if (validOperation) {
                    console.log(`Результат: ${num1} ${operator} ${num2} = ${result}`);
                }
                
                rl.close();
            });
        });
    });
}
*/

// Запуск для браузера
// simpleBrowserCalculator();

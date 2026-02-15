#include <iostream>
#include <limits>
using namespace std;

int main() {
    double num1, num2;
    char operation;
    
    cout << "=== ПРОСТОЙ КАЛЬКУЛЯТОР ===" << endl;
    cout << "Введите первое число: ";
    cin >> num1;
    
    cout << "Введите оператор (+, -, *, /): ";
    cin >> operation;
    
    cout << "Введите второе число: ";
    cin >> num2;
    
    double result;
    bool validOperation = true;
    
    switch(operation) {
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
            if (num2 != 0) {
                result = num1 / num2;
            } else {
                cout << "Ошибка: деление на ноль!" << endl;
                validOperation = false;
            }
            break;
        default:
            cout << "Ошибка: неверный оператор!" << endl;
            validOperation = false;
    }
    
    if (validOperation) {
        cout << "Результат: " << num1 << " " << operation << " " << num2 << " = " << result << endl;
    }
    
    return 0;
}

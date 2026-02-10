#include <iostream>
#include <limits>
#include <cmath>

using namespace std;


double getValidNumber(const string& prompt) {
    double number;
    while (true) {
        cout << prompt;
        cin >> number;
        
        if (cin.fail()) {
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            cout << "Ошибка! Пожалуйста, введите число.\n";
        } else {
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            return number;
        }
    }
}


char getValidOperator() {
    char op;
    const string validOps = "+-*/%^";
    
    while (true) {
        cout << "Введите оператор (+, -, *, /, %, ^): ";
        cin >> op;
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        
        if (validOps.find(op) != string::npos) {
            return op;
        } else {
            cout << "Некорректный оператор! Допустимые операторы: +, -, *, /, %, ^\n";
        }
    }
}


double calculate(double num1, double num2, char op, bool& error) {
    error = false;
    
    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (fabs(num2) < 1e-10) { 
                error = true;
                return 0;
            }
            return num1 / num2;
        case '%':
            if (fabs(num2) < 1e-10) {
                error = true;
                return 0;
            }
            return fmod(num1, num2);
        case '^':
            return pow(num1, num2);
        default:
            error = true;
            return 0;
    }
}

void displayResult(double num1, double num2, char op, double result) {
    cout << "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    cout << "  " << num1 << " " << op << " " << num2 << " = " << result << "\n";
    cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
}

int main() {
    char choice;
    
    cout << "╔════════════════════════════════════════╗\n";
    cout << "║       КАЛЬКУЛЯТОР (Модернизированный)  ║\n";
    cout << "╚════════════════════════════════════════╝\n\n";
    
    do {
        cout << "─────────── НОВОЕ ВЫЧИСЛЕНИЕ ───────────\n";
        
        // Ввод данных
        double num1 = getValidNumber("Введите первое число: ");
        char op = getValidOperator();
        double num2 = getValidNumber("Введите второе число: ");
        
      
        bool error = false;
        double result = calculate(num1, num2, op, error);
        
      
        if (error) {
            if (op == '/' || op == '%') {
                cout << "\n❌ Ошибка: деление на ноль невозможно!\n\n";
            }
        } else {
            displayResult(num1, num2, op, result);
        }
        
       
        cout << "Хотите выполнить еще одно вычисление? (y/n): ";
        cin >> choice;
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        cout << endl;
        
    } while (choice == 'y' || choice == 'Y' || choice == 'д' || choice == 'Д');
    
    cout << "──────────────────────────────────────────\n";
    cout << "Спасибо за использование калькулятора! 👋\n";
    cout << "──────────────────────────────────────────\n";
    
    return 0;
}

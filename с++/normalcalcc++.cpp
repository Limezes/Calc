#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <iomanip>
#include <cmath>
#include <limits>
#include <algorithm>
#include <cctype>

using namespace std;

class MediumCalculator {
private:
    vector<string> history;
    double memory;
    
    void clearScreen() {
        #ifdef _WIN32
            system("cls");
        #else
            system("clear");
        #endif
    }
    
    void waitForKey() {
        cout << "\nНажмите Enter для продолжения...";
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        cin.get();
    }
    
    double getNumber(const string& prompt) {
        double num;
        while (true) {
            cout << prompt;
            if (cin >> num) {
                break;
            } else {
                cout << "Ошибка: введите корректное число!" << endl;
                cin.clear();
                cin.ignore(numeric_limits<streamsize>::max(), '\n');
            }
        }
        return num;
    }
    
    string getOperator() {
        string op;
        while (true) {
            cout << "Введите оператор (+, -, *, /, ^, %): ";
            cin >> op;
            
            if (op.length() == 1 && (op == "+" || op == "-" || op == "*" || 
                op == "/" || op == "^" || op == "%")) {
                return op;
            }
            cout << "Ошибка: неверный оператор!" << endl;
        }
    }
    
    double calculate(double num1, const string& op, double num2) {
        if (op == "+") return num1 + num2;
        if (op == "-") return num1 - num2;
        if (op == "*") return num1 * num2;
        if (op == "/") {
            if (num2 == 0) throw runtime_error("Деление на ноль!");
            return num1 / num2;
        }
        if (op == "^") return pow(num1, num2);
        if (op == "%") return fmod(num1, num2);
        throw runtime_error("Неизвестный оператор");
    }
    
    void showMenu() {
        cout << "\n" << string(50, '=') << endl;
        cout << "           КАЛЬКУЛЯТОР (СРЕДНИЙ УРОВЕНЬ)" << endl;
        cout << string(50, '=') << endl;
        cout << "\nДоступные операции:" << endl;
        cout << "  +  - сложение" << endl;
        cout << "  -  - вычитание" << endl;
        cout << "  *  - умножение" << endl;
        cout << "  /  - деление" << endl;
        cout << "  ^  - возведение в степень" << endl;
        cout << "  %  - остаток от деления" << endl;
        cout << "\nКоманды:" << endl;
        cout << "  history - показать историю" << endl;
        cout << "  memory  - работа с памятью" << endl;
        cout << "  clear   - очистить историю" << endl;
        cout << "  exit    - выход" << endl;
    }
    
    void showHistory() {
        cout << "\n--- ИСТОРИЯ ОПЕРАЦИЙ ---" << endl;
        if (history.empty()) {
            cout << "История пуста." << endl;
        } else {
            for (size_t i = 0; i < history.size(); i++) {
                cout << i + 1 << ". " << history[i] << endl;
            }
        }
    }
    
    void memoryMenu() {
        cout << "\n--- РАБОТА С ПАМЯТЬЮ ---" << endl;
        cout << "Текущее значение памяти: " << memory << endl;
        cout << "1. Сохранить в память (M+)" << endl;
        cout << "2. Извлечь из памяти (MR)" << endl;
        cout << "3. Очистить память (MC)" << endl;
        cout << "4. Добавить к памяти (M+)" << endl;
        cout << "5. Вычесть из памяти (M-)" << endl;
        cout << "6. Назад" << endl;
        
        int choice;
        cout << "Выберите действие: ";
        cin >> choice;
        
        double num;
        switch(choice) {
            case 1:
                num = getNumber("Введите число для сохранения: ");
                memory = num;
                cout << "Число сохранено в память." << endl;
                break;
            case 2:
                cout << "Значение из памяти: " << memory << endl;
                break;
            case 3:
                memory = 0;
                cout << "Память очищена." << endl;
                break;
            case 4:
                num = getNumber("Введите число для добавления: ");
                memory += num;
                cout << "Новое значение памяти: " << memory << endl;
                break;
            case 5:
                num = getNumber("Введите число для вычитания: ");
                memory -= num;
                cout << "Новое значение памяти: " << memory << endl;
                break;
            case 6:
                return;
            default:
                cout << "Неверный выбор!" << endl;
        }
    }

public:
    MediumCalculator() : memory(0) {}
    
    void run() {
        string command;
        
        while (true) {
            clearScreen();
            showMenu();
            
            cout << "\nВведите выражение (или команду): ";
            cin >> command;
            
            if (command == "exit") {
                cout << "Программа завершена." << endl;
                break;
            }
            
            if (command == "history") {
                showHistory();
                waitForKey();
                continue;
            }
            
            if (command == "memory") {
                memoryMenu();
                waitForKey();
                continue;
            }
            
            if (command == "clear") {
                history.clear();
                cout << "История очищена." << endl;
                waitForKey();
                continue;
            }
            
            // Парсинг выражения (формат: число оператор число)
            double num1, num2;
            string op;
            
            try {
                num1 = stod(command);
                cin >> op >> num2;
                
                double result = calculate(num1, op, num2);
                
                // Форматирование результата
                stringstream ss;
                ss << fixed << setprecision(2);
                ss << num1 << " " << op << " " << num2 << " = " << result;
                string historyEntry = ss.str();
                
                cout << "Результат: " << historyEntry << endl;
                history.push_back(historyEntry);
                
            } catch (const exception& e) {
                cout << "Ошибка: " << e.what() << endl;
            }
            
            waitForKey();
        }
    }
};

int main() {
    MediumCalculator calculator;
    calculator.run();
    return 0;
}

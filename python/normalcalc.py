# medium_calculator.py
import math
import os

class MediumCalculator:
    def __init__(self):
        self.history = []
        self.operations = {
            '+': lambda x, y: x + y,
            '-': lambda x, y: x - y,
            '*': lambda x, y: x * y,
            '/': lambda x, y: x / y if y != 0 else None,
            '^': lambda x, y: x ** y,
            '%': lambda x, y: x % y,
            '√': lambda x, y: math.sqrt(x) if y is None else None,
        }
    
    def clear_screen(self):
        os.system('cls' if os.name == 'nt' else 'clear')
    
    def show_menu(self):
        self.clear_screen()
        print("=" * 50)
        print("           КАЛЬКУЛЯТОР (СРЕДНИЙ УРОВЕНЬ)")
        print("=" * 50)
        print("\nДоступные операции:")
        print("  +  - сложение")
        print("  -  - вычитание")
        print("  *  - умножение")
        print("  /  - деление")
        print("  ^  - возведение в степень")
        print("  %  - остаток от деления")
        print("  √  - квадратный корень (введите второе число как 0)")
        print("\nКоманды:")
        print("  history - показать историю")
        print("  clear   - очистить историю")
        print("  exit    - выход")
    
    def show_history(self):
        print("\n--- ИСТОРИЯ ОПЕРАЦИЙ ---")
        if not self.history:
            print("История пуста.")
        else:
            for i, entry in enumerate(self.history, 1):
                print(f"{i}. {entry}")
        input("\nНажмите Enter для продолжения...")
    
    def get_number(self, prompt):
        while True:
            try:
                return float(input(prompt))
            except ValueError:
                print("Ошибка: введите корректное число!")
    
    def calculate(self, num1, operator, num2=None):
        if operator == '√':
            if num1 < 0:
                return None, "Ошибка: корень из отрицательного числа!"
            return math.sqrt(num1), None
        
        if operator not in self.operations:
            return None, f"Ошибка: неизвестный оператор '{operator}'!"
        
        result = self.operations[operator](num1, num2)
        if result is None:
            return None, "Ошибка: деление на ноль!"
        
        return result, None
    
    def run(self):
        while True:
            self.show_menu()
            
            try:
                command = input("\nВведите команду или выражение: ").strip().lower()
                
                if command == 'exit':
                    print("Программа завершена.")
                    break
                elif command == 'history':
                    self.show_history()
                    continue
                elif command == 'clear':
                    self.history.clear()
                    print("История очищена.")
                    input("Нажмите Enter для продолжения...")
                    continue
                
                # Парсинг ввода
                parts = command.split()
                if len(parts) == 2 and parts[1] == '√':
                    # Специальный случай для корня
                    num1 = float(parts[0])
                    operator = '√'
                    result, error = self.calculate(num1, operator)
                    if error:
                        print(error)
                    else:
                        print(f"Результат: √{num1} = {result}")
                        self.history.append(f"√{num1} = {result}")
                elif len(parts) == 3:
                    num1 = float(parts[0])
                    operator = parts[1]
                    num2 = float(parts[2])
                    
                    result, error = self.calculate(num1, operator, num2)
                    if error:
                        print(error)
                    else:
                        print(f"Результат: {num1} {operator} {num2} = {result}")
                        self.history.append(f"{num1} {operator} {num2} = {result}")
                else:
                    print("Неверный формат. Используйте: число оператор число")
                
                input("\nНажмите Enter для продолжения...")
                
            except ValueError:
                print("Ошибка: введите корректные числа!")
                input("Нажмите Enter для продолжения...")
            except KeyboardInterrupt:
                print("\nПрограмма прервана.")
                break
            except Exception as e:
                print(f"Неожиданная ошибка: {e}")
                input("Нажмите Enter для продолжения...")

if __name__ == "__main__":
    calculator = MediumCalculator()
    calculator.run()

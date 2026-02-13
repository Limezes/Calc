# simple_calculator.py
def main():
    print("=== ПРОСТОЙ КАЛЬКУЛЯТОР ===")
    
    try:
        num1 = float(input("Введите первое число: "))
        operator = input("Введите оператор (+, -, *, /): ")
        num2 = float(input("Введите второе число: "))
        
        result = None
        valid_operation = True
        
        if operator == '+':
            result = num1 + num2
        elif operator == '-':
            result = num1 - num2
        elif operator == '*':
            result = num1 * num2
        elif operator == '/':
            if num2 != 0:
                result = num1 / num2
            else:
                print("Ошибка: деление на ноль!")
                valid_operation = False
        else:
            print("Ошибка: неверный оператор!")
            valid_operation = False
        
        if valid_operation:
            print(f"Результат: {num1} {operator} {num2} = {result}")
            
    except ValueError:
        print("Ошибка: введите корректные числа!")

if __name__ == "__main__":
    main()

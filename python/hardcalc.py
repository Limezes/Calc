# advanced_calculator.py
import tkinter as tk
from tkinter import messagebox, ttk
import math
import re

class AdvancedCalculator:
    def __init__(self, root):
        self.root = root
        self.root.title("ПРОДВИНУТЫЙ КАЛЬКУЛЯТОР")
        self.root.geometry("600x700")
        self.root.resizable(True, True)
        
        # Переменные
        self.current_input = ""
        self.history = []
        self.is_radians = tk.BooleanVar(value=True)
        self.memory = 0
        
        # Настройка стилей
        self.setup_styles()
        
        # Создание интерфейса
        self.create_widgets()
        
        # Привязка клавиш
        self.bind_keys()
    
    def setup_styles(self):
        self.root.configure(bg='#2b2b2b')
        
        self.style = ttk.Style()
        self.style.theme_use('clam')
        
        # Настройка цветов для разных типов кнопок
        self.button_colors = {
            'number': {'bg': '#404040', 'fg': 'white', 'active': '#505050'},
            'operator': {'bg': '#ff9500', 'fg': 'white', 'active': '#ffaa33'},
            'function': {'bg': '#5e5e5e', 'fg': 'white', 'active': '#6e6e6e'},
            'memory': {'bg': '#4a4a4a', 'fg': '#ff9500', 'active': '#5a5a5a'},
            'clear': {'bg': '#d32f2f', 'fg': 'white', 'active': '#f44336'}
        }
    
    def create_widgets(self):
        # Главный фрейм
        main_frame = tk.Frame(self.root, bg='#2b2b2b')
        main_frame.pack(expand=True, fill='both', padx=10, pady=10)
        
        # Верхняя панель с настройками
        top_frame = tk.Frame(main_frame, bg='#2b2b2b')
        top_frame.pack(fill='x', pady=(0, 10))
        
        # Переключатель радианы/градусы
        rad_deg_frame = tk.Frame(top_frame, bg='#2b2b2b')
        rad_deg_frame.pack(side='left')
        
        tk.Radiobutton(rad_deg_frame, text="Рад", variable=self.is_radians, 
                      value=True, bg='#2b2b2b', fg='white', 
                      selectcolor='#404040', command=self.update_mode).pack(side='left')
        tk.Radiobutton(rad_deg_frame, text="Град", variable=self.is_radians, 
                      value=False, bg='#2b2b2b', fg='white', 
                      selectcolor='#404040', command=self.update_mode).pack(side='left')
        
        # Индикатор режима
        self.mode_label = tk.Label(top_frame, text="Режим: Радианы", 
                                  bg='#2b2b2b', fg='#ff9500')
        self.mode_label.pack(side='right')
        
        # Поле ввода
        input_frame = tk.Frame(main_frame, bg='#2b2b2b')
        input_frame.pack(fill='x', pady=(0, 10))
        
        self.display = tk.Entry(input_frame, font=('Arial', 24), 
                               bg='#1e1e1e', fg='#00ff00', 
                               insertbackground='white', justify='right',
                               bd=0, highlightthickness=1, highlightcolor='#ff9500')
        self.display.pack(fill='x', ipady=10)
        
        # Привязка клавиш к дисплею
        self.display.bind('<Key>', self.key_press)
        
        # Кнопки
        buttons_frame = tk.Frame(main_frame, bg='#2b2b2b')
        buttons_frame.pack(expand=True, fill='both')
        
        # Определение кнопок
        buttons = [
            # Строка 1: Память и очистка
            ['MC', 'MR', 'M+', 'M-', 'C', '⌫'],
            
            # Строка 2: Степени и корни
            ['x²', 'x³', 'x^y', '√', '∛', '1/x'],
            
            # Строка 3: Тригонометрия
            ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'],
            
            # Строка 4: Логарифмы
            ['ln', 'log', 'log₂', 'e^x', '10^x', '2^x'],
            
            # Строка 5: Основные кнопки
            ['7', '8', '9', '/', 'π', 'e'],
            
            # Строка 6
            ['4', '5', '6', '*', '(', ')'],
            
            # Строка 7
            ['1', '2', '3', '-', '%', '!'],
            
            # Строка 8
            ['0', '.', '±', '+', '=', 'DEL']
        ]
        
        # Создание сетки кнопок
        for i, row in enumerate(buttons):
            row_frame = tk.Frame(buttons_frame, bg='#2b2b2b')
            row_frame.pack(expand=True, fill='both', pady=2)
            
            for j, text in enumerate(row):
                btn_type = self.get_button_type(text)
                colors = self.button_colors[btn_type]
                
                btn = tk.Button(row_frame, text=text, font=('Arial', 12, 'bold'),
                              bg=colors['bg'], fg=colors['fg'],
                              activebackground=colors['active'],
                              activeforeground='white',
                              bd=0, padx=10, pady=10,
                              command=lambda x=text: self.button_click(x))
                btn.pack(side='left', expand=True, fill='both', padx=1)
        
        # История вычислений
        history_frame = tk.Frame(main_frame, bg='#2b2b2b')
        history_frame.pack(fill='both', expand=True, pady=(10, 0))
        
        history_label = tk.Label(history_frame, text="История:", 
                                bg='#2b2b2b', fg='white')
        history_label.pack(anchor='w')
        
        self.history_text = tk.Text(history_frame, height=6, 
                                   bg='#1e1e1e', fg='white',
                                   font=('Arial', 10), state='disabled')
        self.history_text.pack(fill='both', expand=True)
        
        # Скроллбар для истории
        scrollbar = tk.Scrollbar(self.history_text)
        scrollbar.pack(side='right', fill='y')
        self.history_text.config(yscrollcommand=scrollbar.set)
        scrollbar.config(command=self.history_text.yview)
    
    def get_button_type(self, text):
        if text in ['C', '⌫', 'DEL']:
            return 'clear'
        elif text in ['MC', 'MR', 'M+', 'M-']:
            return 'memory'
        elif text in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']:
            return 'number'
        elif text in ['+', '-', '*', '/', '=', '%', 'x^y', '±']:
            return 'operator'
        else:
            return 'function'
    
    def bind_keys(self):
        self.root.bind('<Return>', lambda e: self.button_click('='))
        self.root.bind('<BackSpace>', lambda e: self.button_click('⌫'))
        self.root.bind('<Escape>', lambda e: self.button_click('C'))
        self.root.bind('<Control-h>', lambda e: self.show_history_window())
        
        # Цифры и операторы
        for key in '0123456789+-*/().':
            self.root.bind(key, lambda e, k=key: self.button_click(k))
    
    def key_press(self, event):
        # Разрешаем ввод только определенных символов
        if event.char and event.char in '0123456789+-*/(). ':
            self.current_input += event.char
            self.display.insert(tk.END, event.char)
            return 'break'
    
    def button_click(self, value):
        if value == 'C':
            self.current_input = ""
            self.display.delete(0, tk.END)
        elif value == '⌫':
            self.current_input = self.current_input[:-1]
            self.display.delete(len(self.current_input), tk.END)
        elif value == 'DEL':
            self.current_input = ""
            self.display.delete(0, tk.END)
            self.history_text.config(state='normal')
            self.history_text.delete(1.0, tk.END)
            self.history_text.config(state='disabled')
        elif value == '=':
            self.calculate()
        elif value == '±':
            if self.current_input and self.current_input[0] == '-':
                self.current_input = self.current_input[1:]
            else:
                self.current_input = '-' + self.current_input
            self.display.delete(0, tk.END)
            self.display.insert(0, self.current_input)
        elif value == 'π':
            self.current_input += str(math.pi)
            self.display.insert(tk.END, str(math.pi))
        elif value == 'e':
            self.current_input += str(math.e)
            self.display.insert(tk.END, str(math.e))
        elif value == 'x²':
            self.current_input += '**2'
            self.display.insert(tk.END, '²')
        elif value == 'x³':
            self.current_input += '**3'
            self.display.insert(tk.END, '³')
        elif value == 'x^y':
            self.current_input += '**'
            self.display.insert(tk.END, '^')
        elif value == '√':
            self.current_input += 'sqrt('
            self.display.insert(tk.END, '√(')
        elif value == '∛':
            self.current_input += 'cbrt('
            self.display.insert(tk.END, '∛(')
        elif value == '1/x':
            self.current_input = '1/(' + self.current_input + ')'
            self.display.delete(0, tk.END)
            self.display.insert(0, self.current_input)
        elif value == 'sin':
            self.current_input += 'sin('
            self.display.insert(tk.END, 'sin(')
        elif value == 'cos':
            self.current_input += 'cos('
            self.display.insert(tk.END, 'cos(')
        elif value == 'tan':
            self.current_input += 'tan('
            self.display.insert(tk.END, 'tan(')
        elif value == 'asin':
            self.current_input += 'asin('
            self.display.insert(tk.END, 'asin(')
        elif value == 'acos':
            self.current_input += 'acos('
            self.display.insert(tk.END, 'acos(')
        elif value == 'atan':
            self.current_input += 'atan('
            self.display.insert(tk.END, 'atan(')
        elif value == 'ln':
            self.current_input += 'log('
            self.display.insert(tk.END, 'ln(')
        elif value == 'log':
            self.current_input += 'log10('
            self.display.insert(tk.END, 'log(')
        elif value == 'log₂':
            self.current_input += 'log2('
            self.display.insert(tk.END, 'log₂(')
        elif value == 'e^x':
            self.current_input += 'exp('
            self.display.insert(tk.END, 'e^(')
        elif value == '10^x':
            self.current_input += '10**'
            self.display.insert(tk.END, '10^')
        elif value == '2^x':
            self.current_input += '2**'
            self.display.insert(tk.END, '2^')
        elif value == '!':
            self.current_input += 'factorial('
            self.display.insert(tk.END, '!(')
        elif value == '%':
            self.current_input += '%'
            self.display.insert(tk.END, '%')
        elif value == 'MC':
            self.memory = 0
            messagebox.showinfo("Память", "Память очищена")
        elif value == 'MR':
            self.current_input += str(self.memory)
            self.display.insert(tk.END, str(self.memory))
        elif value == 'M+':
            try:
                self.memory += float(self.evaluate_expression(self.current_input))
                messagebox.showinfo("Память", f"Добавлено в память: {self.memory}")
            except:
                messagebox.showerror("Ошибка", "Некорректное выражение")
        elif value == 'M-':
            try:
                self.memory -= float(self.evaluate_expression(self.current_input))
                messagebox.showinfo("Память", f"Вычтено из памяти: {self.memory}")
            except:
                messagebox.showerror("Ошибка", "Некорректное выражение")
        else:
            self.current_input += value
            self.display.insert(tk.END, value)
    
    def calculate(self):
        try:
            result = self.evaluate_expression(self.current_input)
            
            # Добавление в историю
            self.history.append(f"{self.current_input} = {result}")
            self.update_history()
            
            # Отображение результата
            self.display.delete(0, tk.END)
            self.display.insert(0, str(result))
            self.current_input = str(result)
            
        except Exception as e:
            messagebox.showerror("Ошибка", str(e))
            self.current_input = ""
            self.display.delete(0, tk.END)
    
    def evaluate_expression(self, expression):
        # Замена специальных функций
        expression = expression.replace('²', '**2')
        expression = expression.replace('³', '**3')
        expression = expression.replace('^', '**')
        
        # Безопасное вычисление выражения
        def safe_eval(expr):
            # Разрешенные функции и константы
            allowed_names = {
                'sin': math.sin,
                'cos': math.cos,
                'tan': math.tan,
                'asin': math.asin,
                'acos': math.acos,
                'atan': math.atan,
                'sqrt': math.sqrt,
                'cbrt': lambda x: x**(1/3),
                'log': math.log,
                'log10': math.log10,
                'log2': math.log2,
                'exp': math.exp,
                'factorial': math.factorial,
                'pi': math.pi,
                'e': math.e
            }
            
            # Обработка углов (радианы/градусы)
            if not self.is_radians.get():
                # Замена тригонометрических функций с градусами
                expr = re.sub(r'sin\(([^)]+)\)', 
                             r'math.sin(math.radians(\1))', expr)
                expr = re.sub(r'cos\(([^)]+)\)', 
                             r'math.cos(math.radians(\1))', expr)
                expr = re.sub(r'tan\(([^)]+)\)', 
                             r'math.tan(math.radians(\1))', expr)
            
            # Вычисление
            return eval(expr, {"__builtins__": {}}, allowed_names)
        
        return safe_eval(expression)
    
    def update_history(self):
        self.history_text.config(state='normal')
        self.history_text.delete(1.0, tk.END)
        for item in self.history[-10:]:  # Показываем последние 10 записей
            self.history_text.insert(tk.END, item + '\n')
        self.history_text.config(state='disabled')
        self.history_text.see(tk.END)
    
    def update_mode(self):
        mode = "Радианы" if self.is_radians.get() else "Градусы"
        self.mode_label.config(text=f"Режим: {mode}")
    
    def show_history_window(self):
        history_window = tk.Toplevel(self.root)
        history_window.title("Полная история")
        history_window.geometry("400x500")
        history_window.configure(bg='#2b2b2b')
        
        text_area = tk.Text(history_window, bg='#1e1e1e', fg='white',
                           font=('Arial', 10))
        text_area.pack(expand=True, fill='both', padx=10, pady=10)
        
        for item in self.history:
            text_area.insert(tk.END, item + '\n')
        
        text_area.config(state='disabled')

def main():
    root = tk.Tk()
    app = AdvancedCalculator(root)
    root.mainloop()

if __name__ == "__main__":
    main()

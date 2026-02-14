<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Средний калькулятор</title>
    <style>
        * {
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .calculator {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            padding: 20px;
            width: 400px;
        }
        
        .display {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            text-align: right;
            font-size: 2em;
            font-weight: bold;
            min-height: 80px;
            word-wrap: break-word;
            border: 2px solid #e9ecef;
        }
        
        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-bottom: 20px;
        }
        
        button {
            padding: 20px;
            font-size: 1.2em;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: bold;
        }
        
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .number {
            background: #e9ecef;
            color: #495057;
        }
        
        .operator {
            background: #ffd43b;
            color: #495057;
        }
        
        .equals {
            background: #51cf66;
            color: white;
            grid-column: span 2;
        }
        
        .clear {
            background: #ff6b6b;
            color: white;
        }
        
        .function {
            background: #4dabf7;
            color: white;
        }
        
        .history {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 15px;
            max-height: 200px;
            overflow-y: auto;
            border: 2px solid #e9ecef;
        }
        
        .history h3 {
            margin: 0 0 10px 0;
            color: #495057;
        }
        
        .history-item {
            padding: 8px;
            border-bottom: 1px solid #dee2e6;
            color: #868e96;
            display: flex;
            justify-content: space-between;
        }
        
        .history-item:last-child {
            border-bottom: none;
        }
        
        .history-item:hover {
            background: #e9ecef;
        }
        
        .memory-indicator {
            position: absolute;
            top: 10px;
            right: 10px;
            color: #ff6b6b;
            font-weight: bold;
            display: none;
        }
    </style>
</head>
<body>
    <div class="calculator">
        <div style="position: relative;">
            <div class="display" id="display">0</div>
            <div class="memory-indicator" id="memoryIndicator">M</div>
        </div>
        
        <div class="buttons">
            <button class="clear" onclick="clearAll()">C</button>
            <button class="clear" onclick="backspace()">←</button>
            <button class="function" onclick="addFunction('√')">√</button>
            <button class="operator" onclick="addOperator('/')">/</button>
            
            <button class="number" onclick="addNumber('7')">7</button>
            <button class="number" onclick="addNumber('8')">8</button>
            <button class="number" onclick="addNumber('9')">9</button>
            <button class="operator" onclick="addOperator('*')">×</button>
            
            <button class="number" onclick="addNumber('4')">4</button>
            <button class="number" onclick="addNumber('5')">5</button>
            <button class="number" onclick="addNumber('6')">6</button>
            <button class="operator" onclick="addOperator('-')">-</button>
            
            <button class="number" onclick="addNumber('1')">1</button>
            <button class="number" onclick="addNumber('2')">2</button>
            <button class="number" onclick="addNumber('3')">3</button>
            <button class="operator" onclick="addOperator('+')">+</button>
            
            <button class="number" onclick="addNumber('0')">0</button>
            <button class="number" onclick="addNumber('.')'>.</button>
            <button class="function" onclick="addFunction('^')">x^y</button>
            <button class="equals" onclick="calculate()'>=</button>
            
            <button class="function" onclick="memoryClear()">MC</button>
            <button class="function" onclick="memoryRecall()">MR</button>
            <button class="function" onclick="memoryAdd()">M+</button>
            <button class="function" onclick="memorySubtract()">M-</button>
            
            <button class="function" onclick="addFunction('sin')">sin</button>
            <button class="function" onclick="addFunction('cos')">cos</button>
            <button class="function" onclick="addFunction('tan')">tan</button>
            <button class="function" onclick="toggleMode()" id="modeBtn">Rad</button>
        </div>
        
        <div class="history">
            <h3>История</h3>
            <div id="historyList"></div>
        </div>
    </div>

    <script>
        // Калькулятор на JavaScript
        class MediumCalculator {
            constructor() {
                this.currentInput = '';
                this.lastResult = '';
                this.history = [];
                this.memory = 0;
                this.isRadian = true;
                this.display = document.getElementById('display');
                this.historyList = document.getElementById('historyList');
                this.memoryIndicator = document.getElementById('memoryIndicator');
                this.modeBtn = document.getElementById('modeBtn');
            }
            
            updateDisplay() {
                this.display.textContent = this.currentInput || '0';
            }
            
            addToHistory(expression, result) {
                this.history.unshift({ expression, result });
                if (this.history.length > 10) this.history.pop();
                this.renderHistory();
            }
            
            renderHistory() {
                this.historyList.innerHTML = this.history.map(item => 
                    `<div class="history-item">
                        <span>${item.expression}</span>
                        <strong>= ${item.result}</strong>
                    </div>`
                ).join('');
            }
            
            addNumber(num) {
                this.currentInput += num;
                this.updateDisplay();
            }
            
            addOperator(op) {
                const operators = '+-*/^';
                const lastChar = this.currentInput.slice(-1);
                
                if (operators.includes(lastChar)) {
                    this.currentInput = this.currentInput.slice(0, -1) + op;
                } else {
                    this.currentInput += op;
                }
                this.updateDisplay();
            }
            
            addFunction(func) {
                this.currentInput += func + '(';
                this.updateDisplay();
            }
            
            clearAll() {
                this.currentInput = '';
                this.updateDisplay();
            }
            
            backspace() {
                this.currentInput = this.currentInput.slice(0, -1);
                this.updateDisplay();
            }
            
            calculate() {
                try {
                    // Замена символов для вычисления
                    let expression = this.currentInput
                        .replace(/×/g, '*')
                        .replace(/÷/g, '/')
                        .replace(/\^/g, '**')
                        .replace(/√/g, 'Math.sqrt');
                    
                    // Безопасное вычисление
                    const result = this.evaluateExpression(expression);
                    
                    this.addToHistory(this.currentInput, result);
                    this.currentInput = result.toString();
                    this.lastResult = result;
                    this.updateDisplay();
                } catch (error) {
                    this.display.textContent = 'Ошибка';
                    setTimeout(() => this.updateDisplay(), 1000);
                }
            }
            
            evaluateExpression(expr) {
                // Создаем функцию с математическими функциями
                const mathFunctions = {
                    sin: (x) => this.isRadian ? Math.sin(x) : Math.sin(x * Math.PI / 180),
                    cos: (x) => this.isRadian ? Math.cos(x) : Math.cos(x * Math.PI / 180),
                    tan: (x) => this.isRadian ? Math.tan(x) : Math.tan(x * Math.PI / 180),
                    sqrt: Math.sqrt,
                    pow: Math.pow,
                    abs: Math.abs,
                    round: Math.round,
                    floor: Math.floor,
                    ceil: Math.ceil
                };
                
                // Добавляем функции в выражение
                Object.keys(mathFunctions).forEach(key => {
                    const regex = new RegExp(key, 'g');
                    expr = expr.replace(regex, `mathFunctions.${key}`);
                });
                
                // Безопасное вычисление
                const fn = new Function('mathFunctions', `return ${expr}`);
                return fn(mathFunctions);
            }
            
            memoryClear() {
                this.memory = 0;
                this.memoryIndicator.style.display = 'none';
            }
            
            memoryRecall() {
                this.currentInput += this.memory;
                this.updateDisplay();
            }
            
            memoryAdd() {
                try {
                    const value = parseFloat(this.currentInput) || 0;
                    this.memory += value;
                    this.memoryIndicator.style.display = 'block';
                } catch (e) {
                    console.error('Memory add error');
                }
            }
            
            memorySubtract() {
                try {
                    const value = parseFloat(this.currentInput) || 0;
                    this.memory -= value;
                    this.memoryIndicator.style.display = 'block';
                } catch (e) {
                    console.error('Memory subtract error');
                }
            }
            
            toggleMode() {
                this.isRadian = !this.isRadian;
                this.modeBtn.textContent = this.isRadian ? 'Rad' : 'Deg';
            }
        }
        
        // Создаем экземпляр калькулятора
        const calc = new MediumCalculator();
        
        // Глобальные функции для вызова из HTML
        function addNumber(num) { calc.addNumber(num); }
        function addOperator(op) { calc.addOperator(op); }
        function addFunction(func) { calc.addFunction(func); }
        function clearAll() { calc.clearAll(); }
        function backspace() { calc.backspace(); }
        function calculate() { calc.calculate(); }
        function memoryClear() { calc.memoryClear(); }
        function memoryRecall() { calc.memoryRecall(); }
        function memoryAdd() { calc.memoryAdd(); }
        function memorySubtract() { calc.memorySubtract(); }
        function toggleMode() { calc.toggleMode(); }
        
        // Поддержка клавиатуры
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') addNumber(e.key);
            if (e.key === '.') addNumber('.');
            if (e.key === '+') addOperator('+');
            if (e.key === '-') addOperator('-');
            if (e.key === '*') addOperator('*');
            if (e.key === '/') addOperator('/');
            if (e.key === 'Enter' || e.key === '=') calculate();
            if (e.key === 'Escape') clearAll();
            if (e.key === 'Backspace') backspace();
        });
    </script>
</body>
</html>

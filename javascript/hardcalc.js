<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Продвинутый калькулятор</title>
    <style>
        :root {
            --bg-primary: #ffffff;
            --bg-secondary: #f0f2f5;
            --text-primary: #2c3e50;
            --text-secondary: #7f8c8d;
            --accent: #3498db;
            --accent-hover: #2980b9;
            --danger: #e74c3c;
            --success: #2ecc71;
            --warning: #f39c12;
            --border: #bdc3c7;
            --shadow: rgba(0, 0, 0, 0.1);
        }
        
        [data-theme="dark"] {
            --bg-primary: #1a1a1a;
            --bg-secondary: #2d2d2d;
            --text-primary: #ecf0f1;
            --text-secondary: #bdc3c7;
            --accent: #3498db;
            --accent-hover: #2980b9;
            --border: #4a4a4a;
            --shadow: rgba(0, 0, 0, 0.3);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            transition: background-color 0.3s, color 0.3s;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .container {
            max-width: 1400px;
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 20px;
        }
        
        .calculator {
            background: var(--bg-secondary);
            border-radius: 20px;
            padding: 25px;
            box-shadow: 0 10px 30px var(--shadow);
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .title {
            font-size: 1.5em;
            font-weight: bold;
            color: var(--accent);
        }
        
        .theme-toggle {
            background: none;
            border: none;
            color: var(--text-primary);
            font-size: 1.5em;
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 10px;
        }
        
        .theme-toggle:hover {
            background: var(--bg-primary);
        }
        
        .display-container {
            background: var(--bg-primary);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 20px;
            border: 2px solid var(--border);
        }
        
        .expression {
            font-size: 1.2em;
            color: var(--text-secondary);
            min-height: 30px;
            text-align: right;
            word-wrap: break-word;
        }
        
        .display {
            font-size: 2.5em;
            font-weight: bold;
            text-align: right;
            word-wrap: break-word;
            color: var(--accent);
        }
        
        .memory-bar {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        
        .memory-btn {
            background: var(--bg-primary);
            border: 1px solid var(--border);
            color: var(--text-primary);
            padding: 10px 15px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.9em;
        }
        
        .memory-btn:hover {
            background: var(--accent);
            color: white;
        }
        
        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .tab {
            padding: 10px 20px;
            background: var(--bg-primary);
            border: none;
            color: var(--text-primary);
            cursor: pointer;
            border-radius: 8px;
            font-size: 1em;
        }
        
        .tab.active {
            background: var(--accent);
            color: white;
        }
        
        .buttons {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 10px;
        }
        
        .btn {
            padding: 20px;
            border: none;
            border-radius: 10px;
            font-size: 1.1em;
            cursor: pointer;
            transition: all 0.2s;
            background: var(--bg-primary);
            color: var(--text-primary);
            border: 1px solid var(--border);
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px var(--shadow);
        }
        
        .btn.operator {
            background: var(--warning);
            color: white;
            border-color: var(--warning);
        }
        
        .btn.function {
            background: var(--accent);
            color: white;
            border-color: var(--accent);
        }
        
        .btn.equals {
            background: var(--success);
            color: white;
            border-color: var(--success);
            grid-column: span 2;
        }
        
        .btn.clear {
            background: var(--danger);
            color: white;
            border-color: var(--danger);
        }
        
        .sidebar {
            background: var(--bg-secondary);
            border-radius: 20px;
            padding: 25px;
            box-shadow: 0 10px 30px var(--shadow);
        }
        
        .sidebar-section {
            margin-bottom: 30px;
        }
        
        .sidebar-title {
            font-size: 1.2em;
            margin-bottom: 15px;
            color: var(--accent);
        }
        
        .history-list {
            max-height: 300px;
            overflow-y: auto;
        }
        
        .history-item {
            padding: 10px;
            border-bottom: 1px solid var(--border);
            cursor: pointer;
        }
        
        .history-item:hover {
            background: var(--bg-primary);
        }
        
        .history-expression {
            font-size: 0.9em;
            color: var(--text-secondary);
        }
        
        .history-result {
            font-size: 1.1em;
            font-weight: bold;
            color: var(--text-primary);
        }
        
        .constants-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
        
        .constant-btn {
            background: var(--bg-primary);
            border: 1px solid var(--border);
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
            text-align: center;
        }
        
        .constant-btn:hover {
            background: var(--accent);
            color: white;
        }
        
        .graph-container {
            margin-top: 20px;
            background: var(--bg-primary);
            border-radius: 15px;
            padding: 15px;
        }
        
        canvas {
            width: 100%;
            height: 200px;
            background: var(--bg-primary);
            border-radius: 10px;
        }
    </style>
</head>
<body data-theme="light">
    <div class="container">
        <!-- Основной калькулятор -->
        <div class="calculator">
            <div class="header">
                <span class="title">ПРОДВИНУТЫЙ КАЛЬКУЛЯТОР</span>
                <button class="theme-toggle" onclick="toggleTheme()">🌓</button>
            </div>
            
            <div class="display-container">
                <div class="expression" id="expression"></div>
                <div class="display" id="display">0</div>
            </div>
            
            <div class="memory-bar">
                <button class="memory-btn" onclick="memoryClear()">MC</button>
                <button class="memory-btn" onclick="memoryRecall()">MR</button>
                <button class="memory-btn" onclick="memoryAdd()">M+</button>
                <button class="memory-btn" onclick="memorySubtract()">M-</button>
                <button class="memory-btn" onclick="memoryStore()">MS</button>
                <span id="memoryIndicator" style="display: none;">M = 0</span>
            </div>
            
            <div class="tabs">
                <button class="tab active" onclick="switchTab('basic')">Основные</button>
                <button class="tab" onclick="switchTab('trig')">Тригонометрия</button>
                <button class="tab" onclick="switchTab('advanced')">Продвинутые</button>
                <button class="tab" onclick="switchTab('graph')">Графики</button>
            </div>
            
            <div id="basic-panel" class="buttons">
                <!-- Основные операции -->
                <button class="btn clear" onclick="clearAll()">C</button>
                <button class="btn clear" onclick="clearEntry()">CE</button>
                <button class="btn clear" onclick="backspace()">⌫</button>
                <button class="btn operator" onclick="addOperator('/')">÷</button>
                <button class="btn operator" onclick="addOperator('*')">×</button>
                <button class="btn operator" onclick="addOperator('-')">−</button>
                
                <button class="btn" onclick="addNumber('7')">7</button>
                <button class="btn" onclick="addNumber('8')">8</button>
                <button class="btn" onclick="addNumber('9')">9</button>
                <button class="btn function" onclick="addFunction('√')">√</button>
                <button class="btn function" onclick="addFunction('%')">%</button>
                <button class="btn operator" onclick="addOperator('+')">+</button>
                
                <button class="btn" onclick="addNumber('4')">4</button>
                <button class="btn" onclick="addNumber('5')">5</button>
                <button class="btn" onclick="addNumber('6')">6</button>
                <button class="btn function" onclick="addFunction('^')">xʸ</button>
                <button class="btn function" onclick="addFunction('!')">n!</button>
                <button class="btn function" onclick="addFunction('1/')">1/x</button>
                
                <button class="btn" onclick="addNumber('1')">1</button>
                <button class="btn" onclick="addNumber('2')">2</button>
                <button class="btn" onclick="addNumber('3')">3</button>
                <button class="btn function" onclick="addFunction('(')">(</button>
                <button class="btn function" onclick="addFunction(')')">)</button>
                <button class="btn equals" onclick="calculate()'>=</button>
                
                <button class="btn" onclick="addNumber('0')">0</button>
                <button class="btn" onclick="addNumber('00')">00</button>
                <button class="btn" onclick="addNumber('.')">.</button>
                <button class="btn function" onclick="toggleSign()">±</button>
                <button class="btn function" onclick="addFunction('abs')">|x|</button>
            </div>
            
            <div id="trig-panel" class="buttons" style="display: none;">
                <button class="btn function" onclick="addFunction('sin')">sin</button>
                <button class="btn function" onclick="addFunction('cos')">cos</button>
                <button class="btn function" onclick="addFunction('tan')">tan</button>
                <button class="btn function" onclick="addFunction('asin')">asin</button>
                <button class="btn function" onclick="addFunction('acos')">acos</button>
                <button class="btn function" onclick="addFunction('atan')">atan</button>
                
                <button class="btn function" onclick="addFunction('sinh')">sinh</button>
                <button class="btn function" onclick="addFunction('cosh')">cosh</button>
                <button class="btn function" onclick="addFunction('tanh')">tanh</button>
                <button class="btn function" onclick="addFunction('asinh')">asinh</button>
                <button class="btn function" onclick="addFunction('acosh')">acosh</button>
                <button class="btn function" onclick="addFunction('atanh')">atanh</button>
                
                <button class="btn function" onclick="addFunction('sec')">sec</button>
                <button class="btn function" onclick="addFunction('csc')">csc</button>
                <button class="btn function" onclick="addFunction('cot')">cot</button>
                <button class="btn" onclick="toggleAngleMode()" id="angleMode">Rad</button>
            </div>
            
            <div id="advanced-panel" class="buttons" style="display: none;">
                <button class="btn function" onclick="addFunction('log')">log</button>
                <button class="btn function" onclick="addFunction('ln')">ln</button>
                <button class="btn function" onclick="addFunction('log2')">log₂</button>
                <button class="btn function" onclick="addFunction('exp')">eˣ</button>
                <button class="btn function" onclick="addFunction('10^')">10ˣ</button>
                <button class="btn function" onclick="addFunction('2^')">2ˣ</button>
                
                <button class="btn function" onclick="addFunction('floor')">⌊x⌋</button>
                <button class="btn function" onclick="addFunction('ceil')">⌈x⌉</button>
                <button class="btn function" onclick="addFunction('round')">round</button>
                <button class="btn function" onclick="addFunction('random')">rand</button>
                <button class="btn function" onclick="addFunction('gcd')">GCD</button>
                <button class="btn function" onclick="addFunction('lcm')">LCM</button>
            </div>
            
            <div id="graph-panel" style="display: none;">
                <div class="graph-container">
                    <canvas id="graphCanvas"></canvas>
                    <div style="margin-top: 10px;">
                        <input type="text" id="functionInput" placeholder="f(x) = " style="width: 70%; padding: 10px;">
                        <button class="btn" onclick="plotGraph()">Построить</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Боковая панель -->
        <div class="sidebar">
            <div class="sidebar-section">
                <div class="sidebar-title">История</div>
                <div class="history-list" id="historyList"></div>
                <button class="memory-btn" style="width: 100%; margin-top: 10px;" onclick="clearHistory()">Очистить историю</button>
            </div>
            
            <div class="sidebar-section">
                <div class="sidebar-title">Константы</div>
                <div class="constants-grid">
                    <div class="constant-btn" onclick="addConstant('π')">π = 3.14159</div>
                    <div class="constant-btn" onclick="addConstant('e')">e = 2.71828</div>
                    <div class="constant-btn" onclick="addConstant('φ')">φ = 1.61803</div>
                    <div class="constant-btn" onclick="addConstant('√2')">√2 = 1.41421</div>
                    <div class="constant-btn" onclick="addConstant('√3')">√3 = 1.73205</div>
                    <div class="constant-btn" onclick="addConstant('c')">c = 299792458</div>
                </div>
            </div>
            
            <div class="sidebar-section">
                <div class="sidebar-title">Конвертер валют</div>
                <select id="currencyFrom" style="width: 100%; padding: 10px; margin-bottom: 10px;">
                    <option value="USD">USD - Доллар</option>
                    <option value="EUR">EUR - Евро</option>
                    <option value="RUB">RUB - Рубль</option>
                </select>
                <select id="currencyTo" style="width: 100%; padding: 10px; margin-bottom: 10px;">
                    <option value="EUR">EUR - Евро</option>
                    <option value="USD">USD - Доллар</option>
                    <option value="RUB">RUB - Рубль</option>
                </select>
                <button class="memory-btn" style="width: 100%;" onclick="convertCurrency()">Конвертировать</button>
            </div>
        </div>
    </div>

    <script>
        // Продвинутый калькулятор
        class AdvancedCalculator {
            constructor() {
                this.currentInput = '';
                this.expression = '';
                this.history = [];
                this.memory = 0;
                this.angleMode = 'rad';
                this.theme = 'light';
                this.constants = {
                    'π': Math.PI,
                    'e': Math.E,
                    'φ': 1.618033988749895,
                    '√2': Math.SQRT2,
                    '√3': 1.7320508075688772,
                    'c': 299792458
                };
                
                this.initElements();
                this.updateDisplay();
                this.loadHistory();
            }
            
            initElements() {
                this.displayEl = document.getElementById('display');
                this.expressionEl = document.getElementById('expression');
                this.historyList = document.getElementById('historyList');
                this.memoryIndicator = document.getElementById('memoryIndicator');
            }
            
            updateDisplay() {
                this.displayEl.textContent = this.currentInput || '0';
                this.expressionEl.textContent = this.expression;
            }
            
            addNumber(num) {
                this.currentInput += num;
                this.expression += num;
                this.updateDisplay();
            }
            
            addOperator(op) {
                const operators = '+-*/^%';
                const lastChar = this.expression.slice(-1);
                
                if (operators.includes(lastChar)) {
                    this.expression = this.expression.slice(0, -1) + this.getOperatorSymbol(op);
                } else {
                    this.expression += this.getOperatorSymbol(op);
                }
                
                this.currentInput = '';
                this.updateDisplay();
            }
            
            getOperatorSymbol(op) {
                const symbols = {
                    '/': '÷',
                    '*': '×',
                    '-': '−',
                    '+': '+',
                    '^': '^',
                    '%': '%'
                };
                return symbols[op] || op;
            }
            
            addFunction(func) {
                const functions = {
                    '√': 'sqrt(',
                    '^': '^(',
                    '!': '!',
                    '1/': '1/',
                    'sin': 'sin(',
                    'cos': 'cos(',
                    'tan': 'tan(',
                    'asin': 'asin(',
                    'acos': 'acos(',
                    'atan': 'atan(',
                    'sinh': 'sinh(',
                    'cosh': 'cosh(',
                    'tanh': 'tanh(',
                    'log': 'log(',
                    'ln': 'ln(',
                    'exp': 'exp(',
                    'abs': 'abs(',
                    'floor': 'floor(',
                    'ceil': 'ceil(',
                    'round': 'round('
                };
                
                this.expression += functions[func] || func;
                this.currentInput = '';
                this.updateDisplay();
            }
            
            addConstant(constant) {
                this.currentInput += this.constants[constant];
                this.expression += constant;
                this.updateDisplay();
            }
            
            clearAll() {
                this.currentInput = '';
                this.expression = '';
                this.updateDisplay();
            }
            
            clearEntry() {
                this.currentInput = '';
                this.updateDisplay();
            }
            
            backspace() {
                this.currentInput = this.currentInput.slice(0,

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.Stack;

public class AdvancedCalculator extends JFrame implements ActionListener {
    private JTextField display;
    private JTextArea historyArea;
    private String currentInput = "";
    private String lastResult = "";
    private boolean isRadians = true;
    
    public AdvancedCalculator() {
        setTitle("ПРОДВИНУТЫЙ КАЛЬКУЛЯТОР");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(500, 600);
        setLayout(new BorderLayout());
        
        // Дисплей
        display = new JTextField();
        display.setFont(new Font("Arial", Font.BOLD, 24));
        display.setHorizontalAlignment(JTextField.RIGHT);
        display.setEditable(false);
        display.setBackground(Color.BLACK);
        display.setForeground(Color.GREEN);
        add(display, BorderLayout.NORTH);
        
        // История
        historyArea = new JTextArea();
        historyArea.setFont(new Font("Arial", Font.PLAIN, 14));
        historyArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(historyArea);
        scrollPane.setPreferredSize(new Dimension(500, 150));
        add(scrollPane, BorderLayout.SOUTH);
        
        // Панель кнопок
        JPanel buttonPanel = new JPanel();
        buttonPanel.setLayout(new GridLayout(7, 5, 5, 5));
        
        String[] buttons = {
            "7", "8", "9", "/", "C",
            "4", "5", "6", "*", "←",
            "1", "2", "3", "-", "=",
            "0", ".", "^", "+", "√",
            "sin", "cos", "tan", "(", ")",
            "log", "ln", "!", "Rad/Deg", "HEX",
            "BIN", "π", "e", "mod", "DEL"
        };
        
        for (String text : buttons) {
            JButton button = new JButton(text);
            button.setFont(new Font("Arial", Font.BOLD, 14));
            button.addActionListener(this);
            
            if (text.matches("[0-9.]")) {
                button.setBackground(Color.LIGHT_GRAY);
            } else if (text.equals("=")) {
                button.setBackground(Color.ORANGE);
            } else if (text.equals("C") || text.equals("←") || text.equals("DEL")) {
                button.setBackground(Color.RED);
                button.setForeground(Color.WHITE);
            } else {
                button.setBackground(Color.CYAN);
            }
            
            buttonPanel.add(button);
        }
        
        add(buttonPanel, BorderLayout.CENTER);
        setVisible(true);
    }
    
    @Override
    public void actionPerformed(ActionEvent e) {
        String command = e.getActionCommand();
        
        switch (command) {
            case "C":
                currentInput = "";
                display.setText("");
                break;
                
            case "←":
                if (!currentInput.isEmpty()) {
                    currentInput = currentInput.substring(0, currentInput.length() - 1);
                    display.setText(currentInput);
                }
                break;
                
            case "DEL":
                currentInput = "";
                display.setText("");
                historyArea.setText("");
                break;
                
            case "=":
                try {
                    double result = evaluateExpression(currentInput);
                    String resultStr = String.valueOf(result);
                    display.setText(currentInput + " = " + resultStr);
                    historyArea.append(currentInput + " = " + resultStr + "\n");
                    lastResult = resultStr;
                    currentInput = resultStr;
                } catch (Exception ex) {
                    display.setText("Ошибка: " + ex.getMessage());
                }
                break;
                
            case "√":
                currentInput += "sqrt(";
                display.setText(currentInput);
                break;
                
            case "sin":
            case "cos":
            case "tan":
            case "log":
            case "ln":
                currentInput += command + "(";
                display.setText(currentInput);
                break;
                
            case "π":
                currentInput += Math.PI;
                display.setText(currentInput);
                break;
                
            case "e":
                currentInput += Math.E;
                display.setText(currentInput);
                break;
                
            case "!":
                currentInput += "!";
                display.setText(currentInput);
                break;
                
            case "mod":
                currentInput += "%";
                display.setText(currentInput);
                break;
                
            case "Rad/Deg":
                isRadians = !isRadians;
                JOptionPane.showMessageDialog(this, 
                    "Режим: " + (isRadians ? "Радианы" : "Градусы"));
                break;
                
            case "HEX":
                try {
                    double num = Double.parseDouble(currentInput);
                    display.setText(currentInput + " (HEX: " + Integer.toHexString((int)num) + ")");
                } catch (Exception ex) {
                    display.setText("Ошибка преобразования");
                }
                break;
                
            case "BIN":
                try {
                    double num = Double.parseDouble(currentInput);
                    display.setText(currentInput + " (BIN: " + Integer.toBinaryString((int)num) + ")");
                } catch (Exception ex) {
                    display.setText("Ошибка преобразования");
                }
                break;
                
            default:
                currentInput += command;
                display.setText(currentInput);
                break;
        }
    }
    
    private double evaluateExpression(String expression) {
        return new Object() {
            int pos = -1, ch;
            
            void nextChar() {
                ch = (++pos < expression.length()) ? expression.charAt(pos) : -1;
            }
            
            boolean eat(int charToEat) {
                while (ch == ' ') nextChar();
                if (ch == charToEat) {
                    nextChar();
                    return true;
                }
                return false;
            }
            
            double parse() {
                nextChar();
                double x = parseExpression();
                if (pos < expression.length()) throw new RuntimeException("Неожиданный символ: " + (char)ch);
                return x;
            }
            
            double parseExpression() {
                double x = parseTerm();
                for (;;) {
                    if (eat('+')) x += parseTerm();
                    else if (eat('-')) x -= parseTerm();
                    else return x;
                }
            }
            
            double parseTerm() {
                double x = parseFactor();
                for (;;) {
                    if (eat('*')) x *= parseFactor();
                    else if (eat('/')) {
                        double divisor = parseFactor();
                        if (divisor == 0) throw new ArithmeticException("Деление на ноль!");
                        x /= divisor;
                    }
                    else if (eat('%')) x %= parseFactor();
                    else return x;
                }
            }
            
            double parseFactor() {
                if (eat('+')) return parseFactor();
                if (eat('-')) return -parseFactor();
                
                double x;
                int startPos = this.pos;
                
                if (eat('(')) {
                    x = parseExpression();
                    eat(')');
                } else if (eat('s')) {
                    if (eat('i') && eat('n')) {
                        x = parseFactor();
                        if (!isRadians) x = Math.toRadians(x);
                        x = Math.sin(x);
                    } else throw new RuntimeException("Неизвестная функция");
                } else if (eat('c')) {
                    if (eat('o') && eat('s')) {
                        x = parseFactor();
                        if (!isRadians) x = Math.toRadians(x);
                        x = Math.cos(x);
                    } else throw new RuntimeException("Неизвестная функция");
                } else if (eat('t')) {
                    if (eat('a') && eat('n')) {
                        x = parseFactor();
                        if (!isRadians) x = Math.toRadians(x);
                        x = Math.tan(x);
                    } else throw new RuntimeException("Неизвестная функция");
                } else if (eat('s') && eat('q') && eat('r') && eat('t')) {
                    eat('(');
                    x = parseExpression();
                    eat(')');
                    if (x < 0) throw new ArithmeticException("Корень из отрицательного числа");
                    x = Math.sqrt(x);
                } else if (eat('l')) {
                    if (eat('o') && eat('g')) {
                        eat('(');
                        x = parseExpression();
                        eat(')');
                        if (x <= 0) throw new ArithmeticException("Логарифм неположительного числа");
                        x = Math.log10(x);
                    } else if (eat('n')) {
                        eat('(');
                        x = parseExpression();
                        eat(')');
                        if (x <= 0) throw new ArithmeticException("Логарифм неположительного числа");
                        x = Math.log(x);
                    } else throw new RuntimeException("Неизвестная функция");
                } else {
                    if ((ch >= '0' && ch <= '9') || ch == '.') {
                        while ((ch >= '0' && ch <= '9') || ch == '.') nextChar();
                        x = Double.parseDouble(expression.substring(startPos, this.pos));
                    } else if (ch >= 'a' && ch <= 'z') {
                        while (ch >= 'a' && ch <= 'z') nextChar();
                        String func = expression.substring(startPos, this.pos);
                        x = parseFactor();
                        if (func.equals("√")) x = Math.sqrt(x);
                        else throw new RuntimeException("Неизвестная функция: " + func);
                    } else {
                        throw new RuntimeException("Неожиданный символ: " + (char)ch);
                    }
                }
                
                if (eat('^')) x = Math.pow(x, parseFactor());
                
                if (eat('!')) {
                    if (x < 0) throw new ArithmeticException("Факториал отрицательного числа");
                    if (x != (int)x) throw new ArithmeticException("Факториал нецелого числа");
                    int n = (int)x;
                    double fact = 1;
                    for (int i = 2; i <= n; i++) fact *= i;
                    x = fact;
                }
                
                return x;
            }
        }.parse();
    }
    
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            try {
                UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
            } catch (Exception e) {
                e.printStackTrace();
            }
            new AdvancedCalculator();
        });
    }
}

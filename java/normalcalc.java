import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Scanner;

public class MediumCalculator {
    private static List<String> history = new ArrayList<>();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        boolean running = true;
        
        System.out.println("=== КАЛЬКУЛЯТОР (СРЕДНИЙ УРОВЕНЬ) ===");
        System.out.println("Доступные операции: +, -, *, /, ^ (степень), % (остаток)");
        
        while (running) {
            try {
                System.out.print("\nВведите выражение (или 'exit' для выхода, 'history' для истории): ");
                String input = scanner.nextLine().trim();
                
                if (input.equalsIgnoreCase("exit")) {
                    running = false;
                    continue;
                }
                
                if (input.equalsIgnoreCase("history")) {
                    showHistory();
                    continue;
                }
                
                double result = evaluateExpression(input);
                System.out.println("Результат: " + result);
                history.add(input + " = " + result);
                
            } catch (Exception e) {
                System.out.println("Ошибка: " + e.getMessage());
            }
        }
        
        System.out.println("Программа завершена.");
        scanner.close();
    }
    
    private static double evaluateExpression(String expression) {
        String[] parts = expression.split(" ");
        if (parts.length != 3) {
            throw new IllegalArgumentException("Неверный формат. Используйте: число оператор число");
        }
        
        double num1 = Double.parseDouble(parts[0]);
        String operator = parts[1];
        double num2 = Double.parseDouble(parts[2]);
        
        switch (operator) {
            case "+": return num1 + num2;
            case "-": return num1 - num2;
            case "*": return num1 * num2;
            case "/":
                if (num2 == 0) throw new ArithmeticException("Деление на ноль!");
                return num1 / num2;
            case "^": return Math.pow(num1, num2);
            case "%": return num1 % num2;
            default: throw new IllegalArgumentException("Неизвестный оператор: " + operator);
        }
    }
    
    private static void showHistory() {
        if (history.isEmpty()) {
            System.out.println("История пуста.");
        } else {
            System.out.println("\n--- ИСТОРИЯ ОПЕРАЦИЙ ---");
            for (int i = 0; i < history.size(); i++) {
                System.out.println((i + 1) + ". " + history.get(i));
            }
        }
    }
}

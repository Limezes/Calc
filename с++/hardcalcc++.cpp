// advanced_calculator.h
#ifndef ADVANCED_CALCULATOR_H
#define ADVANCED_CALCULATOR_H

#include <QMainWindow>
#include <QStack>
#include <QMap>
#include <QVector>
#include <QStringList>
#include <QDebug>

QT_BEGIN_NAMESPACE
class QLineEdit;
class QPushButton;
class QTextEdit;
class QComboBox;
class QCheckBox;
class QLabel;
class QTabWidget;
class QGroupBox;
class QGridLayout;
QT_END_NAMESPACE

class AdvancedCalculator : public QMainWindow {
    Q_OBJECT

private:
    // UI элементы
    QLineEdit *display;
    QLineEdit *expressionDisplay;
    QTextEdit *historyDisplay;
    QTabWidget *tabWidget;
    QLabel *memoryLabel;
    QLabel *angleModeLabel;
    
    // Переменные состояния
    QString currentInput;
    QString currentExpression;
    QStringList history;
    double memory;
    bool isRadian;
    QMap<QString, double> constants;
    
    // Кнопки
    QMap<QString, QPushButton*> buttons;
    
    // Для построения графиков
    QVector<double> graphX, graphY;
    
    void setupUI();
    void createBasicTab(QWidget *parent);
    void createTrigTab(QWidget *parent);
    void createAdvancedTab(QWidget *parent);
    void createGraphTab(QWidget *parent);
    void createMemoryTab(QWidget *parent);
    void createConstantsTab(QWidget *parent);
    
    QPushButton* createButton(const QString& text, const char* member, 
                              const QString& style = "");
    
    // Математические функции
    double evaluateExpression(const QString& expr);
    double parseExpression(const QString& expr, int& pos);
    double parseTerm(const QString& expr, int& pos);
    double parseFactor(const QString& expr, int& pos);
    double parseFunction(const QString& expr, int& pos);
    double parseNumber(const QString& expr, int& pos);
    
    bool isOperator(QChar c);
    bool isFunction(const QString& name);
    int precedence(const QString& op);
    
    QString infixToPostfix(const QString& infix);
    double evaluatePostfix(const QStringList& postfix);
    
    void skipWhitespace(const QString& expr, int& pos);
    
public:
    AdvancedCalculator(QWidget *parent = nullptr);
    ~AdvancedCalculator();
    
private slots:
    void buttonClicked();
    void calculate();
    void clearAll();
    void clearEntry();
    void backspace();
    void toggleSign();
    
    // Тригонометрия
    void sinClicked();
    void cosClicked();
    void tanClicked();
    void asinClicked();
    void acosClicked();
    void atanClicked();
    void toggleAngleMode();
    
    // Логарифмы и степени
    void logClicked();
    void lnClicked();
    void sqrtClicked();
    void powClicked();
    void expClicked();
    void factorialClicked();
    
    // Память
    void memoryClear();
    void memoryRecall();
    void memoryStore();
    void memoryAdd();
    void memorySubtract();
    
    // Константы
    void piClicked();
    void eClicked();
    void phiClicked();
    
    // История
    void clearHistory();
    void historyItemClicked(const QString& item);
    
    // Графики
    void plotGraph();
    void zoomIn();
    void zoomOut();
    
    // Конвертация
    void convertCurrency();
    void convertUnits();
    
    // Дополнительно
    void randomNumber();
    void percentage();
    void reciprocal();
    void square();
    void cube();
    void root();
    
signals:
    void calculationDone(const QString& result);
};

#endif // ADVANCED_CALCULATOR_H

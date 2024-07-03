document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display');
    let currentInput = '0';
    let operator = '';
    let operand1 = null;
    let operand2 = null;

    function updateDisplay(value) {
        display.value = value.toString();
    }

    function handleNumberClick(number) {
        if (currentInput === '0' && number !== '.') {
            currentInput = number.toString();
        } else if (currentInput.includes('.') && number === '.') {
            return;
        } else {
            currentInput += number.toString();
        }
        updateDisplay(currentInput);
    }

    function handleOperatorClick(op) {
        if (operand1 === null) {
            operand1 = parseFloat(currentInput);
            updateDisplay(operand1.toString() + ' ' + op); // Display operand1 and operator
        } else if (operand2 === null) {
            operand2 = parseFloat(currentInput);
            updateDisplay(operand1.toString() + ' ' + operator + ' ' + operand2.toString() + ' ' + op); // Display operand1, operator, operand2, and new operator
            compute();
            operand1 = parseFloat(display.value); // Update operand1 after computation
            operand2 = null;
        }
        currentInput = '0';
        operator = op;
    }

    function compute() {
        if (operand1 !== null && operand2 !== null) {
            let result = null;
            switch (operator) {
                case '+':
                    result = operand1 + operand2;
                    break;
                case '-':
                    result = operand1 - operand2;
                    break;
                case '*':
                    result = operand1 * operand2;
                    break;
                case '/':
                    if (operand2 === 0) {
                        alert("Error: Division by zero");
                        handleClearClick();
                        return;
                    }
                    result = operand1 / operand2;
                    break;
                default:
                    return;
            }
            updateDisplay(operand1.toString() + ' ' + operator + ' ' + operand2.toString() + ' = ' + result); // Display operand1 + operator + operand2 = result
            operand1 = result; // Update operand1 to result for chaining operations
        }
    }

    function handleEqualsClick() {
        operand2 = parseFloat(currentInput);
        compute();
        operator = '';
        currentInput = '0';
    }

    function handleClearClick() {
        currentInput = '0';
        operator = '';
        operand1 = null;
        operand2 = null;
        updateDisplay(currentInput);
    }

    function handleBackspaceClick() {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        updateDisplay(currentInput);
    }

    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', () => {
            handleNumberClick(button.textContent);
        });
    });

    document.querySelectorAll('.button1').forEach(button => {
        button.addEventListener('click', () => {
            let icon = button.querySelector('i').classList[1];
            switch (icon) {
                case 'fa-percent':
                    currentInput = parseFloat(currentInput) / 100;
                    updateDisplay(currentInput);
                    break;
                case 'fa-backspace':
                    handleBackspaceClick();
                    break;
                case 'fa-divide':
                    handleOperatorClick('/');
                    break;
                case 'fa-times':
                    handleOperatorClick('*');
                    break;
                case 'fa-minus':
                    handleOperatorClick('-');
                    break;
                case 'fa-plus':
                    handleOperatorClick('+');
                    break;
                case 'fa-equals':
                    handleEqualsClick();
                    break;
                case 'fa-clear':
                    handleClearClick();
                    break;
                default:
                    break;
            }
        });
    });

    document.querySelector('.button1:nth-child(1)').addEventListener('click', handleClearClick);
    document.querySelector('.button1:nth-child(2)').addEventListener('click', handleBackspaceClick);
});

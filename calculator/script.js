class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        // Prevent multiple zeros at start
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;

        if (this.operation === '+') {
            computation = prev + current;
        } else if (this.operation === '-') {
            computation = prev - current;
        } else if (this.operation === '*') {
            computation = prev * current;
        } else if (this.operation === '/') { // Using / internally, mapped from ÷
            if (current === 0) {
                alert("Cannot divide by zero");
                return;
            }
            computation = prev / current;
        } else {
            return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            // Display the operation symbol
            let opSymbol = this.operation;
            if (opSymbol === '/') opSymbol = '÷';
            if (opSymbol === '*') opSymbol = '×';
            
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${opSymbol}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// Select elements
const numberButtons = document.querySelectorAll('[data-key]');
const actionButtons = document.querySelectorAll('[data-action]');
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Event Listeners - satisfying the "loops" and "event listeners" requirement
// Creating a unified list of all buttons to demonstrate loops over elements if needed, 
// but here we loop over specific groups for clarity.

// Loop for numbers and operators (data-key)
for (let i = 0; i < numberButtons.length; i++) {
    const button = numberButtons[i];
    button.addEventListener('click', () => {
        const key = button.getAttribute('data-key');
        
        // If-else to check if it's an operator or number
        if (key === '+' || key === '-' || key === '*' || key === '/') {
            calculator.chooseOperation(key);
        } else {
            calculator.appendNumber(key);
        }
        calculator.updateDisplay();
    });
}

// Loop for actions (clear, delete, calculate)
for (const button of actionButtons) {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        
        if (action === 'clear') {
            calculator.clear();
        } else if (action === 'delete') {
            calculator.delete();
        } else if (action === 'calculate') {
            calculator.compute();
        }
        calculator.updateDisplay();
    });
}

// Keyboard support via event listener
document.addEventListener('keydown', (e) => {
    let key = e.key;
    
    // Map keyboard keys to calculator keys
    if (key === 'Enter') key = '=';
    if (key === 'Escape') key = 'AC';
    if (key === 'Backspace') key = 'DEL';
    
    // Handle numbers and operators
    if ((key >= '0' && key <= '9') || key === '.') {
        calculator.appendNumber(key);
    } else if (key === '+' || key === '-') {
        calculator.chooseOperation(key);
    } else if (key === '*' || key === 'x') {
        calculator.chooseOperation('*');
    } else if (key === '/') {
        calculator.chooseOperation('/');
    } else if (key === '=') {
        calculator.compute();
    } else if (key === 'AC') {
        calculator.clear();
    } else if (key === 'DEL') {
        calculator.delete();
    }
    
    calculator.updateDisplay();
});

//the actual operating functions themselves
function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a ,b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    if(b==0) {alert("You cannot divide by 0 !!!"); return;}
    return Number(a) / Number(b);
}

function operate(a,b,operator) {

    switch(operator) {
        case '+':
            return add(a,b);
            break;
        case '-':
            return subtract(a,b);
            break;
        case '×':
            return multiply(a,b);
            break;
        case '÷':
 
            return divide(a,b);
            break;
        default:
            return;
    }
}



//logic below
const buttons = document.querySelectorAll('.btn');
const screen = document.querySelector('.screen');
let displayValue = '';
let firstOperand;
let operator;
let inputSecondNum = false;
let ok = false; //append numbers to result functionality
let decimal = false;
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        console.log(ok)
        const { textContent } = button;
        if (!isNaN(textContent) || textContent === '.') {
            if (textContent === '.' && decimal) {
                return;
            }
            if (textContent === '.') {
                decimal = true;
            }

            if (inputSecondNum && !ok) {
                screen.textContent = '';
                inputSecondNum = false;
            }
            screen.textContent += textContent;
            displayValue = screen.textContent;
        } else if (textContent === 'CLEAR') {
            decimal = false;
            screen.textContent = '';
            displayValue = '';
            firstOperand = null;
            operator = null;
        } else if (textContent === 'DELETE') {
            decimal = screen.textContent.includes('.');
            screen.textContent = screen.textContent.slice(0, -1);
            displayValue = screen.textContent;
        } else if (button.classList.contains('operator')) {
            if (operator && !inputSecondNum) {
                const result = operate(firstOperand, displayValue, operator);
                screen.textContent = String(result);
                displayValue = String(result);
                firstOperand = result;
                decimal = false;
            } else {
                firstOperand = displayValue;
            }
            operator = textContent;
            inputSecondNum = true;
        } else if (textContent === '=') {
            if (operator) {
                const result = operate(firstOperand, displayValue, operator);
                screen.textContent = String(result);
                displayValue = String(result);
                firstOperand = result;
                operator = null;
                inputSecondNum = true;
                decimal = false;
            }
        }
    });
});
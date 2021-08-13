function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(op, a, b) {
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "ERROR";
  }
}

function setDisplay(str) {
  display.textContent = str;
}

function keyPressed(e) {
  const keyCode = e.keyCode;
  const button = document.querySelector(`.kbd[data-keycode~="${keyCode}"]`);
  if (button) {
    button.click();
    e.preventDefault();
  }
}

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", buttonPressed);
  document.addEventListener('keydown', keyPressed);
});

let activeButton;

let displayValue = "0";
let firstValue = "0";
let currentOperator = "";
let secondValue = "";

function clearData() {
  firstValue = "0";
  currentOperator = "";
  secondValue = "";
  disableActiveButton();
}

function disableActiveButton() {
  currentOperator = '';
  if (activeButton) {
    activeButton.classList.remove('active');
    delete activeButton;
  }
}

function buttonPressed(e) {
  let op = e.target.dataset.op;
  let opNum = Number.parseFloat(op);
  if (currentOperator === "") {
    if (!isNaN(opNum)) {
      if (firstValue == '0') firstValue = op;
      else firstValue += op;
      setDisplay(firstValue);
    } else {
      switch (op) {
        case "+":
        case "-":
        case "*":
        case "/":
          currentOperator = op;
          activeButton = e.target;
          activeButton.classList.add('active');
          break;
        case ".":
          if (!firstValue.includes('.')) {
            firstValue += '.';
            setDisplay(firstValue);
          }
          break;
        case "c":
          clearData();
          setDisplay("0");
          break;
        case 'd':
          if (firstValue.length > 1) {
            firstValue = firstValue.slice(0, -1);
          } else {
            firstValue = '0';
          }
          setDisplay(firstValue);
          break;
      }
    }
  } else {
    if (!isNaN(opNum)) {
      if (secondValue == '0') secondValue = op;
      else secondValue += op;
      setDisplay(secondValue);
    } else if (op == 'd') {
      if (secondValue == '') {
        disableActiveButton()
        setDisplay(firstValue);
      } else {
        if (secondValue.length > 1) {
          secondValue = secondValue.slice(0, -1);
          setDisplay(secondValue);
        } else {
          secondValue = '';
          setDisplay('0');
        }
      }
    } else if (op == '.') {
      if (!secondValue.includes('.')) {
        secondValue += '.';
        setDisplay(secondValue);
      }
    } else if (op == "c") {
      clearData();
      setDisplay('0')
    } else if (op == "=") {
      if (currentOperator == '/' && (secondValue == '0' || secondValue == '')) {
        clearData();
        setDisplay('LMAO');
      } else {
        if (!secondValue) {
          secondValue = '0';
        }
        secondValue = +secondValue;
        result = operate(currentOperator, Number.parseFloat(firstValue), Number.parseFloat(secondValue));
        clearData();
        firstValue = +result.toFixed(13);
        setDisplay(firstValue);
      }
    } else {
      currentOperator = op;
    }
  }
}

clearData();
setDisplay(0);
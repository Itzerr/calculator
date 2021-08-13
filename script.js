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
      break;
    case "-":
      return subtract(a, b);
      break;
    case "*":
      return multiply(a, b);
      break;
    case "/":
      return divide(a, b);
      break;

    default:
      return "ERROR";
      break;
  }
}

function setDisplay(str) {
  display.textContent = str;
}

let displayValue = "0";
let firstValue = "0";
let currentOperator = "";
let secondValue = "";

function clearData() {
  firstValue = "0";
  currentOperator = "";
  secondValue = "";
}

function buttonPressed(e) {
  let op = e.target.dataset.op;
  let opNum = Number.parseInt(op);
  if (currentOperator === "") {
    if (!isNaN(opNum)) {
      if (firstValue == 0) firstValue = op;
      else firstValue += op;
      setDisplay(firstValue);
    } else {
      switch (op) {
        case "+":
        case "-":
        case "*":
        case "/":
          currentOperator = op;
          console.log(currentOperator);
          break;
        case "c":
          clearData();
          setDisplay("0");
          break;
      }
    }
  } else {
    if (!isNaN(opNum)) {
      if (secondValue == 0) secondValue = op;
      else secondValue += op;
      setDisplay(secondValue);
    } else if (op == "c") {
      clearData();
      setDisplay('0')
    } else if (op == "=") {
      if (currentOperator == '/' && secondValue == '0') {
        clearData();
        setDisplay('LMAO');
      } else {
        result = Math.round(operate(currentOperator, Number.parseInt(firstValue),
              Number.parseInt(secondValue)));
        clearData();
        firstValue = result;
        setDisplay(firstValue);
      }
    } else {
      currentOperator = op;
    }
  }
}

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", buttonPressed);
});

clearData();
setDisplay(0);
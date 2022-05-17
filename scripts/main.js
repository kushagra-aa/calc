import "./../styles/style.css";

// ELEMENTS
// app elm
const appElm = document.getElementById("app");
// settings
const settingsCon = document.getElementById("settings");
const settingsBtn = document.getElementById("setting-icon");
const colorBtns = document.querySelectorAll(".setting-color");

// pad buttons
const padOperations = document.querySelectorAll(".pad-operation");
const padFunctions = document.querySelectorAll(".pad-function");
const padNums = document.querySelectorAll(".num");
const modeBtn = document.getElementById("mode");
const clearButton = document.getElementById("clear");
const backButton = document.getElementById("backspace");

// screen Elements
const quesElm = document.getElementById("ques");
const ansElm = document.getElementById("ans");

// COLOR VALUES
const greenLight = "#58FA5E";
const greenDark = "#244C25";
const redLight = "#FF445A";
const redDark = "#5D2B31";
const blueLight = "#5885FA";
const blueDark = "#242F4C";
const yellowLight = "#FACD58";
const yellowDark = "#4C4124";
const pinkLight = "#FA58B6";
const pinkDark = "#4C243B";
const orangeLight = "#FA6E58";
const orangeDark = "#4C2924";

// CLASSES
// Caclculator
class Calculator {
  constructor(quesElm, ansElm) {
    this.quesElm = quesElm;
    this.ansElm = ansElm;
    this.clear();
  }

  clear() {
    this.currentOperand = "0";
    this.previousOperand = "0";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computated;
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computated = previous + current;
        break;
      case "-":
        computated = previous - current;
        break;
      case "*":
        computated = previous * current;
        break;
      case "÷":
        computated = previous / current;
        break;
      default:
        return;
    }
    this.currentOperand = computated;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.ansElm.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.quesElm.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.quesElm.innerText = "";
    }
  }
}
// CLASS INITIALIZATION
const calculator = new Calculator(quesElm, ansElm);

// FUNCTIONS
const setup = () => {
  settingsBtn.addEventListener("click", toggleSettings);
  modeBtn.addEventListener("click", changeMode);
  colorBtns.forEach((btn, i) =>
    btn.addEventListener("click", () => changeColor(i))
  );
  padNums.forEach((btn) =>
    btn.addEventListener("click", () => {
      calculator.appendNumber(btn.dataset.value);
      calculator.updateDisplay();
    })
  );
  padOperations.forEach((btn) => {
    btn.addEventListener("click", () => {
      calculator.chooseOperation(btn.dataset.value);
      calculator.updateDisplay();
    });
  });
  padFunctions.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.value === "=") {
        calculator.compute();
        quesElm.classList.remove("upper");
        ansElm.classList.add("upper");
      } else if (btn.dataset.value === ".") calculator.appendNumber(".");
      calculator.updateDisplay();
    });
  });
  clearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
  });
  backButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
  });
};

const toggleSettings = () => {
  settingsCon.classList.toggle("settings-active");
};

const changeMode = () => {
  appElm.classList.toggle("dark");
};

const changeColor = (index) => {
  switch (index) {
    case 0:
      appElm.style.setProperty("--light", blueLight);
      appElm.style.setProperty("--dark", blueDark);
      break;
    case 1:
      appElm.style.setProperty("--light", greenLight);
      appElm.style.setProperty("--dark", greenDark);
      break;
    case 2:
      appElm.style.setProperty("--light", yellowLight);
      appElm.style.setProperty("--dark", yellowDark);
      break;
    case 3:
      appElm.style.setProperty("--light", orangeLight);
      appElm.style.setProperty("--dark", orangeDark);
      break;
    case 4:
      appElm.style.setProperty("--light", redLight);
      appElm.style.setProperty("--dark", redDark);
      break;
    case 5:
      appElm.style.setProperty("--light", pinkLight);
      appElm.style.setProperty("--dark", pinkDark);
      break;
    default:
      break;
  }
};

window.addEventListener("load", setup);

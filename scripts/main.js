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

// FUNCTIONS
const setup = () => {
  settingsBtn.addEventListener("click", toggleSettings);
  modeBtn.addEventListener("click", changeMode);
  colorBtns.forEach((btn, i) =>
    btn.addEventListener("click", () => changeColor(i))
  );
  console.log("padNums :>> ", padNums);
  console.log("padFunctions :>> ", padFunctions);
  console.log("padOperations :>> ", padOperations);
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

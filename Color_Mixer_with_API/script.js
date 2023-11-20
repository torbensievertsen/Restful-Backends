const Red = document.querySelector("#red");
const Green = document.querySelector("#green");
const Blue = document.querySelector("#blue");
const main = document.querySelector("main");
const hexWert = document.querySelector("#hex-wert");
const button = document.querySelector("button");
let numRed = 255;
let numGreen = 105;
let numBlue = 180;
initStyle();
button.addEventListener("click", initAPI);
function initAPI() {
  fetch("https://dummy-apis.netlify.app/api/color")
    .then((response) => response.json())
    .then((data) => {
      numRed = data.rgb.r;
      numGreen = data.rgb.g;
      numBlue = data.rgb.b;
      initStyle();
    });
}
function initStyle() {
  Red.value = numRed;
  Green.value = numGreen;
  Blue.value = numBlue;
  main.style.backgroundColor =
    "rgb(" + numRed + "," + numGreen + "," + numBlue + ")";

  Hex(numRed, numGreen, numBlue);
}

Red.addEventListener("input", (event) => {
  numRed = event.target.value;
  main.style.backgroundColor =
    "rgb(" + numRed + "," + numGreen + "," + numBlue + ")";
  Hex(numRed, numGreen, numBlue);
});

Green.addEventListener("input", (event) => {
  numGreen = event.target.value;
  main.style.backgroundColor =
    "rgb(" + numRed + "," + numGreen + "," + numBlue + ")";
  Hex(numRed, numGreen, numBlue);
});

Blue.addEventListener("input", (event) => {
  numBlue = event.target.value;
  main.style.backgroundColor =
    "rgb(" + numRed + "," + numGreen + "," + numBlue + ")";
  Hex(numRed, numGreen, numBlue);
});
function Hex(r, g, b) {
  hexWert.innerText = "#" + mat(r) + mat(g) + mat(b);
}
function mat(a) {
  let b = 0;
  let c = 0;
  let result = "";
  c = Math.floor(a / 16);
  b = a % 16;
  switch (c) {
    case 1:
      result += 1;
      break;
    case 2:
      result += 2;
      break;
    case 3:
      result += 3;
      break;
    case 4:
      result += 4;
      break;
    case 5:
      result += 5;
      break;
    case 6:
      result += 6;
      break;
    case 7:
      result += 7;
      break;
    case 8:
      result += 8;
      break;
    case 9:
      result += 9;
      break;
    case 10:
      result += "A";
      break;
    case 11:
      result += "B";
      break;
    case 12:
      result += "C";
      break;
    case 13:
      result += "D";
      break;
    case 14:
      result += "E";
      break;
    case 15:
      result += "F";
      break;
    default:
      result += 0;
  }
  switch (b) {
    case 1:
      result += 1;
      break;
    case 2:
      result += 2;
      break;
    case 3:
      result += 3;
      break;
    case 4:
      result += 4;
      break;
    case 5:
      result += 5;
      break;
    case 6:
      result += 6;
      break;
    case 7:
      result += 7;
      break;
    case 8:
      result += 8;
      break;
    case 9:
      result += 9;
      break;
    case 10:
      result += "A";
      break;
    case 11:
      result += "B";
      break;
    case 12:
      result += "C";
      break;
    case 13:
      result += "D";
      break;
    case 14:
      result += "E";
      break;
    case 15:
      result += "F";
      break;
    default:
      result += 0;
  }
  return result;
}

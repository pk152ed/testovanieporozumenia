let questionsQuantity = Object.keys(questions).length;
let questionsArray = [];
let answersArray = [];
let info = {
  correct: 0,
  incorrect: 0,
};

//nahodne zoradi otazky v poli
function randomlySortArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//nahodne zoradi otazky do questionsArray
const randomlySortQuestions = () => {
  for (let i = 1; i < questionsQuantity + 1; i++) {
    questionsArray.push(`question${i}`);
  }
  randomlySortArray(questionsArray);
};

//nahodne zoradi odpovede z aktualnej otazky do answersArray
const randomlySortAnswers = () => {
  let currentQuestion = questionsArray[0];
  for (let i = 2; i <= 5; i++) {
    answersArray.push(questions[currentQuestion][i]);
  }
  randomlySortArray(answersArray);
};

// vyresetuje pozadie odpovedi
function resetColors() {
  const buttons = document.getElementsByClassName("answerButton");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = "#8BBB8B";
  }
}

//prehraje prvu otazku z questionsArray a zmeni text na aktualnu otazku
function playSound() {
  resetColors();
  let sound = eval(new Audio(`sounds/${questions[questionsArray[0]][1]}.wav`));
  sound.play();
  document.getElementById("questionText").innerText =
    questions[questionsArray[0]][0];
}

//reloadne pocet spravnych a zlych odpovedi
function reloadAnswerPoints() {
  document.getElementById("answerNumber").innerHTML = info.correct;
  document.getElementById("answerIncorrect").innerHTML = info.incorrect;
}

//vytvori 4 odpovedni buttony z aktualnej otazky v nahodnom poradi, zaroven zkontroluje ci uz tieto buttony nie su vytvorene a v takom pripade ich nejprv zmaze
const createButtons = () => {
  if (document.getElementById("button1")) {
    for (let i = 0; i < 4; i++) {
      document.getElementById(`button${i}`).remove();
    }
  }
  for (let i = 0; i < 4; i++) {
    const button = document.createElement("button");
    button.setAttribute("id", `button${i}`);
    button.setAttribute("class", "answerButton");
    button.addEventListener("click", function () {
      answer(`${answersArray[i]}`, this.id);
    });
    button.addEventListener("click", function () {
      disableButton(this.id);
    });
    const image = document.createElement("img");
    image.setAttribute("src", `pictures/${answersArray[i]}.jpg`);
    const questionHolder = document.getElementById("detection");
    button.appendChild(image);
    questionHolder.appendChild(button);
  }
};

//vypne a zapne button
function disableButton(buttonId) {
  document.getElementById(buttonId).disabled = true;
}
function enableButton(buttonId) {
  document.getElementById(buttonId).disabled = false;
}

//prefarbi pozadie odpovedi na zeleno alebo cerveno podle spravnosti
//zaroven pokial slo o poslednu otazku, zobrazi po kliknuti na spravnou odpoved vysledky
function answer(sound, buttonId) {
  if (sound == questions[questionsArray[0]][2]) {
    document.getElementById(buttonId).style.backgroundColor = "green";
    info.correct++;
    reloadAnswerPoints();
    enableButton("nextQuestionButton");
    if (questionsArray.length == 1) {
      document.getElementById("results").style.display = "flex";
      reloadAnswerPoints();
      info.correct = 0;
      info.incorrect = 0;
      document.getElementById("questionText").innerText = "Vyhodnoceni";
    }
  } else {
    document.getElementById(buttonId).style.backgroundColor = "red";
    info.incorrect++;
    reloadAnswerPoints();
  }
}

//slouzi pro kompletni vyresetovani po zobrazeni vysledku a zacne vse od zacatku
function reset() {
  questionsArray = [];
  answersArray = [];
  const buttons = document.getElementsByClassName("answerButton");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.display = "none";
  }
  document.getElementById("results").style.display = "none";
  document.getElementById("startButton").style.display = "block";
  document.getElementById("nextQuestionButton").style.display = "none";
  document.getElementById("questionText").innerText = "";
}

//nahodne seradi otazky a zobrazi prvni otazku
function start() {
  disableButton("nextQuestionButton");
  randomlySortQuestions();
  randomlySortAnswers();
  createButtons();
  playSound();
  document.getElementById("startButton").style.display = "none";
  document.getElementById("nextQuestionButton").style.display = "block";
}

//zobrazuje dalsi otazku
function nextQuestion() {
  disableButton("nextQuestionButton");
  answersArray = [];
  questionsArray.shift();
  randomlySortAnswers();
  createButtons();
  playSound();
}

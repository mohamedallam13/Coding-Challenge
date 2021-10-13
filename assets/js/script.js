
const QUESTIONS_LIST = [
    {
        question: "This is question A, what size is the Earth?",
        answers: [
            {
                text: "Whales",
                correct: false
            },
            {
                text: "Werewolves",
                correct: false
            },
            {
                text: "Hippos",
                correct: true
            },
            {
                text: "All of the above",
                correct: false
            }
        ]
    },
    {
        question: "Another dummy question, lions roar loud, and they breathe___",
        answers: [
            {
                text: "Nitrogen Oxide mixed with helium",
                correct: false
            },
            {
                text: "Nothing Basically",
                correct: false
            },
            {
                text: "Wha..?",
                correct: true
            },
            {
                text: "C++",
                correct: false
            }
        ]
    },
    {
        question: "Next time you come home, you will not forget to:___",
        answers: [
            {
                text: "Call for help",
                correct: false
            },
            {
                text: "Run for your life",
                correct: false
            },
            {
                text: "Pray everyone's okay",
                correct: true
            },
            {
                text: "Who are you?",
                correct: false
            }
        ]
    },
    {
        question: "When aliens invaded japan back in the 19th Century, what was the first thing they said?",
        answers: [
            {
                text: "Dude, where's my car?",
                correct: false
            },
            {
                text: "Arigato",
                correct: false
            },
            {
                text: "Anyone seen our pet Godzilla? seems like we lost him here",
                correct: true
            },
            {
                text: "Yamete Kudasai.....!!",
                correct: false
            }
        ]
    },
    {
        question: "The Eifferl tour is huge..!",
        answers: [
            {
                text: "That's what she said",
                correct: false
            },
            {
                text: "Nope",
                correct: false
            },
            {
                text: "I hate Paris",
                correct: true
            },
            {
                text: "K",
                correct: false
            }
        ]
    },
    {
        question: "Waking up at 3 am or staing up till 3 am?",
        answers: [
            {
                text: "Both suck!",
                correct: false
            },
            {
                text: "Nope",
                correct: true
            }
        ]
    },
    {
        question: "Early Bird or night owl?",
        answers: [
            {
                text: "Night Crawler",
                correct: false
            },
            {
                text: "The Dark Night",
                correct: false
            },
            {
                text: "1990s",
                correct: true
            },
            {
                text: "Nope",
                correct: false
            }
        ]
    }
]

const QUIZ_TIME = 120;

var askedQuestionsIndexes = [];
var highScoreObj = {};

var secondsLeft;
var score = 0;
var timerEl;
var timerInterval;
var timerToRemoveAlert;
var secondsToRemoveAlert;

function beginQuiz() {
    //    window.alert("let's begin!");
    secondsLeft = QUIZ_TIME;
    startTimer();
    console.log("Timer set")
    renderNewQuestion();
}

function endQuiz() {
    clearTimerField();
    renderAllDone();
}

function clearTimerField() {
    timerEl.textContent = "";
}

function startTimer() {
    getTimerEl();
    timerInterval = setInterval(quizTimerCallbackFunction, 1000);
}

function getTimerEl() {
    timerEl = document.getElementById("timer");
}

function quizTimerCallbackFunction() {
    secondsLeft--;
    timerEl.textContent = secondsLeft + " seconds left..";
    console.log(secondsLeft);
    if (secondsLeft <= 0) {
        console.log(timerInterval);
        clearInterval(timerInterval);
        endQuiz();
    } else {

    }
}

function renderNewQuestion(i) {
    // console.log("rendering new question")
    var randomQuestionObj = i? QUESTIONS_LIST[i] : getRandomQuestionFromQuestionsList();
    if (!randomQuestionObj) {
        // console.log("No More Questions");
        secondsLeft = 0;
        return;
    }
    // console.log("rendered new question")
    // console.log(randomQuestionObj);
    var questionDiv = createQuestion(randomQuestionObj);
    replaceQuestionBodyDivContent(questionDiv);
}

function replaceQuestionBodyDivContent(newDiv) {
    var questionBodyElement = document.getElementById("question-body");
    if (!questionBodyElement) {
        return;
    }
    questionBodyElement.innerHTML = newDiv.innerHTML;
}

function getRandomQuestionFromQuestionsList() {
    var randomIndex
    var questionsListLength = QUESTIONS_LIST.length;
    var askedQuestionsArrLength = askedQuestionsIndexes.length;
    if (askedQuestionsArrLength == questionsListLength) {
        return;
    }
    do {
        randomIndex = Math.floor(Math.random() * questionsListLength);
        // console.log(randomIndex);
    } while (askedQuestionsIndexes.includes(randomIndex))
    askedQuestionsIndexes.push(randomIndex);
    // console.log(randomIndex)
    return QUESTIONS_LIST[randomIndex];
}

function createQuestion(questionObj) {
    var questionDiv = document.createElement("div");
    var questionHeader = createQuestionHead(questionObj.question);
    var answersList = createAnswersList(questionObj.answers);
    questionDiv.appendChild(questionHeader);
    questionDiv.appendChild(answersList);
    return questionDiv;
}

function createQuestionHead(question) {
    var questionHeader = document.createElement("h1");
    questionHeader.setAttribute("class", "question-div");
    questionHeader.innerHTML = question;
    return questionHeader
}

function createAnswersList(answers) {
    var answersOrderedList = document.createElement("ol");
    answersOrderedList.setAttribute("class", "question-div");
    answers.forEach(answerObj => {
        var answerItem = document.createElement("li");
        answerItem.innerHTML = answerObj.text;
        answerItem.setAttribute("class", "quiz-button answer-set");
        answerItem.setAttribute("onclick", "answerQuestion(" + answerObj.correct + ")")
        answersOrderedList.appendChild(answerItem);
    })
    return answersOrderedList;
}

function answerQuestion(correct) {
    alertUser(correct);
    if (!correct) {
        secondsLeft -= 10;
        if (secondsLeft < 0) {
            secondsLeft = 0;
        }
    } else {
        score += 10;
    }
    renderNewQuestion();
}

function alertUser(correct) {
    clearLastUserMessage();
    var messagePElement = document.createElement("p");
    messagePElement.setAttribute("id", "user-message");
    messagePElement.setAttribute("class", "user-message");
    if (!correct) {
        messagePElement.innerHTML = "Wrong!"
    } else {
        messagePElement.innerHTML = "Correct!"
    }
    var mainQuestionContainerElement = document.getElementById("answer-comment");
    mainQuestionContainerElement.appendChild(messagePElement);
    secondsToRemoveAlert = 1;
    timerToRemoveAlert = setInterval(removeAlertCallBack, 1000);
}

function removeAlertCallBack() {
    secondsToRemoveAlert--
    console.log(secondsToRemoveAlert);
    if (secondsToRemoveAlert <= 0) {
        clearLastUserMessage();
        console.log(timerToRemoveAlert);
    }
}

function clearLastUserMessage() {
    var userMessageElement = document.getElementById("user-message");
    if (!userMessageElement) {
        return;
    }
    userMessageElement.remove();
    clearInterval(timerToRemoveAlert);
}

function renderAllDone() {
    secondsLeft = 0;
    var allDoneDiv = document.createElement("div");
    var allDoneHeader = createAllDoneHeader();
    var allDoneParagraph = createAllDoneParagraph();
    var allDoneInput = createAllDoneInputRow();
    allDoneDiv.appendChild(allDoneHeader);
    allDoneDiv.appendChild(allDoneParagraph);
    allDoneDiv.appendChild(allDoneInput);
    replaceQuestionBodyDivContent(allDoneDiv);
}

function createAllDoneHeader() {
    var allDoneHeader = document.createElement("h1");
    allDoneHeader.setAttribute("class", "question-div");
    allDoneHeader.innerHTML = "All done!";
    return allDoneHeader
}


function createAllDoneParagraph() {
    var allDoneParagraph = document.createElement("p");
    allDoneParagraph.setAttribute("class", "question-div");
    allDoneParagraph.innerHTML = "Your final score is " + score;
    return allDoneParagraph
}

function createAllDoneInputRow() {
    var allDoneInputRowDiv = document.createElement("div");
    allDoneInputRowDiv.setAttribute("class", "input-row")
    var instructParagraph = document.createElement("p");
    instructParagraph.innerHTML = "Enter Initials:";
    var inputField = document.createElement("input");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("id", "inputInitials")
    inputField.setAttribute("class", "input-box")
    var submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit";
    submitButton.setAttribute("class", "quiz-button submit-button");
    submitButton.setAttribute("onclick", "addToHighScoreList()");
    allDoneInputRowDiv.appendChild(instructParagraph);
    allDoneInputRowDiv.appendChild(inputField);
    allDoneInputRowDiv.appendChild(submitButton);
    return allDoneInputRowDiv;

}

function addToHighScoreList() {
    var inputField = document.getElementById("inputInitials");
    var value = inputField.value;
    highScoreObj[value] = score;
    console.log(highScoreObj);
    renderHighScoresTable();
}


function renderHighScoresTable() {
    var highScoresDiv = document.createElement("div");
    var highScoreHeader = createHighScoresHeader();
    var highScoresTable = createHighScoresTable();
    var highScoresButtonsRow = createHighScoresButtonsRow();
    highScoresDiv.appendChild(highScoreHeader);
    highScoresDiv.appendChild(highScoresTable);
    highScoresDiv.appendChild(highScoresButtonsRow);
    replaceQuestionBodyDivContent(highScoresDiv);
}

function createHighScoresHeader() {
    var highScoresHeader = document.createElement("h1");
    highScoresHeader.innerHTML = "High Scores";
    return highScoresHeader;
}

function createHighScoresTable() {
    var highScorers = Object.keys(highScoreObj);
    var highScoreLTable = document.createElement("ol");
    highScorers.forEach(highScorer => {
        var highScorerItem = document.createElement("li");
        highScorerItem.innerHTML = highScorer + " - " + highScoreObj[highScorer];
        highScorerItem.setAttribute("class", "high-scores");
        highScoreLTable.appendChild(highScorerItem);
    })
    return highScoreLTable;
}

function createHighScoresButtonsRow() {
    var buttonsRowDiv = document.createElement("div");
    buttonsRowDiv.setAttribute("class", "highscores-buttons-row");
    var goBackButton = document.createElement("button");
    goBackButton.innerHTML = "Go Back";
    goBackButton.setAttribute("class", "quiz-button submit-button");
    goBackButton.setAttribute("onclick", "goBack()");
    var clearHighScoresButton = document.createElement("button");
    clearHighScoresButton.innerHTML = "Clear High Scores";
    clearHighScoresButton.setAttribute("class", "quiz-button submit-button");
    clearHighScoresButton.setAttribute("onclick", "clearHighScores()");
    buttonsRowDiv.appendChild(goBackButton);
    buttonsRowDiv.appendChild(clearHighScoresButton);
    return buttonsRowDiv;
}

function goBack() {
    if (secondsLeft > 0) {
        var lastQuestionIndex = askedQuestionsIndexes[askedQuestionsIndexes.length - 1];
        renderNewQuestion(lastQuestionIndex);
    } else {
        resetQuiz()
    }
}

function resetQuiz() {
    askedQuestionsIndexes = [];
    score = 0;
    beginQuiz();
}

function clearHighScores() {
    highScoreObj = {};
    renderHighScoresTable();
}

function viewHighScores() {
    renderHighScoresTable();
}
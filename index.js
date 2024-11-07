const questions = [
    {
        question: "what is largest animal in the world",
        answers: [
            { text: "Shark", correct: false },
            { text: "Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "what is largest country in the world",
        answers: [
            { text: "Shark", correct: true },
            { text: "Whale", correct: false },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "what is largest river in the world",
        answers: [
            { text: "Shark", correct: false },
            { text: "Whale", correct: false },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: true }
        ]
    },
    {
        question: "what is largest ocean in the world",
        answers: [
            { text: "Shark", correct: false },
            { text: "Whale", correct: false },
            { text: "Elephant", correct: true },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "what is largest computer in the world",
        answers: [
            { text: "Shark", correct: false },
            { text: "Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
]

const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answers');
const nextbutton = document.getElementById('next');

let currentquestionindex = 0;
let score = 0;

function startQuiz() {
    currentquestionindex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState(); // Clear previous answers
    let currentQuestion = questions[currentquestionindex];
    let questionNo = currentquestionindex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerElement.appendChild(button); 
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}



function resetState() {
    nextbutton.style.display = "none";
    while(answerElement.firstChild){
        answerElement.removeChild(answerElement.firstChild);
    }
}


function selectAnswer(e) {
    const selectbtn = e.target;
    const iscorrect = selectbtn.dataset.correct === "true";
    if(iscorrect){
        selectbtn.classList.add("correct");
        score++;
    }else{
        selectbtn.classList.add("incorrect");
    }
    Array.from(answerElement.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextbutton.style.display = "block";
}

function showscore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML = "Start Quiz Again";
    nextbutton.style.display = "block";
}

function handleNextButton() {
    currentquestionindex++;
    if(currentquestionindex< questions.length){
        showQuestion();
    }
    else{
        showscore();
    }
}


nextbutton.addEventListener("click", () => {
    if(currentquestionindex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();
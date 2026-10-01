const questionBank = {

C:[
{
question:"Which function prints output in C?",
options:["scanf()","printf()","cin","cout"],
answer:"printf()"
},
{
question:"Which symbol ends a statement?",
options:[".",":",";","?"],
answer:";"
},
{
question:"Who developed C?",
options:["James Gosling","Dennis Ritchie","Guido","Bjarne"],
answer:"Dennis Ritchie"
},
{
question:"C is a ____ language.",
options:["Markup","Programming","Database","Network"],
answer:"Programming"
},
{
question:"Which header file contains printf()?",
options:["stdio.h","math.h","conio.h","stdlib.h"],
answer:"stdio.h"
}
],

Java:[
{
question:"Java is a?",
options:["Database","OS","Object Oriented Language","Compiler"],
answer:"Object Oriented Language"
},
{
question:"Who developed Java?",
options:["Guido","James Gosling","Dennis","Linus"],
answer:"James Gosling"
},
{
question:"Java source file extension?",
options:[".py",".java",".cpp",".html"],
answer:".java"
},
{
question:"Keyword for inheritance?",
options:["extends","inherits","parent","super"],
answer:"extends"
},
{
question:"JVM stands for?",
options:[
"Java Virtual Machine",
"Java Variable Method",
"Joint Virtual Memory",
"Java Verified Module"
],
answer:"Java Virtual Machine"
}
],

Python:[
{
question:"Python comments start with?",
options:["//","#","/*","@"],
answer:"#"
},
{
question:"Who created Python?",
options:[
"Guido van Rossum",
"James Gosling",
"Dennis Ritchie",
"Mark Zuckerberg"
],
answer:"Guido van Rossum"
},
{
question:"Python is?",
options:[
"Compiled only",
"High-level Language",
"Operating System",
"Browser"
],
answer:"High-level Language"
},
{
question:"Which data type stores True/False?",
options:[
"String",
"List",
"Boolean",
"Float"
],
answer:"Boolean"
},
{
question:"Python file extension?",
options:[
".java",
".html",
".py",
".cpp"
],
answer:".py"
}
],

DSA:[
{
question:"What does DSA stand for?",
options:[
"Data Structure and Algorithms",
"Digital System Analysis",
"Dynamic Search Algorithm",
"Data Storage Access"
],
answer:"Data Structure and Algorithms"
},
{
question:"FIFO structure is?",
options:[
"Stack",
"Queue",
"Tree",
"Graph"
],
answer:"Queue"
},
{
question:"LIFO structure is?",
options:[
"Queue",
"Stack",
"Tree",
"Array"
],
answer:"Stack"
},
{
question:"Binary Search complexity?",
options:[
"O(n²)",
"O(n)",
"O(log n)",
"O(1)"
],
answer:"O(log n)"
},
{
question:"Which is non-linear?",
options:[
"Array",
"Linked List",
"Tree",
"Queue"
],
answer:"Tree"
}
]

};

const homeScreen =
document.getElementById("home-screen");

const quizScreen =
document.getElementById("quiz-screen");

const resultScreen =
document.getElementById("result-screen");

const startBtn =
document.getElementById("start-btn");

const nextBtn =
document.getElementById("next-btn");

const restartBtn =
document.getElementById("restart-btn");

const subjectSelect =
document.getElementById("subject");

const questionElement =
document.getElementById("question");

const answerButtons =
document.getElementById("answer-buttons");

const scoreElement =
document.getElementById("score");

const feedback =
document.getElementById("feedback");

const finalScore =
document.getElementById("final-score");

const percentage =
document.getElementById("percentage");

const questionNumber =
document.getElementById("question-number");

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

startBtn.addEventListener(
    "click",
    startQuiz
);

nextBtn.addEventListener(
    "click",
    nextQuestion
);

restartBtn.addEventListener(
    "click",
    restartQuiz
);

function startQuiz(){

    const selectedSubject =
    subjectSelect.value;

    questions =
    questionBank[selectedSubject];

    currentQuestionIndex = 0;
    score = 0;

    scoreElement.innerText = score;

    homeScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");

    showQuestion();
}

function showQuestion(){

    resetState();

    let question =
    questions[currentQuestionIndex];

    questionNumber.innerText =
    currentQuestionIndex + 1;

    questionElement.innerText =
    question.question;

    question.options.forEach(option=>{

        const button =
        document.createElement("button");

        button.innerText = option;

        button.classList.add(
            "answer-btn"
        );

        button.addEventListener(
            "click",
            selectAnswer
        );

        answerButtons.appendChild(button);
    });
}

function resetState(){

    nextBtn.classList.add("hidden");

    feedback.innerText = "";

    while(answerButtons.firstChild){

        answerButtons.removeChild(
            answerButtons.firstChild
        );
    }
}

function selectAnswer(e){

    const selectedButton =
    e.target;

    const selectedAnswer =
    selectedButton.innerText;

    const correctAnswer =
    questions[currentQuestionIndex].answer;

    Array.from(
        answerButtons.children
    ).forEach(button=>{

        button.disabled = true;

        if(button.innerText === correctAnswer){
            button.classList.add("correct");
        }
    });

    if(selectedAnswer === correctAnswer){

        score++;

        scoreElement.innerText = score;

        feedback.innerText =
        "✅ Correct Answer";

        selectedButton.classList.add("correct");

    }else{

        feedback.innerText =
        "❌ Incorrect Answer";

        selectedButton.classList.add("wrong");
    }

    nextBtn.classList.remove("hidden");
}

function nextQuestion(){

    currentQuestionIndex++;

    if(
        currentQuestionIndex <
        questions.length
    ){

        showQuestion();

    }else{

        showResult();
    }
}

function showResult(){

    quizScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");

    finalScore.innerText =
    `Score: ${score} / ${questions.length}`;

    let percent =
    Math.round(
    (score/questions.length)*100
    );

    percentage.innerText =
    `Percentage: ${percent}%`;
}

function restartQuiz(){

    resultScreen.classList.add("hidden");

    homeScreen.classList.remove("hidden");
}
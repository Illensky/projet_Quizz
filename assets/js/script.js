const questionary = [
    ["Quelle est la capitale de la France ?", ["Marseille", "Nantes", "Paris", "Lille"], "Paris"],
    ["Quelle est la capitale de l'Italie ?", ["Naples", "Rome", "Milan", "Florence"], "Rome"],
    ["Quelle est la capitale de l'Espagne ?", ["Madrid", "Seville", "Barcelone", "Valence"], "Madrid"],
    ["Quelle est la capitale de la Belgique ?", ["Namur", "Antwerp", "Ghent", "Brussels"], "Brussels"]
];

let score = 0;
let questionI = 0;

let wrongAnswer = [];
function runQuestionary (el, questionary, startBtn) {
    if (document.querySelector("#questionaryDiv")){
        document.querySelector("#questionaryDiv").remove();
    }
    startBtn.style.display = "none"
    if (questionI < questionary.length) {
        const questionaryDiv = document.createElement("div");
        questionaryDiv.id = "questionaryDiv"
        el.appendChild(questionaryDiv)

        const questionP = document.createElement("p");
        questionP.innerHTML = questionary[questionI][0];
        questionP.id = "questionP"
        questionaryDiv.appendChild(questionP)

        const answersDiv = document.createElement("div");
        for (let answer of questionary[questionI][1]) {
            const answerP = document.createElement("p");
            answerP.innerHTML = answer;
            answerP.classList = "answerP";
            answersDiv.appendChild(answerP)
            answerP.addEventListener("click", function () {
                if (this.innerHTML.toUpperCase() === questionary[questionI][2].toUpperCase()) {
                    questionaryDiv.remove();
                    score++;
                    questionI++;
                    runQuestionary(el, questionary, startBtn);
                }
                else {
                    questionaryDiv.remove();
                    wrongAnswer.push([questionI, this.innerHTML]);
                    questionI++;
                    runQuestionary(el, questionary, startBtn);
                }
            })
        }
        questionaryDiv.appendChild(answersDiv);
    }
    else {
        questionI = 0;

        const questionaryDiv = document.createElement("div");
        questionaryDiv.id = "questionaryDiv";
        el.appendChild(questionaryDiv);

        const scoreDiv = document.createElement("div");
        scoreDiv.innerHTML = "score : " + score.toString() + " / " + questionary.length.toString();
        questionaryDiv.appendChild(scoreDiv);

        const errorDiv = document.createElement("div");
        for (let error of wrongAnswer) {
            const errorP = document.createElement('p');
            errorP.innerHTML = "Erreur a la question : <br>" + questionary[error[0]][0] + "<br> Vous avez répondu : " + error[1] +
            "<br> La bonne réponse était : " + questionary[error[0]][2];
            errorDiv.appendChild(errorP);
        }
        questionaryDiv.appendChild(errorDiv);

        startBtn.innerHTML = "Re-jouer";
        startBtn.style.display = "inline";
    }
}

document.querySelector('#start').addEventListener("click", function () {
    runQuestionary(document.querySelector("body"), questionary, this)
})

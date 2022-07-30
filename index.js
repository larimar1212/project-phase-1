const baseUrl = 'https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple'
const startButton = document.getElementById('start-button')
const dropDown = document.getElementById('drop-down')
const dropDownLabel = document.getElementById('label')
const playArea = document.getElementById('play-area')
//creating nodes for actual quiz

//where question will show up
const quizQuestion = document.createElement('h1')
quizQuestion.id = 'question'
quizQuestion.style.color = 'white'

//keeps track of score
let score = 0

const triviaContent = (obj) => {
    startButton.addEventListener('click', () => {
        dropDown.remove()
        startButton.remove()
        dropDownLabel.remove()
        quizQuestion.textContent = obj.question
        playArea.append(quizQuestion)
        let randomizedAnswers = randomize(obj) // callback function to generate randomized answers
        randomizedAnswers.forEach((answer) => { // iterate over random answer array and append to
            const answerButton = document.createElement('button')
            answerButton.innerText = answer
            playArea.append(answerButton)
            answerButton.addEventListener('click', () => {
                if (answer === obj['correct_answer']){
                    score++
                }
                

            })
        })
    
    })
}

const getTrivia = () => {
// change URL to 1 result
fetch(baseUrl).then(req => req.json())
.then(data => {
    let res = data.results[0] // make a variable for the actual object
    triviaContent(res)    
})
}
getTrivia()

        
const randomize = (res) => {
    let allAnswers = [...res.incorrect_answers]
    allAnswers.splice(Math.floor(Math.random() * (res.incorrect_answers.length + 1)), 0, res.correct_answer)
    return allAnswers
}


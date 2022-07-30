const baseUrl = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple'
const startButton = document.getElementById('start-button')
const dropDown = document.getElementById('drop-down')
const dropDownLabel = document.getElementById('label')
const playArea = document.getElementById('play-area')

//creating nodes for actual quiz

//where question will show up
const quizQuestion = document.createElement('h1')
quizQuestion.id = 'question'
quizQuestion.style.color = 'white'

//answer buttons
const answer1 = document.createElement('button')
const answer2 = document.createElement('button')
const answer3 = document.createElement('button')
const answer4 = document.createElement('button')


fetch(baseUrl).then(response => response.json())
.then(data => {
    
    //iterates though the API and then through the key where question/answers are
    Object.keys(data).forEach(thing => {
    data.results.forEach(q => {
        console.log(q)

//when start is pressed, removes start page elements and populates
//whith new nodes that display trivia
startButton.addEventListener('click', () => {
    dropDown.remove()
    startButton.remove()
    dropDownLabel.remove()
    quizQuestion.textContent = q.question
    answer1.textContent = q['correct_answer']
    answer2.textContent = q['incorrect_answers']
    answer3.textContent = q['incorrect_answers']
    answer4.textContent = q['incorrect_answers']
    playArea.append(quizQuestion, answer1, answer2, answer3, answer4)


})
})
})
}
)


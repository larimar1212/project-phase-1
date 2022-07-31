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

// 2.
const triviaContent = (questionObject) => {
    quizQuestion.innerHTML = questionObject.question
    playArea.append(quizQuestion)

        // .3
        let randomizedAnswers = randomize(questionObject) // callback function to generate randomized answers
        randomizedAnswers.forEach((answer) => { // iterate over random answer array and append to
            const answerButton = document.createElement('button')
            answerButton.innerHTML = answer
            playArea.append(answerButton)
            answerButton.addEventListener('click', () => {
                if (answer === questionObject['correct_answer']){
                    score++
                }
                console.log(score)
                playArea.innerHTML = ''
                getTrivia()


            })
        })
     }

    

// 1.
const getTrivia = () => {
// change URL to 1 result
fetch(`https://opentdb.com/api.php?amount=1&category=${dropDown.value}&difficulty=medium&type=multiple`).then(req => req.json())
.then(data => {
    let questionObject = data.results[0] // make a variable for the actual object
    triviaContent(questionObject)    
    })

}
   
// 4.
const randomize = (questionObject) => {
    let allAnswers = [...questionObject.incorrect_answers]
    allAnswers.splice(Math.floor(Math.random() * (questionObject.incorrect_answers.length + 1)), 0, questionObject.correct_answer)
    return allAnswers
}


// funciton when u click start, and when click on answer 

// clicking start and invoking the removal of the elements 
startButton.addEventListener('click', () => {
    handleClickStart() 

})


// removing these elements from the page after clicking start
const handleClickStart = () => {
        dropDown.remove()
        startButton.remove()
        dropDownLabel.remove()
        getTrivia() // invoking original fetch req to render next question
    
}
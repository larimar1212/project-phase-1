const baseUrl = 'https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple'
const startButton = document.getElementById('start-button')
const dropDown = document.getElementById('drop-down')
const dropDownLabel = document.getElementById('label')
const playArea = document.getElementById('play-area')
const header = document.getElementsByClassName('container')[0]
const neonTrivia = document.getElementsByClassName('neon')[0]
const neonQuiz = document.getElementsByClassName('flux')[0]
const leaderBoardSpace = document.getElementsByClassName('filter')[0]

//creating nodes for actual quiz

//where question will show up
const quizQuestion = document.createElement('h1')
quizQuestion.id = 'question'



//keeps track of score
let score = 0

//keeps track of questions asked to prevent duplicates and end game
const questionsAsked = []

// 2.
const triviaContent = (questionObject) => {
    quizQuestion.innerHTML = questionObject.question
    playArea.append(quizQuestion)

        // .3
        let randomizedAnswers = randomize(questionObject) // callback function to generate randomized answers
        let answerDiv = document.createElement('answer-div')
        randomizedAnswers.forEach((answer) => { // iterate over random answer array and append to
            const answerButton = document.createElement('button')
            answerButton.setAttribute('class', 'answer')
            answerButton.innerHTML = answer
            answerDiv.setAttribute('class', 'answer-div')
            playArea.append(answerButton)
            answerButton.addEventListener('click', () => {
                if (answer === questionObject['correct_answer']){
                    score++
                }
                playArea.innerHTML = ''
                getTrivia()
                questionsAsked.unshift(quizQuestion.innerHTML) //populates the array with the question asked after answer is clicked
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
    endGame(quizQuestion)   
    })

}
   
// 4.
const randomize = (questionObject) => {
    let allAnswers = [...questionObject.incorrect_answers]
    allAnswers.splice(Math.floor(Math.random() * (questionObject.incorrect_answers.length + 1)), 0, questionObject.correct_answer)
    return allAnswers
}


// function when u click start, and when click on answer 

// clicking start and invoking the removal of the elements 
startButton.addEventListener('click', () => {
    handleClickStart() 
    let triviaContainer = document.querySelector('.wrapper')
    triviaContainer.classList.add('top-positioned')
})


// removing these elements from the page after clicking start
const handleClickStart = () => {
        dropDown.remove()
        startButton.remove()
        dropDownLabel.remove()
        getTrivia() // invoking original fetch req to render next question
        

    
}

//ends the game and removes all the elements
//calls the function with the 'final page' elements
const endGame = (e) => {
    if (questionsAsked.length === 10) {
        e.remove()
        neonQuiz.remove()
        neonTrivia.remove()
        playArea.remove() 
        inputName()     
    }
    
}

let userName;
const inputName = () => {
    const form = document.createElement('form')
    const formLabel = document.createElement('label')
    const formInput = document.createElement('input')
    const formButton = document.createElement('button')
    form.id = 'form'
    formLabel.id = 'form-label'
    formInput.id = 'form-input'
    formButton.id = 'form-button'
    formLabel.textContent = 'Enter your name'
    formButton.textContent = 'Submit'
    header.append(form)
    form.append(formLabel)
    form.append(formInput)
    form.append(formButton)
    formLabel.style.color = 'white'
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        userName = e.target['form-input'].value
        form.reset()
    })
    
}

//creates nodes to display after game end
const finalPage = () => {
    const scoreHeader = document.createElement('h2')
    scoreHeader.id = 'score-head'
    scoreHeader.textContent = `You Scored ${score}/10`
    const scoreReaction = document.createElement('p')
    scoreReaction.id = 'score-reaction'
    if (score <= 3) {
        scoreReaction.textContent = 'Get better.'
    } else if (score <= 6) {
        scoreReaction.textContent = 'Meh, not bad I guess.'
    } else if (score <= 9) {
        scoreReaction.textContent = 'Good job, still not a 10 though.'
    } else {
        scoreReaction.textContent = 'YOOOOO! Perfect score!'
    }    
    header.append(scoreHeader)
    header.append(scoreReaction)
    scoreHeader.style.color = 'white'
    scoreReaction.style.color = 'white'
}
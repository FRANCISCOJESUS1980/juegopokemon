import './main.scss'
import './componentes/difficulty'
import './componentes/score'
import './componentes/startGame'
import { startGame } from './componentes/startGame'

document.addEventListener('DOMContentLoaded', () => {
  const nameInputContainer = document.getElementById('name-input-container')
  const difficultySelection = document.getElementById('difficulty-selection')
  const gameContainer = document.querySelector('.game-container')
  const startGameBtn = document.getElementById('start-game')
  const easyBtn = document.getElementById('easy')
  const mediumBtn = document.getElementById('medium')
  const hardBtn = document.getElementById('hard')
  const playAgainBtn = document.getElementById('play-again')
  const goBackBtn = document.getElementById('go-back')

  const storedName = localStorage.getItem('playerName')
  if (storedName) {
    nameInputContainer.style.display = 'none'
    difficultySelection.style.display = 'block'
  } else {
    nameInputContainer.style.display = 'block'
  }

  startGameBtn.addEventListener('click', () => {
    const playerName = document.getElementById('player-name').value
    if (playerName) {
      localStorage.setItem('playerName', playerName)
      nameInputContainer.style.display = 'none'
      difficultySelection.style.display = 'block'
    } else {
      alert('Por favor, introduce tu nombre')
    }
  })

  easyBtn.addEventListener('click', () => setDifficulty(5, false))
  mediumBtn.addEventListener('click', () => setDifficulty(15, false))
  hardBtn.addEventListener('click', () => setDifficulty(30, false))

  playAgainBtn.addEventListener('click', () => {
    const currentDifficulty = parseInt(
      localStorage.getItem('currentDifficulty')
    )
    startGame(currentDifficulty, false)
  })

  goBackBtn.addEventListener('click', () => {
    gameContainer.style.display = 'none'
    difficultySelection.style.display = 'block'
  })

  function setDifficulty(cardCount, allowDuplicates) {
    localStorage.setItem('currentDifficulty', cardCount)
    difficultySelection.style.display = 'none'
    gameContainer.style.display = 'block'
    startGame(cardCount, allowDuplicates)
  }
})
startGame()

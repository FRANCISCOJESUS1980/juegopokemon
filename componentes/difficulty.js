import { startGame } from './startGame'

document.addEventListener('DOMContentLoaded', () => {
  const nameInputContainer = document.getElementById('name-input-container')
  const difficultySelection = document.getElementById('difficulty-selection')
  const startGameBtn = document.getElementById('start-game')
  const easyBtn = document.getElementById('easy')
  const mediumBtn = document.getElementById('medium')
  const hardBtn = document.getElementById('hard')

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
})

function setDifficulty(cardCount, allowDuplicates) {
  document.getElementById('difficulty-selection').style.display = 'none'
  document.querySelector('.game-container').style.display = 'block'
  startGame(cardCount, allowDuplicates)
}

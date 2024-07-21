let score = 0

export function updateScore(correct) {
  if (correct) {
    score++
  } else {
    score--
  }
  displayScore()
}

export function displayScore() {
  const scoreElement = document.querySelector('.score')
  if (scoreElement) {
    scoreElement.textContent = `Puntuación: ${score}`
  }
}

export function resetScore() {
  score = 0
  displayScore()
}

export function finalScore() {
  const highestScore = getHighestScore()
  if (score > highestScore) {
    localStorage.setItem('highestScore', score)
    alert(`Nueva puntuación más alta: ${score}`)
  }
}

export function getHighestScore() {
  return parseInt(localStorage.getItem('highestScore')) || 0
}

export function displayHighestScore() {
  const highestScoreElement = document.querySelector('.highest-score')
  if (highestScoreElement) {
    highestScoreElement.textContent = `Mayor Puntuación: ${getHighestScore()}`
  }
}

import { updateScore, finalScore } from './score.js'
import { startGame } from './startGame.js'

export async function searchPokemonById(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  return await res.json()
}

export function addDragAndDropHandlers(cardCount) {
  let pokemons = document.querySelectorAll('.image')
  pokemons.forEach((pokemon) => {
    pokemon.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text', event.target.id)
    })
  })

  let names = document.querySelectorAll('.names')
  let wrongMsg = document.querySelector('.wrong')
  let points = 0

  names.forEach((name) => {
    name.addEventListener('dragover', (event) => {
      event.preventDefault()
    })
    name.addEventListener('drop', (event) => {
      const draggableElementData = event.dataTransfer.getData('text')
      const pokemonElement = document.querySelector(`#${draggableElementData}`)
      if (event.target.innerText === draggableElementData) {
        points++
        updateScore(true)
        event.target.innerHTML = ''
        event.target.appendChild(pokemonElement)
        wrongMsg.innerText = ''

        if (points === cardCount) {
          document.querySelector(
            '.draggable-elements'
          ).innerHTML = `<p class="win">¡Ganaste!</p>`
          finalScore()
        }
      } else {
        updateScore(false)
        wrongMsg.innerText = 'Ups!'
      }
    })
  })
}

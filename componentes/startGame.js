import { searchPokemonById } from './game.js'
import { addDragAndDropHandlers } from './game.js'
import { resetScore, displayHighestScore } from './score.js'

export async function startGame(cardCount, allowDuplicates) {
  const draggableElements = document.querySelector('.draggable-elements')
  const droppableElements = document.querySelector('.droppable-elements')
  const pokemonSearched = []
  const pokemonNames = new Set()
  const pokemonIds = new Set()

  resetScore()
  displayHighestScore()

  while (pokemonSearched.length < cardCount) {
    const id = getRandomId(150)

    if (pokemonIds.has(id)) continue

    const pokemon = await searchPokemonById(id)

    if (pokemonNames.has(pokemon.name)) continue

    pokemonSearched.push(pokemon)
    pokemonNames.add(pokemon.name)
    pokemonIds.add(id)
  }

  const shuffledPokemon = [...pokemonSearched].sort(() => Math.random() - 0.5)
  const shuffledPokemonNames = Array.from(pokemonNames).sort(
    () => Math.random() - 0.5
  )

  draggableElements.innerHTML = ''
  droppableElements.innerHTML = ''

  shuffledPokemon.forEach((pokemon) => {
    draggableElements.innerHTML += `
      <div class="pokemon">
        <img id="${pokemon.name}" draggable="true" class="image"
             src="${pokemon.sprites.other['official-artwork'].front_default}" alt="imagen" />
      </div>`
  })

  shuffledPokemonNames.forEach((name) => {
    droppableElements.innerHTML += `
      <div class="names">
        <p>${name}</p>
      </div>`
  })

  addDragAndDropHandlers(cardCount)
}

function getRandomId(max) {
  return Math.floor(Math.random() * max) + 1
}

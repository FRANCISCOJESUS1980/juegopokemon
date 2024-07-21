export async function startGame(cardCount, allowDuplicates) {
  const draggableElements = document.querySelector('.draggable-elements')
  const droppableElements = document.querySelector('.droppable-elements')
  const pokemonSearched = []
  const pokemonNames = new Set()
  const pokemonIds = new Set()

  while (pokemonSearched.length < cardCount) {
    const id = getRandomId(150)

    if (!allowDuplicates && pokemonIds.has(id)) continue

    const pokemon = await searchPokemonById(id)

    if (!allowDuplicates && pokemonNames.has(pokemon.name)) continue

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

async function searchPokemonById(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  return await res.json()
}

function addDragAndDropHandlers(cardCount) {
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
        event.target.innerHTML = ''
        event.target.appendChild(pokemonElement)
        wrongMsg.innerText = ''

        if (points === cardCount) {
          document.querySelector(
            '.draggable-elements'
          ).innerHTML = `<p class="win">¡Ganaste!</p>`
        }
      } else {
        wrongMsg.innerText = 'Ups!'
      }
    })
  })
}

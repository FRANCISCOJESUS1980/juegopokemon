import './main.scss'
const CARDS = 10

for (let i = 1; i <= CARDS; i++) {
  let id = getRandomId(150)
  searchPokemonById(id)
}

function getRandomId(max) {
  return Math.floor(Math.random() * max) + 1
}

let draggableElements = document.querySelector('.draggable-elements')

let pokemonSearched = []
let pokemonNames = []
async function searchPokemonById(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  const data = await res.json()
  pokemonSearched.push(data)
  pokemonNames.push(data.name)

  console.log(pokemonNames)
  pokemonNames = pokemonNames.sort(() => Math.random() - 0.5)
  console.log(pokemonNames)

  draggableElements.innerHTML = ''
  pokemonSearched.forEach((pokemon) => {
    draggableElements.innerHTML += ` 
          <div class="pokemon">
               <img class="image"
                 src="${pokemon.sprites.other['official-artwork'].front_default}"
                 alt="imagen"
               />
        </div>`
  })
}

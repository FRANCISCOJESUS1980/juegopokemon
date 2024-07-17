import './main.scss'
const CARDS = 3

for (let i = 1; i <= CARDS; i++) {
  let id = getRandomId(150)
  searchPokemonById(id)
}

function getRandomId(max) {
  return Math.floor(Math.random() * max) + 1
}

async function searchPokemonById(id) {
  const res = await fetch('https://pokeapi.co/api/v2/ability/1/')
  const data = await res.json()
  console.log(data)
}

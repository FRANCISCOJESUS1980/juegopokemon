import './main.scss'
import './componentes/difficulty'
import './componentes/score'
import './componentes/startGame'
import './componentes/botones'

document.addEventListener('DOMContentLoaded', () => {
  const games = document.querySelectorAll('.game')

  // URL de música relajante
  const musicUrl =
    'https://www.bensound.com/bensound-music/bensound-relaxing.mp3'

  // Crear o recuperar el objeto de audio
  let audio = new Audio(musicUrl)
  audio.loop = true
  audio.volume = 0.5

  // Verificar si la música está en reproducción
  const isMusicPlaying = localStorage.getItem('isMusicPlaying') === 'true'

  if (isMusicPlaying) {
    audio.play().catch((error) => {
      console.error('Error al reproducir la música:', error)
    })
  }

  // Función para iniciar la música
  const startMusic = () => {
    audio.play().catch((error) => {
      console.error('Error al reproducir la música:', error)
    })
    document.removeEventListener('click', startMusic)
  }

  document.addEventListener('click', startMusic)

  games.forEach((game) => {
    game.addEventListener('click', (event) => {
      event.preventDefault()
      const url = game.getAttribute('data-url')

      // Guardar el estado de la música antes de navegar
      localStorage.setItem('isMusicPlaying', !audio.paused)

      // Navegar al nuevo juego
      window.location.href = url
    })
  })

  // Asegurarse de que la música se detenga si el usuario no la quiere
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('isMusicPlaying', !audio.paused)
  })
})

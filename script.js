// Função para verificar colisão entre dois elementos
const checkCollision = (elem1, elem2) => {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();
  
    return !(rect1.right < rect2.left ||
             rect1.left > rect2.right ||
             rect1.bottom < rect2.top ||
             rect1.top > rect2.bottom);
  };

// Array de imagens de projéteis
const projectileImages = [
  'img/control_art.gif',
  'img/salt_art.gif',
  'img/skol_art.gif',
  'img/beer_art.gif',
  'img/toremo_art.gif'
];
  
  // Função para mover o homem verticalmente
  const moveHomem = () => {
    const homem = document.getElementById('divHomem');
    const background = document.querySelector('.background');
    const maxTop = background.clientHeight - homem.clientHeight;
    let direction = 1; // 1 para baixo, -1 para cima
    

    const animate = () => {
      let top = parseFloat(homem.style.top || 250); //250 -> 0
      top += direction * 2; // Velocidade de movimento do homem
  
      if (top >= maxTop + 50) {
        direction = -1; // Muda a direção para cima
      } else if (top <= 50) {
        direction = 1; // Muda a direção para baixo
      }
  
      homem.style.top = top + 'px';
  
      requestAnimationFrame(animate); // Continua a animação
    };

      animate(); // Inicia a animação
  
  };
  
  // Função para lançar o projétil
  const launchProjectile = () => {
    const projectile = document.getElementById('projectile');
    const homme = document.getElementById('divHomem');
    const femme = document.getElementById('divMulher');

  // Seleciona aleatoriamente uma imagem de projétil do array
  const randomImage = projectileImages[Math.floor(Math.random() * projectileImages.length)];
  projectile.style.background = `url('${randomImage}') no-repeat`;
  projectile.style.backgroundSize = 'cover';
  
    // Inicializa a posição do projétil
    projectile.style.left = homme.offsetWidth + 'px'; 
    projectile.style.top = homme.offsetTop + 'px';
    projectile.style.display = 'block';
  
    let position = 0;
    const projectileSpeed = 8; // Velocidade do projétil em pixels por frame
  
    const animate = () => {
      position += projectileSpeed;
      projectile.style.left = homme.offsetWidth + position + 'px';
  
      // Verifica a colisão
      if (checkCollision(projectile, femme)) {
        if(jogoTerminado !== true){
          console.log('Colisão detectada!');
          telaGameOver()
          endGame()
        }
        projectile.style.display = 'none'; // Oculta o projétil após a colisão
      } else if (parseFloat(projectile.style.left) > window.innerWidth) {
        // Oculta o projétil se sair da tela
        projectile.style.display = 'none';
      } else {
        requestAnimationFrame(animate); // Continua a animação
      }
    };
  
    animate(); // Inicia a animação
  
    // Lançar um novo projétil aleatoriamente após um intervalo
    setTimeout(() => launchProjectile(), Math.random() * 3000 + 2000); // Intervalo aleatório entre 2s e 5s
  };
  
  // Função para mover a mulher com as teclas direcionais
  const moveMulher = () => {
    const mulher = document.getElementById('divMulher');
    const background = document.querySelector('.background');
    const moveSpeed = 10; // Velocidade de movimento da mulher em pixels
  
    // Ajusta a altura máxima que a mulher pode atingir
    const maxTop = background.clientHeight - mulher.clientHeight;
  
      const handleKeydown = (event) => {
        let top = parseFloat(mulher.style.top || 250); //250 -> 0
    
        switch(event.key) {
          case 'ArrowUp':
            // Move para cima, mas não abaixo de 0 pixels
            mulher.style.top = Math.max(top - moveSpeed, 50) + 'px';
            break;
          case 'ArrowDown':
            // Move para baixo, mas não além do limite inferior
            mulher.style.top = Math.min(top + moveSpeed, maxTop) + 'px';
            break;
        }
      };
      window.addEventListener('keydown', handleKeydown);
  
  };
  
  
  const startBtn = document.querySelector('#startBtn');
const message = document.querySelector('#message');
const homem = document.querySelector('.marido-npc');
const mulher = document.querySelector('.mulher-player');
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('startBtn');
const sobreposicao = document.getElementById('fimDeGameSobreposicao');
const timerText = document.getElementById('timerText');
const timerContainer = document.querySelector('.timer-container');

let tempoRestante = 10;
let contagemRegressivaIntervalo;
let jogoTerminado = false;

function iniciarOTimer() {
  document.getElementById('startBtn').style.display = 'none'
  if (contagemRegressivaIntervalo || jogoTerminado) return;
  contagemRegressivaIntervalo = setInterval(() => {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;

    timerElement.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    if (tempoRestante <= 0) {
      clearInterval(contagemRegressivaIntervalo);
      endGame();
    } else {
      tempoRestante--;
    }
  }, 1000);
}

function endGame() {
  jogoTerminado = true;
  clearInterval(contagemRegressivaIntervalo);
  timerElement.textContent = "00:00";
  timerContainer.style.display = 'none';
  sobreposicao.style.display = 'flex';

}

startButton.addEventListener('click', iniciarOTimer);
startButton.addEventListener('click',  iniciarJogo = () => {
  moveHomem();
  launchProjectile();
  moveMulher();
});

const tamanhoTela = window.innerHeight

function telaGameOver() {
  document.getElementById("gameOverScreen").style.display = "block"
  document.getElementById('fimDeGameSobreposicao').style.background = "linear-gradient(to bottom right, #8254a0 , #997fb2)"
  document.getElementById('botaoAgressorPreso').style.display = "none"
  document.getElementById('passarPanoBandido').style.display = "none"
}

document.getElementById("botaoAgressorPreso").addEventListener('click', function () {
  document.getElementById("winScreen").style.display = "block"
  document.getElementById('fimDeGameSobreposicao').style.background = "linear-gradient(to bottom right, #7d48c4 , #6f3ab6)"
  document.getElementById('botaoAgressorPreso').style.display = "none"
  document.getElementById('passarPanoBandido').style.display = "none"
  document.getElementById('textEnd').style.display = "none"
})

document.getElementById("passarPanoBandido").addEventListener('click',telaGameOver)
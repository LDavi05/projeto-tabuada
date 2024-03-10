// defininição das variáveis globais
let multiplicando, multiplicador, respostaCorreta, acertos = 0, erros = 0;
let tempoRestante;
let intervalo;
let multiplicacoesExibidas = new Set();

function iniciarTempo() {
  tempoRestante = 600;
  clearInterval(intervalo);

  intervalo = setInterval(() => {
    tempoRestante--;
    atualizarBarraDeTempo();
    if (tempoRestante <= 0) {
      clearInterval(intervalo);
      exibirTelaFinal();
    }
  }, 100);
}

function atualizarBarraDeTempo() {
  const timeBar = document.querySelector(".index");
  const porcentagem = (tempoRestante / 600) * 100;
  timeBar.style.width = porcentagem + "%";
}

function exibirTelaFinal() {
  const finalScreen = document.querySelector(".final_screen");
  const totalAcertos = document.querySelector(".result-number.correct");
  const totalErros = document.querySelector(".result-number.incorrect");
  
  totalAcertos.textContent = acertos;
  totalErros.textContent = erros;
  
  finalScreen.classList.add("show_with_animation");
  
  document.querySelector(".restart_btn").addEventListener("click", function () {
    //location.reload();
    acertos = 0;
    erros = 0;
    atualizarInterface()
    gerarNovaMultiplicacao();
    iniciarTempo();
    finalScreen.classList.remove("show_with_animation");
  })
}

// iniciar o jogo
document.querySelector(".start_btn").addEventListener("click", function() {
  document.querySelector(".home_screen").classList.add("hide_with_animation");
  iniciarTempo();
});

// função para gerar uma multiplicação aleatória
function gerarNovaMultiplicacao() {
  let novaMultiplicacao = false;
  while (!novaMultiplicacao) {
    multiplicando = Math.floor(Math.random() * 8) + 2;
    multiplicador = Math.floor(Math.random() * 9) + 1;
    respostaCorreta = multiplicando * multiplicador;
    
    if (!multiplicacoesExibidas.has(`${multiplicando}-${multiplicador}`)) {
      novaMultiplicacao = true;
      multiplicacoesExibidas.add(`${multiplicando}-${multiplicador}`);
      setTimeout(() => {
        multiplicacoesExibidas.delete(`${multiplicando}-${multiplicador}`);
      }, 10000)
    }
  }
  atualizarInterface();
}

// função para atualizar a interface com a nova multiplicação
function atualizarInterface() {
  document.querySelector(".number_1").textContent = multiplicando;
  document.querySelector(".number_2").textContent = multiplicador;
  document.getElementById("number_input").value = "";
  document.querySelector(".right span").textContent = acertos;
  document.querySelector(".wrong span").textContent = erros;

  document.querySelector(".current_multiplication").classList.add("multiplication_animation")

  setTimeout(() => {
    document.querySelector(".current_multiplication").classList.remove("multiplication_animation")    
  }, 200)
}

// evento para o botão OK pressionado
document.querySelector(".key-enter").addEventListener("click", function() {
  let input = parseInt(document.getElementById("number_input").value);
  if (input === respostaCorreta) {
    acertos++;
  } else {
    erros++;
    }
    
  gerarNovaMultiplicacao();
  
  function reiniciar() {
    acertos = 0;
    erros = 0;
    gerarNovaMultiplicacao();
  }
});

// Teclado funcionando
const keys = document.querySelectorAll(".key");

for (i = 0; i < keys.length; i++) {
  keys[i].addEventListener("click", function() {
    let key = this.getAttribute("data-key");
    let input = document.getElementById("number_input");
    
    if (key == "DEL") {
      input.value = input.value.slice(0, -1);
    } else if (key == "OK") {
      return;
    } else {
      input.value += key;
    }
  })
}

// Captura de eventos do teclado de computador
document.addEventListener("keydown", function(e) {
  const key = e.key;
  const numericKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const delKey = "Backspace";

  console.log(key)
  
  if (numericKeys.includes(key)) {
    document.querySelector(`.key[data-key="${key}"]`).click();
  } else if (key === delKey) {
    document.querySelector(".key-del").click();
  } else if (key === "Enter") {
    e.preventDefault();
    document.querySelector(".key-enter").click();
  }
});

gerarNovaMultiplicacao();
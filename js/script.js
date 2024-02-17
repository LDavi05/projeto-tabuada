// defininição das variáveis globais
let multiplicando, multiplicador, respostaCorreta, acertos = 0, erros = 0;

// iniciar o jogo
document.querySelector(".start_btn").addEventListener("click", function() {
  document.querySelector(".home_screen").classList.add("hide_with_animation");
});

// função para gerar uma multiplicação aleatória
function gerarNovaMultiplicacao() {
  multiplicando = Math.floor(Math.random() * 8) + 2;
  multiplicador = Math.floor(Math.random() * 9) + 1;
  respostaCorreta = multiplicando * multiplicador;
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

gerarNovaMultiplicacao();
import { gameState } from './script.js';

let tab_random = []
function question() {
  gameState.ile_pytan += 1
  fetch("pytania.json")
  .then(response => response.json())
  .then(pytanie => {
      if(tab_random.length >= pytanie.length) {
      tab_random = []
    }
      let random
      do{
      random =  Math.floor(Math.random()*(pytanie.length-1))
      }
      while(tab_random.includes(random))
      tab_random.push(random)
    document.querySelector(".which_question").innerHTML = "Question: " + gameState.ile_pytan
    document.querySelector(".pytanie").innerHTML = (pytanie[random].pytanie);
    document.querySelector(".odpowiedz1").innerHTML = (pytanie[random].odpowiedzi[0]);
    document.querySelector(".odpowiedz2").innerHTML = (pytanie[random].odpowiedzi[1]);
    document.querySelector(".odpowiedz3").innerHTML = (pytanie[random].odpowiedzi[2]);
    document.querySelector(".odpowiedz4").innerHTML = (pytanie[random].odpowiedzi[3]);

    let odpowiedzi = document.querySelectorAll('.odpowiedz1, .odpowiedz2, .odpowiedz3, .odpowiedz4');
    odpowiedzi.forEach(el => {
      el.replaceWith(el.cloneNode(true));
    });
    odpowiedzi = document.querySelectorAll('.odpowiedz1, .odpowiedz2, .odpowiedz3, .odpowiedz4');


    odpowiedzi.forEach(el => {
      el.addEventListener("click", () => {
        const clicked = el.getAttribute("data-index");
        if(clicked == pytanie[random].poprawna){
          gameState.ile_popranych += 1
          el.style.setProperty("background-color", "green");

          setTimeout(() => {
            gameState.paused = false;
            document.querySelector(".question").style.display = "none";
            el.style.setProperty("background-color", "");
          }, 500);
        } else {
          gameState.ile_blednych+=1
          el.style.setProperty("background-color", "red");
          setTimeout(()=>{
            gameState.paused = false
            document.querySelector(".question").style.display = "none";
            el.style.setProperty("background-color", "");
            gameState.licznik -=2
            document.querySelector(".licznik").innerHTML = "Number of hearts: " + gameState.licznik;
          },500)
        }
      });
    });
  })
  .catch(error => console.error(error));

  document.querySelector(".question").style.display = "block";
}

window.question = question;
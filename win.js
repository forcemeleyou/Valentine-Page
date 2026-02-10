import { gameState } from './script.js';
function fireworksOnce() {

    const duration = 1200;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 6,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 6,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}
export function win(){
    fireworksOnce();
    document.querySelector(".container").style.display = "none"
    document.querySelector(".licznik").style.display = "none"
    document.querySelector(".wygrana").style.display = "block"
    document.querySelector("#win-correct").innerHTML = gameState.ile_popranych
    document.querySelector("#win-total").innerHTML = gameState.ile_pytan
    if(gameState.ile_popranych == gameState.ile_pytan){
        document.querySelector(".evrything_well").style.display = "block"
    }

}
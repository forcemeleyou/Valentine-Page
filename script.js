const container = document.querySelector(".container");
const containerPosition = container.getBoundingClientRect();


function addheart() {
  let left = Math.floor(Math.random() * (containerPosition.width - 40));
  let top = Math.floor(Math.random() * (containerPosition.height - 40));

  left = Math.floor(left / 30) * 30;
  top = Math.floor(top / 30) * 30;

  let heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = left + "px";
  heart.style.top = top + "px";
  heart.innerHTML = `<img src="favicon.png">`;

  container.appendChild(heart);

  return { top: top, left: left };
}


export let gameState = {
  paused: false,
  licznik: 0
};

export function game() {
  gameState.licznik = 0;
  gameState.paused = false;
  document.querySelector(".licznik").innerHTML = "Number of hearts: " + gameState.licznik;
  document.querySelectorAll(".snake_segment").forEach(seg => seg.remove());
  document.querySelector(".heart")?.remove();
  document.querySelector(".start").style.display = "none";
  document.querySelector(".end").style.display = "none";

  for (let i = 0; i < 10; i++) {
    let snake_segment = document.createElement("div");
    snake_segment.classList.add("snake_segment");
    container.appendChild(snake_segment);
  }
  let snake_head = document.createElement("div");
  snake_head.classList.add("snake_head");
  snake_head.classList.add("snake_segment");
  container.appendChild(snake_head);

  let direction = "right";
  let positions = [
    { x: 200, y: 300 },
    { x: 230, y: 300 },
    { x: 260, y: 300 },
    { x: 290, y: 300 },
    { x: 320, y: 300 },
    { x: 350, y: 300 },
    { x: 380, y: 300 },
    { x: 410, y: 300 },
    { x: 440, y: 300 },
    { x: 470, y: 300 },
    { x: 500, y: 300 },
  ];
  let segments = document.querySelectorAll(".snake_segment");
  let speed = 30;

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction !== "down") {
      direction = "up";
    } else if (e.key === "ArrowDown" && direction !== "up") {
      direction = "down";
    } else if (e.key === "ArrowLeft" && direction !== "right") {
      direction = "left";
    } else if (e.key === "ArrowRight" && direction !== "left") {
      direction = "right";
    }
  });

  segments.forEach((segment, index) => {
    segment.style.left = positions[index].x + "px";
    segment.style.top = positions[index].y + "px";
  });

  let interval = setInterval(() => {
    if (gameState.paused) {
      return;
    }

    let head = {
      x: positions[positions.length - 1].x,
      y: positions[positions.length - 1].y,
    };

    if (direction == "up") {
      head.y -= speed;
      document.querySelector(".snake_head").style.setProperty("border-radius", "10px 10px 0px 0px");
    } else if (direction == "down") {
      head.y += speed;
      document.querySelector(".snake_head").style.setProperty("border-radius", "0px 0px 10px 10px");
    } else if (direction == "left") {
      head.x -= speed;
      document.querySelector(".snake_head").style.setProperty("border-radius", "10px 0px 0px 10px");
    } else if (direction == "right") {
      head.x += speed;
      document.querySelector(".snake_head").style.setProperty("border-radius", "0px 10px 10px 0px");
    }

    positions.push(head);
    positions.shift();

    segments.forEach((segment, index) => {
      segment.style.left = positions[index].x + "px";
      segment.style.top = positions[index].y + "px";
    });

    let heart = document.querySelector(".heart");
    if(heart) {
      let heartRect = heart.getBoundingClientRect();
      let heartTop = heartRect.top - containerPosition.top;
      let heartLeft = heartRect.left - containerPosition.left;

      if(Math.abs(head.x - heartLeft) < 25 && Math.abs(head.y - heartTop) < 25){
        heart.remove();
        gameState.licznik++;
        document.querySelector(".licznik").innerHTML = "Number of hearts: " + gameState.licznik;
        addheart();

        if(gameState.licznik % 4 == 0) {
          gameState.paused = true;
          if(typeof question !== 'undefined') {
            question();
          }
        }
      }
    }

    if(head.x < 0 || head.x > containerPosition.width - 30 || head.y < 0 || head.y > containerPosition.height - 30) {
      clearInterval(interval);
      document.querySelector(".end").style.display = "block";
      document.querySelector(".heart")?.remove();
    }
  }, 150);

  addheart();
}


window.game = game;
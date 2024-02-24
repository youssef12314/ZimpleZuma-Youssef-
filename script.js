
window.addEventListener("load", start);



function start() {
console.log(`Started`);
    
test_createBalls();
    
reloadCannon();
}


function test_createBalls() {
    addBallToChain(createBallElement(1));
    addBallToChain(createBallElement(2));
    addBallToChain(createBallElement(3));
    addBallToChain(createBallElement(4));
    addBallToChain(createBallElement(5));
    addBallToChain(createBallElement(6));
  }
  
function reloadCannon() {
    const balltype = Math.ceil(Math.random()*6); 
    loadCannonWithBall(createBallElement(balltype));
}
  
  
  function clickBall(event) {
    console.log('Clicked ball');
  
    const side = event.offsetX / event.target.offsetWidth < .5 ? "before" : "after";
  
    const newBall = cannonBall;
  
    const source = newBall.getBoundingClientRect();

    const existingBall = event.target.parentElement;
    if(side === "before") {
      existingBall.parentNode.insertBefore(newBall, existingBall);
    } else {
      existingBall.parentNode.insertBefore(newBall, existingBall.nextElementSibling);
    }

    const img = newBall.firstElementChild;
    const dest = img.getBoundingClientRect();
    
    const deltaX = source.x - dest.x;
    const deltaY = source.y - dest.y;

    img.style.setProperty("--delta-x", deltaX + "px");
    img.style.setProperty("--delta-y", deltaY + "px");
    img.classList.add("animatefromcannon");
    newBall.classList.add("expand");
  
    newBall.addEventListener("animationend", animationComplete);
  
    function animationComplete() {
      newBall.removeEventListener("animationend", animationComplete);
      newBall.classList.remove("expand");
      img.classList.remove("animatefromcannon");
      img.style.removeProperty("--delta-x");
      img.style.removeProperty("--delta-y");
  
      makeBallClickable(newBall);
  
      reloadCannon();
    }
  }


  function createBallElement(balltype) {
    const ball = document.createElement("div");
    ball.className = "ball";
    const img = document.createElement("img");
    img.src = `images/marble${balltype}.png`;
    img.dataset.balltype = balltype;
    ball.dataset.balltype = balltype;
    ball.appendChild(img);
    return ball;
  }

  
function addBallToChain(ball) {
    document.querySelector("#balls").appendChild(ball);
    makeBallClickable(ball)
}

function removeBallsFromChain(balls) {
    balls.forEach(ball => {
      ball.classList.add("remove");
      requestAnimationFrame( () => ball.addEventListener("animationend", removeElement));
      function removeElement() {
        ball.removeEventListener("animationend", removeElement);
        ball.remove();
      }
    });
}
  
function makeBallClickable(ball) {
    ball.querySelector("img").addEventListener("click", clickBall);
  }
  

  let cannonBall = null;


function loadCannonWithBall(newCannonBall) {
cannonBall = newCannonBall;
document.querySelector("#cannon").appendChild(cannonBall);
}
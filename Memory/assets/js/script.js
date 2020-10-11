const FRONT = "card-front";
const BACK = "card-back";
const CARD = "card";
const ICON = "icon";
const FLIP = "flip";




startGame();

function startGame() {

    initializeCards(game.createCardsFromTechs());
}

function initializeCards(cards) {
    let gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    game.cards.forEach((card) => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', FlipCard);
        gameBoard.appendChild(cardElement);
    });
}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}   

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if(face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    }else{
        cardElementFace.innerHTML = "<img src='./assets/images/jogo.png' height='50px' width='50px' alt='memory'>";
    }
    element.appendChild(cardElementFace);
}




function FlipCard() {

    if(game.setCard(this.id)) {

        this.classList.add(FLIP)
        if(game.secondCard) {
            if(game.checkMatch()) {
                game.clearCards();
                if(game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("game-over");
                    gameOverLayer.style.display = 'flex';
                }
            }else{
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove(FLIP);
                    secondCardView.classList.remove(FLIP);
                    game.unflipCards();
                }, 1000);
            }

        }
    }
    
}

function restart() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("game-over");
    gameOverLayer.style.display = 'none';
}
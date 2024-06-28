
const colors = ["red", "purple", "green", "blue", "orange", "skyblue", "brown", "magenta", "lightseagreen"];
let cardsColors = [];
let cardPairs = null;
let activeCard = null;
let activeCards = [];
let gameResult = 0;
let cards = null;
let startTime = null;
const playButton = document.querySelector(".modal-button");

function renderGameArea(numberOfCards) {
        let gameArea = document.querySelector(".game-area");

        while (gameArea.hasChildNodes()) gameArea.removeChild(gameArea.lastChild);
            
        for (let i=0; i<numberOfCards; i++) {
            console.log(i, numberOfCards, 2);
            gameArea.appendChild(document.createElement("div"));
        }
    }

    function shuffleCards(cards) {
        
        cards.forEach(card => {
            const index = Math.floor(Math.random()*cardsColors.length);
            card.classList.add(cardsColors[index]);
            cardsColors.splice(index, 1);
        })
    }

    function reverseCards(cards) {
        cards.forEach(card => {
            card.classList.add("reverse");
        })
    }

    function addListeners(cards) {
        cards.forEach(card => {
            card.addEventListener("click", clickCard);
        })
    }

    function showResult() {
        const endTime = new Date().getTime();
        const yourTime = Math.round((endTime - startTime)/1000);
        const timeSec = yourTime%60;
        const timeMin = (yourTime - timeSec)/60;
        document.querySelector(".modal").classList.toggle("hide");
        let infoText = document.querySelector(".modal-text")
        infoText.innerHTML = `You won!</br> Your time: ${timeMin} min and ${timeSec} sec`
    }

    const clickCard = function() {
        activeCard = this;
        activeCard.classList.remove("reverse");
        activeCard.removeEventListener("click", clickCard);

        if (activeCards.length === 0) {
            activeCards.push(activeCard);
            return;
        } else {

            activeCards.push(activeCard);
            cards.forEach(card => card.removeEventListener("click", clickCard))
            setTimeout(function() {
                if (activeCards[0].className === activeCards[1].className) {
                    //console.log("The same colors");
                    activeCards.forEach(card => {
                        card.classList.add("off");
                        cards = cards.filter(item => item !== card);
                    }); 
                    gameResult++;
                    //console.log(gameResult, "/", cardPairs);
                    if (gameResult == cardPairs) showResult() 
                    
                } else {
                    activeCards.forEach(card => card.classList.add("reverse"));
                }
                activeCard = "";
                activeCards = [];
                cards.forEach(card => card.addEventListener("click", clickCard)); 
            }, 1000);   
        }       
    }

    function init() {
        
        cardsColors = colors.flatMap(item => [item, item]);
        cardPairs = cardsColors.length/2;
        activeCard = null;
        activeCards = [];
        gameResult = 0;
        cards = null;
        startTime = null;

        document.querySelector(".modal").classList.toggle("hide");

        let numberOfCards = cardsColors.length;
        renderGameArea(numberOfCards);
        cards = [...document.querySelectorAll(".game-area div")];
        shuffleCards(cards);
        setTimeout(() => {
            reverseCards(cards);
        }, 1500);
        addListeners(cards);
        startTime = new Date().getTime();
    }

playButton.addEventListener("click", init);
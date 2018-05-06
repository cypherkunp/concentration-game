/*
 * Create a list that holds all of your cards
 */
var cardList = [
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bicycle',
    'fa-diamond',
    'fa-bomb',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bicycle',
    'fa-diamond',
    'fa-bomb'
];
var cardSelected = [];
var showCounter = 0;
var totalMoves = 0;
var matchFound = false;

$(document).ready(function () {
    startGame();
});

function bindEvent() {
    $('.card').click(function () {
        debugger;
        $(this).addClass('open show');
    });
}

function renderCards() {
    for (let i = 0; i < cardList.length; i++) {
        $('.deck').append(`<li class="card"><i class="fa ${cardList[i]}"></i></li>`);
    }
}

function startGame() {
    shuffle(cardList);
    renderCards();
    bindEvent();
}

/*
 * shuffles the list of cards
 * Shuffle function from http://stackoverflow.com/a/2450976
 */
function shuffle(cardList) {
    var currentIndex = cardList.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardList[currentIndex];
        cardList[currentIndex] = cardList[randomIndex];
        cardList[randomIndex] = temporaryValue;
    }

    return cardList;
}

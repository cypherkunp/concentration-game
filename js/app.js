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
var lastSelectedElement = null;
var totalMoves = 0;

$(document).ready(function () {
    startGame();
});

function onClickEvent() {
    updateTotalMoves();
    thisElement = this;
    if (!lastSelectedElement) {
        lastSelectedElement = this;
        $(thisElement).addClass('open show');
        $(thisElement).off('click');
        console.log('First card selected ' + thisElement.firstChild.id);
    } else {
        matchingEngine(thisElement);
    }
}

function matchingEngine(thisElement) {
    if (thisElement.firstChild.className == lastSelectedElement.firstChild.className) {
        $(thisElement).addClass('open show');
        $(thisElement).off('click');
        console.log('Match found ' + lastSelectedElement.firstChild.id + " & " + thisElement.firstChild.id);
        lastSelectedElement = null;
    } else {
        $(thisElement).addClass('open show');
        setTimeout(() => {
            $(thisElement).removeClass('open show');
            $(lastSelectedElement).removeClass('open show');
            $(lastSelectedElement).on('click', onClickEvent);
            console.log('Match not found ' + lastSelectedElement.firstChild.id + " & " + thisElement.firstChild.id);
            lastSelectedElement = null;
        }, 500);

    }
}

function renderCards() {
    for (let i = 0; i < cardList.length; i++) {
        $('.deck').append(`<li class="card"><i id="card-${i}" class="fa ${cardList[i]}"></i></li>`);
    }
}

function updateTotalMoves() {
    totalMoves++;
    $('#moves-counter').text(totalMoves);
}

function startGame() {
    totalMoves = 0;
    shuffle(cardList);
    renderCards();
    $('.card').click(onClickEvent);
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

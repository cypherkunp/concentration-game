$(document).ready(function () {
    initializeGame();
});

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
var totalMatchFound = 0;

function initializeGlobalVariables() {
    lastSelectedElement = null;
    totalMoves = 0;
    totalMatchFound = 0;
}

function matchFound() {
    totalMatchFound++;
    if(totalMatchFound === 8){
        $.dialog({
            title: 'Awesome!',
            content: `You were able to match all the cards in ${totalMoves} moves`,
            theme: 'supervan',
            escapeKey: true,
            backgroundDismiss: true
        });
    }
}

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
        $(thisElement).addClass('open show match');
        $(lastSelectedElement).addClass('match');
        $(thisElement).off('click');
        console.log('Match found ' + lastSelectedElement.firstChild.id + " & " + thisElement.firstChild.id);
        matchFound();
        lastSelectedElement = null;
    } else {
        $(thisElement).addClass('open show nomatch');
        $(lastSelectedElement).addClass('nomatch');
        setTimeout(() => {
            $(thisElement).removeClass('open show nomatch');
            $(lastSelectedElement).removeClass('open show nomatch');
            $(lastSelectedElement).on('click', onClickEvent);
            console.log('Match not found ' + lastSelectedElement.firstChild.id + " & " + thisElement.firstChild.id);
            lastSelectedElement = null;
        }, 800);

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

function initializeGame() {
    $('#restart-game-icon').click(startGame);
    $('#play-game-icon').click(startGame);
    $.dialog({
        title: 'Hey there!',
        content: 'Click on start button to play the game.',
    });
}

function startGame() {
    initializeGlobalVariables();
    $('#deck').empty();
    $('#moves-counter').text(0);

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

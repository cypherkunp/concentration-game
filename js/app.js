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
     renderCards();
     bindEvent();
}

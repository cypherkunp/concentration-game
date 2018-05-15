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
var selectedElements = [];
var totalMoves = 0;
var totalMatchFound = 0;
var starRating = 0;
// timer object
var timer = new Timer();

function initializeGlobalVariables() {
    selectedElements = [];
    totalMoves = 0;
    totalMatchFound = 0;
    starRating = 0;
}

/**
 * Function that verifies whether the cards selected match of not.
 */
function matchFound() {
    totalMatchFound++;
    if (totalMatchFound === 8) {
        timer.pause();
        $.dialog({
            title: 'Awesome!',
            content: `You were able to match all the cards in <h3>${totalMoves} 
            moves</h3> and with <h3>${starRating} star rating</h3> and in ${timer.getTimeValues().toString()} time`,
            theme: 'supervan',
            escapeKey: true,
            backgroundDismiss: true,
            onClose: function () {
                timer.stop();
            }
        });
    }
}

function onClickEvent() {
    if (selectedElements.length == 0) {
        selectedElements.push($(this));
        $(selectedElements[0]).addClass('open show');
        $(selectedElements[0]).off('click');
    } else if (selectedElements.length == 1) {
        selectedElements.push($(this));
        matchingEngine();
    }
}

/**
 * Function that matches the last two selected cards.
 */
function matchingEngine() {
    updateScoreBoard();
    if (selectedElements[0][0].firstChild.className == selectedElements[1][0].firstChild.className) {
        $(selectedElements[1]).addClass('open show match');
        $(selectedElements[0]).addClass('match');
        $(selectedElements[1]).off('click');
        matchFound();
        selectedElements = [];
    } else {
        $(selectedElements[1]).addClass('open show nomatch');
        $(selectedElements[0]).addClass('nomatch');
        setTimeout(() => {
            $(selectedElements[1]).removeClass('open show nomatch');
            $(selectedElements[0]).removeClass('open show nomatch');
            $(selectedElements[0]).on('click', onClickEvent);
            selectedElements = [];
        }, 800);
    }
}

/**
 * Function to render the cards on the screen.
 */
function renderCards() {
    for (let i = 0; i < cardList.length; i++) {
        $('.deck').append(`<li class="card"><i id="card-${i}" class="fa ${cardList[i]}"></i></li>`);
    }
}

/**
 * Updates the game score board that comprises of stars and moves.
 */
function updateScoreBoard() {
    totalMoves++;
    $('#moves-counter').text(totalMoves);
    if (totalMoves > 15 && totalMoves <= 20) {
        setStars(2);
    } else if (totalMoves > 20) {
        setStars(1);
    }
}

/**
 * Function to set the stars based on the no of moves on the score board.
 * @param count 
 */
function setStars(count) {
    starRating = count;
    $('#stars').empty();
    for (var i = 0; i < count; i++) {
        $('#stars').append('<li><i class="fa fa-star"></i></li>');
    }
    for (let i = count; i < 3; i++) {
        $('#stars').append('<li><i class="fa fa-star-o"></i></li>');
    }
}

/**
 * Function that's called when the page loads.
 */
function initializeGame() {
    $('#restart-game-icon').click(startGame);
    $('#play-game-icon').click(startGame);
    $.dialog({
        title: 'Hey there!',
        content: 'Click on start button to play the game.',
        escapeKey: true,
        backgroundDismiss: true
    });
    timer.addEventListener('secondsUpdated', function (e) {
        $('#timer').html(timer.getTimeValues().toString());
    });
}

/**
 * Function to start the game.
 */
function startGame() {

    initializeGlobalVariables();
    setStars(3);
    $('#deck').empty();
    $('#moves-counter').text(0);

    shuffle(cardList);
    renderCards();
    $('.card').click(onClickEvent);

    try {
        timer.start();
    } catch (error) {
        if (error.message.includes("Timer already running")) {
            timer.stop();
            timer.start();
        }
    }
    $('#timer').html("00:00:00");
}

/**
 * Function to reset the game.
 */
function resetGame() {
    timer.stop();
    startGame();
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
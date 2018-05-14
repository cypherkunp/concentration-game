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
var starRating = 0;

// timer object
var timer = new Timer();

function initializeGlobalVariables() {
    lastSelectedElement = null;
    totalMoves = 0;
    totalMatchFound = 0;
    starRating = 0;
}

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
    updateTotalMoves();
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
    if (totalMoves > 15 && totalMoves <= 20) {
        setStars(2);
    } else if (totalMoves > 20) {
        setStars(1);
    }
}

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
        debugger;
        if (error.message.includes("Timer already running")){
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
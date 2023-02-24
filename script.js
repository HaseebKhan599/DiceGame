'use strict';

//             html elements saved in variables
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');

const player1 = document.querySelector('.player--0');
const nameP1 = document.querySelector('#name--0');
const totalScoreTextP1 = document.querySelector('#score--0');
const currentScoreP1 = document.querySelector('#current--0');

const player2 = document.querySelector('.player--1');
const nameP2 = document.querySelector('#name--1');
const totalScoreTextP2 = document.querySelector('#score--1');
const currentScoreP2 = document.querySelector('#current--1');

let activePlayer = player1;
let totalScoreP1 = 0;
let totalScoreP2 = 0;
let diceNumber = 0;
let playing = true;
// let winner = 0;

const switchPlayer = function (activeP, inactiveP) {
    activeP.classList.remove('player--active');
    inactiveP.classList.add('player--active');
    currentScoreP1.textContent = 0;
    currentScoreP2.textContent = 0;
    activePlayer = inactiveP;
}

btnRoll.addEventListener('click', function () {
    //          Dice Roll
    if (playing) {
        diceNumber = Math.trunc(Math.random() * 6 + 1);
        dice.getAttributeNode('src').value = `dice-${diceNumber}.png`;
        dice.classList.remove('hidden');

        if (activePlayer == player1 && diceNumber != 1) {
            currentScoreP1.textContent = diceNumber;
        } else if (activePlayer == player2 && diceNumber != 1) {
            currentScoreP2.textContent = diceNumber;
        } else if (diceNumber === 1) {
            if (activePlayer == player1) {
                switchPlayer(player1, player2);
            } else {
                switchPlayer(player2, player1);
            }
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        if (activePlayer == player1) {
            totalScoreP1 += Number(currentScoreP1.textContent);
            totalScoreTextP1.textContent = totalScoreP1;
            switchPlayer(player1, player2);
            if (totalScoreP1 >= 100) {
                // winner = 1;
                player1.classList.add('player--winner');
                nameP1.textContent += ' Wins!';
                playing = 0;
            } else {
                switchPlayer(player1, player2);
            }
        } else {
            totalScoreP2 += Number(currentScoreP2.textContent);
            totalScoreTextP2.textContent = totalScoreP2;
            switchPlayer(player2, player1);
            if (totalScoreP2 >= 100) {
                // winner = 2;
                player2.classList.add('player--winner');
                nameP2.textContent += ' Wins!';
                playing = 0;
            } else {
                switchPlayer(player2, player1);
            }
        }
    }
});

btnNew.addEventListener('click', function () {
    playing = 1;
    totalScoreP1 = 0;
    totalScoreP2 = 0;
    diceNumber = 0;
    activePlayer = player1;
    currentScoreP1.textContent = 0;
    currentScoreP2.textContent = 0;
    totalScoreTextP1.textContent = 0;
    totalScoreTextP2.textContent = 0;
    nameP1.textContent = 'Player 1';
    nameP2.textContent = 'Player 2';
    dice.classList.add('hidden');
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
});


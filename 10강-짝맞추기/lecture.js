"use strict";
const horizontal = 4;
const vertical = 3;
const colors = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];
let colorCandidate = colors.slice();
let color = [];
let clickFlag = true;
let clickCard = [];
let completedCard = [];
let startTime = null;
function shuffle() {
    for (let i = 0; colorCandidate.length > 0; i += 1) {
        //피셔 예이츠 셔플 알고리즘
        color = color.concat(colorCandidate.splice(Math.floor(Math.random() * colorCandidate.length), 1));
    }
}
function setCard(horizontal, vertical) {
    clickFlag = false;
    for (let i = 0; i < horizontal * vertical; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = color[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        card.addEventListener('click', function () {
            console.log('aaaa');
            if (clickFlag && !completedCard.includes(this)) {
                this.classList.toggle('flipped');
                clickCard.push(this);
                if (clickCard.length == 2) {
                    const firstBackgroud = clickCard[0].querySelector('.card-back').style.backgroundColor;
                    const secondBackgroud = clickCard[1].querySelector('.card-back').style.backgroundColor;
                    if (firstBackgroud === secondBackgroud) {
                        completedCard.push(clickCard[0]);
                        completedCard.push(clickCard[1]);
                        clickCard = [];
                        if (completedCard.length === horizontal * vertical) {
                            const endTime = new Date().getTime();
                            alert(`축하합니다.! ${(endTime - startTime.getTime()) / 1000}초 걸렸습니다.`);
                            //const a = document.querySelector('#wrapper')!.innerHTML;  //확신할경우
                            //const a = document.querySelector('#wrapper')?.innerHTML;  //확신할수 없을 경우    undefined
                            document.querySelector('#wrapper').innerHTML = '';
                            colorCandidate = colors.slice();
                            color = [];
                            completedCard = [];
                            startTime = null;
                            shuffle();
                            setCard(horizontal, vertical);
                        }
                    }
                    else {
                        clickFlag = false;
                        setTimeout(() => {
                            clickCard[0].classList.remove('flipped');
                            clickCard[1].classList.remove('flipped');
                            clickFlag = true;
                            clickCard = [];
                        }, 1000);
                    }
                }
            }
        });
        document.querySelector('#wrapper').appendChild(card);
    }
    Array.prototype.forEach.call(document.getElementsByClassName('card'), (card, index) => {
        setTimeout(() => {
            card.classList.add('flipped');
        }, 100 + 100 * index);
    });
    setTimeout(() => {
        Array.prototype.forEach.call(document.getElementsByClassName('card'), (card, index) => {
            card.classList.remove('flipped');
        });
        clickFlag = true;
        startTime = new Date();
    }, 5000);
}
shuffle();
setCard(horizontal, vertical);

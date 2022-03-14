import { Sub, Hero } from './types';
//import * as  A from './common.d'   //이거 안됨.. ㅠㅠ
function isSub(data) {
    if (data.cost) {
        return true;
    }
    return false;
}
function isHero(data) {
    if (data.hero) {
        return true;
    }
    return false;
}
/*
interface Example {
    (a:number, b:number ):number
}
const ex: Example = (a,b)=>a+b;
속성뿐 아니라, 함수, 객체도 인터페이스로 표현할수있다.

interface Example {
    add: (a:number, b:number ) =>number
}
const ex: Example = {
    add:(a,b)=>{
        return a+b;
    }
}
객체 표현으로는 잘 사용하지 않는다.
*/
/*제너릭 설명 */
/*
function add(a:string,b:string ):string{
    return a+b;
}

function add(a:number,b:number ):number{
    return a+b;
}
이런거 안된다.
function add(a:number|string,b:number |string):number|string{
    return a+b;
}
그래서 이런거 생각해볼쑤있는데  안된다.

interface obj<T>{
    add: (a:T,b:T)=>T;
}
const a:obj<number> = {
    add:(a,b)=>a+b
}

const b:obj<string> = {
    add:(a,b)=>a+b
}
a.add(1,2);
a.add('a','b'); //에러

b.add('a','b');
b.add(1,2); //에러

어디에 쓸지는 이해가 안된다. java는 명확한데..
*/
/*

extends가 제너릭에서 제한이라는 의미로  아래는  이제 T 를 number로 하면 에러가 발행한다.
string으로 제한하였으므로
interface obj<T extends string>{
    add: (a:T,b:T)=>T;
}
const b:obj<string> = {
    add:(a,b)=>a+b
}

const a:obj<number> = {
    add:(a,b)=>a+b
}
*/
['a', 'b', 'c'].forEach((item) => {
    console.log(item);
});
function forEach(arr, callback) {
    /*
    용어설명 predicate  =>  true,false를 반환하는 콜백함수를 부를때 쓴다.
    */
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        callback(arr[i]);
    }
}
forEach(['1', '2', '3'], (item) => {
});
const opponent = {
    hero: document.getElementById('rival-hero'),
    deck: document.getElementById('rival-deck'),
    field: document.getElementById('rival-cards'),
    cost: document.getElementById('rival-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null,
};
const me = {
    hero: document.getElementById('my-hero'),
    deck: document.getElementById('my-deck'),
    field: document.getElementById('my-cards'),
    cost: document.getElementById('my-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null,
};
const turnButton = document.getElementById('turn-btn');
let turn = true; //true 면 내턴, false면 상대턴
function initiate() {
    [opponent, me].forEach((item) => {
        item.deckData = [];
        item.heroData = null;
        item.fieldData = [];
        item.chosenCard = null;
        item.chosenCard = null;
    });
    createDeck({ mine: true, count: 5 });
    createDeck({ mine: false, count: 5 });
    createHero({ mine: false });
    createHero({ mine: true });
    redrawScreen({ mine: false });
    redrawScreen({ mine: true });
}
initiate();
function createDeck({ mine, count }) {
    const player = mine ? me : opponent;
    for (let i = 0; i < count; i++) {
        player.deckData.push(new Sub(mine));
    }
    redrawDeck(player);
}
function createHero({ mine }) {
    const player = mine ? me : opponent;
    player.heroData = new Hero(mine);
    connectCardDOM({ data: player.heroData, DOM: player.hero, hero: true });
}
function connectCardDOM({ data, DOM, hero = false }) {
    const cardEl = document.querySelector('.card-hidden .card').cloneNode(true);
    cardEl.querySelector('.card-att').textContent = String(data.att);
    cardEl.querySelector('.card-hp').textContent = String(data.hp);
    if (hero) {
        cardEl.querySelector('.card-cost').style.display = 'none';
        const name = document.createElement('div');
        name.textContent = '영웅';
        cardEl.appendChild(name);
    }
    else {
        cardEl.querySelector('.card-cost').textContent = String(data.cost);
    }
    cardEl.addEventListener('click', () => {
        if (isSub(data) && data.mine === turn && !data.field) { //쫄병이면   , 내턴이면, 필드에 없다면
            if (!deckToField({ data })) { //덱에 새로운 쫄병하나 추가
                createDeck({ mine: turn, count: 1 }); //덱에 세로운 쫄병하나 추가
            }
        }
        turnAction({ cardEl, data });
    });
    DOM.appendChild(cardEl);
}
function redrawScreen({ mine }) {
    const player = mine ? me : opponent;
    redrawField(player);
    redrawDeck(player);
    redrawHero(player);
}
function redrawHero(target) {
    if (!target.heroData) {
        throw new Error('heroData가 없습니다.');
    }
    target.hero.innerHTML = '';
    //connectCardDOM({data:target.heroData!,DOM:target.hero,hero:true})
    connectCardDOM({ data: target.heroData, DOM: target.hero, hero: true }); //느낌표를 없애려고 if(!target.heroData){throw new Error('heroData가 없습니다.')} 를 추가함
}
function redrawDeck(target) {
    target.deck.innerHTML = '';
    target.deckData.forEach((data) => {
        connectCardDOM({ data, DOM: target.deck });
    });
}
function redrawField(target) {
    target.field.innerHTML = '';
    target.fieldData.forEach((data) => {
        connectCardDOM({ data, DOM: target.field });
    });
}
function deckToField({ data }) {
    const target = turn ? me : opponent;
    const currentCost = Number(target.cost.textContent);
    if (currentCost < data.cost) {
        alert('코스트가 모자릅니다.');
        return true;
    }
    data.field = true;
    const idx = target.deckData.indexOf(data);
    target.deckData.splice(idx, 1);
    target.fieldData.push(data);
    redrawDeck(target);
    redrawField(target);
    target.cost.textContent = String(currentCost - data.cost); //남은코스트 줄이기
    return false;
}
function turnAction({ cardEl, data }) {
    const team = turn ? me : opponent; // 지금 턴의 편
    const enemy = turn ? opponent : me; // 그 상대 편
    if (cardEl.classList.contains('card-turnover')) { // 턴이 끝난 카드면 아무일도 일어나지 않음
        return;
    }
    const enemyCard = turn ? !data.mine : data.mine;
    if (enemyCard && team.chosenCardData) { // 선택한 카드가 있고 적군 카드를 클릭한 경우 공격 수행
        data.hp = data.hp - team.chosenCardData.att;
        if (data.hp <= 0) { // 카드가 죽었을 때
            if (isSub(data)) { // 쫄병이 죽었을 때
                const index = enemy.fieldData.indexOf(data);
                enemy.fieldData.splice(index, 1);
            }
            else { // 영웅이 죽었을 때
                alert('승리하셨습니다!');
                initiate();
            }
        }
        redrawScreen({ mine: !turn }); // 상대 화면 다시 그리기
        if (team.chosenCard) { // 클릭 해제 후 카드 행동 종료
            team.chosenCard.classList.remove('card-selected');
            team.chosenCard.classList.add('card-turnover');
        }
        team.chosenCard = null;
        team.chosenCardData = null;
        return;
    }
    else if (enemyCard) { // 상대 카드면
        return;
    }
    if (data.field) { // 카드가 필드에 있으면
        //  영웅 부모와 필드카드의 부모가 다르기때문에 document에서 모든 .card를 검색한다
        // 카드.parentNode.querySelectorAll('.card').forEach(function (card) {
        document.querySelectorAll('.card').forEach(function (card) {
            card.classList.remove('card-selected');
        });
        console.log(cardEl);
        cardEl.classList.add('card-selected');
        team.chosenCard = cardEl;
        team.chosenCardData = data;
    }
}
turnButton.addEventListener('click', function () {
    const target = turn ? me : opponent;
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
    redrawField(target);
    redrawHero(target);
    turn = !turn; // 턴을 넘기는 코드
    if (turn) {
        me.cost.textContent = '10';
    }
    else {
        opponent.cost.textContent = '10';
    }
});

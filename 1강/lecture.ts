let numberOne = Math.ceil(Math.random() *9);
let numberTwo = Math.ceil(Math.random() *9);
let result = numberOne * numberTwo;
let string  = ' hello';
let boolean = true;

const word = document.createElement('div');
word.textContent=`${String(numberOne)}  곱하기 ${numberTwo}는?`;
document.body.append(word);
const form = document.createElement('form');
document.body.append(form);

const input = document.createElement('input');
input.type ='number';
form.appendChild(input);

const button = document.createElement('button');
button.textContent = '입력!';
form.appendChild(button);

const resultDiv = document.createElement('div');
document.body.appendChild(resultDiv);

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(result === Number(input.value) ) {
        resultDiv.textContent = `딩동댕`;
        numberOne = Math.ceil(Math.random()*9);
        numberTwo = Math.ceil(Math.random()*9);
        result = numberOne * numberTwo;
        word.textContent=`${String(numberOne)}  곱하기 ${numberTwo}는?`;
        input.focus();
    } else {
        resultDiv.textContent =`땡`;
        input.value='';
        input.focus();
    }

})


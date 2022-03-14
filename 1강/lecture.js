var numberOne = Math.ceil(Math.random() * 9);
var numberTwo = Math.ceil(Math.random() * 9);
var result = numberOne * numberTwo;
var string = ' hello';
var boolean = true;
var word = document.createElement('div');
word.textContent = "".concat(String(numberOne), "  \uACF1\uD558\uAE30 ").concat(numberTwo, "\uB294?");
document.body.append(word);
var form = document.createElement('form');
document.body.append(form);
var input = document.createElement('input');
input.type = 'number';
form.appendChild(input);
var button = document.createElement('button');
button.textContent = '입력!';
form.appendChild(button);
var resultDiv = document.createElement('div');
document.body.appendChild(resultDiv);
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (result === Number(input.value)) {
        resultDiv.textContent = "\uB529\uB3D9\uB315";
        numberOne = Math.ceil(Math.random() * 9);
        numberTwo = Math.ceil(Math.random() * 9);
        result = numberOne * numberTwo;
        word.textContent = "".concat(String(numberOne), "  \uACF1\uD558\uAE30 ").concat(numberTwo, "\uB294?");
        input.focus();
    }
    else {
        resultDiv.textContent = "\uB561";
        input.value = '';
        input.focus();
    }
});

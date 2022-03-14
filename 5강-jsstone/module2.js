const hello='module';

module.exports = function (){
    console.log('aaa')
}

/*
exports.a ='b';
exports.b =false;

module.exports = hello;
*/

/*
exports랑 module.exports는 같은거라 하나만 써야한다.
2개 쓰면 하나가 사라져버린다.


es2015에서는 이걸 해결하기위해 
export 라는 문법이 생겼다.
*/
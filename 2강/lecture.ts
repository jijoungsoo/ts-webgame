let num: number;
num =3;
let str: string = String(num);

/*
Number,String, Object 이건  대문자로 시작되는건 기존에 있던 객체이다.
typescript에서  선언은 number, string 등은 소문자이다.  이거랑 위에거는 다른거다.
*/

/* 배열 표기법  아래 2개 동일하다.  */
let arr: number[] = [1,2,3];
let arr2: Array<number> = [1,2,3]
/* 배열이 같은 타입만 아니라 다른 타입이 들어갈 수 도 있다. 
    아래 처럼 쓰면되고 순서는 중요하지 않다.
*/
let arr3: (string | number | boolean)[] = [true,2,'3']
/* 타입을 완전히 고정시킬수도 있다. 요소갯수도 3개로 고정되고 자료형도 고정된다. -- 이것을 Tuple이라고 부른다. */
let arr4: [boolean,number,string] = [true,2,'3']
/*배열의 특정 부분을 특정값으로 고정할수도 있다. 가운데는 1만 들어갈 수 있다. */
let arr5: [boolean,1,string] = [true,1,'3']
/*  자료형을 안써주면 타입추론을 한다. */
let arr6 = [true,1,'3']

/* 배열을 상수처럼 쓰고 싶다. */
let arr7 = [true,2,'3'] as const; // 배열을 수정하지 못하게한다.

let str2 ='hello' as const ;  //as const를 써서 상수로 해줄수있다.

const arr8 = [true,2,'3'] ;// 이것  arr7하고 동일하다 
/*
const obj ={a:'b'}
obj = 'hello'    //const를 쓸때 이건 못바꾸는데
obj.a='ddd'   //이건 바꿀수있다.

const obj = {a:'b'} as const ; 이걸 해주면
obj.a='ddd'   //이것도 바꿀수가 없다.
*/

const obj: {a:string} = {a:'b'}
//obj.a=3   //오류
obj.a='3'  


const obj2: {a:string,b:number} = {a:'b',b:3}
const obj3: {a:string,b?:number} = {a:'b'}  /*b가 없을 수도 있을때 b뒤에 ?를 붙여준다. */

enum Color {Red,Green,Blue}
let c: Color =  Color.Green ;

Color[0]==='Red';
Color['Red']===0;
Color[1]==='Green';
Color['Green']===1;
Color[2]==='Blue';
Color['Blue']===2;

/*
자바스크립트에서 ?가 쓰일때
? 3항 연산자

?.  gkskdml dustkswkfh

const a = true ? 'b':'c';
const a = abc?.name    <-- 타입스크립트에서 생긴 것

obj.method?.()   <--옵셔널체이닝이라고 한다고 한다.
*/
const n = null;
const n2 = void 1;

function add(a:number,b:number):number {
    return a+b
}

function add2(a:number,b:number):string | number {  /*리턴 값이 string 또는 number가 될수있다. */
    return a+b
}

function add3(a:number,b:number):void {  /*void 를 써주거나 리턴값을 안써주면 void */
    console.log(a,b)
}

function add4(a:number,b:number):(c: string) => number {  /*함수자체를 타입으로 쓸때    매개변수=>리턴타입 */
    return(c:string) => { 
        return 3;
    }
}

function add5(a:number,b:number):(c: string) => (d:string) => boolean {  /* 안에 함수가 하나 더 있다면  -- 아주 코드 읽기가 복잡해진다. 고차함수*/
    return(c:string) => { 
        return(d:string) => { 
            return false;
        }
    }
}

const obj4 : {a:(b:number,c?:string)=>string} =  {
    a(b:number,c?:string) {
        return 'hello'

    }

}

//obj4.a();   오류
obj4.a(3);
obj4.a(3,'hello');

/*never 타입  배열을 잘못 만든 경우 never 가 리턴값이됨 
  타입을 빈배열로 만들었을때 
*/
const arr10:[] = [];
//arr10.push(3);   // 3을 넣으려고 하면 never 오류가 발생됨

const hi:any = 1;  
/* any라는 타입은  모든게 다됨, 자바스크립트랑 같아짐   typescript를 쓴다고 하면 any는 사용을 가급적 피해야함 
   남이 만든것을 가져다 쓸때 수정이 불가능할때 any 타입으로 받아서 쓰게된다.
*/

//d.ts
/*
const hello: number;  남들이 실수로  string을 number로 만들었구

import hello from 'hello';
hello.substring();  우리는 string으로 써야한다. -- 이거 오류가 발생하는데  any로  재할당해서 쓸자.
(hello as unknown as string).substr(1,2)   //  as unknown as 를 사용해서 강제로 바꿀수있다.
(<strig><unknown>hello).substring(1,2)  //이것도 바로 위에 것이랑 같은 문법이다.
*/

const div = document.createElement('div');
const a = div as HTMLElement    /* 인터페이스 형변환 */
const b = div as unknown as number; /*강제로 바꾸는 방법이라 문법 오류가 발생하지 않는다. */
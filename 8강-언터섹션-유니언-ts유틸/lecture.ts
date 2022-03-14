type Z = string | number  //유니언이라고 부른다.

type Y =  string & number //인터섹션이라고 부른다.


interface A {
    hello:true
}

interface B {
    bye:true
}

type C = {
    hi:false
}

const a:A = {
    hello:true
}

const b:B = {
    bye:true
}

const c: A & B  & C = {   /*인터섹션은 A와 B와 C를 다 만족해야 에러가 안난다. 
                            인터섹션은 interface의 중복을 막아준다.

*/
    hello:true,
    bye:true,
    hi:false
}

const d: A | B  | C = {   /*유니언은 하나만 만족하면 된다. */
    hello:true,
}
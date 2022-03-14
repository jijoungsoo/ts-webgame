const result = Array.prototype.map.call([1,2,3],(item)=>{
    return item.toFixed(1)
})
//result : ['1.0','2.0','3.0']

/*위아랑 아래랑 같은것 아래는 제너릭 */
                                        /*넘겨받는 number형인자,  숫자=>문자로 바꾸는 함수,  반환값형식      */
const result2 = Array.prototype.map.call<number[],[(item:number)=>string],string[]>([1,2,3],(item)=>{
    return item.toFixed(1)
})

interface D {
    a:'b',
    c:true,
    d:123
}

const aa: D = {
    a:'b',
    c:true,
    d:123    
}

const bb : Partial<D>={   //Partial 을 써주면 일부만 사용할수있다.
    c:true
}

const cc : Readonly<D>={   //수정불가하게
    a:'b',
    c:true,
    d:123    
}

type rr = Pick<D,'a' | 'c'>;   //a,b 두개만쓰겠다.

type ww = Omit<D,'a' | 'c'>;   //a,b 2개를 제외한  d만 쓰겠다.

//ts유틸리티들이 많네..   다 안가르쳐준다.
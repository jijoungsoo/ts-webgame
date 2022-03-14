//let imgCoords='0'

let imgCoords:RSP[keyof RSP] ='0';

/*
const rsp= {
    ROCK:'0',
    SCISSORS:'-142px',
    PAPER:'-284px'
} as const

이거랑  아래 2개 합친게 같은거다.
*/
/*
interface RSP {
    readonly ROCK:'0'
}

interface RSP {
    readonly SCISSORS:'-142px'
    readonly PAPER:'-284px'
}
*/

/*
위와 같이  똑같은 이름의 인터페이스를 2개 만들수있고
결국엔 합쳐진 의미로 위 2개는 아래와 같다.
interface RSP {
    readonly ROCK:'0',
    readonly SCISSORS:'-142px',
    readonly PAPER:'-284px'
}
*/
interface RSP {
    readonly ROCK:'-160px';
    readonly SCISSORS:'0';
    readonly PAPER:'-340px';
}

/*아래는 상속 예제 */
interface Example extends RSP {

}
/*
type  RSP = {
    readonly ROCK:'0',
    readonly SCISSORS:'-142px',
    readonly PAPER:'-284px'
}

인터페이스 대신에 type을 쓸수있다.
이것은 동일이름으로 여러개 만들지 못한다.

type Hello = string | number  
이런식으로 타입을 만들수도있다.
*/

type Hello  = {
    ROCK: string;
    PAPER: string;
} | string;

/*아래처럼  type과  | string 모두 에러 없이 쓸수있다. */
let a:Hello = 'abcd';
let b:Hello = {ROCK: 'abcd', PAPER: 'ddd'}

interface Example2 {
    a:3,
    b:7,
    [key:string]:number;

}
const example: Example2 = {
    a:3,
    b:7,
    c:1   /*  [key:string]:number;     유연하게 이렇게 쓸수도 있는데 가급적이면 이렇게 쓰지 말자*/

}


const rsp:Example = {
    ROCK:'-160px',
    SCISSORS:'0',
    PAPER:'-340px'
}


const score = {
    ROCK:0,
    SCISSORS:1,
    PAPER:-1
} as const

/*
function computerChoice(imgCoords): 'ROCK' | 'SCISSORS' | 'PAPER' {
    return Object.keys(rsp).find((k)=>rsp[k]===imgCoords)

    //Object.keys를 쓰면 배열로 바뀐다.

}
*/
/*
function computerChoice(imgCoords:'0'|'-142px'|'-284px'): keyof RSP {
    return Object.keys(rsp).find((k)=>rsp[k]===imgCoords)
}
imgCoords에 형식을 써준걸 아래처럼 줄일수있다.
*/

function computerChoice(imgCoords: RSP[keyof RSP]): keyof RSP {
    //Object.keys를 쓰면 배열로 바뀐다.
    let tmp =Object.keys(rsp);
    let tmp1 =  tmp as ['ROCK','SCISSORS','PAPER'] //이렇게 고정해서 쓰면 의미가 있나?  RSP처럼 그냥 써야지.  음.. 마음에 안듬
    let tmp2 =tmp1.find((k)=>rsp[k]===imgCoords)
    //return tmp2!;
    
    /*
    위에 4줄이 아래 한줄임
    */    
    //return (Object.keys(rsp) as ['ROCK','SCISSORS','PAPER']).find((k)=>rsp[k]===imgCoords)!    //!표는   타입스크립트에서 undefined일수있어 하고 알려준 경고를 무시하는 키워드가 !이다.

    /*!표를 안쓰려면 아래처럼쓸수있다.
      굳이.. 느낌표를 쓰자.
    */
    const value = (Object.keys(rsp) as ['ROCK','SCISSORS','PAPER']).find((k)=>rsp[k]===imgCoords);
    if(!value){
        throw new Error('nope')
    }
    return value;

}

let point : number = 0;
let interval: number = 0;
document.querySelectorAll('.btn').forEach((btn)=>{
    btn.addEventListener('click',function(this: HTMLButtonElement, e:Event) {
        clearInterval(interval);
        setTimeout(intervalMarker,2000);

        //const myChoic = e.target.textContent;
        //const myChoice = this.textContent;  오류가 발생  값이string,null이 나온다 그래서  오류 메시지 표시됨
        // as keyof  RSP를 사용해서 넘어갔다.
        const myChoice = this.textContent as keyof RSP;
        const myScore = score[myChoice];
        const computerScore = score[computerChoice(imgCoords)];
        const diff = myScore - computerScore;

        
        if(diff==0){
            console.log(myChoice,myScore,computerScore,diff,'비겼습니다.')
        } else if([-1,2].includes(diff)){
            console.log(myChoice,myScore,computerScore,diff,'이겼습니다.')
            point++
        } else {
            console.log(myChoice,myScore,computerScore,diff,'졌습니다.')
            point--
        }
        (document.querySelector('#point') as HTMLDivElement).textContent=String(point);

    })
})

function intervalMarker(){
    interval = setInterval(function(){
        if(imgCoords==rsp.ROCK){
            imgCoords = rsp.SCISSORS;
        } else if(imgCoords===rsp.SCISSORS){
            imgCoords = rsp.PAPER;
        } else {
            imgCoords = rsp.ROCK;
        }

        /*
        제너릭 표현식
        if(document.querySelector<HTMLDivElement>('#computer')){  오류남
            document.querySelector<HTMLDivElement>('#computer').style.background = `url(./gawebawebo.png)' ${imgCoords} 0`
        }
        */
        /*변수로 빼야  null 여부를 체크할수있다.  
        const computer = document.querySelector<HTMLDivElement>('#computer');
        if(computer){
            computer.style.background = `url(./gawebawebo.png)' ${imgCoords} 0`
        }

        */

        if(document.querySelector('#computer')){
            //console.log('aaa');
            //console.log(imgCoords);
            let tmp = `url(./gawebawebo.png) ${imgCoords} 0`;
            //console.log(tmp);
            (document.querySelector('#computer') as HTMLDivElement).style.background = `url(./gawebawebo.png) ${imgCoords} 0`;
        }

    },100)
}

intervalMarker();
export type A = String | Number ;
/*
interface ICard {
    attr?: number;
    hp?:number;
}

위랑 아래는 같은거다.  
type ICard  = {
    attr?: number;
    hp?:number;
}
*/


export interface Card {
    att: number;   //공격력
    hp:number;      //체력
    mine:boolean;  //내카드인지 적카드인지
    field:boolean;
    cost?:number;   //카드를 얼마나 생성할수있을지 비용
    hero?:boolean;  // 영웅카드인지?
}


export interface Player {
    hero: HTMLDivElement
    deck: HTMLDivElement 
    field: HTMLDivElement
    cost: HTMLDivElement
    deckData: Card[]
    heroData: Card | null
    fieldData: Card[]
    chosenCard?:HTMLDivElement|null
    chosenCardData?: Card| null 

    /*
    typescript에서  null가  undefiend를 구분해야할 경우가 있다.
    설정은 tsconfig.json  에서  "strictNullChecks" 항목이 true이면  구분한다.
    ?표를 해주면 undefined

    choseCard?:HtmlDivElement|null  ==>  choseCard:HtmlDivElement|null|undefined 랑 같은 의미임 
     * 
     * 
     */
}



/*영웅카드 */
export class Hero implements Card{
    public att: number;  //number | undefined  
    public hp:number;
    public hero:boolean;  //영웅에는 hero속성이 있고
    public field:true;
    public mine:boolean;
    constructor( mine:boolean){
        this.mine=mine;
        this.att=Math.ceil(Math.random()*2)
        this.hp=Math.ceil(Math.random()*5)+25
        this.hero=true;
        this.field=true;
    }
}
/*일반카드 */
export class Sub implements Card{
    public att: number;  //number | undefined  
    public hp:number;
    public field:boolean = false;
    public mine:boolean;
    public cost :number;;  //쫄병에는 cost 속성이 있다.
    constructor( mine:boolean){
        this.mine=mine;
        this.att=Math.ceil(Math.random()*5)
        this.hp=Math.ceil(Math.random()*5)
        this.cost = Math.floor((this.att+this.hp)/2);
    }
}
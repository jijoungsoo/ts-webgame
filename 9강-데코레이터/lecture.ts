function makeGender(target: typeof Person  /*원본이 들어가서 */) {
    console.log('hello');
    return class extends target {  /*변경된 것이 나온다. */
        gender:string ='mail';
    }

}


@makeGender
class Person {
    title: string;
    age=72;
    constructor(title:string){
        this.title=title;

    }

    setTitle(titile:string) {

    }

    sayTitle():any{
        return this.title;
    }
}

function readonly(target:any,key:any,descriptor:PropertyDescriptor){
    console.log(target,key,descriptor)
    descriptor.writable=false;  //못바꾸게 하는것
  
}

@makeGender
class Person2 {
    title: string;
    age=73;
    constructor(title:string){
        this.title=title;

    }

    setTitle(titile:string) {

    }

    @readonly  sayTitle():any{
        return this.title;
    }
}

const aa = new Person('가으자')
console.log('ㅁㅁㅁ',aa)
aa.sayTitle=()=>{return ''}


const aa2 = new Person2('가으자2')
console.log('ㅁㅁㅁ2',aa2)
aa2.sayTitle=()=>{return ''}  // 데코레이터로 막아서 이거 에러남 
/*
클래스에 중복을 제거하는 용도로 데코레인터를 쓴다.
데코레이터는 정식 종목이 아니여서 
tsconfig.json에

compilerOptions 에서 "experimentalDecorators":true,  이걸 해줘야한다.
*/
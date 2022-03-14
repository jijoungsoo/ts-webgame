"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function makeGender(target /*원본이 들어가서 */) {
    console.log('hello');
    return class extends target {
        constructor() {
            super(...arguments);
            this.gender = 'mail';
        }
    };
}
let Person = class Person {
    constructor(title) {
        this.age = 72;
        this.title = title;
    }
    setTitle(titile) {
    }
    sayTitle() {
        return this.title;
    }
};
Person = __decorate([
    makeGender
], Person);
function readonly(target, key, descriptor) {
    console.log(target, key, descriptor);
    descriptor.writable = false; //못바꾸게 하는것
}
let Person2 = class Person2 {
    constructor(title) {
        this.age = 73;
        this.title = title;
    }
    setTitle(titile) {
    }
    sayTitle() {
        return this.title;
    }
};
__decorate([
    readonly
], Person2.prototype, "sayTitle", null);
Person2 = __decorate([
    makeGender
], Person2);
const aa = new Person('가으자');
console.log('ㅁㅁㅁ', aa);
aa.sayTitle = () => { return ''; };
const aa2 = new Person2('가으자2');
console.log('ㅁㅁㅁ2', aa2);
aa2.sayTitle = () => { return ''; }; // 데코레이터로 막아서 이거 에러남 
/*
클래스에 중복을 제거하는 용도로 데코레인터를 쓴다.
데코레이터는 정식 종목이 아니여서
tsconfig.json에

compilerOptions 에서 "experimentalDecorators":true,  이걸 해줘야한다.
*/ 

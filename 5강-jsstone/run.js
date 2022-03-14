
import hi,{a,b} from './module'
import * as hi from './module2' /*commonJs의 module.export를 사용해서 썼다면 이렇게 가져와야한다. */

hi();

/*
const hello = require('./moudle');
const {a,b} = require('./moudle');
console.log(hello)
*/

/* 타입스크립트는 commonJs를 지원하지 않는다.

es2015 문법을 지원한다.
*/
/*
* @Author: mmall
* @Date:   2018-01-06 17:00:55
* @Last Modified by:   mmall
* @Last Modified time: 2018-01-06 18:02:53
*/
// 箭头函数
let value = 2;
let double = x => 2 * x;
let treble = x => {
    return 3 * x;
}
console.log('double:', double(value));
console.log('treble:', treble(value));

// 没有独立作用域
var obj = {
    commonFn : function(){
        console.log(this);
    },
    arrowFn : () => {
        console.log(this);
    }
}
obj.commonFn();// this 指向obj作用域
obj.arrowFn(); // this 指向了obj所在作用域，window

// 不能用做构造函数
let Animal = function(){

}
let animal = new Animal();

let Animal = () => {

}
let animal = new Animal();

// 没有prototype
let commonFn = function(){};
let arrowFn  = () => {};

console.log(commonFn.prototype);
console.log(arrowFn.prototype);


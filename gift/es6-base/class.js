/*
* @Author: mmall
* @Date:   2018-01-06 20:10:11
* @Last Modified by:   mmall
* @Last Modified time: 2018-01-06 20:39:58
*/

// class constuctor
class Animal{
    constructor(name){
        this.name = name;
    }
    getName(){
        return this.name
    }
}

let animal = new Animal('animal test');
console.log(animal.getName())

// 类的继承
class Animal{
    constructor(){
        this.name = 'animal';
    }
    getName(){
        return this.name
    }
}

class Cat extends Animal{
    constructor(){
        super()
        this.name = 'cat';
    }
}

let animal  = new Animal();
let cat     = new Cat();
console.log(animal.getName())
console.log(cat.getName())


// 对象的用法
var name    = 'Rosen',
    age     = 18;
var obj = {
    name: name,
    age: age,
    getName: function(){
        return this.name;
    },
    getAge: function(){
        return this.age;
    }
}

let name    = 'Rosen',
    age     = 18;

let obj = {
    // 变量名可以直接用作对象的属性名称
    name,
    age,
    // 对象里的方法可以简写
    getName(){
        return this.name;
    },
    // 表达式作为属性名或方法名
    ['get' + 'Age'](){
        return this.age;
    }
}


// Object对象的扩展
Object.keys(obj);



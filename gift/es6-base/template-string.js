/*
* @Author: mmall
* @Date:   2018-01-06 18:02:50
* @Last Modified by:   mmall
* @Last Modified time: 2018-01-06 19:44:11
*/
// 基本用法
let str = `
<div>
    <h1 class="title">123</h1>
</div>
`;
document.querySelector('body').innerHTML = str;

// 嵌套变量的用法
let name = 'Rosen';
let str = `
<div>
    <h1 class="title">${name}</h1>
</div>
`;
document.querySelector('body').innerHTML = str;

// 嵌套函数的用法
let getName = () => {
    return 'Rosen Test';
};
let str = `
<div>
    <h1 class="title">${getName()}</h1>
</div>
`;
document.querySelector('body').innerHTML = str;

// 循环嵌套
let names = ['Rosen', 'Geely', 'Jimin'];
let str = `
    <ul>
        ${
            names.map(name => `<li>Hi, I am ${name}</li>`).join('')
        }
    </ul>
`;
document.querySelector('body').innerHTML = str;




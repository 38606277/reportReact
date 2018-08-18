/*
* @Author: mmall
* @Date:   2018-01-06 20:40:26
* @Last Modified by:   mmall
* @Last Modified time: 2018-01-06 20:51:29
*/
let str = 'string';
let obj = {
    name : 'Rosen'
};
let fn  = () => {
    console.log('module test')
}

export {
    str,
    obj,
    fn
}
export default {a:1}
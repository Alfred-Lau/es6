/* 

如果需要模拟es5的环境，请切换Node版本0.10.0，es6环境切换Node版本9.6.0

*/

/* TODO:1.1 let的代码块作用域 */
{
    // let a = 1
    // var b = 2
}

// console.log(a)
// console.log(b)

// // for loop

// /* TODO:1.2 不存在变量提升 */
// console.log(c)
// var c = 'a'

// // console.log(d)
// let d = 'a'

// TODO:1.3 暂时性死区：封闭性作用域，类似于代码块中的局部变量覆盖全局变量；意味着typeof不是一个绝对安全的操作

{
    // console.log('temp dead zone:let')
    // let global = 'global'
    // if (true) {
    //     global = 'tmp'
    //     let global
    // }
}
{

    // console.log('temp dead zone:var')
    // var global = 'global'
    // if (true) {
    //     global = 'tmp'; // 直接修改全局的global变量
    //     console.log(global)
    // }
    // console.log(global)

}
// 非常隐蔽的TDZ（暂时性死区）:x的默认值是y，此时y还没有声明
{
    // 情况一：
    // function bar (x = y , y = 2) {
    //     return [x, y]
    // }

    // bar()
    // 情况二：
    // let x = x
}

// TODO:1.4 不允许相同作用域内重复声明

{
    // 报错
    // function func () {
    //     let a = 10
    //     var a = 1
    // }

    // 报错
    // function func () {
    //     let a = 10
    //     let a = 1
    // }
    // func()

    // function func (arg) {
    //     let arg; // 报错
    // }

    // function func (arg) {
    //     {
    //         let arg; // 不报错
    //     }
    // }
    // func()
}

// TODO:2.1 块级作用域

{
    // console.log('---2.1')
    // var tmp = new Date()

    // function f() {
    //     // 没有块级作用域，变量提升，只声明未赋值
    //     console.log(tmp)
    //     if (false) {
    //         var tmp = 'hello world'
    //     }
    // }

    // f() // undefined
}
{
    // 外层块级作用域不能访问内层块级作用域，内层块级作用域可以访问外层块级作用域 && ES6 允许块级作用域的任意嵌套。
    // let a = 1
    // console.log(b)
    // {
    //     let b = 2
    //     console.log(a)
    // }
}

{
    // 块级作用域在ES5之中的pollfill实现方式就是使用立即执行函数表达式（IIFE）
    // IIFE 写法
    // (function () {
    //     var tmp = ...
    //     ...
    // }())

    // // 块级作用域写法
    // {
    //     let tmp = ...
    //     ...
    // }
}

// TODO: 2.2 在块级作用域中声明函数
/* 
ES6 引入了块级作用域， 明确允许在块级作用域之中声明函数。 ES6 规定， 块级作用域之中， 函数声明语句的行为类似于let， 在块级作用域之外不可引用。 
*/

{
    // function f() {
    //     console.log('I am outside!')
    // }

    // (function () {
    //     if (false) {
    //     // 重复声明一次函数f
    //         function f() {
    //             console.log('I am inside!')
    //         }
    //     }

    //     f()
    // }())
}

// TODO: 3.1 const

// {
//     const a = 'hello, world'
// }
// console.log(a)

// const声明的一般变量无法修改，但是对象的话，是可以对它的属性进行操作的，要想完全禁止，需要使用Object.freeze()  :冻结的深意是不允许修改对象

{

    'use strict';
    const foo = Object.freeze({});
    const foo2 = {};

    // 常规模式时，下面一行不起作用；
    // 严格模式时，该行会报错
    foo.prop = 123;
    foo2.prop = 123;
    console.log(foo.prop, foo2.prop);
}

/* 

ES6 声明变量的六种方法
ES5 只有两种声明变量的方法：var命令和function命令。ES6 除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6 一共有 6 种声明变量的方法。
*/

// TODO: 4.1 顶层对象的属性：浏览器环境指的是window，Node环境指的是global对象

/* 
顶层对象的属性赋值与全局变量的赋值，是同一件事。

顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一。这样的设计带来了几个很大的问题，首先是没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）；其次，程序员很容易不知不觉地就创建了全局变量（比如打字出错）；最后，顶层对象的属性是到处可以读写的，这非常不利于模块化编程。另一方面，window对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。

ES6 为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

*/

// TODO: 5.1 顶层对象
/* 
ES5 的顶层对象，本身也是一个问题，因为它在各种实现里面是不统一的。

浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
Node 里面，顶层对象是global，但其他环境都不支持。

取得顶层对象的通用方法：
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this)

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object')
}

*/

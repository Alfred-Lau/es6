// 1.1 函数参数的默认值
{
    // es6之前为函数的参数指定默认值，采用变通的方法

    function log (x, y) {
        y = y || 'world';
        console.log(x, y);
    }

    // 上述写法的缺点在于，如果y赋值了，但是对应的布尔值为false，则该赋值不起作用，比如赋值为空字符串

    log('hello', 'world');
    log('hello');
    log('hello', '');

    // 为了避免上面描述的问题，通常要先判断一下y是否赋值，如果没有，再等于默认值
    function log2 (x, y) {
        if (typeof y === 'undefined') {
            y = 'World';
        }
    }

    /* 
  除了简洁，ES6 的写法还有两个好处：
  - 首先，阅读代码的人，可以立刻意识到哪些参数是可以省略的，不用查看函数体或文档；
  - 其次，有利于将来的代码优化，即使未来的版本在对外接口中，彻底拿掉这个参数，也不会导致以前的代码无法运行。
  
  */

    // 参数变量是默认声明的，所以不能用let或者const再次声明
    function pro (x = 5) {
        x = 6;
        console.log(x);
    }

    pro();

    // 使用参数默认值的时候，函数不能有同名参数
    /* 
  // 不报错
  function foo(x, x, y) {
  // ...
  }

  // 报错
  function foo(x, x, y = 1) {
  // ...
  }
  // SyntaxError: Duplicate parameter name not allowed in this context    
  
  */

    // 参数默认值是惰性求值的

    // 双重默认值

    /* 
   双重默认值。

  function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
  console.log(method)
  }

  fetch('http://example.com')
  // "GET"
  上面代码中，函数fetch没有第二个参数时，函数参数的默认值就会生效，然后才是解构赋值的默认值生效，变量method才会取到默认值GET。

  作为练习，请问下面两种写法有什么差别？

  // 写法一
  function m1({x = 0, y = 0} = {}) {
  return [x, y]
  }

  // 写法二
  function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y]
  }
  上面两种写法都对函数的参数设定了默认值，区别是写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。

  // 函数没有参数的情况
  m1() // [0, 0]
  m2() // [0, 0]

  // x 和 y 都有值的情况
  m1({x: 3, y: 8}) // [3, 8]
  m2({x: 3, y: 8}) // [3, 8]

  // x 有值，y 无值的情况
  m1({x: 3}) // [3, 0]
  m2({x: 3}) // [3, undefined]

  // x 和 y 都无值的情况
  m1({}) // [0, 0]
  m2({}) // [undefined, undefined]

  m1({z: 3}) // [0, 0]
  m2({z: 3}) // [undefined, undefined]

  
  */

    // 参数默认值的位置: 最佳实践是尾参数

    /*     
  通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。 
  
  */
 
    // 例一
    function f(x = 1, y) {
        return [x, y];
    }

    f(); // [1, undefined]
    f(2); // [2, undefined])
    // f(, 1) // 报错
    f(undefined, 1); // [1, 1]

    // 例二
    function f(x, y = 5, z) {
        return [x, y, z];
    }

    f(); // [undefined, 5, undefined]
    f(1); // [1, 5, undefined]
    // f(1,, 2) // 报错
    f(1, undefined, 2); // [1, 5, 2]
    // 上面代码中，有默认值的参数都不是尾参数。这时，无法只省略该参数，而不省略它后面的参数，除非显式输入undefined。

    // 如果传入undefined，将触发该参数等于默认值，null则没有这个效果。

    function foo(x = 5, y = 6) {
        console.log(x, y);
    }

    foo(undefined, null);
    // 5 null
    // 上面代码中，x参数对应undefined，结果触发了默认值，y参数等于null，就没有触发默认值。

    

    // 函数的length属性

    /* 
  指定了默认值之后，函数的length属性将返回没有指定默认值的参数个数，也就是说，指定了默认值之后，函数的length属性将失真，原因是：这是因为length属性的含义是，该函数预期传入的参数个数。某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了。同理，后文的 rest 参数也不会计入length属性。
  
  */

    console.log((function (a, b) {}).length);
    console.log((function (a, b = 1) {}).length);
    console.log((function (a = 1 , b = 2) {}).length);
    console.log((function () {}).length);
    // rest 参数也不会计入length属性。
    console.log((function (...args) {}).length);//0
    // 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。
    console.log((function (a = 0 , b, c) {}).length); // 0
    console.log((function (a, b = 1 , c) {}).length); // 1

    
    
    // 作用域
    

    
    
    // 应用
}
// 2.1 rest参数
{

}

{

}

// 3.1 严格模式
{

}

// 4.1 name属性
{

}

// 5.1 箭头函数
{

}

// 6.1 双冒号运算符
{

}

// 7.1 尾调用优化
{

}

// 8.1 函数参数的尾逗号
{

}

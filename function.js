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
    function f (x = 1 , y) {
        return [x, y];
    }

    f(); // [1, undefined]
    f(2); // [2, undefined])
    // f(, 1) // 报错
    f(undefined, 1); // [1, 1]

    // 例二
    function f (x, y = 5 , z) {
        return [x, y, z];
    }

    f(); // [undefined, 5, undefined]
    f(1); // [1, 5, undefined]
    // f(1,, 2) // 报错
    f(1, undefined, 2); // [1, 5, 2]
    // 上面代码中，有默认值的参数都不是尾参数。这时，无法只省略该参数，而不省略它后面的参数，除非显式输入undefined。

    // 如果传入undefined，将触发该参数等于默认值，null则没有这个效果。

    function foo (x = 5 , y = 6) {
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
    console.log((function (...args) {}).length); // 0
    // 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。
    console.log((function (a = 0 , b, c) {}).length); // 0
    console.log((function (a, b = 1 , c) {}).length); // 1

    // 作用域

    /* 需要思考一下
  一旦设置了参数的默认值， 函数进行声明初始化时， 参数会形成一个单独的作用域（ context）。 等到初始化结束， 这个作用域就会消失。 这种语法行为， 在不设置参数默认值时， 是不会出现的。
  

  var x = 1

  function foo(x, y = function () {x = 2;}) {
  x = 3
  y()
  console.log(x)
  }

  foo() // 2
  x // 1
  */

    // 应用

    /* 
  
  函数参数默认值的作用：

  - 可以指定某一个参数不得省略，如果省略就抛出一个错误
  - 可以将函数参数设置为undefined，表示这个参数是可以省略的
  
  */

    // 指定某一个函数参数不得省略
    const throwError = () => {
        throw new Error('Missing params');
    };

    const throwErrorTest = (param = throwError()) => {
        return param;
    };

    throwErrorTest('s');

    // 表示某个参数是可以省略的

    const isOmitted = (param = undefined) => {
        return param;
    };
    isOmitted();
    isOmitted('s');

}
// 2.1 rest参数: 是一个数组，区别于arguments的类数组对象；只能是最后一个参数
{

    // 下面是一个求和函数，利用rest参数，可以向该函数传入任意数目的参数
    const add = (...values) => {
        let result = 0;
        for (const iter of values) {
            result += iter;
        }

        return result;
    };
    const arr = [1, 4, 6, 8, 10];
    console.log(add(...arr));

    // 对比

    function sortNumbers () {
    // 使用es5的方法来把类数组对象转换为数组对象
        return Array.prototype.slice.call(arguments).sort();
    }

    // 箭头函数不能使用arguments对象

    /* TODO:
  箭头函数有几个使用注意点。
  （ 1 ）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
  （ 2 ）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
  （ 3 ）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 Rest 参数代替。
  （ 4 ）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
  上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。
  
  */
    const sortNumInArguments = () => {
        console.log(arguments);
    };

    const sortNumInRest = (...values) => values.sort();

    const sortArr = [1, 5, 2, 6, 9];
    console.log(sortNumbers(...sortArr));

    // 箭头函数使用arguments对象会出错
    sortNumInArguments(...sortArr);
    console.log(sortNumInRest(...sortArr));

    /* 
  
  改写数组的push方法，可以实现函数签名： push(arr, a,b,c,...)
  */
    const push = (arr, ...values) => {
    // concat不修改原数组，而是返回一个新的数组
        return arr.concat(values);
    };

    let target = [1, 2, 3];
    target = push(target, 4, 5, 6);
    console.log(target);

    /* 
  
  函数的length属性，不包含rest参数

  */

    console.log(((a, ...values) => {
    }).length); // 1
}

{

}

// 3.1 严格模式
{
    /* 
  
  - 从es5开始，函数内部可以设定为严格模式

  - ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

  原因：这样规定的原因是，函数内部的严格模式，同时适用于函数体和函数参数。但是，函数执行的时候，先执行函数参数，然后再执行函数体。这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行。
  
  两种方法可以规避这种限制:

  - 第一种是设定全局性的严格模式，这是合法的。
  - 第二种是把函数包在一个无参数的立即执行函数里面。

  const doSomething = (function () {
   'use strict'
  return function(value = 42) {
  return value
  }
}())
  
  
  */

    // SyntaxError: Illegal 'use strict' directive in function with non-simple parameter lists
    // function strick (a, b = a) {
    //     'use strict'
    // }

}

// 4.1 name属性：返回函数的函数名
{
    /* 

  - ES6 对这个属性的行为做出了一些修改。如果将一个匿名函数赋值给一个变量，ES5 的name属性，会返回空字符串，而 ES6 的name属性会返回实际的函数名。
  - 如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的name属性都返回这个具名函数原本的名字。
  - Function构造函数返回的函数实例，name属性的值为anonymous。
  - bind返回的函数，name属性值会加上bound前缀。

  */

    console.log((function nameTest (params) {}).name);

    var f = function () {};

    // ES5
    console.log(f.name); // ""

    // ES6
    console.log(f.name); // "f"

    console.log(((function bindName (params) {}).bind({})).name); // bound bindName

}

// 5.1 箭头函数:没有返回值也是可取的
{

    /* 
  
  箭头函数有几个使用注意点。

（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
原因：this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。

所以，箭头函数转成 ES5 的代码如下。

// ES6
function foo() {
  setTimeout(() => {
  console.log('id:', this.id)
  }, 100)
}

// ES5
function foo() {
  var _this = this

  setTimeout(function () {
  console.log('id:', _this.id)
  }, 100)
}

上面代码中，转换后的 ES5 版本清楚地说明了，箭头函数里面根本没有自己的this，而是引用外层的this。

另外，由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。

（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

（5）除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。
  
  
  
  */
    const testWithoutReturn = () => {
        console.log('without return');
    };
    testWithoutReturn();

    /* 
  由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。

  */

    /* 
  如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了。
  let fn = () => void doesNotReturn()
  
  */

    const fn = () => void console.log('again');
    fn();

    /* 
  
  箭头函数可以和变量解构结合使用
  
  */

    const arrowAndDestruct = ({ x, y }) => x + y;

    console.log(arrowAndDestruct({ x: 10, y: 20 }));

    /* 
  
  箭头函数的一个用处是简化回调函数
  
  */

    // 之前的写法

    let res = [1, 2, 3].map(function (x) {
    // return x ** 2; 
        return Math.pow(x, 2);
    });

    console.log(res);

    // 箭头函数的写法

    res = [2, 4, 8].map(x => Math.pow(x, 2));

    console.log(res);

    // rest参数搭配箭头函数更好

    const headAndTail = (head, ...tail) => [head, tail];
    console.log(headAndTail(1, 2, 3, 4, 5, 6));

    /* 
  
  TODO:嵌套的箭头函数：链式调用，超屌，需学习一下
  */

    // es5的写法
    function insert (value) {
        return {
            into: function (array) {
                return {
                    after: function (afterValue) {
                        array.splice(array.indexOf(afterValue) + 1, 0, value);
                        return array;
                    }
                };
            }
        };
    }

    console.log(insert(2).into([1, 3]).after(1));

    // 箭头函数的写法

    const insertWithArrow = (value) => (
        {
            into: (array) => (
                {
                    after: (afterValue) => {
                        // splice的作用是修改原数组，它的返回值是被删除的元素数组，没有删除就是空数组
                        array.splice(array.indexOf(afterValue) + 1, 0, value);
                        return array;
                    }
                }
            )
        }
    );

    console.log(insertWithArrow(2).into([1, 3]).after(1));

    // 部署管道机制的例子:即前一个函数的输出是后一个函数的输入

    const pipeline = (...funcs) => val => funcs.reduce((a, b) => b(a), val);

    const plus1 = a => a + 1;
    const mult2 = a => a * 2;
    const addThenMult = pipeline(plus1, mult2);

    addThenMult(5);
    // 12
    // 如果觉得上面的写法可读性比较差，也可以采用下面的写法。

    const plus21 = a => a + 1;
    const mult21 = a => a * 2;

    mult21(plus21(5));
    // 12

    /* 
   
   箭头函数的其他功能，改写lamda演算 
   
   */

    // λ演算的写法
    // fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))

    // ES6的写法
    var fix = f => (x => f(v => x(x)(v)))(x => f(v => x(x)(v)));

}

// 6.1 双冒号运算符：还是草案:es8尚不支持
{
    // 加不加var的区别很明显TODO:
    var a = 2;
    var demo = {
        a: 1,
        test: function () {
            console.log(this.a);
        }
    };

    // demo.test.bind(demo)

    var democode = demo.test;
    democode();

}

// 7.1 尾调用优化
{

    /* 
  
  什么是尾调用？

  就是在某个函数的最后一步调用另一个函数，以下三种情况都不属于尾调用

  1. 调用函数之后，还有赋值操作
  2. 调用之后还有其他操作
  3. 返回undefined

  尾调用不一定出现在函数尾部，只要是最后一步操作即可。
  
  */

    // 情况一
    function f (x) {
        let y = g(x);
        return y;
    }

    // 情况二
    function f (x) {
        return g(x) + 1;
    }

    // 情况三
    function f (x) {
        g(x);
    }

    // 等同于
    function f (x) {
        g(x);
        return undefined;
    }

    // 尾调用不一定出现在函数尾部，只要是最后一步操作即可。

    function f (x) {
        if (x > 0) {
            return m(x);
        }
        return n(x);
    }
    // 上面代码中，函数m和n都属于尾调用，因为它们都是函数f的最后一步操作。

    /* 

  尾调用优化：

  尾调用之所以和其他的调用不同，就在于它的特殊位置

  */

    /* 
  尾递归

  函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

  递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

  function factorial(n) {
  if (n === 1) return 1
  return n * factorial(n - 1)
  }

  factorial(5) // 120
  上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n) 。

  如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。

  function factorial(n, total) {
  if (n === 1) return total
  return factorial(n - 1, n * total)
  }

  factorial(5, 1) // 120
  
  

  还有一个比较著名的例子，就是计算 Fibonacci 数列，也能充分说明尾递归优化的重要性。

非尾递归的 Fibonacci 数列实现如下。

function Fibonacci (n) {
  if ( n <= 1 ) {return 1}

  return Fibonacci(n - 1) + Fibonacci(n - 2)
}

Fibonacci(10) // 89
Fibonacci(100) // 堆栈溢出
Fibonacci(500) // 堆栈溢出
尾递归优化过的 Fibonacci 数列实现如下。

function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2}

  return Fibonacci2 (n - 1, ac2, ac1 + ac2)
}

Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity
由此可见，“尾调用优化”对递归操作意义重大，所以一些函数式编程语言将其写入了语言规格。ES6 是如此，第一次明确规定，所有 ECMAScript 的实现，都必须部署“尾调用优化”。TODO:这就是说，ES6 中只要使用尾递归，就不会发生栈溢出，相对节省内存。

  */

    /* 
  
  递归函数的改写
  
  尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。比如上面的例子，阶乘函数 factorial 需要用到一个中间变量total，那就把这个中间变量改写成函数的参数。这样做的缺点就是不太直观，第一眼很难看出来，为什么计算5的阶乘，需要传入两个参数5和1？

两个方法可以解决这个问题。方法一是在尾递归函数之外，再提供一个正常形式的函数。

function tailFactorial(n, total) {
  if (n === 1) return total
  return tailFactorial(n - 1, n * total)
}

function factorial(n) {
  return tailFactorial(n, 1)
}

factorial(5) // 120
上面代码通过一个正常形式的阶乘函数factorial，调用尾递归函数tailFactorial，看起来就正常多了。

函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。

function currying(fn, n) {
  return function (m) {
  return fn.call(this, m, n)
  }
}

function tailFactorial(n, total) {
  if (n === 1) return total
  return tailFactorial(n - 1, n * total)
}

const factorial = currying(tailFactorial, 1)

factorial(5) // 120
上面代码通过柯里化，将尾递归函数tailFactorial变为只接受一个参数的factorial。

第二种方法就简单多了，就是采用 ES6 的函数默认值。

function factorial(n, total = 1) {
  if (n === 1) return total
  return factorial(n - 1, n * total)
}

factorial(5) // 120
上面代码中，参数total有默认值1，所以调用时不用提供这个值。

总结一下，递归本质上是一种循环操作。纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现，这就是为什么尾递归对这些语言极其重要。对于其他支持“尾调用优化”的语言（比如 Lua，ES6），只需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归。
  
  
  */

    /* 
  
  严格模式

  ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。

func.arguments：返回调用时函数的参数。
func.caller：返回调用当前函数的那个函数。
尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。

function restricted() {
  'use strict'
  restricted.caller;    // 报错
  restricted.arguments; // 报错
}
restricted()
  
  
  
  */


    /* 
  
尾递归优化在非严格模式下的实现

尾递归优化只在严格模式下生效，那么正常模式下，或者那些不支持该功能的环境中，有没有办法也使用尾递归优化呢？回答是可以的，就是自己实现尾递归优化。

它的原理非常简单。尾递归之所以需要优化，原因是调用栈太多，造成溢出，那么只要减少调用栈，就不会溢出。怎么做可以减少调用栈呢？就是采用“循环”换掉“递归”。

下面是一个正常的递归函数。

function sum(x, y) {
  if (y > 0) {
  return sum(x + 1, y - 1)
  } else {
  return x
  }
}

sum(1, 100000)
// Uncaught RangeError: Maximum call stack size exceeded(…)
上面代码中，sum是一个递归函数，参数x是需要累加的值，参数y控制递归次数。一旦指定sum递归 100000 次，就会报错，提示超出调用栈的最大次数。

蹦床函数（trampoline）可以将递归执行转为循环执行。

function trampoline(f) {
  while (f && f instanceof Function) {
  f = f()
  }
  return f
}
上面就是蹦床函数的一个实现，它接受一个函数f作为参数。只要f执行后返回一个函数，就继续执行。注意，这里是返回一个函数，然后执行该函数，而不是函数里面调用函数，这样就避免了递归执行，从而就消除了调用栈过大的问题。

然后，要做的就是将原来的递归函数，改写为每一步返回另一个函数。

function sum(x, y) {
  if (y > 0) {
  return sum.bind(null, x + 1, y - 1)
  } else {
  return x
  }
}
上面代码中，sum函数的每次执行，都会返回自身的另一个版本。

现在，使用蹦床函数执行sum，就不会发生调用栈溢出。

trampoline(sum(1, 100000))
// 100001
蹦床函数并不是真正的尾递归优化，下面的实现才是。

function tco(f) {
  var value
  var active = false
  var accumulated = []

  return function accumulator() {
  accumulated.push(arguments)
  if (!active) {
    active = true
    while (accumulated.length) {
      value = f.apply(this, accumulated.shift())
    }
    active = false
    return value
  }
  }
}

var sum = tco(function(x, y) {
  if (y > 0) {
  return sum(x + 1, y - 1)
  }
  else {
  return x
  }
})

sum(1, 100000)
// 100001
上面代码中，tco函数是尾递归优化的实现，它的奥妙就在于状态变量active。默认情况下，这个变量是不激活的。一旦进入尾递归优化的过程，这个变量就激活了。然后，每一轮递归sum返回的都是undefined，所以就避免了递归执行；而accumulated数组存放每一轮sum执行的参数，总是有值的，这就保证了accumulator函数内部的while循环总是会执行。这样就很巧妙地将“递归”改成了“循环”，而后一轮的参数会取代前一轮的参数，保证了调用栈只有一层。

  
  
  
  */

}

// 8.1 函数参数的尾逗号：es2017
{

    /* 
    
    在之前的情况中，函数参数的最后一个参数后面不能添加逗号，数组和对象的最后一个元素后面可以添加尾逗号
    
    */
   
    // const test = (a, b,) => {
    //     console.log('尾逗号可以使用');
    // }

    // test()

}

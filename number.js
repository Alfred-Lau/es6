// 1.1 二进制和八进制表示法
{
    /* 
  
  - 二进制：0b （0B）
  - 八进制：0o （0O）
  
  */

    console.log(3);
    console.log(0b111110111.toString(10));

    console.log(0o767.toString(10)); // 1*7+8*6+64*7= 55+ 448 = 503

    /* 
  
  从es5开始，在严格模式之中，八进制就不再允许使用前缀0表示，es6明确指出，八进制使用0o表示
  
  */

    // 非严格模式
    (function () {
    // console.log(0o11 === 011)
    })(); // true

    // 严格模式
    /*     (function () {
  'use strict'
  console.log(0o11 === 011)
  })() */
    // <U></U>ncaught SyntaxError: Octal literals are not allowed in <stric></stric>t mode.

    // 如果需要将0b和0o前缀的字符串数值转为十进制,注意，直接转换为十进制，需要使用Number（）方法
    console.log(Number('0b111110111'));
    console.log(Number('0o767'));
}

// 2.1 Number.isFinite && Number.isNaN()
{
    // 如果参数类型不是数值，Number.isIfnite（）一律返回false

    // 注意，如果参数类型不是数值，Number.isNaN一律返回false。

    /* 

  它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，Number.isFinite()对于非数值一律返回false,
  Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。 

* /
}

// 3.1 Number.parseInt() && Number.parseFloat()
{
  /* 
  
  ES6将全局方法parseInt和parseFloat，移植到Number对象上面，行为完全保持不变，这样做的目的，是逐步减少全局性方法，使得语言逐步模块化

  */

    // ES5的写法
    parseInt('12.34'); // 12
    parseFloat('123.45#'); // 123.45

    // ES6的写法
    Number.parseInt('12.34'); // 12
    Number.parseFloat('123.45#'); // 123.45

    console.log(Number.parseInt === parseInt); // true

    const test01 = (params) => params;

    const test02 = (params) => params;

    console.log(test01 == test02); // false
}

// 4.1 Number.isInteger(): 用来判断一个数值是否为整数
{
    console.log(Number.isInteger(1.0)); // true(原因：JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 1 和 1.0 被视为同一个值。)

    // 如果参数不是数值，Number.isInteger()返回false

    /* 

  注意，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，Number.isInteger可能会误判。

  Number.isInteger(3.0000000000000002) // true
  上面代码中，Number.isInteger的参数明明不是整数，但是会返回true。原因就是这个小数的精度达到了小数点后16个十进制位，转成二进制位超过了53个二进制位，导致最后的那个2被丢弃了。

  类似的情况还有，如果一个数值的绝对值小于Number.MIN_VALUE（5E-324），即小于 JavaScript 能够分辨的最小值，会被自动转为 0。这时，Number.isInteger也会误判。

  Number.isInteger(5E-324) // false
  Number.isInteger(5E-325) // true
  上面代码中，5E-325由于值太小，会被自动转为0，因此返回true。

  总之，如果对数据精度的要求较高，不建议使用Number.isInteger()判断一个数值是否为整数。
  
  */

}

// 5.1 Number.EPSILON
{
    // es6在Number对象上面，新增一个极小的常量Number.EPSILON。根据规定，它表示1和大于1的最小浮点数之间的差
    console.log(Number.EPSILON);
    console.log(Number.EPSILON === Math.pow(2, -52));

    /* 
  Number.EPSILON实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。

  引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。我们知道浮点数计算是不精确的。

  0.1 + 0.2
  // 0.30000000000000004

  0.1 + 0.2 - 0.3
  // 5.551115123125783e-17

  5.551115123125783e-17.toFixed(20)
  // '0.00000000000000005551'
  上面代码解释了，为什么比较0.1 + 0.2与0.3得到的结果是false。

  0.1 + 0.2 === 0.3 // false
  
  
  
  */

}

// 6.1 安全整数和Number.isSafeInteger()
{
    /* 
  JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。

  */

    /* 
  
  ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。
  */

    /* 
  Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。
  
  */

    /* 
  实际使用这个函数时，需要注意。验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值。
  
  */

}

// 7.1 Math对象的扩展
{

    /* 
  ES6 在 Math 对象上新增了 17 个与数学相关的方法。所有这些方法都是静态方法，只能在 Math 对象上调用。
  
  */

    /* 
  - Math.trunc()：方法用于去除一个数的小数部分，返回整数部分；对于非数值，Math.trunc内部使用Number方法将其先转为数值；对于空值和无法截取整数的值，返回NaN。
  - Math.sign()：用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。

它会返回五种值。

参数为正数，返回+1；
参数为负数，返回-1；
参数为 0，返回0；
参数为-0，返回-0
其他值，返回NaN。

  - Math.cbrt()：计算参数的立方根
  - Math.clz32()：JavaScript 的整数使用 32 位二进制形式表示，Math.clz32方法返回一个数的 32 位无符号整数形式有多少个前导 0。
  - Math.imul()：返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。
  - Math.fround()：返回一个数的32位单精度浮点数形式
  - Math.hypot()：返回所有参数的平方和的平方根
  
  */

    /* 
  
  对数相关方法

  - Math.expm1()
  - Math.log1p()
  - Math.log10()
  - Math.log2()

  
  */

    /* 
  双曲函数方法
  ES6 新增了 6 个双曲函数方法。

  Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
  Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
  Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
  Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
  Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
  Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）
  
  
  */

}

// 8.1 指数运算符
{
    /* 
  
  - es2016新增了一个指数运算符（**）
  - 指数运算符可以和等号结合，形成一个新的赋值运算符 **=

  */

    // console.log(2 ** 3)//8
    console.log(Math.pow(2, 3));

    /* 
  
  注意，在 V8 引擎中，指数运算符与Math.pow的实现不相同，对于特别大的运算结果，两者会有细微的差异。

  Math.pow(99, 99)
  // 3.697296376497263e+197

  99 ** 99
  // 3.697296376497268e+197
  上面代码中，两个运算结果的最后一位有效数字是有差异的。
  
  
  */

}

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

}

// 7.1 Math对象的扩展
{

}

// 8.1 指数运算符
{

}

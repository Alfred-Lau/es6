// 1.1. spread扩展运算符: 类似rest参数的逆运算，讲一个数组转为用逗号分隔的参数序列
{
    // 直接扩展数组
    console.log(...[1, 2, 3]);

    // 扩展函数返回值
    const returnArr = () => [4, 5, 6];
    console.log(...returnArr());

    /* 
  该运算符主要用与函数调用
  
  */

    const pushFake = (target, ...values) => {
    // Array.prototype.push方法可以接受一个或者多个参数
        target.push(...values);
    };

    const arr = [];
    pushFake(arr, 1, 2, 5, 67, 9, 10);
    console.log(arr);

    // 扩展运算符与正常的函数参数可以结合使用，非常灵活。

    // 扩展运算符后面还可以放置表达式。

    // const arr = [
    //     ...(x > 0 ? ['a'] : []),
    //     'b'
    // ]

    // 如果扩展运算符后面是一个空数组，则不产生任何效果。

    /* 
  
  替代函数的apply方法，将数组转为函数的参数
  
  */

    const f = (x, y, z) => void console.log(x, y, z);
    const args = [0, 1, 2];
    f(args); // [ 0, 1, 2 ] undefined undefined
    f.apply(null, args); // TODO:0,1,2
    f(...args);

    // 求数组最大元素的方法
    const tar = [1, 4, 2, 5, 6, 8];
    // Math.max方法不能直接求数组的最大值
    let max = Math.max.apply(null, tar);
    console.log(max);

    // es6的写法
    console.log(Math.max(...tar));

    console.log('-------------');
    // 将一个数组添加到另一个数组的尾部 :array.push的返回值是当前数组的元素个数;push函数的参数不能是数组
    let arr01 = [0, 1, 2];
    let arr02 = [3, 4, 5];
    Array.prototype.push.apply(arr01, arr02);
    console.log(arr01);

    let arr03 = [0, 1, 2];
    let arr04 = [3, 4, 5];
    arr03.push(...arr04);
    console.log(arr03);

    // 日期

    // ES5
    new (Date.bind.apply(Date, [null, 2015, 1, 1]));
    // ES6
    console.log(new Date(...[2015, 1, 1]));

    /* 
  
  扩展运算符的应用

  1. 复制数组
  2. 合并数组
  3. 和解构赋值结合
  4. 字符串
  5. 实现了Iterator接口的对象
  6. Map和Set结构，Generator函数
  
  */

    // 1. 复制数组

    // es5的方法:array.concat函数不改变原有数组，而是返回一个全新的数组
    const a1 = [1, 4];
    const a2 = a1.concat();
    console.log(a2);

    // es6的简便写法：有两种方式
    const a3 = [2, 3];
    const a3Copy01 = [...a3];
    const [...a3Copy02] = a3;
    console.log(a3Copy01, a3Copy02);

    // 2. 合并数组
    let arr1 = ['a', 'b'];
    let arr2 = ['c'];
    let arr3 = ['d', 'e'];

    // ES5的合并数组
    arr1.concat(arr2, arr3); // [ 'a', 'b', 'c', 'd', 'e' ] 

    // ES6的合并数组
    [...arr1, ...arr2, ...arr3]; // [ 'a', 'b', 'c', 'd', 'e' ]

    // 3. 和解构赋值结合：如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

    // const [...butLast,last] = [1, 2, 3, 4, 5]
    // 报错

    // const [first,...middle,last] = [1, 2, 3, 4, 5]
    // 报错

    // 4. 字符串： 扩展运算符还可以将字符串转换为真正的数组
    console.log([...'string']); // [ 's', 't', 'r', 'i', 'n', 'g' ]

    // 正确返回字符串长度的函数，可以像下面这样写。
    function length (str) {
        return [...str].length;
    }

    length('x\uD83D\uDE80y'); // 3

    // 凡是涉及到操作四个字节的 Unicode 字符的函数，都有这个问题。因此，最好都用扩展运算符改写。

    let str = 'x\uD83D\uDE80y';

    str.split('').reverse().join(''); // 'y\uDE80\uD83Dx'

    // [...str].reverse().join('')// 'y\uD83D\uDE80x'

    // 上面代码中，如果不用扩展运算符，字符串的reverse操作就不正确。

    // 5. 实现了Iterator接口的对象

    // 实现了Iterator接口的对象，通过扩展运算符转化为数组

    const iteratorObj = function * () {
        const array = [1, 2, 32, 34, 5, 6, 7];

        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            yield element;
        }
    };

    // 生成器函数要执行一下才能变成遍历器对象
    const arrayIter = [...iteratorObj()];
    console.log(arrayIter);

    // 未实现Iterator接口的类数组对象，通过Array.from转换为数组:
    /* 

  何为类数组对象？
  - 拥有length属性，
  - 其它属性（索引）为非负整数(对象中的索引会被当做字符串来处理，这里你可以当做是个非负整数串来理解)不具有数组所具有的方法ps：
  -这是参考的定义，实际上，只要有length属性，且它的属性值为number类型就行了
  
  */
    const arrayLike = {
        '0': 'dd',
        '1': 'al',
        '2': 10,
        length: 3
    };
    const array = Array.from(arrayLike);
    console.log(array);

    // 6. Map，Set， Generator函数

}

// 2.1. Array.from()
{

    /* 

  Array.from方法用于将两类对象转为真正的数组：
  - 类似数组的对象（array-like object） 
  - 可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
  
  */

}

// 3.1. Array.of()
{

}

// 4.1. 数组实例的 copyWithin()
{

}

// 5.1. 数组实例的find()和findIndex()
{

}

// 6.1. 数组实例的fill()
{

}

// 7.1. 数组实例的entries(), keys(), values()
{

}

// 8.1.数组实例的includes()
{

}

// 9.1. 数组的空位

{

}

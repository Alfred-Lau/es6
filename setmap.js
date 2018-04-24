// 1.1 Set
{
    /* 
    Set类似于数组,但是成员的值都是唯一的，没有重复的值。

    Set本身是一个构造函数，用来生成Set数据结构

    Set结构添加元素使用add方法

    Set函数可以接受一个数组（或者具有Iterator接口的其他数据结构）作为参数，用来初始化
    */
   
    const s = new Set();
    [2,3,4,2,5].forEach(x => s.add(x));

    console.log(s);
    
    // 例1
    const set1 = new Set([1, 2, 3, 4, 4]);
    console.log(set1.size, set1);

    // 例2
    // const items = new Set(document.querySelectorAll('div'));

    // 数组去重
    console.log('数组去重', [...new Set([1, 2, 3, 4, 5, 6, 74, 3, 1, 10])]);
    

    /* 
    向 Set 加入值的时候， 不会发生类型转换， 所以5和 "5"
    是两个不同的值。 Set 内部判断两个值是否不同， 使用的算法叫做“ Same - value - zero equality”， 它类似于精确相等运算符（ === ），主要的区别是NaN等于自身， 而精确相等运算符认为NaN不等于自身。
    
    */
   
    // 另外， 两个对象总是不相等的。

    let set = new Set();

    set.add({});
    set.size; // 1

    set.add({});
    set.size; // 2
    // 上面代码表示， 由于两个空对象不相等， 所以它们被视为两个值。


    /*  
    Set实例的方法和属性：

    Set.prototype.constructor 构造函数，默认就是Set函数。
    Set.prototype.size 返回Set实例的成员总数

    Set实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）

    实例的操作方法：
    - add(value) : 添加某个值，返回Set结构本身
    - delete(value) : 删除某个值，返回一个布尔值，表示删除是否成功
    - has(value) : 返回一个布尔值，表示该值是否为Set的成员
    - clear() : 清除所有成员，没有返回值

    TODO:实例的遍历方法： 遍历顺序就是插入顺序, 这个特性有时非常有用， 比如使用 Set 保存一个回调函数列表， 调用时就能保证按照添加顺序调用。
    - keys() : 返回键名的遍历器
    - values() : 返回键值的遍历器
    - entries() : 返回键值对的遍历器
    - forEach() : 使用回调函数遍历每个成员
    */
   
    // s.add(1).add(2).add(2);
    // // 注意2被加入了两次

    // s.size // 2

    // s.has(1) // true
    // s.has(2) // true
    // s.has(3) // false

    // s.delete(2);
    // s.has(2) // false

    // Object结构和Set结构的对比

    // Array.from方法可以将Set结构转为数组
    const sets = new Set([1, 2, 3, 4, 5]);
    const array = Array.from(sets);

    console.log('array from set', array);

    // 数组去重的另一种方法
    function dedupe(array) {
        return Array.from(new Set(array));
    }
    console.log('second dedupe', dedupe([1, 1, 1, 3, 2, 1, 2, 7]));
    

    // 遍历：由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
    let set3 = new Set(['red', 'green', 'blue']);

    for (let item of set3.keys()) {
        console.log(item);
    }
    // red
    // green
    // blue

    for (let item of set3.values()) {
        console.log(item);
    }
    // red
    // green
    // blue

    for (let item of set3.entries()) {
        console.log(item);
    }
    // ["red", "red"]
    // ["green", "green"]
    // ["blue", "blue"]

    // Set结构的实例默认可以遍历，它的默认遍历生成函数就是它的values方法
    console.log(Set.prototype[Symbol.iterator] === Set.prototype.values);//true

    // 这意味着， 可以省略values方法， 直接用for...of循环遍历 Set。

    let set4 = new Set(['red', 'green', 'blue']);

    for (let x of set4) {
        console.log(x);
    }
    // red
    // green
    // blue

    // forEach

    /* 
    Set 结构的实例与数组一样， 也拥有forEach方法， 用于对每个成员执行某种操作， 没有返回值。

    set = new Set([1, 4, 9]);
    set.forEach((value, key) => console.log(key + ' : ' + value))
    // 1 : 1
    // 4 : 4
    // 9 : 9
    上面代码说明， forEach方法的参数就是一个处理函数。 该函数的参数与数组的forEach一致， 依次为键值、 键名、 集合本身（ 上例省略了该参数）。 这里需要注意， Set 结构的键名就是键值（ 两者是同一个值）， 因此第一个参数与第二个参数的值永远都是一样的。
    */
   
    // 此外，forEach方法还可以有第二个参数，表示绑定处理函数内部的this对象。

    /* 
        遍历的应用：

        1. 扩展运算符内部使用for...of...循环，所以也可以用于Set结构
        2. 扩展运算符和Set结构相结合，就可以去除数组的重复成员
        3. 数组的map和filter方法也能够间接用于Set
        4. 可以使用Set实现并集，交集和差集
        5. 在遍历操作中， 同步改变原来的Set结构， 目前没有直接的方法， 但有两种变通方法。 一种是利用原 Set 结构映射出一个新的结构， 然后赋值给原来的 Set 结构； 另一种是利用Array.from方法。
    */
   
    // 1. 遍历的应用1：
    

}

// 2.1 WeakSet
{

}

// 3.1 Map
{

}

// 4.1 WeakMap
{
    
}
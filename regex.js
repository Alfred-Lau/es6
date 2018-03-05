// TODO:1.1 RegExp的扩展
{
    /* 
  
  es5中的RegExp构造函数
  - 情况一：参数是字符串，这时第二个参数表示正则表达式的修饰符
  - 情况二：参数是一个正则表达式，这时会返回一个原有正则表达式的拷贝,此时不能使用第二个参数添加修饰符
  
  */

    let target = 'axyzbyzxyz';
    // 情况一：
    let regex01 = new RegExp('xyz', 'g');
    console.log(regex01.test(target));
    // exec只返回第一个匹配的字符串，再调用会转到下一个
    console.log(regex01.exec(target));  
    // console.log(regex01.exec(target));  

    // 情况二：
    let regex02 = new RegExp(/xyz/i);
    console.log(regex02.test(target));

    // 对象永远不可能相等，因为它们保存的是地址
    console.log(regex01 == regex02); // false

    /* 

  ES6 改变了这种行为。如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。

  */

    console.log(new RegExp(/xyz/ig, 'i').flags);
}

// TODO: 2.1 字符串的正则方法
{

    /* 
  
  字符串对象共有4个方法，可以使用正则表达式：match()，replace(),search()和split()

  ES6将这四个方法，在语言内部全部调用RegExp的实例方法，从而做到所有和正则相关的方法，全部定义到RegExp对象上。

  String.prototype.match 调用 RegExp.prototype[Symbol.match]
  String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
  String.prototype.search 调用 RegExp.prototype[Symbol.search]String.prototype.split 调用 RegExp.prototype[Symbol.split]
  
  */

}

// TODO:3.1 u修饰符
{


}

// TODO:4.1 y修饰符
{
    // y修饰符，又叫做“粘连”（sticky）修饰符
    /* 
 y修饰符的作用与g修饰符类似， 也是全局匹配， 后一次匹配都从上一次匹配成功的下一个位置开始。 不同之处在于， g修饰符只要剩余位置中存在匹配就可， 而y修饰符确保匹配必须从剩余的第一个位置开始， 这也就是“ 粘连” 的涵义。
  
  */
 
    let s = 'aaa_aa_a';
    var r1 = /a+/g;
    var r2 = /a+/y;

    console.log(r1.exec(s)); // ["aaa"]
    console.log(r2.exec(s)); // ["aaa"]

    console.log(r1.exec(s)); // ["aa"]
    console.log(r2.exec(s)); // null

}
// TODO: 5.1 sticky属性
{
  // 与y修饰符相匹配，es6的正则对象多了sticky属性，表示是否设置了y修饰符
  console.log(/xyz/iy.sticky);

}

// TODO: 6.1 flags属性
{
  // es6为正则表达式新增了flags属性，会返回正则表达式的修饰符
  
  // es5的source属性，返回正则表达式的正文
  console.log(/xyz/ig.source);

  console.log(/xyz/ig.flags);

}
// TODO:7.1 s修饰符：dotAll模式
{
  

}

// TODO:8.1 后行断言
{

}
// TODO:9.1 Unicode属性类
{

}
// TODO:10.1 具名组匹配
{

}
// TODO: 11.1 String.prototype.matchAll()的使用
{

}

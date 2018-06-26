// 1.1 Promise的含义: es6原生提供了promise对象
{
  /* 
  Promise构造函数接受一个函数作为参数， 该函数的两个参数分别是resolve和reject。 它们是两个函数， 由 JavaScript 引擎提供， 不用自己部署。
  

  resolve函数的作用是， 将Promise对象的状态从“ 未完成” 变为“ 成功”（ 即从 pending 变为 resolved）， 在异步操作成功时调用， 并将异步操作的结果， 作为参数传递出去； reject函数的作用是， 将Promise对象的状态从“ 未完成” 变为“ 失败”（ 即从 pending 变为 rejected）， 在异步操作失败时调用， 并将异步操作报出的错误， 作为参数传递出去。

  Promise实例生成以后， 可以用then方法分别指定 resolved 状态和 rejected 状态的回调函数。

  */

}

// 2.1 基本用法
{
  const promise = new Promise((resolve, reject) => {
    // setTimeout(function[, delay, param1, param2, ...])

    /*
    
    setTimeout(() => {
      resolve('ok')
    }, 3000); 
    
    */
    setTimeout(resolve, 3000, 'hello, promise')

  })

  promise.then(data => console.log(data))
  console.log('sync')


    /* 
      Promise 新建后就会立即执行。
    */
  {
    let promise02 = new Promise((resolve, reject) => {
    console.log('exec before operation')
    })
    promise02.then(function () {
      console.log('resolved.');
    });

    // console.log 是同步函数
    console.log('Hi!');
  }

  // 异步加载图片:注意这种使用promise的模式，我称之为“倒挂promise”

  {
    const loadImgAsyncOpt = (url) => {
      return new Promise((resolve, reject) => {
        let img = new Image();

        img.onload = () => {
          resolve(img)
        }

        img.onerror = () => {
          reject(new Error('could not load img at' + url))
        }

        img.src = url
      })

    }
  }

  //  Ajax操作的例子
  {
/*     
const getJson = (url) => {
      const promise = new Promise((resolve, reject) => {
        const handler = function ajaxHandler() {
          if (this.readyState !== 4) {
            return;
          }
          if (this.status === 200) {
            resolve(this.response)
          } else {
            reject(new Error(this.statusText))
          }
        }

        const client = new XMLHttpRequest()
        client.open('GET', url)
        client.onreadystatechange = handler
        client.responseType = 'json'
        client.setRequestHeader('Accept', 'application/json')
        client.send()
      })

      return promise
    } 
    */

    // test case

/*     getJson('/posts.json')
      .then(json => {
        console.log('Content:', json)
      }, err => {
        console.log('error', err)
      }) */
  }

  /* 
  如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。reject函数的参数通常是Error对象的实例，表示抛出的错误；resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样。
  
  */
  {
    const p1 = new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error('fail')), 3000)
    })

    const p2 = new Promise(function (resolve, reject) {
      setTimeout(() => resolve(p1), 1000)
    })

    p2
      .then(result => console.log(result))
      .catch(error => console.log(error))
    // Error: fail
  }

  /* 
  调用resolve或者reject并不会终结promise的参数函数的执行

  */
  {
    let promise = new Promise((resolve, reject) => {
      resolve(1)
      console.log(2) //依旧会执行这一句
    }).then(r => console.log(r))

  /*  
   上面代码中，调用resolve(1)以后，后面的console.log(2)还是会执行，并且会首先打印出来。这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。

    一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。所以，最好在它们前面加上return语句，这样就不会有意外。 
    */

    new Promise((resolve, reject) => {
      // TODO:最好加上 return 语句
      return resolve(1);
      // 后面的语句不会执行
      console.log(2);
    })
  }

}

// 3.1 Promise.prototype.then()
{
  new Promise(((resolve, reject) => {
    
  })).then(
    () => {
      // success
    },
    () => {
      // failure
    }
  ).then(r => {
    console.log(r)
  })

}

// 4.1 Promise.prototype.catch()
{
  // reject()的作用等同于抛出错误
  const promise = new Promise((resolve, reject) => {
    throw new Error('test error')
  })

  promise.catch((err) => {
    console.log('catchhed', err)
  })

  {
    // 如果 Promise 状态已经变成resolved， 再抛出错误是无效的。

    const promise = new Promise(function (resolve, reject) {
      resolve('ok');
      throw new Error('test');
    });
    promise
      .then(function (value) {
        console.log(value)
      })
      .catch(function (error) {
        console.log(error)
      });
    // ok
  
    /*
    上面代码中， Promise 在resolve语句后面， 再抛出错误， 不会被捕获， 等于没有抛出。 因为 Promise 的状态一旦改变， 就永久保持该状态， 不会再变了。

    Promise 对象的错误具有“ 冒泡” 性质， 会一直向后传递， 直到被捕获为止。 也就是说， 错误总是会被下一个catch语句捕获。 */

/*     getJSON('/post/1.json').then(function (post) {
      return getJSON(post.commentURL);
    }).then(function (comments) {
      // some code
    }).catch(function (error) {
      // 处理前面三个Promise产生的错误
      }); */
    
    /* 上面代码中， 一共有三个 Promise 对象： 一个由getJSON产生， 两个由then产生。 它们之中任何一个抛出的错误， 都会被最后一个catch捕获。

    一般来说， 不要在then方法里面定义 Reject 状态的回调函数（ 即then的第二个参数）， 总是使用catch方法。 */
  }


  {

    // bad
    promise
      .then(function (data) {
        // success
      }, function (err) {
        // error
      });

    // good
    promise
      .then(function (data) { //cb
        // success
      })
      .catch(function (err) {
        // error
      });

      /*
    上面代码中， 第二种写法要好于第一种写法， 理由是第二种写法可以捕获前面then方法执行中的错误， 也更接近同步的写法（
    try /catch）。 因此， 建议总是使用catch方法， 而不使用then方法的第二个参数。
    跟传统的try / catch代码块不同的是， 如果没有使用catch方法指定错误处理的回调函数， Promise 对象抛出的错误不会传递到外层代码， 即不会有任何反应。 */

  }

}

// 5.1 Promise.prototype.finally()： ES2018引入的新特性
{

}

// 6.1 Promise.all()
{

}

// 7.1 Promise.race()
{

  /* 
  上面代码中， 只要p1、 p2、 p3之中有一个实例率先改变状态， p的状态就跟着改变。 那个率先改变的 Promise 实例的返回值， 就传递给p的回调函数。
  */
    /* 
    Promise.race方法的参数与Promise.all方法一样， 如果不是 Promise 实例， 就会先调用下面讲到的Promise.resolve方法， 将参数转为 Promise 实例， 再进一步处理。
    
    */
}

// 8.1 Promise.resolve()
{

  /* 
  有时需要将现有对象转为 Promise 对象， Promise.resolve方法就起到这个作用。

  const jsPromise = Promise.resolve($.ajax('/whatever.json'));
  上面代码将 jQuery 生成的deferred对象， 转为一个新的 Promise 对象。

  Promise.resolve等价于下面的写法。

  Promise.resolve('foo')
  // 等价于
  new Promise(resolve => resolve('foo'))
  Promise.resolve方法的参数分成四种情况。


  （
  1） 参数是一个 Promise 实例

  如果参数是 Promise 实例， 那么Promise.resolve将不做任何修改、 原封不动地返回这个实例。

  （ 2） 参数是一个thenable对象

  thenable对象指的是具有then方法的对象， 比如下面这个对象。

  let thenable = {
    then: function (resolve, reject) {
      resolve(42);
    }
  };
  Promise.resolve方法会将这个对象转为 Promise 对象， 然后就立即执行thenable对象的then方法。

  let thenable = {
    then: function (resolve, reject) {
      resolve(42);
    }
  };

  let p1 = Promise.resolve(thenable);
  p1.then(function (value) {
    console.log(value); // 42
  });
  上面代码中， thenable对象的then方法执行后， 对象p1的状态就变为resolved， 从而立即执行最后那个then方法指定的回调函数， 输出 42。

  （ 3） 参数不是具有then方法的对象， 或根本就不是对象

  如果参数是一个原始值， 或者是一个不具有then方法的对象， 则Promise.resolve方法返回一个新的 Promise 对象， 状态为resolved。

  const p = Promise.resolve('Hello');

  p.then(function (s) {
    console.log(s)
  });
  // Hello
  上面代码生成一个新的 Promise 对象的实例p。 由于字符串Hello不属于异步操作（ 判断方法是字符串对象不具有 then 方法）， 返回 Promise 实例的状态从一生成就是resolved， 所以回调函数会立即执行。 Promise.resolve方法的参数， 会同时传给回调函数。

  （ 4） 不带有任何参数

  Promise.resolve方法允许调用时不带参数， 直接返回一个resolved状态的 Promise 对象。

  所以， 如果希望得到一个 Promise 对象， 比较方便的方法就是直接调用Promise.resolve方法。

  const p = Promise.resolve();

  p.then(function () {
    // ...
  });
  上面代码的变量p就是一个 Promise 对象。

  需要注意的是， 立即resolve的 Promise 对象， 是在本轮“ 事件循环”（ event loop） 的结束时， 而不是在下一轮“ 事件循环” 的开始时。

  setTimeout(function () {
    console.log('three');
  }, 0);

  Promise.resolve().then(function () {
    console.log('two');
  });

  console.log('one');

  // one
  // two
  // three
  上面代码中， setTimeout(fn, 0) 在下一轮“ 事件循环” 开始时执行， Promise.resolve() 在本轮“ 事件循环” 结束时执行， console.log('one') 则是立即执行， 因此最先输出。
  
  
  
  */

}

// 9.1 Promise.reject()
{
  /* 
  
  Promise.reject(reason) 方法也会返回一个新的 Promise 实例， 该实例的状态为rejected。 */

}

// 10.1 应用
{
  // 加载图片

  {
/*     


    const preloadImg = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = resolve
        img.onerror = reject
        img.src = url
      })
    }
    const path = 'http://image.baidu.com/search/detail?z=0&word=%E6%91%84%E5%BD%B1%E5%B8%88%E5%BC%A0%E6%98%8A%E7%84%B6&hs=0&pn=10&spn=0&di=0&pi=54742789307&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cs=3128735284%2C769559575&os=&simid=&adpicid=0&lpn=0&fm=&sme=&cg=&bdtype=-1&oriquery=&objurl=http%3A%2F%2Fd.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F838ba61ea8d3fd1ffa987bb43c4e251f94ca5faf.jpg&fromurl=&gsm=0&catename=pcindexhot&islist=&querylist='

    preloadImg(path).then((img) => {
      console.log(img)
    }) 
    
    
    */
  }


  // 生成器函数和Promise的结合

  {

  }
    
}

// 11.1 Promise.try()： 目前只是一个提案
{

  /* 
  使用场景：
  实际开发中， 经常遇到一种情况： 不知道或者不想区分， 函数f是同步函数还是异步操作， 但是想用 Promise 来处理它。 因为这样就可以不管f是否包含异步操作， 都用then方法指定下一步流程， 用catch方法处理f抛出的错误。 一般就会采用下面的写法。

  Promise.resolve().then(f)
  上面的写法有一个缺点， 就是如果f是同步函数， 那么它会在本轮事件循环的末尾执行。

  const f = () => console.log('now');
  Promise.resolve().then(f);
  console.log('next');
  // next
  // now
  
  */
  
  // 同步函数同步执行，异步函数异步执行

    
}

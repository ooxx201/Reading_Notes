'use strict';
console.log('------------------变量提升----------------');
// avaScript会先扫描整个函数体的语句，把所有申明的变量“提升”到函数顶部：
function foo() {
    var x = 'Hello, ' + y;
    console.log(x);
    var y = 'Bob';
}

foo();

// 变量y在稍后申明了。但是console.log显示Hello, undefined，说明变量y的值为undefined。
// 这正是因为JavaScript引擎自动提升了变量y的声明，但不会提升变量y的赋值。
function foo1() {
    var y; // 提升变量y的申明，此时y为undefined
    var x = 'Hello, ' + y;
    console.log(x);
    y = 'Bob';
}

foo1();

// 由于JavaScript的这一怪异的“特性”，我们在函数内部定义变量时，请严格遵守“在函数内部首先申明所有变量”这一规则。
// 最常见的做法是用一个var申明函数内部用到的所有变量：
function foo2() {
    var
        x = 1, // x初始化为1
        y = x + 1, // y初始化为2
        z, i; // z和i为undefined
    // 其他语句:
    for (i=0; i<100; i++) {
    }
}

foo2();

console.log('-----------------全局作用域---------------');
// JavaScript默认有一个全局对象window，全局作用域的变量实际上被绑定到window的一个属性：
var course = 'Learn JavaScript';
console.log(course); // 'Learn JavaScript'
// alert(window.course); // 'Learn JavaScript'

function foo3() {
    console.log('foo3');
}

foo3(); // 直接调用foo()
// window.foo3(); // 通过window.foo()调用

console.log('-----------------名字空间----------------');
// 全局变量会绑定到window上，不同的JavaScript文件如果使用了相同的全局变量，或者定义了相同名字的顶层函数 都会造成命名冲突，并且很难被发现。
// 减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中。例如：
// 把自己的代码全部放入唯一的名字空间MYAPP中，会大大减少全局变量冲突的可能。

// 唯一的全局变量MYAPP:
var MYAPP = {};

// 其他变量:
MYAPP.name = 'myapp';
MYAPP.version = 1.0;

// 其他函数:
MYAPP.foo = function () {
    return 'foo';
};

console.log('-----------------局部作用域---------------');
// JavaScript的变量作用域实际上是函数内部，我们在for循环等语句块中是无法定义具有局部作用域的变量的：
function foo4() {
    for (var i=0; i<100; i++) {
        //
    }
    i += 100; // 仍然可以引用变量i
}

// 用let替代var可以申明一个块级作用域的变量：
function foo5() {
    var sum = 0;
    for (let i=0; i<100; i++) {
        sum += i;
    }
    // SyntaxError:
    i += 1;
}

console.log('-------------------常量-----------------');
const PI = 3.14;
// PI = 3; // 某些浏览器不报错，但是无效果！
console.log(PI); // 3.14
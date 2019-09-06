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


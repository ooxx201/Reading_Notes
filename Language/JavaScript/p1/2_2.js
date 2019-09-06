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

console.log('-----------------解构赋值----------------');
// 直接对多个变量同时赋值
var [x, y, z] = ['hello', 'JavaScript', 'ES6'];
console.log('x = ' + x + ', y = ' + y + ', z = ' + z);

let [x1, [y1, z1]] = ['hello', ['JavaScript', 'ES6']];
console.log('x1 = ' + x1 + ', y1 = ' + y1 + ', z1 = ' + z1);

let [, , z2] = ['hello', 'JavaScript', 'ES6']; // 忽略前两个元素，只对z赋值第三个元素
console.log(z2); // 'ES6'

var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school'
};
var {name, age, passport} = person;
console.log('name = ' + name + ', age = ' + age + ', passport = ' + passport);

var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school',
    address: {
        city: 'Beijing',
        street: 'No.1 Road',
        zipcode: '100001'
    }
};

var {name, address: {city, zip}} = person;
name; // '小明'
city; // 'Beijing'
zip; // undefined, 因为属性名是zipcode而不是zip
// 注意: address不是变量，而是为了让city和zip获得嵌套的address对象的属性:
// address; // Uncaught ReferenceError: address is not defined
console.log('name = ' + name + ', city = ' + city+ ', zip = ' + zip);

// 解构赋值对对象属性进行赋值时，如果对应的属性不存在，变量将被赋值为undefined
var person1 = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school'
};

// 把passport属性赋值给变量id:
let {name : name1, passport:id} = person1;
name1; // '小明'
id; // 'G-12345678'
// 注意: passport不是变量，而是为了让变量id获得passport属性:
passport; // Uncaught ReferenceError: passport is not defined
console.log('name1 = ' + name1 + ', passport = ' + passport + ', id = ' + id);

// 解构赋值还可以使用默认值，这样就避免了不存在的属性返回undefined的问题：
var person2 = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678'
};

// 如果person对象没有single属性，默认赋值为true:
var {name, single=true} = person2;
name; // '小明'
single; // true
console.log('name = ' + name + ', single = ' + single);

// 有些时候，如果变量已经被声明了，再次赋值的时候，正确的写法也会报语法错误：
// 声明变量:
var x, y;
// 解构赋值:
// {x, y} = { name: '小明', x: 100, y: 200};
// 语法错误: Uncaught SyntaxError: Unexpected token =

// 这是因为JavaScript引擎把{开头的语句当作了块处理，于是=不再合法。解决方法是用小括号括起来：
({x, y} = { name: '小明', x: 100, y: 200});
console.log('name = ' + name + ', x = ' + x + ', y = ' + y);

// 交换两个变量x和y的值
var x=1, y=2;
[x, y] = [y, x]

// 如果一个函数接收一个对象作为参数，那么，可以使用解构直接把对象的属性绑定到变量中
function buildDate({year, month, day, hour=0, minute=0, second=0}) {
    return new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
}

var date = buildDate({ year: 2017, month: 1, day: 1 }); // Sun Jan 01 2017 00:00:00 GMT+0800 (CST)
console.log(date);

date = buildDate({ year: 2017, month: 1, day: 1, hour: 20, minute: 15 }); // Sun Jan 01 2017 20:15:00 GMT+0800 (CST)
console.log(date);
'use strict';

function log(val, msg = '') {
	if (msg === '') {
		console.log('LOG: ' + val);
	} else {
		console.log('LOG.' + msg + ': ' + val);
	}	
}

log('---------------------create object-----------------------');
// 当我们用obj.xxx访问一个对象的属性时，JavaScript引擎先在当前对象上查找该属性，
// 如果没有找到，就到其原型对象上找，
// 如果还没有找到，就一直上溯到Object.prototype对象，
// 最后，如果还没有找到，就只能返回undefined。

// 创建一个Array对象：
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// 其原型链是：
// arr ----> Array.prototype ----> Object.prototype ----> null
// Array.prototype定义了indexOf()、shift()等方法，因此可以在所有的Array对象上直接调用这些方法。
log(arr.indexOf(3))
arr.shift()
log(arr)
arr.shift()
log(arr)

// 当我们创建一个函数时：
function foo() {
    return 0;
}
// 函数也是一个对象，它的原型链是：
// foo ----> Function.prototype ----> Object.prototype ----> null
// 由于Function.prototype定义了apply()等方法，因此，所有函数都可以调用apply()方法。


log('----------------------constructor------------------------');
function Student(name) {
    this.name = name;
    this.hello = function () {
        console.log('Hello, ' + this.name + '!');
    }
}

// 在JavaScript中，可以用关键字new来调用这个函数，并返回一个对象：
// 如果不写new，这就是一个普通函数，它返回undefined。
// 如果写了new，它就变成了一个构造函数，它绑定的this指向新创建的对象，并默认返回this，也就是说，不需要在最后写return this;。
var xiaoming = new Student('小明');
var xiaohong = new Student('小红');
var xiaojun = new Student('小军');
log(xiaoming.name); // '小明'
xiaoming.hello(); // Hello, 小明!

/* 
新创建的xiaoming的原型链是：
xiaoming ----> Student.prototype ----> Object.prototype ----> null

xiaoming ↘
xiaohong -→ Student.prototype ----> Object.prototype ----> null
xiaojun  ↗
*/

// 用new Student()创建的对象还从原型上获得了一个constructor属性，它指向函数Student本身：
var b;
b = xiaoming.constructor === Student.prototype.constructor; // true
log(b)
b = Student.prototype.constructor === Student; // true
log(b)
b = Object.getPrototypeOf(xiaoming) === Student.prototype; // true
log(b)
xiaoming instanceof Student; // true
log(b)

log(xiaoming.name); // '小明'
log(xiaohong.name); // '小红'
log(xiaoming.hello); // function: Student.hello()
log(xiaohong.hello); // function: Student.hello()
log(xiaoming.hello === xiaohong.hello); // false

// xiaoming和xiaohong各自的hello是一个函数，但它们是两个不同的函数，虽然函数名称和代码都是相同的！
// 让创建的对象共享一个hello函数，根据对象的属性查找原则，
// 我们只要把hello函数移动到xiaoming、xiaohong这些对象共同的原型上就可以了，也就是Student.prototype
function Student1(name) {
    this.name = name;
}

Student1.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
};
xiaoming = new Student1('小明');
xiaohong = new Student1('小红');

log(xiaoming.hello === xiaohong.hello); // True

log('----------------------without new------------------------');
/* 
	在strict模式下，this.name = name将报错，因为this绑定为undefined
 		xiaojun = Student1('小军'); // TypeError: Cannot set property 'name' of undefined
	在非strict模式下，this.name = name不报错，因为this绑定为window，
	于是无意间创建了全局变量name，并且返回undefined，这个结果更糟糕。
*/

// 我们可以编写一个createStudent()函数，在内部封装所有的new操作。
function Student2(props) {
    this.name = props.name || '匿名'; // 默认值为'匿名'
    this.grade = props.grade || 1; // 默认值为1
}

Student2.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
};

function createStudent2(props) {
    return new Student2(props || {})
}

var xiaoming = createStudent2({
    name: '小明'
});

log(xiaoming.name);
log(xiaoming.grade); // 1

log('-------------------------练习----------------------------')
function Cat(name) {
    this.name = name;
}
Cat.prototype.say = function () {
    return 'Hello, ' + this.name + '!';
}

var kitty = new Cat('Kitty');
var doraemon = new Cat('哆啦A梦');
log(kitty.name === 'Kitty')
log(typeof kitty.say === 'function')
log(kitty.say() === 'Hello, Kitty!')
log(kitty.say === doraemon.say)
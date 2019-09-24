'use strict';

function log(val, msg = '') {
	if (msg === '') {
		console.log('LOG: ' + val);
	} else {
		console.log('LOG.' + msg + ': ' + val);
	}	
}

log('----------------------OOD----------------------');
// JavaScript不区分类和实例的概念，而是通过原型（prototype）来实现面向对象编程。
// 原型是指当我们想要创建xiaoming这个具体的学生时，我们并没有一个Student类型可用。那怎么办？恰好有这么一个现成的对象：
var robot = {
    name: 'Robot',
    height: 1.6,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

// 我们看这个robot对象有名字，有身高，还会跑，有点像小明，干脆就根据它来“创建”小明得了！
// 于是我们把它改名为Student，然后创建出xiaoming：
var Student = {
    name: 'Robot',
    height: 1.2,
    run: function () {
        console.log(this.name + ' is running...');
    }
};
var xiaoming = {
    name: '小明'
};

xiaoming.__proto__ = Student;

// 最后一行代码把xiaoming的原型指向了对象Student，看上去xiaoming仿佛是从Student继承下来的：
console.log(xiaoming.name); // '小明'
xiaoming.run(); // 小明 is running...

// JavaScript没有“Class”的概念，所有对象都是实例，所谓继承关系不过是把一个对象的原型指向另一个对象而已。
var Bird = {
    fly: function () {
        console.log(this.name + ' is flying...');
    }
};

xiaoming.__proto__ = Bird;
xiaoming.fly(); // 小明 is flying...


log('-----------------Object.create-----------------');
// 请注意，上述代码仅用于演示目的。在编写JavaScript代码时，不要直接用obj.__proto__去改变一个对象的原型。
// Object.create()方法可以传入一个原型对象，并创建一个基于该原型的新对象，但是新对象什么属性都没有，
// 因此，我们可以编写一个函数来创建xiaoming：
// 原型对象:
var Student = {
    name: 'Robot',
    height: 1.2,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

function createStudent(name) {
    // 基于Student原型创建一个新对象:
    var s = Object.create(Student);
    // 初始化新对象:
    s.name = name;
    return s;
}

var xiaoming = createStudent('小明');
xiaoming.run(); // 小明 is running...
log(xiaoming.__proto__ === Student); // true
'use strict';

function log(val, msg = '') {
	if (msg === '') {
		console.log('LOG: ' + val);
	} else {
		console.log('LOG.' + msg + ': ' + val);
	}	
}

log('---------------------prototype inherit-----------------------');
function Student(props) {
    this.name = props.name || 'Unnamed';
}

Student.prototype.hello = function () {
    console.log('Hello, ' + this.name + '!');
}

/*
	基于Student扩展出PrimaryStudent1
	调用了Student构造函数不等于继承了Student，PrimaryStudent创建的对象的原型是：
	new PrimaryStudent() ----> PrimaryStudent.prototype ----> Object.prototype ----> null
*/
function PrimaryStudent1(props) {
    // 调用Student构造函数，绑定this变量:
    Student.call(this, props);
    this.grade = props.grade || 1;
}


/*
	想办法把原型链修改为：
	new PrimaryStudent() ----> PrimaryStudent.prototype ----> Student.prototype ----> Object.prototype ----> null
	我们必须借助一个中间对象来实现正确的原型链，这个中间对象的原型要指向Student.prototype。为了实现这一点，中间对象可以用一个空函数F来实现：
*/
// PrimaryStudent构造函数:
function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 空函数F:
function F() {
}

// 把F的原型指向Student.prototype:
F.prototype = Student.prototype;

// 把PrimaryStudent的原型指向一个新的F对象，F对象的原型正好指向Student.prototype:
PrimaryStudent.prototype = new F();

// 把PrimaryStudent原型的构造函数修复为PrimaryStudent:
PrimaryStudent.prototype.constructor = PrimaryStudent;

// 继续在PrimaryStudent原型（就是new F()对象）上定义方法：
PrimaryStudent.prototype.getGrade = function () {
    return this.grade;
};

// 创建xiaoming:
var xiaoming = new PrimaryStudent({
    name: '小明',
    grade: 2
});

log(xiaoming.name); // '小明'
log(xiaoming.grade); // 2

// 验证原型:
log(xiaoming.__proto__ === PrimaryStudent.prototype); // true
log(xiaoming.__proto__.__proto__ === Student.prototype); // true

// 验证继承关系:
log(xiaoming instanceof PrimaryStudent); // true
log(xiaoming instanceof Student); // true


log('---------------------prototype inherit1-----------------------');
// 把继承这个动作用一个inherits()函数封装起来
function inherits(Child, Parent) {
    var F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}

// 这个inherits()函数可以复用：
function Student(props) {
    this.name = props.name || 'Unnamed';
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
}

function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 实现原型继承链:
inherits(PrimaryStudent, Student);

// 绑定其他方法到PrimaryStudent原型:
PrimaryStudent.prototype.getGrade = function () {
    return this.grade;
};

/*
JavaScript的原型继承实现方式就是：

	1. 定义新的构造函数，并在内部用call()调用希望“继承”的构造函数，并绑定this；

	2. 借助中间函数F实现原型链继承，最好通过封装的inherits函数完成；

	3. 继续在新的构造函数的原型上定义新方法。
*/
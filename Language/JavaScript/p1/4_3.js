'use strict';

function log(val, msg = '') {
	if (msg === '') {
		console.log('LOG: ' + val);
	} else {
		console.log('LOG.' + msg + ': ' + val);
	}	
}

log('---------------------alass inherit-----------------------');
// 用函数实现Student：
function Student1(name) {
    this.name = name;
}

Student1.prototype.hello = function () {
    console.log('Hello, ' + this.name + '!');
}

// 用class关键字来编写Student：
class Student {
    constructor(name) {
        this.name = name;
    }

    hello() {
        console.log('Hello, ' + this.name + '!');
    }
}

var xiaoming = new Student('小明');
xiaoming.hello();

// 需要通过super(name)来调用父类的构造函数，否则父类的name属性无法正常初始化。
class PrimaryStudent extends Student {
    constructor(name, grade) {
        super(name); // 记得用super调用父类的构造方法!
        this.grade = grade;
    }

    myGrade() {
        alert('I am at grade ' + this.grade);
    }
}


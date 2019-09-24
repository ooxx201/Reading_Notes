'use strict';

function log(val, msg = '') {
	if (msg === '') {
		console.log('LOG: ' + val);
	} else {
		console.log('LOG.' + msg + ': ' + val);
	}	
}

log('----------------------JSON---------------------');
// JSON数据类型：
// number：和JavaScript的number完全一致；
// boolean：就是JavaScript的true或false；
// string：就是JavaScript的string；
// null：就是JavaScript的null；
// array：就是JavaScript的Array表示方式——[]；
// object：就是JavaScript的{ ... }表示方式。


// JSON字符集必须是UTF-8
// JSON的字符串规定必须用双引号""
// Object的键也必须用双引号""

log('-------------------serialize-------------------');
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp']
};
var s = JSON.stringify(xiaoming);
console.log(s);

var a;
// 按缩进输出
a = JSON.stringify(xiaoming, null, '  ');
console.log(a);

// 第二个参数用于控制如何筛选对象的键值，如果我们只想输出指定的属性，可以传入Array：
a = JSON.stringify(xiaoming, ['name', 'skills'], '  ');
console.log(a);

// 还可以传入一个函数，这样对象的每个键值对都会被函数先处理：
function convert(key, value) {
    if (typeof value === 'string') {
        return value.toUpperCase();
    }
    return value;
}

a = JSON.stringify(xiaoming, convert, '  ');
console.log(a)

// 可以给xiaoming定义一个toJSON()的方法，直接返回JSON应该序列化的数据：
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp'],
    toJSON: function () {
        return { // 只输出name和age，并且改变了key：
            'Name': this.name,
            'Age': this.age
        };
    }
};

a = JSON.stringify(xiaoming); // '{"Name":"小明","Age":14}'
console.log(a)


log('------------------deserialize------------------');
// 用JSON.parse()把JSON格式的字符串变成一个JavaScript对象：
a = JSON.parse('[1,2,3,true]'); // [1, 2, 3, true]
console.log(a)
a = JSON.parse('{"name":"小明","age":14}'); // Object {name: '小明', age: 14}
console.log(a)
a = JSON.parse('true'); // true
console.log(a)
a = JSON.parse('123.45'); // 123.45
console.log(a)

// JSON.parse()还可以接收一个函数，用来转换解析出的属性：
var obj = JSON.parse('{"name":"小明","age":14}', function (key, value) {
    if (key === 'name') {
        return value + '同学';
    }
    return value;
});
console.log(JSON.stringify(obj)); // {name: '小明同学', age: 14}

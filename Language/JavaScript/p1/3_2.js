'use strict';

function log(val, msg = '') {
	if (msg === '') {
		console.log('LOG: ' + val);
	} else {
		console.log('LOG.' + msg + ': ' + val);
	}	
}

log('---------------------RegExp--------------------');
// JavaScript有两种方式创建一个正则表达式：
// 第一种方式是直接通过/正则表达式/写出来。
// 第二种方式是通过new RegExp('正则表达式')创建一个RegExp对象。
// 如果使用第二种写法，因为字符串的转义问题，字符串的两个\\实际上是一个\。
var re1 = /ABC\-001/;
var re2 = new RegExp('ABC\\-001');

log(re1); // /ABC\-001/
log(re2); // /ABC\-001/

// test()方法用于测试给定的字符串是否符合条件。
var re = /^\d{3}\-\d{3,8}$/;
log(re.test('010-12345')); // true
log(re.test('010-1234x')); // false
log(re.test('010 12345')); // false

log('---------------------split---------------------');
var a1;
a1 = 'a b   c'.split(' '); // ['a', 'b', '', '', 'c']
log(a1)
a1 = 'a b   c'.split(/\s+/); // ['a', 'b', 'c']
log(a1)
a1 = 'a,b, c  d'.split(/[\s\,]+/); // ['a', 'b', 'c', 'd']
log(a1)
a1 = 'a,b;; c  d'.split(/[\s\,\;]+/); // ['a', 'b', 'c', 'd']
log(a1)

log('---------------------group---------------------');
// 如果正则表达式中定义了组，就可以在RegExp对象上用exec()方法提取出子串来。
// exec()方法在匹配成功后，会返回一个Array，第一个元素是正则表达式匹配到的整个字符串，后面的字符串表示匹配成功的子串。
// exec()方法在匹配失败时返回null。
var a2;
var re = /^(\d{3})-(\d{3,8})$/;
a2 = re.exec('010-12345'); // ['010-12345', '010', '12345']
log(a2)
a2 = re.exec('010 12345'); // null
log(a2)

var re = /^(0[0-9]|1[0-9]|2[0-3]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])$/;
var a2 = re.exec('19:05:30'); // ['19:05:30', '19', '05', '30']
log(a2)

log('---------------------greedy--------------------');
// 正则匹配默认是贪婪匹配，也就是匹配尽可能多的字符。
// 由于\d+采用贪婪匹配，直接把后面的0全部匹配了，结果0*只能匹配空字符串了。
var a3;
var re = /^(\d+)(0*)$/;
a3 = re.exec('102300'); // ['102300', '102300', '']
log(a3)

// 加个?就可以让\d+采用非贪婪匹配：
var re = /^(\d+?)(0*)$/;
a3 = re.exec('102300'); // ['102300', '1023', '00']
log(a3)

log('---------------------global--------------------');
var r1 = /test/g;
// 等价于:
var r2 = new RegExp('test', 'g');


// ---------------------------------------------------
var s = 'JavaScript, VBScript, JScript and ECMAScript';
var re=/[a-zA-Z]+Script/g;

// 全局匹配可以多次执行exec()方法来搜索一个匹配的字符串。
// 当我们指定g标志后，每次运行exec()，正则表达式本身会更新lastIndex属性，表示上次匹配到的最后索引：
// 使用全局匹配:
log(re.exec(s)); // ['JavaScript']
log(re.lastIndex); // 10

log(re.exec(s)); // ['VBScript']
log(re.lastIndex); // 20

log(re.exec(s)); // ['JScript']
log(re.lastIndex); // 29

log(re.exec(s)); // ['ECMAScript']
log(re.lastIndex); // 44

log(re.exec(s)); // null，直到结束仍没有匹配到

// 全局匹配类似搜索，因此不能使用/^...$/，那样只会最多匹配一次。
// 正则表达式还可以指定i标志，表示忽略大小写，m标志，表示执行多行匹配。
var re = /^<([\w ]+)>\s+((?:\w+\.)*\w+@(?:\w+\.)+\w+)$/;
var r = re.exec('<Tom Paris> tom@voyager.org');
log(r)
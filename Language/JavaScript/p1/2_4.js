'use strict';

function log(val, msg = '') {
	if (msg === '') {
		console.log('LOG: ' + val);
	} else {
		console.log('LOG.' + msg + ': ' + val);
	}	
}

log('---------------------高阶函数------------------');
// 一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。
function add(x, y, f) {
    return f(x) + f(y);
}
var x = add(-5, 6, Math.abs); // 11
log(x);

log('----------------------map---------------------');
function pow(x) {
    return x * x;
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var results = arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
log(results, 'map1');

results = arr.map(String); // ['1', '2', '3', '4', '5', '6', '7', '8', '9']
log(results, 'map2');

log('--------------------reduce--------------------');
// Array的reduce()把一个函数作用在这个Array的[x1, x2, x3...]上，这个函数必须接收两个参数，
// reduce()把结果继续和序列的下一个元素做累积计算
// [x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)
var arr = [1, 3, 5, 7, 9];
var sum = arr.reduce(function (x, y) {
    return x + y;
}); // 25
log(sum, 'reduce1');

var arr = [1, 3, 5, 7, 9];
var digit = arr.reduce(function (x, y) {
    return x * 10 + y;
}); // 13579
log(digit, 'reduce2');

log('------------------map/reduce------------------');
var s = '12345';
var arr = s.split('');
var intArr = arr.map(function (x) {
	return x - '0';
});
var digit = intArr.reduce(function (x, y) {
	return x * 10 + y;
})
log(digit, 'map/reduce1');


var arr = ['adam', 'LISA', 'barT'];
function normWord(s) {
    var arr = s.split('');
    var res = arr[0].toUpperCase();
    res += arr.slice(1,)
              .map(function (x) {return x.toLowerCase()})
              .reduce(function (x, y) {return x + y});
    return res;
}

function normalize(arr) {
	return arr.map(normWord);
}

log(normalize(arr), 'map/reduce2');


log('----------------map arguments-----------------');
/*
	由于map()接收的回调函数可以有3个参数：callback(currentValue, index, array)，通常我们仅需要第一个参数，而忽略了传入的后面两个参数。
	不幸的是，parseInt(string, radix)没有忽略第二个参数，导致实际执行的函数分别是：
		parseInt('1', 0); // 1, 按十进制转换
		parseInt('2', 1); // NaN, 没有一进制
		parseInt('3', 2); // NaN, 按二进制转换不允许出现3
*/
var arr = ['1', '2', '3'];
var r;
r = arr.map(parseInt);
log(r, 'map.parseInt')

// 可以改为r = arr.map(Number);，因为Number(value)函数仅接收一个参数。
r = arr.map(Number)
log(r, 'map.Number  ')


log('-------------------filter---------------------');
// filter也是一个常用的操作，它用于把Array的某些元素过滤掉，然后返回剩下的元素。
var arr = [1, 2, 4, 5, 6, 9, 10, 15];
var r = arr.filter(function (x) {
    return x % 2 !== 0;
});
log(r); // [1, 5, 9, 15]

var arr = ['A', '', 'B', null, undefined, 'C', '  '];
var r = arr.filter(function (s) {
    return s && s.trim(); // 注意：IE9以下的版本没有trim()方法
});
log(r); // ['A', 'B', 'C']

log('------------------回调函数---------------------');
// filter()接收的回调函数，其实可以有多个参数。
// 通常我们仅使用第一个参数，表示Array的某个元素。
// 回调函数还可以接收另外两个参数，表示元素的位置和数组
var arr = ['A', 'B', 'C'];
var r = arr.filter(function (element, index, self) {
    console.log(element); // 依次打印'A', 'B', 'C'
    console.log(index); // 依次打印0, 1, 2
    console.log(self); // self就是变量arr
    return true;
});

var
    r,
    arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
r = arr.filter(function (element, index, self) {
    return self.indexOf(element) === index;
});
log(r, 'filter1');

function isPrime() {
	arr = Array(10);
	return	arr.map(function (e, i, arr) {
		console.log('e  ' + e)
		console.log('i  ' + i)
		console.log('arr' + arr)
		});
	 
}



function get_primes(arr) {
	var num = [...Array(101)];
	var primeArr = num.map(function(e, i, arr) {
			if (i < 2) {
				return 1;
			}
			if (e === undefined) {
				for (var j = 2 * i; j < num.length; j += i) {
					num[j] = 1;
				}
				return undefined;
			} else {
				return 1;
			}
		});

	return arr.filter(function (x) {
		return primeArr[x] === undefined;
	});
}

var
    x,
    r,
    arr = [];
for (x = 1; x < 100; x++) {
    arr.push(x);
}
r = get_primes(arr);
log(r, 'filter prime')

log('---------------------sort---------------------');
// Array的sort()方法默认把所有元素先转换为String再排序，
// 结果'10'排在了'2'的前面，因为字符'1'比字符'2'的ASCII码小。
var res;
// 看上去正常的结果:
res = ['Google', 'Apple', 'Microsoft'].sort(); // ['Apple', 'Google', 'Microsoft'];
log(res);
// apple排在了最后:
res = ['Google', 'apple', 'Microsoft'].sort(); // ['Google', 'Microsoft", 'apple']
log(res);
// 无法理解的结果:
res = [10, 20, 1, 2].sort(); // [1, 10, 2, 20]
log(res)

// ---------------------------------------------
var arr = [10, 20, 1, 2];
arr.sort(function (x, y) {
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
});
log(arr, 'Ascent sort int '); // [1, 2, 10, 20]

var arr = [10, 20, 1, 2];
arr.sort(function (x, y) {
    if (x < y) {
        return 1;
    }
    if (x > y) {
        return -1;
    }
    return 0;
}); 
log(arr, 'Descent sort int'); // [20, 10, 2, 1]

// 默认情况下，对字符串排序，是按照ASCII的大小比较的，现在，我们提出排序应该忽略大小写，按照字母序排序。
// 要实现这个算法，不必对现有代码大加改动，只要我们能定义出忽略大小写的比较算法就可以：
var arr = ['Google', 'apple', 'Microsoft'];
arr = arr.sort(function (s1, s2) {
    var x1 = s1.toUpperCase();
    var x2 = s2.toUpperCase();
    if (x1 < x2) {
        return -1;
    }
    if (x1 > x2) {
        return 1;
    }
    return 0;
}); 

log(arr, 'Sort string'); // ['apple', 'Google', 'Microsoft']

// sort()方法会直接对Array进行修改，它返回的结果仍是当前Array：
var a1 = ['B', 'A', 'C'];
var a2 = a1.sort();
a1; // ['A', 'B', 'C']
a2; // ['A', 'B', 'C']
log(a1 === a2, 'In place sort'); // true, a1和a2是同一对象

log('-------------------every---------------------');
// every()方法可以判断数组的所有元素是否满足测试条件。
var arr = ['Apple', 'pear', 'orange'];
log(arr.every(function (s) {
    return s.length > 0;
})); // true, 因为每个元素都满足s.length>0

log(arr.every(function (s) {
    return s.toLowerCase() === s;
})); // false, 因为不是每个元素都全部是小写

log('--------------------find---------------------');
// find()方法用于查找符合条件的第一个元素，如果找到了，返回这个元素，否则，返回undefined：
var arr = ['Apple', 'pear', 'orange'];
console.log(arr.find(function (s) {
    return s.toLowerCase() === s;
})); // 'pear', 因为pear全部是小写

console.log(arr.find(function (s) {
    return s.toUpperCase() === s;
})); // undefined, 因为没有全部是大写的元素

log('-----------------findindex-------------------');
// findIndex()和find()类似，也是查找符合条件的第一个元素，
// 不同之处在于findIndex()会返回这个元素的索引，如果没有找到，返回-1：
var arr = ['Apple', 'pear', 'orange'];
log(arr.findIndex(function (s) {
    return s.toLowerCase() === s;
})); // 1, 因为'pear'的索引是1

log(arr.findIndex(function (s) {
    return s.toUpperCase() === s;
})); // -1

log('------------------foreach--------------------');
// forEach()和map()类似，它也把每个元素依次作用于传入的函数，但不会返回新的数组。
// forEach()常用于遍历数组，因此，传入的函数不需要返回值：
var arr = ['Apple', 'pear', 'orange'];
arr.forEach(console.log); // 依次打印每个元素

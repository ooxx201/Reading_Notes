'use strict'
console.log('---------------数组---------------')

var arr = [1, 2, 3.14, 'Hello', null, true];
console.log(arr.length); // 6

console.log('# 直接给Array的length赋一个新的值会导致Array大小的变化');
var arr = [1, 2, 3];
console.log(arr);
arr.length; // 3
arr.length = 6;
arr[4] = 5
console.log(arr); // arr变为[1, 2, 3, undefined, undefined, undefined]
arr.length = 2;
console.log(arr); // arr变为[1, 2]

console.log('# Array可以通过索引把对应的元素修改为新的值，因此，对Array的索引进行赋值会直接修改这个Array');
var arr = ['A', 'B', 'C'];
arr[1] = 99;
console.log(arr); // arr现在变为['A', 99, 'C']

console.log('# 如果通过索引赋值时，索引超过了范围，同样会引起Array大小的变化')
var arr = [1, 2, 3];
arr[5] = 'x';
console.log(arr); // arr变为[1, 2, 3, undefined, undefined, 'x']

console.log('---------------index---------------')
var arr = [10, 20, '30', 'xyz'];
arr.indexOf(10); // 元素10的索引为0
arr.indexOf(20); // 元素20的索引为1
arr.indexOf(30); // 元素30没有找到，返回-1
arr.indexOf('30'); // 元素'30'的索引为2

var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.slice(0, 3); // 从索引0开始，到索引3结束，但不包括索引3: ['A', 'B', 'C']
console.log(arr.slice(3)); // 从索引3开始到结束: ['D', 'E', 'F', 'G']


var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
var aCopy = arr.slice();
console.log(aCopy); // ['A', 'B', 'C', 'D', 'E', 'F', 'G']
aCopy === arr; // false

console.log('# push()向Array的末尾添加若干元素，pop()则把Array的最后一个元素删除掉')
var arr = [1, 2];
arr.push('A', 'B'); // 返回Array新的长度: 4
console.log(arr); // [1, 2, 'A', 'B']
arr.pop(); // pop()返回'B'
console.log(arr); // [1, 2, 'A']
arr.pop(); arr.pop(); arr.pop(); // 连续pop 3次
console.log(arr); // []
arr.pop(); // 空数组继续pop不会报错，而是返回undefined
console.log(arr); // []

console.log('# 如果要往Array的头部添加若干元素，使用unshift()方法，shift()方法则把Array的第一个元素删掉')
var arr = [1, 2];
arr.unshift('A', 'B'); // 返回Array新的长度: 4
console.log(arr); // ['A', 'B', 1, 2]
arr.shift(); // 'A'
console.log(arr); // ['B', 1, 2]
arr.shift(); arr.shift(); arr.shift(); // 连续shift 3次
console.log(arr); // []
arr.shift(); // 空数组继续shift不会报错，而是返回undefined
console.log(arr); // []

console.log('# sort()可以对当前Array进行排序，它会直接修改当前Array的元素位置')
var arr = ['B', 'C', 'A'];
arr.sort();
console.log(arr); // ['A', 'B', 'C']

var arr = ['one', 'two', 'three'];
arr.reverse(); 
console.log(arr); // ['three', 'two', 'one']

console.log('# splice()方法是修改Array的“万能方法”，它可以从指定的索引开始删除若干元素，然后再从该位置添加若干元素')
var arr = ['Microsoft', 'Apple', 'Yahoo', 'AOL', 'Excite', 'Oracle'];
console.log(arr);
// 从索引2开始删除3个元素,然后再添加两个元素:
arr.splice(2, 3, 'Google', 'Facebook'); // 返回删除的元素 ['Yahoo', 'AOL', 'Excite']
console.log(arr); // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
// 只删除,不添加:
arr.splice(2, 2); // ['Google', 'Facebook']
console.log(arr); // ['Microsoft', 'Apple', 'Oracle']
// 只添加,不删除:
arr.splice(2, 0, 'Google', 'Facebook'); // 返回[],因为没有删除任何元素
console.log(arr); // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']

// concat()方法并没有修改当前Array，而是返回了一个新的Array。
var arr = ['A', 'B', 'C'];
var added = arr.concat([1, 2, 3]);
console.log(added); // ['A', 'B', 'C', 1, 2, 3]

var arr = ['A', 'B', 'C'];
console.log(arr.concat(1, 2, [3, 4])); // ['A', 'B', 'C', 1, 2, 3, 4]

var arr = ['A', 'B', 'C', 1, 2, 3];
console.log(arr.join('-')); // 'A-B-C-1-2-3'

// 多维数组
var arr = [[1, 2, 3], [400, 500, 600], '-'];
console.log(arr);
console.log(arr[1][1]);



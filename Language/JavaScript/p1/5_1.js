'use strict';

function log(val, msg = '') {
	if (msg === '') {
		console.log('LOG: ' + val);
	} else {
		console.log('LOG.' + msg + ': ' + val);
	}	
}

log('---------------------brower-----------------------');

var points = [40, 100, 1, 5, 25, 10];
points.sort(function(a, b){return a - b});
log(points)
points.sort();
log(points)
points.sort((a,b)=>a-b)
log(points)

class Student {
    constructor(name) {
        this.name = name;
    }

    hello() {
        console.log('Hello, ' + this.name + '!');
    }
}


function cmp (a, b) {
	var x = a.name.toLowerCase()
	var y = a.name.toLowerCase()
    if (x > y) {
        return 1;
    } else if (x < y) {
        return -1;
    } else {
        return 0;
    }
}

var arr = [
			new Student('GGGG'), 
           	new Student('afa'), 
           	new Student('yuru'), 
           	new Student('Asa'), 
           	new Student('ghhs'), 
           	new Student('aghhj')
           ]

arr.sort(cmp)

log(arr[0].name)
log(arr[1].name)
log(arr[2].name)
log(arr[3].name)
log(arr[4].name)
log(arr[5].name)
var st;
for (st in arr) {
	log(st)
}


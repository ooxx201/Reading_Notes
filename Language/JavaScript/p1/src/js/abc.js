if((typeof alert) === 'undefined') {
    global.alert = function(message) {
        console.log('Alert: ' + message);
    }
}
alert('Hello World');
console.log("Hello World!")

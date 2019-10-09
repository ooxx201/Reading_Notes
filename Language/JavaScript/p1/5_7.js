console.log('AAA');
f = console.log;
f('BBB')
f = console.log.bind(console)
f('CCC')
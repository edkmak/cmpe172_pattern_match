var through2 = require('through2');
var split2 = require('split2');
var fs = require('fs');

var parseby;

//process.argv contains the arguments of the "node spit-match.js -p ,"
process.argv.forEach(function(val, index, array){
	if(array.length != 4){
		console.log('incorrect number of arguements. ');
	}
	parseby = array[3];
});

var stream = through2({ objectMode: true }, function(chunk, enc, callback) {
    var string = chunk.toString();
    var result = string.replace(/\n/, '').split(parseby);

    this.push(result);
    callback()
})

stream.on('data', function(data) {
    var toString = Object.prototype.toString.call(data)
    console.log('------------------Output----------------------');
    console.log(data, '\n');
})

console.log('--------------------Input----------------------');
console.log()
var inputStream = fs.createReadStream( "input-sensor.txt" )
	.pipe(split2())
	.pipe(stream)
    
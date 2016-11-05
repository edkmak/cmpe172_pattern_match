const through2 = require('through2');
const split2 = require('split2');
const fs = require('fs');

var delimiter;

//process.argv contains the arguments of the "node spit-match.js -p ,"
process.argv.forEach(function(val, index, array){
	if(array.length != 4){
		console.log('incorrect number of arguements. ');
	}
	delimiter = array[3];
});

const stream = through2({ objectMode: true }, function(chunk, enc, callback) {
    const string = chunk.toString();
    const result = string.replace(/\n/, '').split(delimiter);
	result.splice(result.length - 1, 1);

    this.push(result);
    callback()
})

stream.on('data', function(data) {
    Object.prototype.toString.call(data)
    console.log('------------------Output----------------------');
    console.log(data);
})

console.log('--------------------Input----------------------\n');
fs.readFile('input-sensor.txt', printFile)

function printFile(err, data) {
	if (err)
		throw err;

    console.log(data.toString() + '\n');

	const readStream = fs.createReadStream('input-sensor.txt');

	readStream
		.pipe(split2())
		.pipe(stream)
}


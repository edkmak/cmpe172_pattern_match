const through2 = require('through2');
const split2 = require('split2');
const fs = require('fs');

const FILE = 'input-sensor.txt';
var delimiter;

//process.argv contains the arguments of the "node spit-match.js -p ,"
process.argv.forEach((val, index, array) => {
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
});

stream.on('data', (data) => {
    Object.prototype.toString.call(data)
    console.log('------------------Output----------------------');
    console.log(data);
});

fs.readFile(FILE, (err, data) => {
	if (err)
		throw err;

	console.log('--------------------Input----------------------\n');
	console.log(data.toString() + '\n');

	fs.createReadStream(FILE)
		.pipe(split2())
		.pipe(stream)
});


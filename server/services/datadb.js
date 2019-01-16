var fs = require('fs'),
	path = require('path');

var bluebird = require("bluebird");

var dbFile = path.join(__dirname, '../db/dataFile.json');

var readFileAsync = bluebird.promisify(fs.readFile);

function read(){
	return readFileAsync(dbFile)
		.then(fileContents => JSON.parse(fileContents));

}


module.exports = {
	read : read,
};


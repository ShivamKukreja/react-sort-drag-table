var bugDb = require('./datadb');

var list = [];

 bugDb
	.read()
	.then(function(bugs){
		list = bugs;
	});

function getAll(){
	return Promise.resolve(list);
 }

module.exports = {
	getAll : getAll,

};


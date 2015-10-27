var fs = require('fs');

function BugService(){
	var self = this;
	
	self.serialize = function(path, data, callback){
		path = pathHelper[path] + data.name + pathHelper.extensions.json;
		fs.writeFile(path, data.data,function(error){
			var success = true;
			if(error){
				console.log(error);				
				success = false;
			}
			
			 callback && callback({success:success});
		})
	}
	
	self.deserialize = function(path, filename, callback){
		path = pathHelper[path] + filename + pathHelper.extensions.json
		fs.readFile(path,function read(error, data){			
			var success = true;
			if(error){
				console.log(error);				
				success = flase;			
			}
			
			callback && callback({success:success, data:data});
		})
	}
	
	var pathHelper = {
		a: './public/fileStorage/bug_a/',
		extensions: {
			json: '.json'
		}
	};
}

var sevice = new BugService();

module.exports = sevice;
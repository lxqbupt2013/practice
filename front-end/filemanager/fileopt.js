var fs = require('fs');
var path = require('path');
var multiparty = require('multiparty');

//列目录
function dirList(dirpath, response) {
	if (dirpath.indexOf("..") > 0) {
		return;
	}
	realpath = path.join("./public", dirpath);
	fs.readdir(realpath, function(err, files) {
		if (err) {
			throw err
		};
		var resultstr = "[";
		files.forEach(function(file) {
			var filepath = path.join(realpath, file);
			state = fs.statSync(filepath);
			resultstr += "{";
			resultstr += "'dir':'" + dirpath + "',";
			if (state.isDirectory()) {
				resultstr += "'isdir':'" + "true" + "',";
			} else {
				resultstr += "'isdir':'" + "false" + "',";
			}
			resultstr += "'filename':'" + file + "'";
			resultstr += "},";
		})
		resultstr += "]";
		console.log(resultstr);
		response.end(resultstr);
	});
}

//创建文件
exports.createFile = function(dirpath, filename, response) {

	if (dirpath.indexOf("..") > 0) {
		return;
	}
	realpath = path.join("./public", dirpath);
	var fullpath = path.join(realpath, filename);
	fs.exists(fullpath, function(exists) {
		if (!exists) {
			fs.openSync(fullpath, "ax", 0644);
		};
		dirList(dirpath, response);
	});
}

//删除文件或者文件夹
exports.deleteDir = function(dirpath, dirname, response) {
	if (dirpath.indexOf("..") > 0) {
		return;
	}
	realpath = path.join("./public", dirpath);
	//console.log(realpath);
	//console.log(dirpath);
	recursionRemove = function(removepath) {        //递归删除
		var state = fs.statSync(removepath);
		if (state.isDirectory()) { //目录
			var array = fs.readdirSync(removepath);
			for (var i = 0; i < array.length; i++) {
				var subpath = path.join(removepath, array[i]);
				recursionRemove(subpath);
			}
			fs.rmdirSync(removepath);
		} else if (state.isFile()) { //文件
			fs.unlinkSync(removepath);
		}
	};
	var fullpath = path.join(realpath, dirname);
	recursionRemove(fullpath);
	/*	console.log(realpath);
		console.log(dirpath);
		console.log(fullpath);*/
	dirList(dirpath, response);
}


//文件改名
exports.renameFile = function(dirpath, oldfilename, newfilename, response) {
	if (dirpath.indexOf("..") > 0) {
		return;
	}
	realpath = path.join("./public", dirpath);
	console.log(realpath);
	var oldpath = path.join(realpath, oldfilename);
	var newpath = path.join(realpath, newfilename);
		console.log(oldpath);
		console.log(newpath);
	fs.exists(oldpath, function(exists) {
		if (exists) {
			fs.renameSync(oldpath, newpath);
		};
		dirList(dirpath, response);
	});
}

//文件上传
exports.uploadFile = function(dirpath, files, response) {
	if (dirpath.indexOf("..") > 0) {
		return;
	}
	realpath = path.join("./public", dirpath);
	if (files.upload != "undefined") {
      	var tempPath = files.upload[0].path;    //临时文件路径
		var filename = files.upload[0].originalFilename;    //文件名
		var filepath = path.join(realpath, filename);      //存储路径
		fs.exists(filepath, function(exists) {
			if (!exists) {
				fs.renameSync(tempPath, filepath);          //把临时文件复制过来
				fs.exists(tempPath, function(exists) {
					if (exists) {
						fs.unlinkSync(tempPath);
					};
				});
			};
			dirList(dirpath, response);
		});
    }
}

exports.dirList = dirList;
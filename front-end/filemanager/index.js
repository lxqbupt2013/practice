var express = require('express');
var path = require('path');
var multiparty = require('multiparty');
var fileopt = require('./fileopt');

var app = express();
// 设定views变量，意为视图存放的目录
app.set('view', path.join(__dirname, 'view'));

// 设定静态文件目录，比如本地文件
// 目录为demo/public/images，访问
// 网址则显示为http://localhost/images
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(request, response) {
  	response.sendFile(path.join(__dirname, 'view/homepage.html'));
});

app.get("/API", function(request, response) {
	if (request.query.op == "list") {
		fileopt.dirList(request.query.dirpath, response);
	}
	else if (request.query.op == "create") {
		fileopt.createFile(request.query.dirpath, request.query.filename, response);
	}
	else if (request.query.op == "rename") {
		fileopt.renameFile(request.query.dirpath, request.query.oldname, request.query.newname, response);
	}
	else if (request.query.op == "delete") {
		fileopt.deleteDir(request.query.dirpath, request.query.filename, response);
	}
});

app.post("/API", function(request, response){
	var form = new multiparty.Form();          //使用multiparty初始化一个表单
	form.parse(request, function(err, fields, files) {          //解析，文件内容在files里，其他参数在fields里
  		if (err) { throw err; };
  		if (fields.op[0] == "upload") {
  			fileopt.uploadFile(fields.dirpath[0], files, response)
  		};
	});		
});

app.get("/:filename", function(request, response) {
  	response.sendFile(path.join(__dirname, './view/' + request.params.filename));
});

app.listen("80");

//新建
$('[data-target=#newModal]').on('click', function() {
	$('#newNameSave').unbind('click').on('click', function() {
		var $inputname = $('#newModal input').val();
		console.log($inputname);

		var $currentdir = $('.filename').attr("data-dir");

		createfile($currentdir, $inputname);
		$('#newModal input').val('');
		console.log($('#newModal input').val());

	});
});

//编辑名字
$('table').delegate('[name=editName]', 'click', function() {
	var $name_content = $(this).parent().prev().children('span').eq(1).text();
	console.log($name_content);
	$('#reNameSave').unbind('click').on('click', function() {
		var $inputname = $('#editModal input').val();

		var $currentdir = $('.filename').attr("data-dir");

		editFilename($currentdir, $name_content, $inputname);
		$('#editModal input').val('');
	});
});

//删除文件
$('table').delegate('[name=deleteName]', 'click', function() {
	var thisfilename = $($(this).parent().prev().children()[1]).text();
	$('#deleteFileSave').unbind('click').on('click', function() {
		console.log(thisfilename);

		var $currentdir = $('.filename').attr("data-dir");

		deletefile($currentdir, thisfilename);
	});
});

$(function() {
	getDir('.');
});

function getDir(currentdir) {
	$.get('/API', {
		op: "list",
		dirpath: currentdir
	}, function(result) {
		console.log(result);
		//$("table").html(result);
		$('table tr').remove();
		var jsonobj = eval(result);
		for (var i = 0; i < jsonobj.length; i++) {
			if (jsonobj[i].isdir == 'true') {
				$fileline = $('<tr><td><td><span class="glyphicon glyphicon-folder-open">&nbsp;</span><span data-isdir="true" class="filename" data-dir="' + jsonobj[i].dir + '">' + jsonobj[i].filename + '</span></td><td><span class="glyphicon glyphicon-trash" name="deleteName" data-toggle="modal" data-target="#deleteModal" title="删除"></span>&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-edit" name="editName" data-toggle="modal" data-target="#editModal" title="编辑"></span></td></tr>');
				$fileline.appendTo($('tbody'));
			} else {
				$fileline = $('<tr><td><td><span class="glyphicon glyphicon-file">&nbsp;</span><span class="filename" data-isdir="false" data-dir="' + jsonobj[i].dir + '">' + jsonobj[i].filename + '</span></td><td><span class="glyphicon glyphicon-trash" name="deleteName" data-toggle="modal" data-target="#deleteModal" title="删除"></span>&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-edit" name="editName" data-toggle="modal" data-target="#editModal" title="编辑"></span></td></tr>');
				$fileline.appendTo($('tbody'));
			}
		}
	});
}

function deletefile(currentdir, filename) {
	$.get('/API', {
		op: "delete",
		dirpath: currentdir,
		filename: filename,
	}, function(result) {
		console.log(result);
		//$("table").html(result);
		var jsonobj = eval(result);
		for (var i = 0; i < jsonobj.length; i++) {
			if (jsonobj[i].isdir == 'true') {
				$fileline = $('<tr><td><td><span class="glyphicon glyphicon-folder-open">&nbsp;</span><span data-isdir="true" class="filename" data-dir="' + jsonobj[i].dir + '">' + jsonobj[i].filename + '</span></td><td><span class="glyphicon glyphicon-trash" name="deleteName" data-toggle="modal" data-target="#deleteModal" title="删除"></span>&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-edit" name="editName" data-toggle="modal" data-target="#editModal" title="编辑"></span></td></tr>');
				$fileline.appendTo($('tbody'));
			} else {
				$fileline = $('<tr><td><td><span class="glyphicon glyphicon-file">&nbsp;</span><span class="filename" data-isdir="false" data-dir="' + jsonobj[i].dir + '">' + jsonobj[i].filename + '</span></td><td><span class="glyphicon glyphicon-trash" name="deleteName" data-toggle="modal" data-target="#deleteModal" title="删除"></span>&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-edit" name="editName" data-toggle="modal" data-target="#editModal" title="编辑"></span></td></tr>');
				$fileline.appendTo($('tbody'));
			}
		}
	});
	$('table tr').remove();
}

function createfile(currentdir, filename) {
	$.get('/API', {
		op: "create",
		dirpath: currentdir,
		filename: filename,
	}, function(result) {
		console.log(result);
		//$("table").html(result);
		var jsonobj = eval(result);
		for (var i = 0; i < jsonobj.length; i++) {
			if (jsonobj[i].isdir == 'true') {
				$fileline = $('<tr><td><td><span class="glyphicon glyphicon-folder-open">&nbsp;</span><span data-isdir="true" class="filename" data-dir="' + jsonobj[i].dir + '">' + jsonobj[i].filename + '</span></td><td><span class="glyphicon glyphicon-trash" name="deleteName" data-toggle="modal" data-target="#deleteModal" title="删除"></span>&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-edit" name="editName" data-toggle="modal" data-target="#editModal" title="编辑"></span></td></tr>');
				$fileline.appendTo($('tbody'));
			} else {
				$fileline = $('<tr><td><td><span class="glyphicon glyphicon-file">&nbsp;</span><span class="filename" data-isdir="false" data-dir="' + jsonobj[i].dir + '">' + jsonobj[i].filename + '</span></td><td><span class="glyphicon glyphicon-trash" name="deleteName" data-toggle="modal" data-target="#deleteModal" title="删除"></span>&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-edit" name="editName" data-toggle="modal" data-target="#editModal" title="编辑"></span></td></tr>');
				$fileline.appendTo($('tbody'));
			}
		}
	});
	$('table tr').remove();
}

function editFilename(currentdir, oldname, newname) {
	$.get('/API', {
		op: "rename",
		dirpath: currentdir,
		oldname: oldname,
		newname: newname
	}, function(result) {
		console.log(result);
		//$("table").html(result);
		var jsonobj = eval(result);
		for (var i = 0; i < jsonobj.length; i++) {
			if (jsonobj[i].isdir == 'true') {
				$fileline = $('<tr><td><td><span class="glyphicon glyphicon-folder-open">&nbsp;</span><span data-isdir="true" class="filename" data-dir="' + jsonobj[i].dir + '">' + jsonobj[i].filename + '</span></td><td><span class="glyphicon glyphicon-trash" name="deleteName" data-toggle="modal" data-target="#deleteModal" title="删除"></span>&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-edit" name="editName" data-toggle="modal" data-target="#editModal" title="编辑"></span></td></tr>');
			} else {
				$fileline = $('<tr><td><td><span class="glyphicon glyphicon-file">&nbsp;</span><span class="filename" data-isdir="false" data-dir="' + jsonobj[i].dir + '">' + jsonobj[i].filename + '</span></td><td><span class="glyphicon glyphicon-trash" name="deleteName" data-toggle="modal" data-target="#deleteModal" title="删除"></span>&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-edit" name="editName" data-toggle="modal" data-target="#editModal" title="编辑"></span></td></tr>');
			}
		}
		$fileline.appendTo($('tbody'));
	});
	$('table tr').remove();
}


$('table').delegate('.filename', 'click', function() {
	var $currentdir = $(this).attr("data-dir");
	if ($(this).attr('data-isdir') === "true") {
		var newdir = $currentdir + "/" + $(this).text();
		getDir(newdir);
	}

});

$('#backlist').click(function() {
	var $currentdir = $('.filename').attr("data-dir");
	var newdir = "";
	var dir1 = $currentdir.split('/');
	for (var i = 0; i < dir1.length - 1; i++) {
		var dir2 = dir1[i] + "/";
		newdir += dir2;
	}
	//console.log(newdir);
	getDir(newdir.substring(0, newdir.length - 1));
});

$('#uploadfile').on('click', function() {
	$('#file_upload').unbind('click').on('click', function() {
		var files = $('#file')[0].files;
		$('#uploadFileSave').unbind('click').on('click', function() {
			var $currentdir = $('.filename').attr("data-dir");
			var formdata = new FormData();       //初始化formdata对象
			formdata.append('upload', files[0])        //附加参数
			formdata.append('op', 'upload')
			formdata.append('dirpath', $currentdir)
			//$.post('/API', data);
			$.ajax({
				type: 'POST',
				url: '/API',
				data: formdata,
				processData: false,
  				contentType: false,               //阻止ajax去检测类型并把它转化成一个字符串
  				success: function(result) {
					console.log(result);
					$('table tr').remove();
					var jsonobj = eval(result);
					for (var i = 0; i < jsonobj.length; i++) {
						if (jsonobj[i].isdir == 'true') {
							$fileline = $('<tr><td><td><span class="glyphicon glyphicon-folder-open">&nbsp;</span><span data-isdir="true" class="filename" data-dir="' + jsonobj[i].dir + '">' + jsonobj[i].filename + '</span></td><td><span class="glyphicon glyphicon-trash" name="deleteName" data-toggle="modal" data-target="#deleteModal" title="删除"></span>&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-edit" name="editName" data-toggle="modal" data-target="#editModal" title="编辑"></span></td></tr>');
							$fileline.appendTo($('tbody'));
						} else {
							$fileline = $('<tr><td><td><span class="glyphicon glyphicon-file">&nbsp;</span><span class="filename" data-isdir="false" data-dir="' + jsonobj[i].dir + '">' + jsonobj[i].filename + '</span></td><td><span class="glyphicon glyphicon-trash" name="deleteName" data-toggle="modal" data-target="#deleteModal" title="删除"></span>&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-edit" name="editName" data-toggle="modal" data-target="#editModal" title="编辑"></span></td></tr>');
							$fileline.appendTo($('tbody'));
						}
					}
				}
			});
		});
	});

});



/*function typesort(typecode){
	console.log(typecode);
	var fileFullname = $('.filename');
	$('table tr').remove();
	for(var i=0; i<fileFullname.length; i++){
		var a = fileFullname[i].split('.');
		var filename="";
		for(var j=0;j<a.length-1;j++){
			filename =+ a[i]
		}
		var filetype = a[length-1];

		if(filetype=="jpg" || filetype=="png" || filetype=="bmp" || filetype=="gif" ){
		
		}
	}
}


$('.filetype').click(function(){
	var typetext = $(this).children().html();
	//console.log($(this).children().html());
	var typecode = 0;
	switch(typetext){
		case '全部文件':
		  typecode = 1;
		  break;
		case '图片':
		  typecode = 2;
		  break;
		case '文档':
		  typecode = 3;
		  break;
		default:
		  typecode = 4;

	}
	typesort(typecode);
});*/
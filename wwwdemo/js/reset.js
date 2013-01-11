/**
 * 重启页面用到的脚本
 */
var stime = document.getElementById("stime_stamp");
var etime = document.getElementById("etime_stamp");
var mtr_no = document.getElementById("mtr_no");
$(document).ready(function() {
	$("#btn").click(function() {
		$.get("/um/compara1.asp", function(result) {
			$("#log").html(result);
		});
	});
	$("#btnPost").click(function() {
		// 显示
		$("#msgbox_wait").show("fade", {}, 1);
		$.post('/goform/get_tou',
			$("#history_tou").serialize(),
			function(result) {
				$("#tr_dat").html(result);
				// 动态加载完的页面才可以接收鼠标悬停等事件
				$("#history_tou tr").mouseover(function() {
					$(this).addClass("over");
					//var rows = $(this).attr('relrow');
				});
				$("#history_tou tr").mouseout(function() {
					$(this).removeClass("over");
				});
				// 完成之后隐藏
				$("#msgbox_wait").hide("fade", {}, 1000);
			});
	});
	//从服务器加载错误日志文件
	$("#load_log").click(function() {
		// 显示
		$("#log_wait").show("fade", {}, 1);
		$.post("/goform/load_log",
			"load",
			function(result) {
				$("#log_wait").hide("fade", {}, 1000);
				var b=document.getElementById("log_text");
				b.value=result;
				//$("#log_text").html("1231");
				//$("#log_text").html(result);
				// 完成之后隐藏
				
			});
	});
	//将文本保存到服务器的错误日志文件
	$("#save_log").click(function () {
		var b=document.getElementById("log_text");
		if (b.value==""){
			//
			alert("文本不能为空");
		}else{
			$("#log_wait").show("fade", {}, 1);
			$.post("/goform/save_log",
				$("#log_text").val(),
				function(result) {
					// 完成之后隐藏
					$("#log_wait").hide("fade", {}, 1000);
				});
		}

	});

});

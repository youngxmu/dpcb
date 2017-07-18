var moka = {
	map : {},
	spot : {},
	info : {},
	fav : {},
	share : {},
	hotel : {},
	user : {},
	ticket : {},
	guide : {},
	good : {},
	order : {}
};

var util = {
	getCtx : function(){
		return 'http://123.206.194.194:8080/dpcb/';
	},
	getImgHost : function(){
		return 'http://123.206.194.194:8080/dpcb';
	},
	getPic : function(picsStr){
		var html = '';
		if(!picsStr){
			return html;
		}

		var pics = picsStr.split(',');
		for(var index in pics){
			var pic = pics[index];
			if(pic && pic != ''){
				html = '<img src="http://123.206.194.194:8080/dpcb' + pic + '">';
				break;
			}
			
		}
		return html;
	},
	getPics : function(picsStr){
		var html = '';
		if(!picsStr){
			return html;
		}

		var pics = picsStr.split(',');
		for(var index in pics){
			var pic = pics[index];
			if(pic && pic != ''){
				html += '<img src="http://123.206.194.194:8080/dpcb' + pic + '">';	
			}
			
		}
		return html;
	},
	share : function(cid, id, kind, callback){
		$.ajax({
			url : ctx + 'r/share',
			type : 'post',
			dataType : 'json',
			data : {
				cid : cid,
				id : id,
				kind : kind
			},
			success : function(result){
				if(result.ret_code == 0){
					return callback(null);
				}
				callback('收藏失败');
			},
			error : function(){
				callback('网络异常');
			}
		});
	},
	formatIndex : function(index){
		return parseInt(index, 10) + 1;
	},
	loadingPanel : '<div id="loading_panel" class="weui_loading_toast" style="display:none;"><div class="weui_mask_transparent"></div><div class="weui_toast"><div class="weui_loading"><div class="weui_loading_leaf weui_loading_leaf_0"></div><div class="weui_loading_leaf weui_loading_leaf_1"></div><div class="weui_loading_leaf weui_loading_leaf_2"></div><div class="weui_loading_leaf weui_loading_leaf_3"></div><div class="weui_loading_leaf weui_loading_leaf_4"></div><div class="weui_loading_leaf weui_loading_leaf_5"></div><div class="weui_loading_leaf weui_loading_leaf_6"></div><div class="weui_loading_leaf weui_loading_leaf_7"></div><div class="weui_loading_leaf weui_loading_leaf_8"></div><div class="weui_loading_leaf weui_loading_leaf_9"></div><div class="weui_loading_leaf weui_loading_leaf_10"></div><div class="weui_loading_leaf weui_loading_leaf_11"></div></div><p class="weui_toast_content">数据加载中</p></div></div>',
	msgTpl : '<div id="msg_dlg" class="js_dialog" style="display:none;"><div class="weui-mask"></div><div class="weui-dialog"><div class="weui-dialog__bd"></div><div class="weui-dialog__ft"><a href="javascript:util.closeMsg();" class="btn-ok weui-dialog__btn weui-dialog__btn_primary">好的</a></div></div></div>',
	toastTpl : '<div id="toast" style="opacity: 0; display: none;"><div class="weui-mask_transparent"></div><div class="weui-toast"><i class="weui-icon-success-no-circle weui-icon_toast"></i><p class="weui-toast__content">已完成</p></div></div>',
	showLoading : function(msg){
		var $loadingPanel = $('#loading_panel');
		if($loadingPanel.length == 0){
			$('body').append(util.loadingPanel);
			$loadingPanel = $('#loading_panel');
		}
		if(msg){
			$loadingPanel.find('.weui_toast_content').text(msg);
		}
		$loadingPanel.show();
	},
	closeLoading : function(){
		var $loadingPanel = $('#loading_panel');
		if($loadingPanel.length == 0){
			$('body').append(util.loadingPanel);
			$loadingPanel = $('#loading_panel');
		}
		$loadingPanel.hide();
		$loadingPanel.find('.weui_toast_content').text('数据加载中');
	},
	showMsg : function(msg, msgCallback){
		if(msgCallback){
			util.msgCallback = msgCallback;
		}
		var $msgDlg = $('#msg_dlg');
		if($msgDlg.length == 0){
			$('body').append(util.msgTpl);
			$msgDlg = $('#msg_dlg');
		}
		if(msg){
			$msgDlg.find('.weui-dialog__bd').text(msg);
		}
		$msgDlg.show();
	},
	closeMsg : function(){
		var $msgDlg = $('#msg_dlg');
		if($msgDlg.length == 0){
			$('body').append(util.loadingPanel);
			$msgDlg = $('#msg_dlg');
		}
		$msgDlg.hide();
		$msgDlg.find('.weui-dialog__bd').text('');
		if(util.msgCallback){
			util.msgCallback();
			util.msgCallback = null;
		}
	},
	toast : function(msg){
		var $toast = $('#toast');
		if($toast.length == 0){
			$('body').append(util.toastTpl);
			$msgDlg = $('#toast');
		}
		if(msg){
			$msgDlg.find('.weui-toast__content').text(msg);
		}
		$msgDlg.show();
		setTimeout(function(){
			$msgDlg.css('opacity', 1);
			setTimeout(function(){
				$msgDlg.css('opacity', 0);
				$msgDlg.hide();

			},1200);
		},10);
		
	},
	date : {
		getDate : function(dateStr){
			if(!dateStr){
				return '';
			}
			return dateStr.split(' ')[0];
		},
		currDate : function(){
			var date = util.date.shortDate(new Date());
			date = new Date(date + ' 00:00:00');
			return date;
		},
		shortDate : function(longTime){
			var date = new Date(longTime);

			var Year= date.getFullYear();//ie火狐下都可以 
			var Month= date.getMonth()+1; 
			var Day = date.getDate(); 

			if (Month < 10 ) { 
				Month = "0" + Month; 
			} 
			if (Day < 10 ) { 
				Day = "0" + Day; 
			}

			var CurrentDate = Year + '-' + Month + '-' + Day;

			return CurrentDate;
		},
		format : function(longTime){
			var date = new Date(longTime);

			var Year= date.getFullYear();//ie火狐下都可以 
			var Month= date.getMonth()+1; 
			var Day = date.getDate(); 
			var Hour = date.getHours(); 
			var Minute = date.getMinutes(); 
			var Second = date.getSeconds(); 

			if (Month < 10 ) { 
				Month = "0" + Month; 
			} 
			if (Day < 10 ) { 
				Day = "0" + Day; 
			}
			if (Hour < 10 ) { 
				Hour = "0" + Hour; 
			} 
			if (Minute < 10 ) { 
				Minute = "0" + Minute; 
			} 
			if (Second < 10 ) { 
				Second = "0" + Second; 
			}	

			var CurrentDate = Year + '-' + Month + '-' + Day + ' ' + Hour + ':' + Minute + ':' + Second;

			return CurrentDate;
		}
	},
	dialog : {
		infoDialog : function(msg, callback){
			var dd = dialog({
				title: '信息',
				content: msg,
				width : 240,
				okValue : '确定',
				ok : function(){
					if(callback){
						callback();
					}
				}
			});
			dd.showModal();
		},
		errorDialog : function(msg){
			var d = dialog({
				title: '错误信息',
				content: msg,
				width : 240,
				okValue : '确定',
				ok : function(){}
			});
			d.showModal();	
		},
		confirmDialog : function(content,successCallback,cancelCallback,title){
			if(!title)
				title = "信息";
			if(!successCallback){
				successCallback = function(){};
			}
			if(!cancelCallback){
				cancelCallback = function(){};
			}

			var d = dialog({
				title: title,
				content: content,
				width : 240,
				okValue : '确认',
	 			ok : successCallback,
	 			cancelValue : '取消',
	 			cancel : cancelCallback
			});
			d.showModal();	
		}
	}
};

juicer.register('getCtx', util.getCtx);
juicer.register('getImgHost', util.getImgHost);
juicer.register('getPic', util.getPic);
juicer.register('getPics', util.getPics);
juicer.register('getDate', util.date.getDate);
juicer.register('dateFormat', util.date.format);
juicer.register('formatIndex', util.formatIndex);


var valid = {
	tel : function(phone) { // 验证手机号
 		var pattern = /^1[34578]\d{9}$/; 
 		return pattern.test(phone); 
	},
	identity : function(cardNo){
		var info = {
			isTrue : false,
			year : null,
			month : null,
			day : null,
			isMale : false,
			isFemale : false
		};
		if (!cardNo || (15 != cardNo.length && 18 != cardNo.length) ) {
			info.isTrue = false;
			return info;
		}
		if (15 == cardNo.length) {
			var year = cardNo.substring(6, 8);
			var month = cardNo.substring(8, 10);
			var day = cardNo.substring(10, 12);
			var p = cardNo.substring(14, 15); //性别位
			var birthday = new Date(year, parseFloat(month) - 1,
					parseFloat(day));
			// 对于老身份证中的年龄则不需考虑千年虫问题而使用getYear()方法  
			if (birthday.getYear() != parseFloat(year)
					|| birthday.getMonth() != parseFloat(month) - 1
					|| birthday.getDate() != parseFloat(day)) {
				info.isTrue = false;
			} else {
				info.isTrue = true;
				info.year = birthday.getFullYear();
				info.month = birthday.getMonth() + 1;
				info.day = birthday.getDate();
				if (p % 2 == 0) {
					info.isFemale = true;
					info.isMale = false;
				} else {
					info.isFemale = false;
					info.isMale = true
				}
			}
			return info;
		}
		if (18 == cardNo.length) {
			var year = cardNo.substring(6, 10);
			var month = cardNo.substring(10, 12);
			var day = cardNo.substring(12, 14);
			var p = cardNo.substring(14, 17)
			var birthday = new Date(year, parseFloat(month) - 1,
					parseFloat(day));
			// 这里用getFullYear()获取年份，避免千年虫问题
			if (birthday.getFullYear() != parseFloat(year)
					|| birthday.getMonth() != parseFloat(month) - 1
					|| birthday.getDate() != parseFloat(day)) {
				info.isTrue = false;
				return info;
			}
			var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子  
			var Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值.10代表X 
			// 验证校验位
			var sum = 0; // 声明加权求和变量
			var _cardNo = cardNo.split("");
			if (_cardNo[17].toLowerCase() == 'x') {
				_cardNo[17] = 10;// 将最后位为x的验证码替换为10方便后续操作  
			}
			for ( var i = 0; i < 17; i++) {
				sum += Wi[i] * _cardNo[i];// 加权求和  
			}
			var i = sum % 11;// 得到验证码所位置
			if (_cardNo[17] != Y[i]) {
				return info.isTrue = false;
			}
			info.isTrue = true;
			info.year = birthday.getFullYear();
			info.month = birthday.getMonth() + 1;
			info.day = birthday.getDate();
			if (p % 2 == 0) {
				info.isFemale = true;
				info.isMale = false;
			} else {
				info.isFemale = false;
				info.isMale = true
			}
			return info;
		}
		return info;
	}
};

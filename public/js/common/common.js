var moka = {
	spot : {},
	info : {},
	fav : {},
	share : {},
	hotel : {},
	user : {},
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
	formatIndex : function(index){
		return parseInt(index, 10) + 1;
	},
	loadingPanel : '<div id="loading_panel" class="weui_loading_toast" style="display:none;"><div class="weui_mask_transparent"></div><div class="weui_toast"><div class="weui_loading"><div class="weui_loading_leaf weui_loading_leaf_0"></div><div class="weui_loading_leaf weui_loading_leaf_1"></div><div class="weui_loading_leaf weui_loading_leaf_2"></div><div class="weui_loading_leaf weui_loading_leaf_3"></div><div class="weui_loading_leaf weui_loading_leaf_4"></div><div class="weui_loading_leaf weui_loading_leaf_5"></div><div class="weui_loading_leaf weui_loading_leaf_6"></div><div class="weui_loading_leaf weui_loading_leaf_7"></div><div class="weui_loading_leaf weui_loading_leaf_8"></div><div class="weui_loading_leaf weui_loading_leaf_9"></div><div class="weui_loading_leaf weui_loading_leaf_10"></div><div class="weui_loading_leaf weui_loading_leaf_11"></div></div><p class="weui_toast_content">数据加载中</p></div></div>',
	msgTpl : '<div id="msg_dlg" class="js_dialog" style="display:none;"><div class="weui-mask"></div><div class="weui-dialog"><div class="weui-dialog__bd"></div><div class="weui-dialog__ft"><a href="javascript:util.closeMsg();" class="btn-ok weui-dialog__btn weui-dialog__btn_primary">好的</a></div></div></div>',
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
	showMsg : function(msg){
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
	},

	date : {
		getDate : function(dateStr){
			if(!dateStr){
				return '';
			}
			return dateStr.split(' ')[0];
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


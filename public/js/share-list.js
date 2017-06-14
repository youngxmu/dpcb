(function(P){
	var _this = null;
	_this = P.share.list = {
    tpl : {},
		init : function(){
      _this.cid = $('#cid').val();
			_this.tpl.shareListTpl = juicer($('#share_list_tpl').html());
			_this.initEvent();
      _this.loadData();
		},
		initEvent : function(){
      $('#wrapper').on('touchstart', function(e){
        e.preventDefault();
      });
      $('#wrapper').on('tap', '.share-list li', function(){
        var id = $(this).attr('data-id');
        window.location.href = 'r/sharedetail/' + id;
      });
		},
    loadData : function(){
      $.ajax({
        url : ctx + 'r/myshare',
        type : 'post',
        data : {cid: _this.cid},
        dataType : 'json',
        success : function(result){
          if(result.success){
            var html = _this.tpl.shareListTpl.render(result);
            $('#share_list').html(html);
          }
        },
        error : function(){
        }
      });
    }
	};
}(moka));

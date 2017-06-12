(function(P){
	var _this = null;
	_this = P.info.detail = {
    tpl : {},
    kind : 1,
		init : function(){
      _this.infoId = $('#info_id').val();
			_this.tpl.infoTpl = juicer($('#info_tpl').html());
			_this.initEvent();
      _this.loadData();
		},
		initEvent : function(){
      $('#wrapper').on('touchstart', function(e){
        e.preventDefault();
      });
		},
    loadData : function(){
      $.ajax({
        url : 'r/infodetail',
        type : 'post',
        data : {id:_this.infoId},
        success : function(result){
          if(result.success){
            var html = _this.tpl.infoTpl.render(result.info);
            $('#info_detail').html(html);
          }
        },
        error : function(){
        }
      });
    }
  }
}(moka));
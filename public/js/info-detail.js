(function(P){
	var _this = null;
	_this = P.info.detail = {
    tpl : {},
		init : function(){
      _this.infoId = $('#info_id').val();
			_this.tpl.infoTpl = juicer($('#info_tpl').html());
			_this.initEvent();
      _this.loadData();
		},
		initEvent : function(){
      $('#wrapper').on('touchstart', function(e){
        //e.preventDefault();
      });
		},
    loadData : function(){
      $.ajax({
        url : ctx + 'r/infodetail',
        type : 'post',
        data : {iid:_this.infoId},
        dataType : 'json',
        success : function(result){
          if(result.ret_code){
            var html = _this.tpl.infoTpl.render(result.value);
            $('#info_detail').html(html);
          }
        },
        error : function(){
        }
      });
    }
  }
}(moka));
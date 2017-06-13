(function(P){
	var _this = null;
	_this = P.spot.detail = {
    tpl : {},
		init : function(){
      _this.spotId = $('#spot_id').val();
			_this.tpl.spotTpl = juicer($('#spot_tpl').html());
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
        url : ctx + 'r/scedetail',
        type : 'post',
        data : {sid:_this.spotId},
        dataType : 'json',
        success : function(result){
          if(result.ret_code == 0){

            var html = _this.tpl.spotTpl.render(result.value);
            $('#spot_detail').html(html);
          }
        },
        error : function(){
        }
      });
    }
  }
}(moka));
(function(P){
	var _this = null;
	_this = P.hotel.detail = {
    tpl : {},
		init : function(){
      _this.hotelId = $('#hotel_id').val();
			_this.tpl.hotelTpl = juicer($('#hotel_tpl').html());
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
        url : ctx + 'r/hoteldetail',
        type : 'post',
        data : {hid:_this.hotelId},
        dataType : 'json',
        success : function(result){
          if(result.ret_code == 0){
            var html = _this.tpl.hotelTpl.render(result.value);
            $('#hotel_detail').html(html);
          }
        },
        error : function(){
        }
      });
    }
  }
}(moka));
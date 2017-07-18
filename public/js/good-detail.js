(function(P){
	var _this = null;
	_this = P.good.detail = {
    tpl : {},
		init : function(){
      _this.cid = $('#cid').val();
      _this.goodId = $('#good_id').val();
			_this.tpl.goodTpl = juicer($('#good_tpl').html());
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
        url : ctx + 'r/sgoodsdetail',
        type : 'post',
        data : {sid:_this.goodId},
        dataType : 'json',
        success : function(result){
          if(result.ret_code){
            var html = _this.tpl.goodTpl.render(result.value);
            $('#good_detail').html(html);
          }
        },
        error : function(){
        }
      });
    }
  }
}(moka));
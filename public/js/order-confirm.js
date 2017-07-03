(function(P){
	var _this = null;
	_this = P.order.confirm = {
    tpl : {},
		init : function(){
      _this.cid = $('#cid').val();
      _this.orderId = $('#order_id').val();
			_this.tpl.orderTpl = juicer($('#order_tpl').html());
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
        url : ctx + 'r/orderdetail',
        type : 'post',
        data : {oid:_this.orderId},
        dataType : 'json',
        success : function(result){
          if(result.ret_code == 0){
            var html = _this.tpl.orderTpl.render(result.value);
            $('#order_detail').html(html);
          }
        },
        error : function(){
        }
      });
    }
  }
}(moka));
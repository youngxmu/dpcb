(function(P){
	var _this = null;
	_this = P.ticket.detail = {
    tpl : {},
		init : function(){
      _this.cid = $('#cid').val();
			_this.tpl.ticketTpl = juicer($('#ticket_tpl').html());
			_this.initEvent();
      _this.loadData();
		},
		initEvent : function(){
      $('#wrapper').on('touchstart', function(e){
      });
		},
    loadData : function(){
      $.ajax({
        url : ctx + 'r/ticketdetail',
        type : 'post',
        dataType : 'json',
        success : function(result){
          if(result.ret_code){
            var html = _this.tpl.ticketTpl.render(result.value);
            $('#ticket_detail').html(html);
          }
        },
        error : function(){
        }
      });
    }
  }
}(moka));
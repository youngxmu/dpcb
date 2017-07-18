(function(P){
	var _this = null;
	_this = P.guide.detail = {
    tpl : {},
		init : function(){
      _this.guideId = $('#guide_id').val();
			_this.tpl.guideTpl = juicer($('#guide_tpl').html());
			_this.initEvent();
      _this.loadData();
		},
		initEvent : function(){
      $('#wrapper').on('touchstart', function(e){
        //e.preventDefault();
      });

      $('#wrapper').on('click', '.address', function(e){
        var address = $(this).text();
        window.location.href = 's/bdmap?address=' + address;
      });
      $('#wrapper').on('click', '.btn-order', _this.order);
		},
    loadData : function(){
      $.ajax({
        url : ctx + 'r/guidetail',
        type : 'post',
        data : {sid:_this.guideId},
        dataType : 'json',
        success : function(result){
          if(result.ret_code == 0){
            var html = _this.tpl.guideTpl.render(result.value);
            $('#guide_detail').html(html);
          }
        },
        error : function(){
        }
      });
    },
    order : function(){
      $.ajax({
        url : ctx + 'r/guideres',
        type : 'post',
        data : {sid:_this.guideId},
        dataType : 'json',
        success : function(result){
          if(result.ret_code == 0){
            util.toast('预定成功');
          }else{
            util.showMsg(result.ret_msg);
          }
        },
        error : function(){
        }
      });
    }
  }
}(moka));
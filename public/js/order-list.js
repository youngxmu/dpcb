(function(P){
	var _this = null;
	_this = P.order.list = {
    tpl : {},
    status : 0,
		init : function(){
			_this.tpl.orderListTpl = juicer($('#order_list_tpl').html());
			_this.initEvent();
      _this.loadData();
		},
		initEvent : function(){
      $('#wrapper').on('touchstart', function(e){
        e.preventDefault();
      });
      $('#wrapper').on('tap', '.nav-panel li', function(){
        var $this = $(this);
        _this.status = $this.attr('data-status');
        if($this.hasClass('active')){
          return;
        }
        $this.addClass('active').siblings('li').removeClass('active');
        _this.loadData();
      });
      $('#wrapper').on('tap', '.order-list li', function(){
        var id = $(this).attr('data-id');
        window.location.href = 'order/detail/' + id;
      });
		},
    loadData : function(){
      $.ajax({
        url : 'order/list',
        type : 'post',
        data : {
          status : _this.status
        },
        success : function(result){
          if(result.success){
            var html = _this.tpl.orderListTpl.render(result);
            $('#order_list').html(html);
          }
        },
        error : function(){
        }
      });
    }
	};
}(moka));

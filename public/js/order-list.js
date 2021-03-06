(function(P){
	var _this = null;
	_this = P.order.list = {
    tpl : {},
    orderMap : {},
    status : 0,
		init : function(){
      _this.cid = $('#cid').val();
			_this.tpl.orderListTpl = juicer($('#order_list_tpl').html());
			_this.initEvent();
      _this.loadData();
		},
		initEvent : function(){
      $('#wrapper').on('touchstart', function(e){
        //e.preventDefault();
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
        url : ctx + 'r/myorder',
        type : 'post',
        data : {
          cid : _this.cid
        },
        dataType : 'json',
        success : function(result){
          if(result.ret_code == 0){
            var list = [];
            for(var index in result.value){
              var order = result.value[index];
              if(order.used == _this.status){
                list.push(order);
                _this.orderMap[order.id] = order;
              }
            }
            var html = _this.tpl.orderListTpl.render({list: list});
            $('#order_list').html(html);
          }
        },
        error : function(){
        }
      });
    }
	};
}(moka));

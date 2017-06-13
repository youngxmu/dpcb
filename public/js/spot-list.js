(function(P){
	var _this = null;
	_this = P.spot.list = {
    tpl : {},
		init : function(){
			_this.tpl.spotListTpl = juicer($('#spot_list_tpl').html());
			_this.initEvent();
      _this.loadData();
		},
		initEvent : function(){
      $('#wrapper').on('touchstart', function(e){
        e.preventDefault();
      });
      $('#wrapper').on('tap', '.spot-list li', function(){
        var id = $(this).attr('data-id');
        window.location.href = 'spot/detail/' + id;
      });
		},
    loadData : function(){
      $.ajax({
        url : ctx + 'r/scelist',//'spot/list',
        type : 'post',
        dataType : 'json',
        success : function(result){
          if(result.success){
            var html = _this.tpl.spotListTpl.render(result);
            $('#spot_list').html(html);
          }
          if(result.ret_code == 0){
            var list = [];
            for(var index in result.value){
              var spot = result.value[index];
              list.push(spot);
            }
            var html = _this.tpl.spotListTpl.render({list: list});
            $('#spot_list').html(html); 
          }
        },
        error : function(){
        }
      });
    }
	};
}(moka));

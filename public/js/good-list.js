(function(P){
	var _this = null;
	_this = P.good.list = {
    tpl : {},
		init : function(){
			_this.tpl.goodListTpl = juicer($('#good_list_tpl').html());
			_this.initEvent();
      _this.loadData();
		},
		initEvent : function(){
      $('#wrapper').on('touchstart', function(e){
        //e.preventDefault();
      });
      $('#wrapper').on('tap', '.good-list li', function(){
        var id = $(this).attr('data-id');
        window.location.href = 'goods/detail/' + id;
      });
		},
    loadData : function(){
      $.ajax({
        url : ctx + 'r/sgoodslist ',//'good/list',
        type : 'post',
        dataType : 'json',
        success : function(result){
          if(result.ret_code == 0){
            var list = [];
            for(var index in result.value){
              var good = result.value[index];
              list.push(good);
            }
            var html = _this.tpl.goodListTpl.render({list: list});
            $('#good_list').html(html); 
          }
        },
        error : function(){
        }
      });
    },
    getContent : function(content){
      var $content = $(content);
      return $content.text();
    }
	};
  juicer.register('getContent', _this.getContent);
}(moka));

(function(P){
	var _this = null;
	_this = P.guide.list = {
    tpl : {},
    kind : 1,
		init : function(){
			_this.tpl.guideListTpl = juicer($('#guide_list_tpl').html());
			_this.initEvent();
      _this.loadData();
		},
		initEvent : function(){
      $('#wrapper').on('touchstart', function(e){
        //e.preventDefault();
      });

      $('#wrapper').on('tap', '.nav-panel li', function(){
        var $this = $(this);
        _this.kind = $this.attr('data-kind');
        if($this.hasClass('active')){
          return;
        }
        $this.addClass('active').siblings('li').removeClass('active');
        _this.loadData();
      });

      $('#wrapper').on('tap', '.guide-list li', function(){
        var id = $(this).attr('data-id');
        window.location.href = 'guide/detail/' + id;
      });
		},
    loadData : function(){
      $.ajax({
        url : ctx + 'r/guidelist',
        type : 'post',
        dataType : 'json',
        success : function(result){
          if(result.ret_code == 0){
            var list = [];
            for(var index in result.value){
              var guide = result.value[index];
              list.push(guide);
            }
            var html = _this.tpl.guideListTpl.render({list: list});
            $('#guide_list').html(html); 
          }
        },
        error : function(){
        }
      });
    },
    getKind : function(kind){
      if(kind == 1){
        return '美食';
      }
      if(kind == 2){
        return '住宿'; 
      }
      if(kind == 3){
        return '购物';
      }
      if(kind == 4){
        return '周边';
      }
    }
	};
  juicer.register('getKind', _this.getKind);
}(moka));

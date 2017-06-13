(function(P){
	var _this = null;
	_this = P.info.list = {
    tpl : {},
    kind : 1,
		init : function(){
			_this.tpl.infoListTpl = juicer($('#info_list_tpl').html());
			_this.initEvent();
      _this.loadData();
		},
		initEvent : function(){
      $('#wrapper').on('touchstart', function(e){
        e.preventDefault();
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

      $('#wrapper').on('tap', '.info-list li', function(){
        var id = $(this).attr('data-id');
        window.location.href = 'info/detail/' + id;
      });
		},
    loadData : function(){
      $.ajax({
        url : ctx + 'r/infolist',
        type : 'post',
        dataType : 'json',
        success : function(result){
          if(result.success){
            var list = [];
            for(var index in result.list){
              var info = result.list[index];
              console.log(info.kind + "  " + _this.kind);
              if(info.kind == _this.kind){
                list.push(info);
              }
            }
            var html = _this.tpl.infoListTpl.render({list: list});
            $('#info_list').html(html);
          }
          if(result.ret_code == 0){
            var list = [];
            for(var index in result.value){
              var info = result.value[index];
              console.log(info.kind + "  " + _this.kind);
              if(info.kind == _this.kind){
                list.push(info);
              }
            }
            var html = _this.tpl.infoListTpl.render({list: list});
            $('#info_list').html(html); 
          }
        },
        error : function(){
        }
      });
    },
    getKind : function(kind){
      if(kind == 1){
        return '景区活动';
      }
      if(kind == 2){
        return '周边活动'; 
      }
      if(kind == 3){
        return '商家活动';
      }
    }
	};
  juicer.register('getKind', _this.getKind);
}(moka));

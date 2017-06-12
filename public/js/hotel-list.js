(function(P){
	var _this = null;
	_this = P.hotel.list = {
    tpl : {},
    kind : 1,
		init : function(){
			_this.tpl.hotelListTpl = juicer($('#hotel_list_tpl').html());
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

      $('#wrapper').on('tap', '.hotel-list li', function(){
        var id = $(this).attr('data-id');
        window.location.href = 'r/hoteldetail/' + id;
      });
		},
    loadData : function(){
      $.ajax({
        url : ctx + 'r/hotellist',
        type : 'post',
        dataType : 'json',
        success : function(result){
          if(result.success){
            var list = [];
            for(var index in result.list){
              var hotel = result.list[index];
              console.log(hotel.kind + "  " + _this.kind);
              if(hotel.kind == _this.kind){
                list.push(hotel);
              }
            }
            var html = _this.tpl.hotelListTpl.render({list: list});
            $('#hotel_list').html(html);
          }
          if(result.ret_code == 0){
            var list = [];
            for(var index in result.value){
              var hotel = result.value[index];
              console.log(hotel.kind + "  " + _this.kind);
              if(hotel.kind == _this.kind){
                list.push(hotel);
              }
              list.push(hotel);
            }
            var html = _this.tpl.hotelListTpl.render({list: list});
            $('#hotel_list').html(html); 
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

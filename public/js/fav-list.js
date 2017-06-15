(function(P){
	var _this = null;
	_this = P.fav.list = {
    favMap : {},
    tpl : {},
		init : function(){
      _this.cid = $('#cid').val();
			_this.tpl.favListTpl = juicer($('#fav_list_tpl').html());
			_this.initEvent();
      _this.loadData();
		},
		initEvent : function(){
      $('#wrapper').on('touchstart', function(e){
        //e.preventDefault();
      });
      $('#wrapper').on('tap', '.fav-list li', function(){
        var id = $(this).attr('data-id');
        var fav = _this.favMap[id];

        var iid = fav.iid;
        var kind = fav.kid;
        if(kind == 1){

        }
        if(kind == 2){
          
        }
        if(kind == 3){
          window.location.href = 'info/detail/' + iid;  
        }
        
      });
		},
    loadData : function(){
      $.ajax({
        url : ctx + 'r/myfav',
        type : 'post',
        dataType : 'json',
        data : {
          cid : _this.cid
        },
        success : function(result){
          if(result.success){
            var html = _this.tpl.favListTpl.render(result);
            $('#fav_list').html(html);
          }

          if(result.ret_code == 0){
            var list = [];
            for(var index in result.value){
              var fav = result.value[index];
              if(fav.kind == _this.kind){
                list.push(fav);

                _this.favMap[fav.id] = fav;
              }
            }
            var html = _this.tpl.favListTpl.render({list: list});
            $('#fav_list').html(html); 
          }
        },
        error : function(){
        }
      });
    }
	};
}(moka));

(function(P){
	var _this = null;
	_this = P.fav.list = {
    tpl : {},
		init : function(){
			_this.tpl.favListTpl = juicer($('#fav_list_tpl').html());
			_this.initEvent();
      _this.loadData();
		},
		initEvent : function(){
      $('#wrapper').on('touchstart', function(e){
        e.preventDefault();
      });
      $('#wrapper').on('tap', '.fav-list li', function(){
        var id = $(this).attr('data-id');
        window.location.href = 'r/favdetail/' + id;
      });
		},
    loadData : function(){
      $.ajax({
        url : 'r/favlist',
        type : 'post',
        success : function(result){
          if(result.success){
            var html = _this.tpl.favListTpl.render(result);
            $('#fav_list').html(html);
          }
        },
        error : function(){
        }
      });
    }
	};
}(moka));

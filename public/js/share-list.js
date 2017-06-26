(function(P){
	var _this = null;
	_this = P.share.list = {
    shareMap : {},
    tpl : {},
		init : function(){
      _this.cid = $('#cid').val();
			_this.tpl.shareListTpl = juicer($('#share_list_tpl').html());
			_this.initEvent();
      _this.loadData();
		},
		initEvent : function(){
      $('#wrapper').on('touchstart', function(e){
        //e.preventDefault();
      });
      $('#wrapper').on('tap', '.share-list li', function(){
        var id = $(this).attr('data-id');
        var share = _this.shareMap[id];

        var iid = share.iid;
        var kind = share.kid;
        if(kind == 1){
          window.location.href = 'spot/detail/' + iid;  
        }
        if(kind == 2){
          window.location.href = 'hotel/detail/' + iid;  
        }
        if(kind == 3){
          window.location.href = 'info/detail/' + iid;  
        }
        
      });
    },
    loadData : function(){
      $.ajax({
        url : ctx + 'r/myshare',
        type : 'post',
        dataType : 'json',
        data : {
          cid : _this.cid
        },
        success : function(result){
          if(result.success){
            var html = _this.tpl.shareListTpl.render(result);
            $('#share_list').html(html);
          }

          if(result.ret_code == 0){
            var list = [];
            for(var index in result.value){
              var share = result.value[index];
              if(share.kind == _this.kind){
                list.push(share);
                _this.shareMap[share.id] = share;
              }
            }
            var html = _this.tpl.shareListTpl.render({list: list});
            $('#share_list').html(html); 
          }
        },
        error : function(){
        }
      });
    }
	};
}(moka));

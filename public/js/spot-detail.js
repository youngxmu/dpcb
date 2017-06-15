(function(P){
	var _this = null;
	_this = P.spot.detail = {
    tpl : {},
		init : function(){
      _this.spotId = $('#spot_id').val();
			_this.tpl.spotTpl = juicer($('#spot_tpl').html());
			_this.initEvent();
      _this.loadData();
		},
		initEvent : function(){
      $('#wrapper').on('touchstart', function(e){
        //e.preventDefault();
      });

      $('#wrapper').on('tap', '.btn-fav', _this.fav);
      $('#wrapper').on('tap', '.btn-share', _this.share);
		},
    loadData : function(){
      $.ajax({
        url : ctx + 'r/scedetail',
        type : 'post',
        data : {sid:_this.spotId},
        dataType : 'json',
        success : function(result){
          if(result.ret_code == 0){
            var html = _this.tpl.spotTpl.render(result.value);
            $('#spot_detail').html(html);
          }
        },
        error : function(){
        }
      });
    },
    fav : function(event){
      event.preventDefault();
      event.stopPropagation();
      var id = _this.spotId;
      $.ajax({
        url : ctx + 'r/fav',
        type : 'post',
        dataType : 'json',
        data : {
          cid : _this.cid,
          id : id,
          kind : 1
        },
        success : function(result){
          if(result.ret_code == 0){
            util.showMsg('收藏成功');
          }
        },
        error : function(){
        }
      });
    },
    share : function(event){
      event.preventDefault();
      event.stopPropagation();
      var id = _this.spotId;
      $.ajax({
        url : ctx + 'r/share',
        type : 'post',
        dataType : 'json',
        data : {
          cid : _this.cid,
          id : id,
          kind : 1
        },
        success : function(result){
          if(result.ret_code == 0){
            util.showMsg('分享成功');
          }
        },
        error : function(){
        }
      });
    }
  }
}(moka));
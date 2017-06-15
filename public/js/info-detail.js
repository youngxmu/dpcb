(function(P){
	var _this = null;
	_this = P.info.detail = {
    tpl : {},
		init : function(){
      _this.infoId = $('#info_id').val();
			_this.tpl.infoTpl = juicer($('#info_tpl').html());
			_this.initEvent();
      _this.loadData();
		},
		initEvent : function(){
      $('#wrapper').on('touchstart', function(e){
        //e.preventDefault();
      });
      $('#wrapper').on('click', '.btn-fav', _this.fav);
      $('#wrapper').on('click', '.btn-share', _this.share);
		},
    loadData : function(){
      $.ajax({
        url : ctx + 'r/infodetail',
        type : 'post',
        data : {iid:_this.infoId},
        dataType : 'json',
        success : function(result){
          if(result.ret_code){
            var html = _this.tpl.infoTpl.render(result.value);
            $('#info_detail').html(html);
          }
        },
        error : function(){
        }
      });
    },
    fav : function(event){
      event.preventDefault();
      event.stopPropagation();
      var $this = $(this);
      var id = $this.attr('data-id');
      var kind = $this.attr('data-kind');
      $this.addClass('active');
      $.ajax({
        url : ctx + 'r/fav',
        type : 'post',
        data : {
          cid : _this.cid,
          id : _this.infoId,
          kind : 3
        },
        success : function(result){
          if(result.success){
            util.dialog.infoDialog('收藏成功');
          }
        },
        error : function(){
        }
      });
    },
    share : function(event){
      event.preventDefault();
      event.stopPropagation();
      var $this = $(this);
      var id = $this.attr('data-id');
      var kind = $this.attr('data-kind');
      $this.addClass('active');
      $.ajax({
        url : ctx + 'r/share',
        type : 'post',
        data : {
          cid : _this.cid,
          id : _this.infoId,
          kind : 3
        },
        success : function(result){
          if(result.success){
            util.dialog.infoDialog('收藏成功');
          }
        },
        error : function(){
        }
      });
    }
  }
}(moka));
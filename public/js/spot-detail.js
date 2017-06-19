(function(P){
	var _this = null;
	_this = P.spot.detail = {
    tpl : {},
		init : function(){
      _this.cid = $('#cid').val();
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

      $('#wrapper').on('tap', '.btn-audio', _this.play);
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
    play : function(){
      var $audio = $('#text_audio');
      if($audio.hasClass('play')){
        $audio.removeClass('play');
        $audio[0].pause();
      }else{
        $audio.addClass('play');
        $audio[0].play();
      }
    },
    fav : function(event){
      event.preventDefault();
      event.stopPropagation();
      var id = _this.spotId;
      $(this).addClass('active');
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
            util.toast('收藏成功');
          }
        },
        error : function(){
        }
      });
    },
    share : function(event){
      event.preventDefault();
      event.stopPropagation();
      $(this).addClass('active');
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
            util.toast('分享成功');
          }
        },
        error : function(){
        }
      });
    }
  }
}(moka));
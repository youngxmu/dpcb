(function(P){
	var _this = null;
	_this = P.info.list = {
    tpl : {},
    kind : 1,
		init : function(){
      _this.cid = $('#cid').val();
			_this.tpl.infoListTpl = juicer($('#info_list_tpl').html());
			_this.initEvent();
      _this.loadData();
		},
		initEvent : function(){
      $('#wrapper').on('touchstart', function(e){
        //e.preventDefault();
      });

      $('#wrapper').on('click', '.nav-panel li', function(){
        var $this = $(this);
        _this.kind = $this.attr('data-kind');
        if($this.hasClass('active')){
          return;
        }
        $this.addClass('active').siblings('li').removeClass('active');
        _this.loadData();
      });

      $('#wrapper').on('click', '.info-list li .pic', function(){
        var id = $(this).attr('data-id');
        window.location.href = 'info/detail/' + id;
      });
      $('#wrapper').on('click', '.btn-fav', _this.fav);
      $('#wrapper').on('click', '.btn-share', _this.share);
		},
    loadData : function(){
      $.ajax({
        url : ctx + 'r/infolist',
        type : 'post',
        dataType : 'json',
        success : function(result){
          if(result.ret_code == 0){
            var list = [];
            for(var index in result.value){
              var info = result.value[index];
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
        dataType : 'json',
        data : {
          cid : _this.cid,
          id : id,
          kind : 3
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
      var $this = $(this);
      var id = $this.attr('data-id');
      var kind = $this.attr('data-kind');
      $this.addClass('active');
      $.ajax({
        url : ctx + 'r/share',
        type : 'post',
        dataType : 'json',
        data : {
          cid : _this.cid,
          id : id,
          kind : 3
        },
        success : function(result){
          if(result.ret_code == 0){
            util.toast('收藏成功');
          }
        },
        error : function(){
        }
      });
    }
	};
  juicer.register('getKind', _this.getKind);
}(moka));

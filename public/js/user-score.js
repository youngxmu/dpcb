(function(P){
	var _this = null;
	_this = P.user.score = {
    tpl : {},
		init : function(){
      _this.cid = $('#cid').val();
      _this.tpl.prodListTpl = juicer($('#prod_list_tpl').html());
      _this.tpl.recdListTpl = juicer($('#recd_list_tpl').html());
			_this.initEvent();
      _this.loadData();
      _this.loadProd();
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
        if(_this.kind == 1){
          $('#prod_list').show();
          $('#recd_list').hide();
          _this.loadProd();
        }else{
          $('#prod_list').hide();
          $('#recd_list').show();
          _this.loadRecd();
        }
        
      });
		},
    loadData : function(){
      $.ajax({
        url : ctx + 'r/mypoint',
        type : 'post',
        data : {cid:_this.cid},
        dataType : 'json',
        success : function(result){
          if(result.ret_code){
            var score = 0;
            if(result.value){
              score = result.value;
            }
            $('.score-count').html(score);
          }
        },
        error : function(){
        }
      });
    },
    loadProd : function(){
      $.ajax({
        url : ctx + 'r/goodslist',
        type : 'post',
        data : {cid:_this.cid},
        dataType : 'json',
        success : function(result){
          if(result.ret_code == 0){
            var list = [];
            for(var index in result.value){
              var prod = result.value[index];
              list.push(prod);
            }
            var html = _this.tpl.prodListTpl.render({list: list});
            $('#prod_list').html(html); 
          }
        },
        error : function(){
        }
      });
    },
    loadRecd : function(){
      $.ajax({
        url : ctx + 'r/exclist',
        type : 'post',
        data : {cid:_this.cid},
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
    }
  }
}(moka));
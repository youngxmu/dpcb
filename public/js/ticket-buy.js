(function(P){
	var _this = null;
	_this = P.ticket.buy = {
    tpl : {},
		init : function(){
      _this.cid = $('#cid').val();
      _this.tid = $('#tid').val();
			_this.tpl.ticketTpl = juicer($('#ticket_tpl').html());
			_this.initEvent();
      _this.loadData();
		},
		initEvent : function(){
      // $('#wrapper').on('touchstart', function(e){
      //   //e.preventDefault();
      // });

      $('#wrapper').on('tap', '.dec', _this.dec);
      $('#wrapper').on('tap', '.inc', _this.inc);
      $('#wrapper').on('tap', '.btn-commit', _this.commit);
      $('#wrapper').on('change', '#hide_date', function(){
        $('#show_date').val($(this).val());
      });
		},
    loadData : function(){
      $.ajax({
        url : ctx + 'r/ticketdetail',
        type : 'post',
        dataType : 'json',
        success : function(result){
          if(result.ret_code){
            var html = _this.tpl.ticketTpl.render(result.value);
            _this.price = result.value.price;
            if(result.value.disprice){
              _this.price = result.value.disprice;
            }
            $('#ticket_buy').html(html);
          }
        },
        error : function(){
        }
      });
    },
    commit : function(){
      if(_this.commiting){
        return;
      }
      _this.commiting = true;

      var data = {
        cid : _this.cid,
        tid : _this.tid,
        price : _this.price
      };
      var complete = true;
      $('.order-detail').find('input').each(function(){
        var $this = $(this);
        var key = $this.attr('name');
        var val = $this.val();
        if(!val){
          complete = false;
        }
        data[key] = val;
      });

      data.total = data.price * data.num;
      if(!complete){
        return util.showMsg('请填写所有信息');
      }

      $.ajax({
        url : ctx + 'r/buyticket',
        type : 'post',
        data : data,
        success : function(result){
          if(result.success){
            var html = _this.tpl.favListTpl.render(result);
            $('#fav_list').html(html);
          }
        },
        error : function(){
        },
        complete : function(){
          _this.commiting = false;
        }
      });
    },
    dec : function(){
      var $num = $('#num');
      var num = $num.val();
      if(num > 1){
        num--;
      }else{
        num = 1;
      }
      $num.val(num);
    },
    inc : function(){
      var $num = $('#num');
      var num = $num.val();
      if(num > 0){
        num++;
      }else{
        num = 1;
      }
      $num.val(num);
    }
  }
}(moka));


var fetching = false;
var timer = 60;
$('#wrapper').on('click', '.btn-code', function(){
  if(fetching){
    return;
  }
  var $this = $(this);
  var phone = $('#phone').val();
  if(!phone){
    return util.showMsg('请输入手机号！');
  }

  var counter = setInterval(function(){
    if(timer <= 0){
      $this.text('获取验证码');
      return clearInterval(counter);
    }
    timer--;
    fetching = false;
    $this.text(timer + 's');
  }, 1000);

  fetching = true;
  $.ajax({
    url : ctx + 'r/mcode',
    type : 'post',
    data : {
      phone : phone
    },
    success : function(result){
      util.showMsg('验证码已发送！');
    },
    error : function(){
      util.showMsg('验证已发送失败，请重试');
    }
  });
});

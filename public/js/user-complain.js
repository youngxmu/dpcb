(function(P){
	var _this = null;
	_this = P.user.complain = {
    tpl : {},
		init : function(){
      _this.cid = $('#cid').val();
			_this.initEvent();
		},
		initEvent : function(){
      // $('#wrapper').on('touchstart', function(e){
      //   e.preventDefault();
      // });
      $('#wrapper').on('tap', '.btn-complain', _this.commit);
		},
    commit : function(){
      if(_this.commiting){
        return;
      }
      _this.commiting = true;

      var data = {
        cid : _this.cid
      };
      var complete = true;
      $('.complain-container').find('input,textarea').each(function(){
        var $this = $(this);
        var key = $this.attr('name');
        var val = $this.val();
        if(!val){
          complete = false;
        }
        data[key] = val;
      });
      console.log(data);
      if(!complete){
        return util.showMsg('请填写所有信息');
      }

      $.ajax({
        url : ctx + 'r/comp',
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
    }
	};
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

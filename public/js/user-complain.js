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
      //   //e.preventDefault();
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
        // if(key == 'txt'){
        //   val = encodeURI(encodeURI(val;
        // }
        if(!val){
          complete = false;
        }
        data[key] = val;
      });
      if(!complete){
        return util.showMsg('请填写所有信息');
      }

      var strs = [];
      for(var key in data){
        var val = data[key];
        strs.push(key +'=' + val);
      }
      var str = strs.join('&');

      $.ajax({
        url : ctx + 'r/comp?' + str,
        // url : ctx + 'r/comp',
        type : 'get',
        // type : 'post',
        // data : data,
        dataType : 'json',
        success : function(result){
          if(result.ret_code == 0){
            return util.showMsg('提交成功');
          }
          return util.showMsg('提交失败');
        },
        error : function(){
          return util.showMsg('提交失败');
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

(function(P){
	var _this = null;
	_this = P.ticket.buy = {
    tpl : {},
		init : function(){
      _this.cid = $('#cid').val();
      _this.tid = $('#tid').val();
			_this.tpl.ticketTpl = juicer($('#ticket_tpl').html());
      _this.tpl.orderTpl = juicer($('#order_tpl').html());
			_this.initEvent();
      _this.loadData();
      $('#show_date').val(util.date.shortDate(new Date().getTime()));
      $('#hide_date').val(util.date.shortDate(new Date().getTime()));
		},
		initEvent : function(){
      // $('#wrapper').on('touchstart', function(e){
      //   //e.preventDefault();
      // });

      $('#wrapper').on('tap', '.dec', _this.dec);
      $('#wrapper').on('tap', '.inc', _this.inc);
      $('#wrapper').on('tap', '.btn-commit', _this.commit);
      $('#wrapper').on('tap', '.btn-pay', _this.pay);
      
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
        if(!key){
          return;
        }
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
      
      var sdate = new Date(data.sdate);
      if(sdate < util.date.currDate()){
        return util.showMsg('使用时期不能小于当前日期');
      }
      
      var strs = [];
      for(var key in data){
        var val = data[key];
        strs.push(key +'=' + val);
      }
      var str = strs.join('&');

      $.ajax({
        url : ctx + 'r/buyticket?' + str,
        type : 'get',
        // data : data,
        dataType : 'json',
        success : function(result){
          if(result.ret_code == 0){
            var oid = result.value.orderno;
            _this.showConfirm(result.value);
            

           //  WeixinJSBridge.invoke(
           //     'getBrandWCPayRequest', {
           //         "appId": result.value.appid,     //公众号名称，由商户传入     
           //         "timeStamp": result.value.timestamp,         //时间戳，自1970年以来的秒数     
           //         "nonceStr":result.value.noncestr, //随机串     
           //         "package":"prepay_id=" + result.value.prepayid,
           //         "signType":"MD5",         //微信签名方式：     
           //         "paySign": result.value.sign //微信签名 
           //     },
           //     function(res){     
           //         if(res.err_msg == "get_brand_wcpay_request:ok" ) {
           //          console.log(1);
           //         }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
           //     }
           // ); 
          }else{
            util.showMsg(result.ret_msg);
          }
        },
        error : function(){
        },
        complete : function(){
          _this.commiting = false;
        }
      });
    },
    showConfirm : function(data){
      $('.order-detail').hide();
      console.log(data);
      // data = {
      //   buytime:"2017-07-03 16:56:07",
      //   cid:"oAz3H05Hvj-Cvc9440usD3k9iqyw",
      //   cname:"123",
      //   id:"881798698206760960",
      //   num:1,
      //   phone:"18995603859",
      //   price:0.01,
      //   spics:"/images/Lighthouse.jpg",
      //   state:0,
      //   tid:"872751047163252736",
      //   tname:"东坡赤壁门票",
      //   total:0.01,
      //   ttime:"2017-06-19",
      //   useNum:0,
      //   used:0
      // };
      _this.oid = data.id;

      var html = _this.tpl.orderTpl.render(data);
      $('#order_confirm').html(html);
    },
    pay : function(){
      if(_this.paying){
        return;
      }
      _this.paying = true;
      $.ajax({
        url : ctx + 'r/bticket',
        type : 'post',
        data : {oid: _this.oid},
        dataType : 'json',
        success : function(result){
          if(result.ret_code == 0){
            util.showMsg('支付成功', function(){
              window.location.href = 'user/order'; 
            });
          }else{
            util.showMsg('支付失败');
          }
        },
        error : function(){
        },
        complete : function(){
          _this.paying = false;
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
var timer = 180;
$('#wrapper').on('click', '.btn-code', function(){
  if(fetching){
    return;
  }
  var $this = $(this);
  $this.addClass('send');
  var phone = $('#phone').val();
  if(!phone){
    return util.showMsg('请输入手机号！');
  }

  if(!valid.tel(phone)){
    return util.showMsg('请输入正确的手机号！');
  }

  var counter = setInterval(function(){
    if(timer <= 0){
      $this.text('获取验证码');
      $this.removeClass('send');
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
      phone : phone,
      kind : 2
    },
    dataType : 'json',
    success : function(result){
      if(result.ret_code == 0){
        util.showMsg('验证码已发送，180s内有效！');
      }else{
        util.showMsg('验证已发送失败，请重试');  
      }
    },
    error : function(){
      util.showMsg('验证已发送失败，请重试');
    }
  });
});

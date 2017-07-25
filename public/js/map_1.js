var mapList = [
  {sid : '1',name : '东坡塑像',pos : 'left: 3.89rem;top: 3.59rem;'},
  {sid : '2',name : '望江亭',  pos : 'left: 2.86rem;top: 0.66rem;'},
  {sid : '3',name : '雪堂',    pos : 'left: 3.42rem;top: 1.09rem;'},
  {sid : '4',name : '快哉亭',  pos : 'left: 4.38rem;top: 1.27rem;'},
  {sid : '5',name : '栖霞楼',  pos : 'left: 5.06rem;top: 1.54rem;'},
  {sid : '6',name : '问鹤亭',  pos : 'left: 4.67rem;top: 1.76rem;'},
  {sid : '7',name : '剪刀峰',  pos : 'left: 4.13rem;top: 1.78rem;'},
  {sid : '8',name : '二赋堂',  pos : 'left: 3.53rem;top: 2.21rem;'},
  {sid : '9',name : '石字藏',  pos : 'left: 3.26rem;top: 2.39rem;'},
  {sid : '10',name : '坡仙亭', pos : 'left: 2.61rem;top: 2.25rem;'},
  {sid : '11',name : '睡仙亭', pos : 'left: 2.42rem;top: 1.95rem;'},
  {sid : '12',name : '放龟山', pos : 'left: 1.89rem;top: 2.05rem;'},
  {sid : '13',name : '留仙阁', pos : 'left: 3.91rem;top: 2.22rem;'},
  {sid : '14',name : '天泉',   pos : 'left: 4.42rem;top: 2.28rem;'},
  {sid : '15',name : '碑阁',   pos : 'left: 4.97rem;top: 2.11rem;'},
  {sid : '16',name : '东坡祠', pos : 'left: 5.28rem;top: 2.01rem;'},
  {sid : '17',name : '酹江亭', pos : 'left: 2.96rem;top: 2.61rem;'},
  {sid : '18',name : '小碑廊', pos : 'left: 4.63rem;top: 4.51rem;'},
  {sid : '19',name : '樱花园', pos : 'left: 2.61rem;top: 4.31rem;'},
  {sid : '20',name : '紫薇园', pos : 'left: 2.16rem;top: 4.87rem;'},
  {sid : '21',name : '观景台', pos : 'left: 1.23rem;top: 3.57rem;'},
  {sid : '21',name : '观景台', pos : 'left: 1.23rem;top: 4.47rem;'},
  {sid : '22',name : '大碑廊', pos : 'left: 0.13rem;top: 4.02rem;'},
  {sid : '23',name : '汉川门', pos : 'left: 5.80rem;top: 7.92rem;'}
  // {sid : '24',name : '游乐园', pos : 'left: 0rem;top: 0rem;'}
];

(function(P){
	var _this = null;
  var maxScale = 3;
	_this = P.map = {
    data : {
      currentScale : 2
    },
    tpl : {},
		init : function(){
			_this.tpl.posTpl = juicer($('#pos-tpl').html());
			_this.initEvent();
      _this.loadPos();
		},
		initEvent : function(){
      $('#wrapper').on('touchstart', function(e){
        // e.preventDefault();
      });

      $('#wrapper').on('tap', '.pos', function(e){
        var $this = $(this);
        var sid = $this.attr('data-sid');
        window.location.href = 'spot/detail/' + sid;
      });

      $('#wrapper').on('click', '.btn-list', function(e){
        var $wrapper = $('.map-box');
        $wrapper.css('-webkit-transition', '');
        $wrapper.css('-moz-transition', '');
        $wrapper.css('-webkit-transition-timing-function','cubic-bezier(0.1, 0.57, 0.1, 1)');
        
        

        currentScale = _this.data.currentScale;
          
        dx = parseInt($wrapper.data('dx')) || 0;
        dy = parseInt($wrapper.data('dy')) || 0;

        _this.data.currentScale = currentScale;
        // _this.changeScale($wrapper, dx, dy);

        //y = y - document.body.scrollTop;
        var offx = dx - $wrapper.width() / 2;
        var offy = dy - $wrapper.height() /2;

        // var max_x = parseInt($wrapper.data('max_x'));
        // var max_y = parseInt($wrapper.data('max_y'));
        // var min_x = parseInt($wrapper.data('min_x'));
        // var min_y = parseInt($wrapper.data('min_y'));
        var $panel = $('#map_panel');
        var max_x = 0 + $panel.width();
        var max_y = 0 + $panel.height();
        var min_x = 0 - $panel.width();
        var min_y = 0 - $panel.height();
        offx = offx > max_x ? max_x : offx;
        offy = offy > max_y ? max_y : offy;
        offx = offx < min_x ? min_x : offx;
        offy = offy < min_y ? min_y : offy;
        dx = offx;
        dy = offy;
        _this.changeScale($wrapper, dx, dy);
        // $('.msg-box').append(dx + ' ' + dy + '<bsr>');
        console.log(dx +' ' + dy);
        
        $wrapper.css('-webkit-transform-origin', '0 0');
        $wrapper.css('-webkit-transform', 'translate('+dx + 'px,' + dy + 'px'+') scale('+ currentScale +')');
      });

      var target = document.getElementById("map_box");
      touch.on(target, 'touchstart', function(ev){
        ev.preventDefault();
      });

      var startScale,currentScale,dx,dy;
      // touch.on(target, 'pinch', function(ev){
      //   if(!_this.zooming){
      //     startScale = _this.data.currentScale;
      //     _this.zooming = true;
      //   }
        
      //   var $wrapper = $('.map-box');
      //   $wrapper.css('-webkit-transition', '');
      //   $wrapper.css('-moz-transition', '');
      //   $wrapper.css('-webkit-transition-timing-function','cubic-bezier(0.1, 0.57, 0.1, 1)');
        
        

      //   currentScale = startScale * ev.scale;
      //   currentScale = currentScale < 1 ? 1 : currentScale;
      //   currentScale = currentScale > maxScale ? maxScale : currentScale;

      //   // alert(ev.scale);
      //   if(currentScale == 1){
      //     $wrapper.css('-webkit-transform', '');
      //     _this.data.currentScale = 1;
      //     dx = 0;
      //     dy = 0;
      //   }else{
      //     currentScale = currentScale.toFixed(2);
          
      //     dx = parseInt($wrapper.data('dx')) || 0;
      //     dy = parseInt($wrapper.data('dy')) || 0;

          
      //     _this.changeScale($wrapper, dx, dy);

      //     var touch0 = ev.originEvent.touches[0];
      //     var touch1 = ev.originEvent.touches[1];
      //     var x = (touch0.clientX + touch1.clientX) / 2;
      //     var y = (touch0.clientY + touch1.clientY) / 2;
      //     //y = y - document.body.scrollTop;
      //     var offx = dx - x * (currentScale - _this.data.currentScale);
      //     var offy = dy - y * (currentScale - _this.data.currentScale);
          
      //     // var max_x = parseInt($wrapper.data('max_x'));
      //     // var max_y = parseInt($wrapper.data('max_y'));
      //     // var min_x = parseInt($wrapper.data('min_x'));
      //     // var min_y = parseInt($wrapper.data('min_y'));
      //     var $panel = $('#map_panel');
      //     var max_x = 0 + $panel.width();
      //     var max_y = 0 + $panel.height();
      //     var min_x = 0 - $panel.width();
      //     var min_y = 0 - $panel.height();
      //     offx = offx > max_x ? max_x : offx;
      //     offy = offy > max_y ? max_y : offy;
      //     offx = offx < min_x ? min_x : offx;
      //     offy = offy < min_y ? min_y : offy;
      //     dx = offx;
      //     dy = offy;

      //     // $('.msg-box').append(max_x + ' ' + max_y + '<br>');
      //     $('.msg-box').append(dx + ' ' + dy + '<bsr>');
      //     _this.data.currentScale = currentScale;
          
      //     $wrapper.css('-webkit-transform-origin', '0 0');
      //     $wrapper.css('-webkit-transform', 'translate('+dx + 'px,' + dy + 'px'+') scale('+ currentScale +')');
      //     // alert(1);
      //   }
      // });

      // touch.on(target, 'pinchend', function(ev){
      //   // $('.msg-box').append(dx + ' ' + dy + '<br>');
      //   _this.zooming = false;
      //   var $imgPanel = $('.map-box');
      //   var $img =  $imgPanel.find('img');
      //   $imgPanel.css('-webkit-transition', '-webkit-transform 0.5s');
      //   $imgPanel.css('-webkit-transition-timing-function','cubic-bezier(0.1, 0.57, 0.1, 1)');
      //   var dx = parseInt($imgPanel.data('dx'));
      //   var dy = parseInt($imgPanel.data('dy'));
      //   dx = dx || 0;
      //   dy = dy || 0;
      //   var max_x = parseInt($imgPanel.data('max_x'));
      //   var max_y = parseInt($imgPanel.data('max_y'));
      //   var min_x = parseInt($imgPanel.data('min_x'));
      //   var min_y = parseInt($imgPanel.data('min_y'));
        
      //   var offx = dx ;//+ ev.x * initialScale;
      //   var offy = dy ;//+ ev.y * initialScale;
      //   offx = offx > max_x ? max_x : offx;
      //   offy = offy > max_y ? max_y : offy;
      //   offx = offx < min_x ? min_x : offx;
      //   offy = offy < min_y ? min_y : offy;

      //   dx = offx;
      //   dy = offy;
      //   $imgPanel.css('-webkit-transform', 'translate(' + dx + 'px,' + dy + 'px) scale('+_this.data.currentScale+')');
      //   // _this.changeScale($imgPanel, dx, dy);
      // });

      _this.data.VoH = -1;//init
      touch.on(target, 'drag', function(ev){
       
        var $wrapper = $(this);
        if(this.localName == 'img'){
          $wrapper = $(this).parent('div');
        }
        $wrapper.css('-webkit-transition', '');
        var dx = parseInt($wrapper.data('dx'));
        var dy = parseInt($wrapper.data('dy'));
        
        var max_x = parseInt($wrapper.data('max_x'));
        var max_y = parseInt($wrapper.data('max_y'));
        var min_x = parseInt($wrapper.data('min_x'));
        var min_y = parseInt($wrapper.data('min_y'));
        dx = dx || 0;
        dy = dy || 0;
        var offx = dx + ev.x;// * initialScale;
        var offy = dy + ev.y;// * initialScale;

        if(_this.data.currentScale == 1){
          if(_this.data.VoH == -1){
            _this.data.VoH = 0;
            var absX = Math.abs(ev.x);
            var absY = Math.abs(ev.y);
            if(absY > absX){
              _this.data.VoH = 1;
            }
          }

          if(_this.data.VoH == 0){
            offy = dy;
          }else{
            offx = dx;
          }
        }

        
        
        

        var blacksize = parseInt($wrapper.width() / 8);
        var left = min_x - blacksize;
        var top = max_y - blacksize;
        var right = max_x + blacksize;
        var bottom = min_y + blacksize; 

        console.log(offset+ ' ' +offx + ' ' + offy + ' ' + top + ' ' + bottom + ' ' + opacity);

        var prev_trigger = left - 50;
        var next_trigger = right + 50;

        if(_this.data.currentScale == 1 && _this.data.VoH == 1){
          top = max_y - blacksize * 2;
          bottom = min_y + blacksize * 2;
          var top_trigger = top + 30;
          var bottom_trigger = bottom - 30;
          
          var offset = 0;
          if(offy < top_trigger){
            offset = top_trigger - offy;
          }else{
            offset = offy - bottom_trigger;
          }
          offset = Math.abs(offy);
          
          var opacity = (200/(offset + 200)).toFixed(1);
          console.log(offset+ ' ' +offx + ' ' + offy + ' ' + top_trigger + ' ' + bottom_trigger + ' ' + opacity);

          if (offy < top_trigger || offy > bottom_trigger) {
            _this.data.triggerClose = true;
          }else{
            _this.data.triggerClose = false;
          }
        }
        // console.log(offx + ' ' +offy +' '+ left + ' ' + right);
        console.log(offx+ ' '+prev_trigger + ' '+ next_trigger);
        if (offx < prev_trigger || offx > next_trigger) {
          var change = false;
          if (change) {
            _this.changing = true;

            _this.swapCallback(_this.data.currIndex);

            $('#img_panel').find('li').each(function(index){
              var $li = $(this);
              $li.css('-webkit-transform', 'translateX('+ (index - _this.data.currIndex)* 100 + '%' +')');
              
            });
            $('#img_index').html(parseInt(_this.data.currIndex) + 1);
            return; 
          }
        }
        offx = offx > right ? right : offx;
        offy = offy > top ? top : offy;
        offx = offx < left ? left : offx;
        offy = offy < bottom ? bottom : offy;
        console.log(offy + ' ' + top + 'bottom');
        dx = offx;
        dy = offy;
        console.log(dy);
        $wrapper.css('-webkit-transform', 'translate(' + offx + 'px,' + offy + 'px) scale('+_this.data.currentScale+')');
      });

      touch.on(target, 'dragend', function(ev){
        if(_this.changing == true){
          _this.changing = false;
          return;
        }
        var $wrapper = $(this);
        if(this.localName == 'img'){
          $wrapper = $(this).parent('div');
        }
        $wrapper.css('-webkit-transition', '-webkit-transform 0.3s');
        var dx = parseInt($wrapper.data('dx'));
        var dy = parseInt($wrapper.data('dy'));
        dx = dx || 0;
        dy = dy || 0;
        var max_x = parseInt($wrapper.data('max_x'));
        var max_y = parseInt($wrapper.data('max_y'));
        var min_x = parseInt($wrapper.data('min_x'));
        var min_y = parseInt($wrapper.data('min_y'));
        console.log();
        
        var offx = dx + ev.x;// * initialScale;
        var offy = dy + ev.y;// * initialScale;
        offx = offx > max_x ? max_x : offx;
        offy = offy > max_y ? max_y : offy;
        offx = offx < min_x ? min_x : offx;
        offy = offy < min_y ? min_y : offy;

        dx = offx;
        dy = offy;
        $wrapper.css('-webkit-transform', 'translate(' + dx + 'px,' + dy + 'px) scale('+_this.data.currentScale+')');
        _this.changeScale($wrapper, dx, dy);
      });

		},
    changeScale : function($wrapper, sdx, sdy){
      var $imgPanel = $('#map_panel');
      var imgWidth = parseInt($imgPanel.width());
      var imgHeight = parseInt($imgPanel.height());
      var imgPanelWidth = $imgPanel.width();
      var imgPanelHeight = $imgPanel.height();
      var scaledImgWidth = imgWidth * _this.data.currentScale;
      var scaledImgHeight = imgHeight * _this.data.currentScale;
      var scaledImgPanelWidth = imgPanelWidth * _this.data.currentScale;
      var scaledImgPanelHeight = imgPanelHeight * _this.data.currentScale;
      console.log(imgPanelWidth +' ' + scaledImgWidth);

      var min_x,min_y,max_x,max_y,dx,dy;
      dx = sdx;
      dy = sdy;

      if(_this.data.currentScale == 1){
        min_x = 0;
        min_y = 0 - imgHeight + imgPanelHeight;
        if(imgHeight <  imgPanelHeight){
          min_y = 0;
        }
        max_x = 0;
        max_y = 0;
      }else{
        if(scaledImgHeight <  imgPanelHeight){
          min_x = (imgPanelWidth - scaledImgWidth) - 2;
          min_y = (0 -  (scaledImgPanelHeight - imgPanelHeight) / 2) ;
          max_x = 0;
          max_y = (scaledImgHeight - imgPanelHeight) / 2;
        }else{
          min_x = (imgPanelWidth - scaledImgWidth) - 2;
          min_y = 0 - (scaledImgPanelHeight - scaledImgHeight)/2 - (scaledImgHeight - imgPanelHeight ) ;
          max_x = 0;
          max_y = (scaledImgPanelHeight - scaledImgWidth)/2 ;
        }
      }

      $wrapper.data('scroll', -1);
      $wrapper.data('dx', dx);
      $wrapper.data('dy', dy);
      $wrapper.data('min_x', min_x);
      $wrapper.data('max_x', max_x);
      $wrapper.data('min_y', min_y);
      $wrapper.data('max_y', max_y);
    },
    loadPos : function(){
      var html = _this.tpl.posTpl.render({list: mapList});
      $('#map_panel').append(html);
    }
  }
}(moka));
var mapList = [
  // {
  //   sid : '872010017266733056',
  //   name : '望江亭',
  //   pos : 'left:2.92rem;top:0.71rem;'
  // },
  // {
  //   sid : '872630938830639104',
  //   name : '雪堂',
  //   pos : 'left: 3.47rem;top: 1.14rem;}'
  // }
  {
    sid : '1',
    name : '东坡塑像',
    pos : 'left: 3.9rem;top: 3.6rem;'
  },
  {
    sid : '8',
    name : '二赋堂',
    pos : 'left: 0.15rem;top: 4.02rem;'
  }
];

(function(P){
	var _this = null;
	_this = P.map = {
    tpl : {},
		init : function(){
			_this.tpl.posTpl = juicer($('#pos-tpl').html());
			_this.initEvent();
      _this.loadPos();
		},
		initEvent : function(){
      $('#wrapper').on('touchstart', function(e){
        // //e.preventDefault();
      });

      $('#wrapper').on('tap', '.pos', function(e){
        var $this = $(this);
        var sid = $this.attr('data-sid');
        window.location.href = 'spot/detail/' + sid;
      });
		},
    loadPos : function(){
      var html = _this.tpl.posTpl.render({list: mapList});
      $('#map_panel').append(html);
    }
  }
}(moka));
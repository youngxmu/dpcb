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
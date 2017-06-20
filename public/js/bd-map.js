(function(P){
	var _this = null;
	_this = P.bdmap = {
	tpl : {},
		init : function(){
			_this.initEvent();
			_this.initData();
			_this.initMap('黄冈市东坡赤壁');
		},
		initEvent : function(){
			$('#wrapper').on('touchstart', function(e){
			// //e.preventDefault();
			});
		},
		initData : function(){
			_this.gc = new BMap.Geocoder();  //初始化，Geocoder类
		},
		getAttr : function(e){
			var allOverlay = _this.map.getOverlays();
			for (var i = 0; i < allOverlay.length; i++){
				_this.map.removeOverlay(allOverlay[i]);
			}
			var $address = $('#address');
			var lng = e.point.lng;
			var lat = e.point.lat;
			var point = new BMap.Point(lng,lat); //这里设置刚开始的点所在处
			_this.point = point;
			_this.gc.getLocation(point, function (rs) {   //getLocation函数用来解析地址信息，分别返回省市区街等
				var addComp = rs.addressComponents;
				var pois = rs.surroundingPois;
				province = addComp.province;//获取省份
				city = addComp.city;//获取城市
				district = addComp.district;//区
				street = addComp.street;//街
				console.log(rs);
				
				_this.map.addOverlay(new BMap.Marker(point));
			});
		},
		initMap : function(address){
			var city = '黄冈';
			var area = '黄州';
			_this.map = new BMap.Map("map");  // 创建Map实例
			_this.map.centerAndZoom(city,16);	  // 初始化地图,用城市名设置地图中心点
			_this.map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
			_this.map.enableContinuousZoom();	//启用地图惯性拖拽，默认禁用
			_this.map.addEventListener("click", _this.getAttr);

			setTimeout(function(){
				_this.gc.getPoint(address, function(point){
					if (point) {
						_this.map.centerAndZoom(point, 16);
						_this.map.addOverlay(new BMap.Marker(point));
					}else{
						util.dialog.toastDialog("您选择地址没有解析到准确的位置!");
						var local = new BMap.LocalSearch(_this.map, {
							renderOptions:{map: _this.map}
						});
						local.search(city + area + address);
					}
				}, city);
			},800);
		}
	}
}(moka));
/*
作者：付雷洋
时间： 2015 - 11 - 20
描述：封装函数|调用方法|调用phonegap插件
*/
window.getajax=(function(){
	var sus = 'http://xlm.nullsw.com/mobile/',//公共域名
		isclick = false,
		timer='',
		htm = '';
		
	function _back() {
			if (isclick == false) {
				isclick = true;
				setTimeout(function() {
					isclick = false;
				}, 500);
				history.back();
			}
		}
	/*ajax请求：
	 *server:请求地址
	 *params:请求参数
	 *fun1:请求成功后的回调方法
	 *fun2:请求失败后的回调方法
	 */

	function getAction(server, params, fun1, fun2) {
		$.ajax({
			type: "get",
			url: sus + server,
			dataType: 'jsonp',
			jsonp: "jsonpCallback",
			data: params,
			success: function(result) {
				if ($.isFunction(fun1)) {
					log(result);
					fun1(result);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if ($.isFunction(fun2)) {
					fun2(XMLHttpRequest);
				}
			}
		});
	}

	function postAction(server, params, fun1, fun2) {
		var _params = '';
		for (var i in params) {
			_params += i + "=" + params[i] + "&";
		}
		var options = {
			url: sus + server,
			type: 'post',
			dataType: 'json',
			data: _params,
			success: function(result) {
				if ($.isFunction(fun1)) {
					log(result);
					fun1(result);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if ($.isFunction(fun2)) {
					fun2(XMLHttpRequest);
				}
			}

		};
		$.ajax(options);
	}

	/*
	 *获取url参数信息
	 *name:参数名称
	 */
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	}

	/*输出消息*/
	function voidmsg(msg) {
		var msglst = {
			'ordermsg': '当前没有订单信息',
			'commentmsg': '当前没有评论商品',
			'addressmsg': '当前没有收货地址信息,请添加',
			'mycollectprojectmsg': '您当前没有收藏商品',
			'mycollecthomemsg': '您当前没有收藏店铺',
			'stringifymsg': '该分类下没有商品信息',
			'Scremsg': '该筛选条件下未筛选到商品信息',
			'cartmsg': '您的购物车空空如也',
			'questionrecord':'当前没有咨询的记录',
			'refundRecordmsg1': '当前没有退换货记录',
			'refundRecordmsg2': '当前没有退款记录',
			'refundmsg1': '当前没有退换货信息',
			'refundmsg2': '当前没有退款信息',
			'couponmsg': '当前没有可用的优惠券',
			'seerecode':'您当前还未浏览任何商品哦'
		};
		return msglst[msg];
	}

	/*设置储存的值*/
	function setsessionStorage(keys, value) {
		if (sessionStorage) {
			var jsom = sessionStorage['jsom'];
			var mp = {};
			if (jsom && jsom != '') {
				mp = JSON.parse(jsom);
			}
			mp[keys] = value;
			jsom = JSON.stringify(mp);
			sessionStorage['jsom'] = jsom;
		}
		return '';
	}

	/*删除储存的值*/
	function removesessionStorage(keys) {
		if (sessionStorage) {
			var jsom = sessionStorage['jsom'];
			if (jsom && jsom != '') {
				var mp = JSON.parse(jsom);
				var _mp = {};
				if (keys === undefined) {
					for (var i in mp) {
						if (i==='_key'||i==='uname') {
							_mp[i] = mp[i];
						}
					}
				} else {
					for (var i in mp) {
						if (i !== keys) {
							_mp[i] = mp[i];
						}
					}
				}

				_mp = JSON.stringify(_mp);
				sessionStorage['jsom'] = _mp;
			}
			return '';
		}
	}

	/*获取储存的值*/
	function getsessionStorage(keys) {
		if (sessionStorage && sessionStorage['jsom'] != undefined) {
			var jsom = sessionStorage['jsom'];
			if (jsom && jsom != '') {
				var mp = JSON.parse(jsom);
				if (mp[keys] && mp[keys] != '') {
					return mp[keys];
				} else {
					return "";
				}
			}
		} else {
			return "";
		}
	}
		/*设置储存的值*/

	function setlocalStorage(keys, value) {
			if (localStorage) {
				var jsom = localStorage['jsom'];
				var mp = {};
				if (jsom && jsom != '') {
					mp = JSON.parse(jsom);
				}
				mp[keys] = value;
				jsom = JSON.stringify(mp);
				localStorage['jsom'] = jsom;
			} else {
				/*不支持sessionStorage*/
			}
		}
		/*删除储存的值*/

	function removelocalStorage(keys) {
		if (localStorage && localStorage['jsom'] != undefined) {
			var jsom = localStorage['jsom'];
			if (jsom && jsom != '') {
				var a = {};
				var mp = JSON.parse(jsom);
				for (var i in mp) {
					if (i != keys) {
						a[i] = mp[i];
					}
				}
				//mp[keys] = '';
				jsom = JSON.stringify(a);
				localStorage['jsom'] = jsom;
			}
		}
	}

	/*获取储存的值*/

	function getlocalStorage(keys) {
		if (keys === 'uname') {
			var _uname = localStorage['uname'];
			if (_uname != undefined && _uname != '' && _uname != null) {
				return _uname;
			} else {
				return '';
			}
		} else if (keys === 'token') {
			var _token = localStorage['token'];
			if (_token != undefined && _token != '' && _token != null) {
				return _token;
			} else {
				return '';
			}
		} else if (keys === 'expire') {
			var _expiree = localStorage['expire'];
			if (_expiree != undefined && _expiree != '' && _expiree != null) {
				return _expiree;
			} else {
				return '';
			}
		} else {
			if (localStorage && localStorage['jsom'] != undefined) {
				var jsom = localStorage['jsom'];
				if (jsom && jsom != '') {
					var mp = JSON.parse(jsom);
					if (mp[keys] && mp[keys] != '') {
						return mp[keys];
					} else {
						return "";
					}
				}
			} else {
				return "";
			}
		}
	}
	function _click(ids, fun) {
		$(ids).click(function() {
			if (!isclick) {
				isclick = true;
				setTimeout(function() {
					isclick = false;
				}, 700);
				fun(this);
			}
		});
	}

	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady() {
		 navigator.splashscreen.hide();
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;
		document.addEventListener("backbutton", onBackKeyDown, false);
	}

	//手机自带后退
	function onBackKeyDown() {
		var hf = window.location.href.split("/");
		var a = hf[hf.length - 1];
		a = a.split(".")[0];
		switch (a.toLowerCase()) {
			case "shopindex":
			case "stringifyindex":
			case "mycart":
			case "userindex":
				_exitApp();
				break;
			case "shopdetails":
				_back();
				break;
			case "creadaddress":
				removesessionStorage('addressobj');
				removesessionStorage('cityobj');
				removesessionStorage('_addressobj');
				break;
			default:
				_back();
				break;
		}
	}

	//判断当前是安卓还是ios设备
	function andOrios() {
		var browser = {
			versions: function() {
				var u = navigator.userAgent,
					app = navigator.appVersion;
				return { //移动终端浏览器版本信息   
					trident: u.indexOf('Trident') > -1, //IE内核  
					presto: u.indexOf('Presto') > -1, //opera内核  
					webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
					gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
					mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端  
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
					android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
					iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器  
					iPad: u.indexOf('iPad') > -1, //是否iPad  
					webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
				};
			}(),
			language: (navigator.browserLanguage || navigator.language).toLowerCase()
		}
			//判断：
		var and = browser.versions.android; //android
		var ios = browser.versions.ios; //ios
		return and ? true : false;
	}
		//退出程序

	function _exitApp() {
		MyAlert('是否退出程序?', function(btn) {
			if (btn == 2) {
				navigator.app.exitApp(); //退出app程序
			}
		});
	}


	function showmsg(msg) {
			console.log(msg);
			var c = $(".showmsg").attr("class");
			if (c == 'showmsg') {
				$(".showmsg").fadeIn(100);
				$(".showmsg>span").text(msg);
			} else {
				htm = '<div class="showmsg"><span>' + msg + '</span></div>';
				$("body").append(htm);
				$(".showmsg").fadeIn(100);
			}
			setTimeout(function() {
				$(".showmsg").fadeOut(100);
			}, 1500);
		}
	
	//检测网络情况
	function checkConnection() {
			var networkState = navigator.network.connection.type;
			var states = {};
			states[Connection.UNKNOWN] = 'Unknown connection';
			states[Connection.ETHERNET] = 'Ethernet connection';
			states[Connection.WIFI] = 'WiFi connection';
			states[Connection.CELL_2G] = 'Cell 2G connection';
			states[Connection.CELL_3G] = 'Cell 3G connection';
			states[Connection.CELL_4G] = 'Cell 4G connection';
			states[Connection.NONE] = 'No network connection';
			if (networkState === Connection.NONE) {
				return 1;
			} else {
				return networkState;
			}

		}
	
	function loadshow(idx) {
		if ($(".aload").attr("class") == undefined) {
			aload(idx);
		} else {
			_showload(idx);
		}
	}

	function loadhide() {
		clearTimeout(timer);
		$(".aload").css("display", "none");
	}

	function _showload(idx) {
		$(".aload").css("display", "block");
		if (idx === undefined) {
			timer = setTimeout(function() {
				$(".aload>div").addClass("errormsg");
				$(".aload>div>span").attr("class", "aloads1").text("加载异常");
				setTimeout(function() {
					loadhide();
					$(".aload>div").removeClass("errormsg");
					$(".aload>div>span").attr("class", "aloads").text("");
				}, 1500);
			}, 7000);
		}

	}

	function aload(idx) {
		htm = '<div class="aload">';
		htm += '<div><span class="aloads"></span></div>';
		htm += '</div>';
		$("body").append(htm);
		_showload(idx);
	}
	
	/*11(13)位整形字符串转时间
	 * time:字符串
	 * sp:时间的拼接字符
	 * istrue:是否需要时/分/秒
	 */
	function getTime(time, sp, istrue) {
		if (time.length != 13) {
			time = time + "000";
		}
		var a = parseInt(time);
		var b = new Date(a);
		var year = b.getFullYear();
		var mouth = b.getMonth() + 1;
		if (mouth < 10) {
			mouth = "0" + mouth;
		}
		var day = b.getDate();

		if (day < 10) {
			day = "0" + day;
		}
		var h = b.getHours();
		var m = b.getMinutes();
		var s = b.getSeconds();
		var c = year + sp + mouth + sp + day;
		if (istrue) {
			c = c + " " + h + ":" + m + ":" + s;
			return c;
		} else {
			return c;
		}
	}
	
	//时间格式2014-02-02 14:10:00 改成时间戳
	function js_strto_time(str_time){
		str_time = str_time.substring(0,19);
		str_time = str_time.replace(/-/g,'/'); 
		var timestamp = new Date(str_time).getTime();
		return timestamp;
	}
	
	function getdaySum(time) {
		var oldyear = 1900;
		if (time.length != 13) {
			time = time + "000";
		}
		var a = parseInt(time);
		time = new Date(a);
		var newyear = time.getFullYear();
		var oldmonth = 1;
		var newmonth = time.getMonth() + 1;
		var day = time.getDate(); //天数
		for (oldyear; oldyear < newyear; oldyear++) {
			if (oldyear % 4 == 0 && oldyear % 100 != 0 || oldyear % 400 == 0) {
				day += 366;
			} else {
				day += 365;
			}
		}
		for (oldmonth; oldmonth < newmonth; oldmonth++) {
			switch (oldmonth) {
				case 1:
				case 3:
				case 5:
				case 7:
				case 8:
				case 10:
				case 12:
					day += 31;
					break;
				case 4:
				case 6:
				case 9:
				case 11:
					day += 30;
					break;
				case 2:
					if (newyear % 4 == 0 && newyear % 100 != 0 || newyear % 400 == 0) {
						day += 29;
					} else {
						day += 28;
					}
					break;
			}
		}
		//alert('1900年距离现在有:'+day+'天!');
		return day;
	}
	function MyAlert(msg, fun) {
		log(msg);
		try {
			navigator.notification.confirm(
				msg, //要显示的信息
				fun, //警告被忽略的回调函数
				'请选择', //标题
				'取消,确定' //按钮名称
			);
		} catch (e) {
			//TODO handle the exception
		}
	}

	function Alert(msg) {
		//点击确定返回2,点击取消返回1
		log(msg);
		try {
			navigator.notification.alert(msg, null, '提示', '确定');
		} catch (e) {
			//TODO handle the exception
		}
	}
	//判断是否加载图片
	function loadImg(){
		var _heigth=$(window).height();
		var imgs=$('img');
		$(imgs).each(function(k,v){
			var _top=$(v).offset().top;
			//console.log(_top);
			if(_top>0&&_top<_height){
				LoadingImg(v);
			}
		});
	}
	
	//加载图片
	function LoadingImg(obj){
		var imgUrl=$(obj).attr('_src');
		//console.log(imgUrl);
		var img=new Image();
		img.src=imgUrl;
		img.onload=function(event){
			$(obj).attr('src',img.src);
			if(event.complete){
				$(obj).attr('src',img.src);
			}
		}
	}
	function log(msg) {
		console.log('msg', msg);
	}
	function start(){
		
	};
	return {
		
	};
})();
window.getajax.start();

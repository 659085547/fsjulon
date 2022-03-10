function windowLoadingPage(){// 页面加载执行
	var winw = $(window).width();
	var winh = $(window).height();
		
	ajax_zml();// ajax加载

	/*PC端打开效果*/
	if(winw>=1024){
		new WOW().init({});
	}

	/*头部*/
	var headerHeight = $('#header').outerHeight();
	$('#header-block').height(headerHeight);
	$('#nav-phone').css({'top':headerHeight});
	if(winw<=1024){
		$('#header .other .other-icon .form').css({'top':headerHeight});
	}else{
		$('#header .other .other-icon .form').css({'top':'0'});
		$('#nav-phone').hide();
	}

	/*首页*/
	var indexOneHeight = $('#index .one').outerHeight();
	$('#index-one').height(indexOneHeight);
	$('#index .two .fp-tableCell').css({'padding-top':headerHeight});
	$('#index .thr .fp-tableCell').css({'padding-top':headerHeight});
	$('#index .four .fp-tableCell').css({'padding-top':headerHeight});
	
	/*内页-二级栏目*/
	var categorySlideWidth = parseInt(0);
	$('#category .swiper-slide').each(function(){
		categorySlideWidth += parseInt($(this).outerWidth(true));
	})
	
	if(categorySlideWidth>=$('#category').width()){
		$('#category .swiper-wrapper').css({'display':'flex'});
	}else{
		$('#category .swiper-wrapper').css({'display':'inline-block'});
	}
	
	/*关于我们-荣誉资质*/
	var honorTwoWidth = $('#honor .two .cw1400 .swiper-container').outerWidth();
	$('#honor .two .cw1400 .swiper-container .swiper-wrapper .swiper-slide .title').width(honorTwoWidth);
		
	/*关于我们-荣誉资质-社会责任*/
	if(winw<=1024){
		$('#honor .thr .item .list').click(function(){
			$(this).addClass('show').siblings('.list').removeClass('show');
		})
	}
	
	/*关于我们-企业文化*/
	var cultureOneContent = $('#culture .one .content').outerHeight();
	$('#culture .one .img').height(cultureOneContent);

	
	/*关于我们-加入我们*/
	var joinOneContent = $('#join .one .content').outerHeight();
	$('#join .one .img').height(joinOneContent);
	
	/*全球五星酒店供应*/
	if(winw>780){
		window.hotelSuppliesObject = '#hotel-supplies-one .pc .swiper-container';
	}else{
		window.hotelSuppliesObject = '#hotel-supplies-one .mobile .swiper-container';
	}
	hotelSupplies();

	/*门店查询-第二屏-省份城市*/
	if(winw>560){
		var storeQueryTwoTopItem = $('#store-query .two .top .item').outerHeight();
		$('#store-query .two .top .title .table-cell').height(storeQueryTwoTopItem);
	}else{
		$('#store-query .two .top .title .table-cell').css({'height':'auto'});
	}
	
	/*手机连接*/
	$('[phone]').each(function(){
		var phone = $(this).html();
		if(winw<=780){
			$(this).attr('href',('tel:'+phone));
		}else{
			$(this).removeAttr('href');
		}
	})
	
}

$(window).off('load,resize,scroll').on({
	load: function(){
		windowLoadingPage();
	},
	resize: function(){
		windowLoadingPage();
		$('[absolute-footer-height]').height($('#footer').parent().height());
	},
	scroll: function(){
		
	}
});
$('[absolute-footer-height]').height($('#footer').parent().height());

/*锚点滚动条动态*/
$(function(){
	$('a[href*=#],area[href*=#]').click(function() {
		if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//, '')&&location.hostname==this.hostname){
			var $target=$(this.hash);
			$target=$target.length && $target || $('[name=' + this.hash.slice(1) + ']');
			if($target.length){
				var targetOffset=$target.offset().top;
				$('html,body').animate({scrollTop: targetOffset},500);
				return false;
			}
		}
	});
});

$('[data-pdf]').click(function(){// 打开pdf文件
	var pdf = $(this).attr('data-pdf');
	if(pdf) window.open(pdf);
})

/*头部*/

$('#header .nav .list').hover(function(){// 二级导航-显示
	if($(this).find('.two').length){
		$(this).find('.two').stop(true,true).fadeToggle();
		$(this).find('.two .two-right').height(parseInt($(this).find('.two .two-right .slide').height())+10);
	}
})

$('#header .nav .list .two .two-left .slide').hover(function(e){// 二级导航-列表鼠标效果
	var index = $(this).index();
	$(this).addClass('on').siblings('.slide').removeClass('on');
	$('#header .nav .list .two .two-right .slide').eq(index).addClass('on').siblings('.slide').removeClass('on');
	$('#header .nav .list .two .two-right').height(parseInt($('#header .nav .list .two .two-right .slide').eq(index).height()));
})

$('#header .other .other-icon').hover(function(){// 搜索框、二维码、语言切换显示
	if($(this).find('.mouse').length){
		$(this).find('.mouse').stop(true,true).fadeToggle();
	}
	if($(this).find('.input').length){
		$(this).find('.input').focus();
	}
})

$('#header .target').click(function(){// 点击下拉手机二级导航
	$('#nav-phone').stop(true,true).slideToggle();
})

$('#header .other .other-icon .img-one').click(function(){// 点击显示搜索框
	if($(this).siblings('.form').length){
		$('#header .other .other-icon .form').stop(true,true).fadeToggle().find('.input').focus();
	}
})

$('#header .other .other-icon .form form .input').blur(function(){// 失去焦点时关闭搜索框
	$('#header .other .other-icon .form').stop(true,true).fadeToggle();
})

function headerSearch(obj,html){// 头部搜索框跳转
	var action = obj.attr('action');
	var Keyword = obj.find("input[name='Keyword']").val();// 关键词

	if(Keyword) window.location.href = action+'k-'+Keyword+'/';
	return false;
}

$('#nav-phone .slide').click(function(){// 手机版-二级导航展示
	if($(this).find('.two').length){
		if($(this).hasClass('on')) $(this).removeClass('on');
		else $(this).addClass('on');
		$(this).find('.two').stop(true,true).slideToggle();
		$(this).siblings('.slide').removeClass('on').find('.two').stop(true,true).slideUp();
	}
})

/*头部结束*/

/*底部*/

$('#footer .bot .links .list').hover(function(){
	$(this).find('.ewm').stop(true,true).fadeToggle();
})

/*底部结束*/


/*首页开始*/

var indexOnePc = new Swiper('#index-one-pc',{// 首页-第一屏-pc广告-swiper效果
    autoplay: {
    	autoplay:true,
		disableOnInteraction: false
	},
	roundLengths:true,
    direction:'vertical',
    slidesPerView: 1,
    autoHeight: true,
    observer: true,
	observeParents: true,
	speed:1500,
	pagination: {
		el: '.swiper-number',
		type: 'fraction'
	},
	navigation:{
		prevEl: '#index-one-pc .swiper-prev',
    	nextEl: '#index-one-pc .swiper-next'
	}
});

var indexOneMobile = new Swiper('#index-one-mobile',{// 首页-第一屏-手机广告-swiper效果
    autoplay: {
    	autoplay:true,
		disableOnInteraction: false
	},
	roundLengths:true,
	speed:1500
});

var indexThr = new Swiper('#index-thr',{// 首页-第三屏-新闻-swiper效果
	autoplay: {
		disableOnInteraction: false
	},
	roundLengths:true,
	//preventInteractionOnTransition : true,
    slidesPerView: 'auto',
    slidesPerGroup : 3,
	speed:3000,
	pagination: {
		el: '#index-thr .swiper-menu',
		clickable: true
	},
	breakpoints: {
		1024: {
			slidesPerGroup: 2,
			noSwiping : false
		},
		380: {
			slidesPerGroup: 1,
			noSwiping : false
		}
	}
});

var indexFourImg = new Swiper('#four-left-img',{// 首页-第四屏-图片
	autoplay: {
		disableOnInteraction: false
	},
	preventInteractionOnTransition : true,
	roundLengths:true,
    slidesPerView: 'auto',
	speed:1500,
	pagination: {
		el: '#index-four .swiper-menu',
		clickable: true
	},
	breakpoints: {
		1024: {
			noSwiping : false
		}
	},
	on: {
		slideChangeTransitionStart: function(){
			indexFourContent.slideTo(this.activeIndex,1500,false);
		}
	}
});

var indexFourContent = new Swiper('#four-right-content',{// 首页-第四屏-内容
	autoplay: {
		disableOnInteraction: false
	},
	roundLengths:true,
	preventInteractionOnTransition : true,
    slidesPerView: 'auto',
	speed:1500,
	pagination: {
		el: '#index-four .swiper-menu',
		clickable: true
	},
	breakpoints: {
		1024: {
			noSwiping : false
		}
	},
	on: {
		slideChangeTransitionStart: function(){
			indexFourImg.slideTo(this.activeIndex,1500,false);
		}
	}
});

$(function(){// 首页fullpage屏幕滚动效果
    $('#index').fullpage({
		verticalCentered:true,
		resize:true,
    	css3:true,
    	scrollingSpeed:'1000',
		afterLoad: function(anchorLink ,e){
			if(e.index==2){
				indexThr.autoplay.start();
			}else if(e.index==3){
				indexFourImg.autoplay.start();
				indexFourContent.autoplay.start();
			}else{
				indexThr.autoplay.stop();
				indexFourImg.autoplay.stop();
				indexFourContent.autoplay.stop();
			}
			var o = $('.section').eq(e.index);
			if($(window).width()<750){
				o.find('.wow').removeClass('wow');
			}else o.find('.wow').each(function(){
				// if($.mobile()) return;
				var action = $(this).attr('data-action');
				var delay = $(this).attr('data-wow-delay');
				$(this).addClass('animated '+action).css({'visibility':'visible','animation-name':action,'data-wow-delay':delay});
			});
		}
	});
	
	$(window).resize(function(){
        autoScrolling();
    });

    function autoScrolling(){
        $('.section').eq(0).find('.wow').each(function(){
			var action = $(this).attr('data-action');
			$(this).addClass('animated '+action).removeClass('wow');
		});
    }
	
	$('#index .one .pc .arrow').click(function () {
		$.fn.fullpage.moveSectionDown();
	});

    autoScrolling();
});

$('#index .thr .swiper-container .swiper-slide').hover(function(){
	indexThr.autoplay.stop();
},function(){
	indexThr.autoplay.start();
})

/*首页结束*/

/*内页开始*/

function page_submit(){// 内页-翻页
	var page = $(".page_input").val();
	var page_id = $("input[name='page_id']").val();
	var page_m = $("input[name='page_m']").val();

	var href = '/'+(page_m?(page_m+'/'):'')+(page_id?('i-'+page_id+'/'):'')+(page?('page-'+page):'')+(page?'.html':'/');
	
	var a = $("[name=ajax_page]").val();
	if($(a).size()){
		$.href(href,{},function(htm){
			lis=$.html(htm).find(a).html();
			if(lis.indexOf('>')<0){
				$.alert({str:'没有获取到数据，',btn:1});
			}else{
				$(a).html(lis);
			}
			$.ajax_change(htm);
			zml();
		},'html');
	}else if(href){
		window.location.href = href;
	}
}

/*内页-二级栏目-当前下标*/
var categorySlideIndex = '';
$('#category .swiper-slide').each(function(){
	if($(this).hasClass('on')){
		categorySlideIndex += $(this).index();
	}
})

var insideCategory = new Swiper('#category .swiper-container',{// 内页-二级栏目
	speed:1000,
	roundLengths:true, 
	slidesPerView :'auto',
	initialSlide: categorySlideIndex,
	breakpoints: {
		1024: {
			freeMode : true,
			noSwiping : false
		}
	}
});

/*内页结束*/

/*发展历史*/

var historyOne = new Swiper('#history',{// 发展历史
	roundLengths:true,
    slidesPerView: 'auto',
	speed:800,
	breakpoints: {
		1024: {
			freeMode : true,
			noSwiping : false
		}
	},
	on:{
		touchMove: function(event){
			if($('#history .swiper-wrapper .two').hasClass('swiper-slide-active')){
				$('#history .swiper-wrapper .two').eq(this.activeIndex).addClass('show')
			}
		}
	}
});

$(window).ready(function(){

	$('#history .one .background').css({'opacity':'1'});// 加载第一块背景图

	setTimeout(function(){$('#history .one .content').css({'opacity':'1'});},800);// 加载第一块文字


	setTimeout(function(){// 将第一块线条向右展开
		var lineWidth = parseInt($('#history .swiper-wrapper .one').outerWidth())+(parseInt($('#history .swiper-wrapper .two').outerWidth(true))*$('#history .swiper-wrapper .two').length);
		$('#history .one .line').css({'width':lineWidth});
	},1600);

	setTimeout(function(){
		window.translateWrapper = parseInt($('#history .swiper-wrapper .two').eq(0).outerWidth()/50);
		window.translate = $('#history .swiper-wrapper .two').eq(0).outerWidth()+window.translateWrapper;
		$('#history .swiper-wrapper').css({"transform":"translate3d(-"+window.translate+"px, 0px, 0px)"});// 将第一块向左推动

		setTimeout(function(){$('#history .swiper-wrapper .two').eq(0).addClass('show');},300);// 第二块第一个列表增加show
		setTimeout(function(){// 将两个箭头展示
			$('#history .swiper-prev').fadeIn();
			$('#history .swiper-next').fadeIn();
		},800);
	},2600);
	
})

$('#history .switch').click(function(){// 点击切换
	if(window.stopHistorySwiper=='1'){return false;}// 增设时间不给快速点击多次
	window.stopHistorySwiper = 1;
	var reg = /matrix.*\((.*)\)/g;
	var str = $('#history .swiper-wrapper').css("transform");
	var arr = reg.exec(str);
	var newarr = arr[1].split(/[, ]+/g);
	var arty = newarr[newarr.length>6?12:4];

	if($(this).hasClass('swiper-prev')){// 上一页
		var swiperWrapperSlide = Math.abs(arty)-Math.abs($('#history .swiper-wrapper .two').eq(0).outerWidth());// 切换的距离
		
		if(swiperWrapperSlide>=window.translate){
			$('#history .swiper-wrapper').css({"transform":"translate3d(-"+swiperWrapperSlide+"px, 0px, 0px)"});
		}
	}else{// 下一页
		var swiperWrapperSlide = Math.abs(arty)+Math.abs($('#history .swiper-wrapper .two').eq(0).outerWidth());// 切换的距离
		var slideTotalwidth = ($('#history .swiper-wrapper .two').eq(0).outerWidth()*($('#history .swiper-wrapper .two').length+1));

		if(swiperWrapperSlide<slideTotalwidth){
			$('#history .swiper-wrapper').css({"transform":"translate3d(-"+swiperWrapperSlide+"px, 0px, 0px)"});
			var historySlideshowLength = 0;
			$('#history .swiper-wrapper .two').each(function(){
				if($(this).hasClass('show')) historySlideshowLength += 1;
			})
			$('#history .swiper-wrapper .two').eq(historySlideshowLength).addClass('show');
		}
	}
	setTimeout(function(){window.stopHistorySwiper = 0;},1000);
})



/*发展历史结束*/

/*荣誉资质*/

var honorTwo = new Swiper('#honor-two .swiper-container',{// 荣誉资质-第二屏
	autoplay: {
		autoplay:true,
		disableOnInteraction: false
	},
	roundLengths:true,
    slideToClickedSlide: true,
	centeredSlides : true,
    slidesPerView: 'auto',
	preventInteractionOnTransition : true,
	speed:1000,
	loop : true,
	navigation:{
		prevEl: '#honor-two .swiper-prev',
    	nextEl: '#honor-two .swiper-next'
	},
	on: {
		slideChangeTransitionStart: function(){
			$('.swiper-brief').html($('#honor .two .cw1400 .swiper-container .swiper-wrapper .swiper-slide').eq(this.activeIndex).attr('data-brief'));
		}
	},
	breakpoints: {
		1024: {
			noSwiping : false
		}
	}
});

/*荣誉资质结束*/

/*加入我们*/

function joinTwo(obj,flag){// 招聘岗位
	if(obj.hasClass('on')){
		obj.removeClass('on');
		obj.siblings('.content').eq(flag).find('.it').slideUp();
	}else{
		obj.addClass('on').siblings('.slide').removeClass('on');
		obj.siblings('.content').find('.it').slideUp();
		obj.siblings('.content').eq(flag).find('.it').slideDown();
	}
}

/*加入我们结束*/

/*睡眠生命科学*/

/*睡眠生命科学结束*/

/*全球五星酒店供应*/

function hotelSupplies(){
	window.hotelSuppliesOne = new Swiper(window.hotelSuppliesObject,{// 图片滚动
		speed:1500,
		loop : true,
		roundLengths:true,
		preventInteractionOnTransition : true,
		autoplay: {
			autoplay:true,
			disableOnInteraction: false
		},
		navigation:{
			prevEl: '#hotel-supplies-one .swiper-prev',
			nextEl: '#hotel-supplies-one .swiper-next'
		},
		pagination: {
			el: '#hotel-supplies-one .swiper-page',
			type: 'fraction'
		},
		on: {
			init: function(){
				$('#swiper-animate')[0].beginElement();
				$('#hotel-supplies .swiper-svg')[0].unpauseAnimations();
			},
			slideChangeTransitionStart: function(s,title){
				$('#hotel-supplies .swiper-svg')[0].pauseAnimations();
				s=this;
				title=$(s.slides[s.activeIndex]).attr('title');
				if(title) $('[inside-title]').html(title);
			},
			slideChangeTransitionEnd: function(){
				$(this)[0].autoplay.start();
				$('#hotel-supplies .swiper-svg-father').removeClass('stop');
				$('#swiper-animate')[0].beginElement();
				$('#hotel-supplies .swiper-svg')[0].unpauseAnimations();
			}
		}
	});
	
	$('#hotel-supplies .swiper-svg-father').off('click').click(function(){// 停止swiper滚动
		if($(this).hasClass('stop')){
			$(this).removeClass('stop');
			window.hotelSuppliesOne.autoplay.start();
			$('#swiper-animate')[0].beginElement();// 将svg动画从0开始
			$('#hotel-supplies .swiper-svg')[0].unpauseAnimations();// 开始svg动画
		}else{
			$(this).addClass('stop');
			window.hotelSuppliesOne.autoplay.stop();
			$('#swiper-animate')[0].endElement();// 将svg动画结束
			$('#hotel-supplies .swiper-svg')[0].pauseAnimations();// 结束svg动画
		}
	})
	
}

/*$('#hotel-supplies .one .bot .slide').click(function(e, h, l){// 列表鼠标点击切换
	if(window.hotel_can_not_change==1) return;
	window.hotel_can_not_change=1;
	e=$('#hotel-supplies-one');
	h=e.outerHeight();
	// e.height(h);
	var AId = $(this).attr('AId');
	$(this).addClass('show').siblings('.slide').removeClass('show');
	
	var l = $.alert('loading');
	$.post("/ajax/hotel-supplies",{AId:AId},function(data){
		l.remove(function(){
			// e.html(data).find('img').eq(0).load(function(){
			// 	e.css({height:'auto'});
			// 	l=e.outerHeight();
			// 	e.css({height:h});
			// 	e.animate({height:l},300,function(){
			// 		window.hotel_can_not_change=0;
			// 	});
			// });
			
			window.hotelSuppliesOne.destroy(false);// 停止swiper
			hotelSupplies();// 重新执行
		});
	});
})*/

/*全球五星酒店供应结束*/

/*雅兰检测研究中心*/

var testResearchThrImg = new Swiper('#test-research-thr-img',{// 先进的检测设备与制造设备-图片
    autoplay: {
    	autoplay:true,
		disableOnInteraction: false,
	},
	roundLengths:true,
	speed:1500,
	preventInteractionOnTransition : true,
	navigation:{
		prevEl: '#test-research-thr .swiper-prev',
    	nextEl: '#test-research-thr .swiper-next',
	},
	breakpoints: {
		1024: {
			noSwiping : false,
		},
	},
	on: {
		slideChangeTransitionStart: function(){
			testResearchThrContent.slideTo(this.activeIndex,1500,false);
		},
	},
});

var testResearchThrContent = new Swiper('#test-research-thr-content',{// 先进的检测设备与制造设备-内容
    autoplay: {
    	autoplay:true,
		disableOnInteraction: false,
	},
	roundLengths:true,
	speed:1500,
	preventInteractionOnTransition : true,
	navigation:{
		prevEl: '#test-research-thr .swiper-prev',
    	nextEl: '#test-research-thr .swiper-next',
	},
	breakpoints: {
		1024: {
			noSwiping : false,
		},
	},
	on: {
		slideChangeTransitionStart: function(){
			testResearchThrImg.slideTo(this.activeIndex,1500,false);
		},
	},
});

$('#test-research-thr').hover(function(){
	testResearchThrContent.autoplay.stop();
	testResearchThrImg.autoplay.stop();
},function(){
	testResearchThrContent.autoplay.start();
	testResearchThrImg.autoplay.start();
})

/*雅兰检测研究中心结束*/

/*产品中心*/

var honorTwo = new Swiper('#brand-thr .swiper-container',{// 品牌详细页-品牌文化
	autoplay: {
		autoplay:true,
		disableOnInteraction: false
	},
	roundLengths:true,
    slideToClickedSlide: true,
	centeredSlides : true,
    slidesPerView: 'auto',
	preventInteractionOnTransition : true,
	speed:1000,
	loop : true,
	navigation:{
		prevEl: '#brand-thr .swiper-prev',
    	nextEl: '#brand-thr .swiper-next'
	},
	on: {
		slideChangeTransitionStart: function(){
			$('.swiper-brief').html($('#brand .thr .cw1400 .swiper-container .swiper-wrapper .swiper-slide').eq(this.activeIndex).attr('data-brief'));
		}
	},
	breakpoints: {
		1024: {
			noSwiping : false
		}
	}
});

var productsRecommendedItem = new Swiper('#products-recommended .swiper-container',{// 品牌详细页-推荐产品
	autoplay: {
    	autoplay:true,
		disableOnInteraction: false,
	},
	roundLengths:true,
	slidesPerView: 'auto',
	speed:1500,
	breakpoints: {
		1024: {
			freeMode : true,
			noSwiping : false,
		},
	},
});

var productsLeftImg = new Swiper('#left-img',{// 产品详细-图片展示
	autoplay: {
		autoplay:true,
		disableOnInteraction: false,
	},
	roundLengths:true,
	preventInteractionOnTransition : true,
	speed:1500,
	pagination: {
		el: '#left-img .swiper-menu',
		clickable: true,
	},
	breakpoints: {
		1024: {
			noSwiping : false,
		},
	},
});
$('#left-img').hover(function(){
	productsLeftImg.autoplay.stop();
},function(){
	productsLeftImg.autoplay.start();
});

var productsDetailRecommended = new Swiper('#products-detail-recommended .swiper-container',{// 产品详细-产品推荐
	autoplay: {
		autoplay:true,
		disableOnInteraction: false,
	},
	roundLengths:true,
	speed:1500,
	slidesPerView: 'auto',
	navigation:{
		prevEl: '#products-detail-recommended .swiper-prev',
		nextEl: '#products-detail-recommended .swiper-next',
	},
	breakpoints: {
		1024: {
			freeMode : true,
			noSwiping : false,
		},
	},
});

$('[data-price]').click(function(){
	$(this).addClass('cur').siblings('[data-price]').removeClass('cur');
	$('[data-price-html]').html($(this).attr('data-price'));
})

/*产品中心结束*/

/*门店查询*/

function storeQueryMore(){// 门店查询-更多门店
	if($('#store-query.list .one .content').hasClass('show')){
		$('#store-query.list .one .target').stop(true,true).fadeToggle();
		$('#store-query.list .one .content').stop(true,true).removeClass('show');
	}else{
		$('#store-query.list .one .target').stop(true,true).fadeToggle();
		$('#store-query.list .one .content').stop(true,true).addClass('show');
	}
}

function storeQueryForm(obj,html){// 门店查询-提交条件查询
	var action = obj.attr('action');
	var BrandId = obj.find("select[name='BrandId']").val();// 品牌id
	var TopCateId = $("select[name='TopCateId']").val();// 省份id
	var CateId = $("select[name='CateId']").val();// 城市id

	if(!BrandId && !TopCateId && !CateId){
		$.alert(html,{btn:1});
		return false;
	}

	var href = action;
	if(BrandId) href += 'b-'+BrandId+'/';
	if(TopCateId) href += 't-'+TopCateId+'/';
	if(CateId) href += 'i-'+CateId+'/';
	// mapIframe.location.href = href;

	return false;
}

$('[data-coordinates]').click(function(){// 门店查询-获取路线
	var p = $(this).parents('.slide'),
		x = p.attr('x-coordinates'),// X坐标
		y = p.attr('y-coordinates'),// Y坐标
		t = (p.find('.title').html()+p.find('.margin').html()).replace(/地址：/g,' ');
	
	window.open("https://map.baidu.com/search/"+t+"/@"+x+","+y+",13z?querytype=s&wd="+t+"&c=257&pn=0&device_ratio=1&da_src=shareurl");
	// window.open("http://www.google.cn/maps/dir/''/'"+x+","+y+"'/");
})

/*门店查询结束*/

function ajax_zml(){// ajax加载
	/*$.ajax_page(function(){
		ajax_zml();
	});*/
}
$(document).ready(function(){
	//hamb header menu
	$('.header__menu_btn').click(function(e){
		e.preventDefault();
		var btn = $(this),
			hamb = btn.find('.header__menu_hamb'),
			menu = btn.closest('.header__body').find('.header__menu');
		hamb.toggleClass('_close');
		menu.toggleClass('_active');
		btn.toggleClass('_active');
	});

	//Рекомендуем попробовать slider
	if($('.s_try__body').length){
		//certificate slider
		var sl_try = $('.s_try__body').lightSlider({
			item: 4,
			loop: true,
			controls: false,
			pager: false,
			speed: 250,
			slideMargin: 30,
			responsive: [
				{
					breakpoint: 1070,
					settings: {
						item: 3
					},
					breakpoint: 800,
					settings:{
						item: 2
					},
					breakpoint: 500,
					settings:{
						item: 1
					}
				}
			]
		});
		$('.s_try .g_figure_arr_prev').click(function(){
			sl_try.goToPrevSlide();
		});
		$('.s_try .g_figure_arr_next').click(function(){
			sl_try.goToNextSlide();
		});
	}

	//Некоторые отзывы наших довольных клиентов slider
	if($('.s_work__cert').length){
		var sl_cert = $('.s_work__cert').lightSlider({
			item: 5,
			loop: true,
			controls: false,
			pager: false,
			speed: 250,
			slideMargin: 30,
			onSliderLoad: function(el) {
				el.lightGallery({
					selector: '.s_work__cert_item'
				});
			},
			responsive: [
				{
					breakpoint: 1050,
					settings:{
						item: 4
					}
				}
			]
		});
		$('.s_work__cert_prev').click(function(){
			sl_cert.goToPrevSlide();
		});
		$('.s_work__cert_next').click(function(){
			sl_cert.goToNextSlide();
		});
	}

	var header_height = $('.header').outerHeight();
	$('.header').before('<div class="header__temp"></div>');
	$('.header__temp').height(header_height);
	$(window).scroll(function(){
		if($(this).scrollTop() > header_height){
			$('.header').addClass('_fixed');
		}else{
			$('.header').removeClass('_fixed');
		}
	});

	//popups
	$('._open_pop').click(function(e){
		e.preventDefault();
		$('form').each(function() {
			$(this)[0].reset();
		});
		var name = $(this).data('name'),
			text = $(this).data('text'),
			popup = $('.popup._'+name);
		setTimeout(function() {
			popup.find('input').eq(1).focus();
		}, 700);
		popup.find('h3').html(text);
		popup.find('input').eq(0).val(text);
		$('.overlay, .popup._'+name).addClass('visible');
		var px = window.pageYOffset;
		$('.popup').css('top',px+'px');
	});
	$('.s_try__txt_btn').click(function(e){
		e.preventDefault();
		$('form').each(function() {
			$(this)[0].reset();
		});
		var popup = $('.popup._to_cart'),
			wrap = $(this).prevAll('.s_try__txt_head'),
			counter = wrap.find('.s_try__count_n'),
			current_n = parseInt(counter.text()),
			price = wrap.find('b'),
			price_n = parseInt(price.text()),
			item = wrap.closest('.s_try__item'),
			item_html = item.html();
		setTimeout(function() {
			popup.find('input').eq(1).focus();
		}, 700);
		popup.find('.popup__info_n strong').text(current_n);
		popup.find('.popup__info_price strong').text(price_n + ' ₽');
		popup.find('.s_try__item').html(item_html);
		popup.find('.s_try__item').find('.g_btn').remove();
		popup.find('.s_try__item').find('.s_try__txt_head').remove();
		setTimeout(function(){
			popup.find('.s_try__item').addClass('_showed');
		},1500);
		$('.overlay, .popup._to_cart').addClass('visible');
		var px = window.pageYOffset;
		$('.popup').css('top',px+'px');
	});
	//close popups
	$('.overlay, .close_pop, ._close_pop').click(function(){
		$('.popup._to_cart').find('.s_try__item').removeClass('_showed');
		$('.popup, .overlay').removeClass('visible');
		var px = window.pageYOffset;
		setTimeout(function(){
			$('.popup').each(function(){
				if(!$(this).hasClass('visible')){
					$(this).css('top','0');
				}
			});
		},650);
	});

	//mask
	$('input[name="phone"]').mask('+7 (999) 999-99-99');

	// validate
	$("._with_thnx").each(function () {
		var it = $(this);
		it.validate({
			rules: {
				form: {required: false},
				name: {required: true},
				phone: {required: true},
				mail: {required: true}
			},
			messages: {},
			errorPlacement: function (error, element) {},
			submitHandler: function (form) {
				$.ajax({
					type: "POST",
					url: "/",
					data: it.serialize()
				}).done(function () {
					$('.popup').removeClass('visible');
					var px = window.pageYOffset;
					$('.popup').css('top',px);
					$('.popup._thnx, .overlay').addClass('visible');
					setTimeout(function () {
						if ($('.popup._thnx').hasClass('visible')) {
							$('.popup._thnx, .overlay').removeClass('visible');
						}
					}, 2800);
					$("form").trigger( 'reset' );
				});
				return false;
			},
			success: function () {},
			highlight: function (element, errorClass) {
				$(element).addClass('_error');
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).removeClass('_error');
			}
		});
	});
	// validate
	$("form").each(function () {
		var it = $(this);
		it.validate({
			rules: {
				form: {required: false},
				name: {required: true},
				phone: {required: true},
				mail: {required: true},
				city: {required: true},
				street: {required: true}
			},
			messages: {},
			errorPlacement: function (error, element) {},
			submitHandler: function (form) {

			},
			success: function () {},
			highlight: function (element, errorClass) {
				$(element).addClass('_error');
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).removeClass('_error');
			}
		});
	});

	//faq.html list toogle
	$('.s_faq__item h3').click(function(){
		var item = $(this).parent('.s_faq__item');
		item.toggleClass('_active');
	});

//	//profile.html aside tabs
//	$('.s_profile__left li').click(function(){
//		var el = $(this),
//			n = el.index(),
//			body = el.closest('.s_profile__body'),
//			tabs = body.find('.s_profile__right'),
//			img = el.find('img');
//		el.addClass('_current').siblings().removeClass('_current');
//		el.siblings().each(function(){
//			var th = $(this),
//				n = th.index()+1;
//			th.find('img').attr('src','images/ico/profile/'+n+'.png');
//		});
//		el.find('img').attr('src','images/ico/profile/'+(n+1)+'a.png');
//
//		tabs.removeClass('_current').eq(n).addClass('_current');
//	});

	//404.html menu btn
	$('.s_404__menu').click(function(){
		var hamb = $('.header__menu_hamb'),
			menu = $('.header__menu'),
			btn = $('.header__menu_btn');
		hamb.toggleClass('_close');
		menu.toggleClass('_active');
		btn.toggleClass('_active');
	});

	//g_calendar tabs
	$('.g_calendar__head a').click(function(e){
		e.preventDefault();
		var el = $(this),
			n = el.index(),
			calendar = el.closest('.g_calendar'),
			body = calendar.find('.g_calendar__body');
		el.addClass('_current').siblings().removeClass('_current');
		body.eq(n).addClass('_current').siblings().removeClass('_current');
		sl_lunch1.refresh();
		sl_lunch2.refresh();
	});
	//lunch.html g_calendar slider
	if($('.s_lunch__week1').length){
		var sl_lunch1 = $('.s_lunch__slider1').lightSlider({
			item:1,
			pager:false,
			controls: false,
			adaptiveHeight: true
		});
		$('.s_lunch__week1 .g_figure_arr_next').click(function(e){
			e.preventDefault();
			$('.s_lunch__week1').fadeOut(500);
			setTimeout(function(){
				$('.s_lunch__week2').fadeIn(450);
				sl_lunch2.refresh();
			},500);
		});
		$('.s_lunch__week1 .g_figure_arr_pager a').click(function(e){
			e.preventDefault();
			var pager = $(this),
				pager_n = pager.index();
			pager.addClass('_current').siblings().removeClass('_current');
			sl_lunch1.goToSlide(pager_n);
		});
	}
	if($('.s_lunch__week2').length){
		var sl_lunch2 = $('.s_lunch__slider2').lightSlider({
			item:1,
			pager:false,
			controls: false,
			adaptiveHeight: true
		});
		$('.s_lunch__week2 .g_figure_arr_prev').click(function(e){
			e.preventDefault();
			$('.s_lunch__week2').fadeOut(500);
			setTimeout(function(){
				$('.s_lunch__week1').fadeIn(450);
				sl_lunch1.refresh();
			},500);
		});
		$('.s_lunch__week2 .g_figure_arr_pager a').click(function(e){
			e.preventDefault();
			var pager = $(this),
				pager_n = pager.index();
			pager.addClass('_current').siblings().removeClass('_current');
			sl_lunch2.goToSlide(pager_n);
		});
	}
	//lunch-menu.html g_calendar slider
	if($('.s_menu__lunch_slider').length){
		var sl_menu_lunch = $('.s_menu__lunch_slider').lightSlider({
			item:1,
			pager: false,
			controls: false,
			adaptiveHeight: true,
			speed: 850
		});
		$('.g_figure_arr_pager a').click(function(e){
			e.preventDefault();
			var pager = $(this),
				pager_n = pager.index();
			if(pager_n>5){
				pager_n--;
			}
			pager.addClass('_current')
				.siblings().removeClass('_current');
			sl_menu_lunch.goToSlide(pager_n);
		});
	}

	//menu.html count click
	$('.s_try__txt_head .s_try__count_decr').click(function(){
		var wrap = $(this).closest('.s_try__txt_head'),
			counter = wrap.find('.s_try__count_n'),
			current_n = parseInt(counter.text()),
			price = wrap.find('b'),
			price_n = parseInt(price.text()),
			per_one_price = price_n/current_n;
		if(current_n == 2){
			$(this).addClass('_disabled');
			counter.text(current_n-1);
			price.text((current_n-1) * per_one_price);
		}else if(current_n == 1){
			return;
		}else{
			counter.text(current_n-1);
			price.text((current_n-1) * per_one_price);
		}
	});
	$('.s_try__txt_head .s_try__count_incr').click(function(){
		var wrap = $(this).closest('.s_try__txt_head'),
			counter = wrap.find('.s_try__count_n'),
			minus = wrap.find('.s_try__count_decr'),
			current_n = parseInt(counter.text()),
			price = wrap.find('b'),
			price_n = parseInt(price.text()),
			per_one_price = price_n/current_n;
		counter.text(current_n+1);
		price.text((current_n+1) * per_one_price);
		minus.removeClass('_disabled');
	});
	//g_calendar bot count click
	$('.g_calendar__bot .g_count__decr').click(function(){
		var wrap = $(this).closest('.g_calendar__bot'),
			counter = wrap.find('.g_count__n'),
			current_n = parseInt(counter.text()),
			price = wrap.find('.g_calendar__bot_price strong'),
			price_n = parseInt(price.text()),
			per_one_price = price_n/current_n;
		if(current_n == 2){
			$(this).addClass('_disabled');
			counter.text(current_n-1);
			price.text((current_n-1) * per_one_price);
		}else if(current_n == 1){
			return;
		}else{
			counter.text(current_n-1);
			price.text((current_n-1) * per_one_price);
		}
	});
	$('.g_calendar__bot .g_count__incr').click(function(){
		var wrap = $(this).closest('.g_calendar__bot'),
			counter = wrap.find('.g_count__n'),
			minus = wrap.find('.g_count__decr'),
			current_n = parseInt(counter.text()),
			price = wrap.find('.g_calendar__bot_price strong'),
			price_n = parseInt(price.text()),
			per_one_price = price_n/current_n;
		counter.text(current_n+1);
		price.text((current_n+1) * per_one_price);
		minus.removeClass('_disabled');
	});
	//g_calendar delete profile.html
	$('.g_calendar__del').click(function(e){
		e.preventDefault();
		var el = $(this),
			wrap = el.closest('.g_calendar__items'),
			rows_length = wrap.find('.g_calendar__item').length,
			row = el.closest('.g_calendar__item'),
			hr = row.next('hr');
		if(rows_length>1){
			row.remove();
			hr.remove();
			if(rows_length==2){
				wrap.find('hr').remove();
			}
		}
	});
	if($('._scroll').length){
		//custom scroll
		$('._scroll').perfectScrollbar();
		$(window).resize(function(){
			$('._scroll').perfectScrollbar('update');
		});
	}
});

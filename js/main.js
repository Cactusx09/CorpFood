$(document).ready(function(){
	//hamb header menu
	$('.header__menu_btn').click(function(){
		var btn = $(this),
			hamb = btn.find('.header__menu_hamb'),
			menu = btn.closest('.header__body').find('.header__menu');
		hamb.toggleClass('_close');
		menu.toggleClass('_active');
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
			slideMargin: 30
		});
		$('.s_try__head_prev').click(function(){
			sl_try.goToPrevSlide();
		});
		$('.s_try__head_next').click(function(){
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
			}
		});
		$('.s_work__cert_prev').click(function(){
			sl_cert.goToPrevSlide();
		});
		$('.s_work__cert_next').click(function(){
			sl_cert.goToNextSlide();
		});
	}

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
	//close popups
	$('.overlay, .close_pop').click(function(){
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
	$("form").each(function () {
		var it = $(this);
		it.validate({
			rules: {
				form: {required: false},
				name: {required: true},
				phone: {required: true}
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
});

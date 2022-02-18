$(document).ready(function() {
    $("#typed").typed({
        strings: [
            "добиться большего успеха в Интернете.", "разработать веб-сайт.", "c SEO продвижением.", "настроить рекламу."
        ],
        typeSpeed: 50,
        backDelay: 1500,
        startDelay: 1500,
        loop: true,
        loopCount: 999,
        contentType: 'html'
    });

    var typeSite = '';
    var typePackage = '';
    $('.modal-open').on('click', function() {
        $('.prices .close').trigger('click');
        if ($(this).parents().hasClass('72')) {
            typeSite = 'Landing Page';
        } else if ($(this).parents().hasClass('99')) {
            typeSite = 'Интернет-магазин';
        } else if ($(this).parents().hasClass('102')) {
            typeSite = 'Корпаративный сайт';
        } else if ($(this).parents().hasClass('240')) {
            typeSite = 'МНОГОСТРАНИЧНЫЙ САЙТ';
        } else if ($(this).parents().hasClass('243')) {
            typeSite = 'САЙТ ВИЗИТКА';
        } else if ($(this).parents().hasClass('235')) {
            typeSite = 'Веб-приложение';
        }
        if ($(this).hasClass('min')) {
            typePackage = 'пакет мини';
        } else if ($(this).hasClass('standart')) {
            typePackage = 'пакет стандарт';
        } else if ($(this).hasClass('max')) {
            typePackage = 'пакет максимум';
        }
        $('.modal').addClass('active');
        setTimeout(function() {
            $('.modal').addClass('bg');
        }, 250)
    });
    $('.modal .close').on('click', function() {
        $('.modal').removeClass('bg');
        setTimeout(function() {
            $('.modal').removeClass('active');
        }, 250)
        setTimeout(function() {
            $('.succses').removeClass('active');
            $('.modal form').removeClass('succses-open');
        }, 500);
    });
    $('.prices-open').on('click', function() {
        if ($(this).hasClass('lp')) {
            $('.prices.lp').addClass('active');
            setTimeout(function() {
                $('.prices.lp').addClass('bg');
            }, 250)
        } else
        if ($(this).hasClass('ec')) {
            $('.prices.ec').addClass('active');
            setTimeout(function() {
                $('.prices.ec').addClass('bg');
            }, 250)
        } else
        if ($(this).hasClass('ks')) {
            $('.prices.ks').addClass('active');
            setTimeout(function() {
                $('.prices.ks').addClass('bg');
            }, 250)
        }
    });
    $('.prices .close').on('click', function() {
        $('.prices').removeClass('bg');
        setTimeout(function() {
            $('.prices').removeClass('active');
        }, 250)
    });
    $('form').on('submit', function(e) {
        var errorCheck = 0;
        e.preventDefault();
        if ($(this).find('#name').val() == "") {
            $(this).find('#name').addClass('error');
            errorCheck++;
        }
        if ($(this).find('#phone').val() == "") {
            $(this).find('#phone').addClass('error');
            errorCheck++;
        }
        if (errorCheck > 0) {
            $(this).find('label').addClass('active');
            setTimeout(function() {
                $(this).find('label').removeClass('active');
                $(this).find('#phone').removeClass('error');
                $(this).find('#name').removeClass('error');
            }, 4000)
        } else {
            var text = typeSite + ' - ' + typePackage;
            $.ajax({
                url: '/telegram.php',
                type: "POST",
                data: {
                    phone: $(this).find('#phone').val(),
                    name: $(this).find('#name').val(),
                    time: $(this).find('#time').val(),
                    pricing: text,
                },
                success: function(data) {
                    $('.modal').addClass('active');
                    $('.modal').addClass('bg');
                    $('.succses').addClass('active');
                    $('.modal form').addClass('succses-open');
                }
            })
        }
        typeSite = '';
        typePackage = '';
    });
    $('input[name="phone"]').mask("+375 (99) 999-99-99");
    $('.menu').on('click', function() {
        $(this).toggleClass('active');
        $('.nav').toggleClass('active');
    });

    $('.swiper-slide img').on('click', function() {
        $(this).parents('.portfolio__item').addClass('active');
    });

    $('.swiper-slide .portfolio__name').on('click', function() {
        $(this).parents('.portfolio__item').removeClass('active');
    });
    var objLeave;
    $('.prices__switch').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).hasClass('m')) {
            objLeave = $('.prices__variant.active');
            $('.prices__variant.active').addClass('leave').removeClass('active');
            $('.prices__variant.m').addClass('active');
        } else
        if ($(this).hasClass('s')) {
            objLeave = $('.prices__variant.active');
            $('.prices__variant.active').addClass('leave').removeClass('active');
            $('.prices__variant.s').addClass('active').siblings().removeClass('active');
        } else
        if ($(this).hasClass('mx')) {
            objLeave = $('.prices__variant.active');
            $('.prices__variant.active').addClass('leave').removeClass('active');
            $('.prices__variant.mx').addClass('active').siblings().removeClass('active');
        }
        $('.prices ').css('height', parseInt($('.prices__variant.active').css('height')) + 300)
        setTimeout(function() {
            objLeave.removeClass('leave');
        }, 500)
    });

    $('.preview img').on('click', function() {
        $('.img-modal img').attr('src', $(this).attr('src'));
        $('.img-modal').addClass('active');
    })

    $('.img-modal .close').on('click', function() {
        $('.img-modal').removeClass('active');
    })

    var portfolio = new Swiper('.portfolio__slider', {
        spaceBetween: 30,
        slidesPerView: 4,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 40
            },
            650: {
                slidesPerView: 4,
                spaceBetween: 40
            }
        },
        autoplay: {
            delay: 2000,
        },
    });
});
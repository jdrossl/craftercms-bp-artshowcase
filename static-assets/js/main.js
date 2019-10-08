"use strict";


jQuery(document).ready(function ($) {

    jQuery(window).load(function () {
        jQuery(".loaded").fadeOut();
        jQuery(".preloader").delay(1000).fadeOut("slow");
    });
    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
    jQuery('.navbar-collapse').find('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 40)
                }, 1000);
                if ($('.navbar-toggle').css('display') != 'none') {
                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
                }
                return false;
            }
        }
    });



    /*---------------------------------------------*
     * STICKY scroll
     ---------------------------------------------*/

//    jQuery(".main-nav").localScroll();

    $('.body').scrollSpy();

//    $('.button-collapse').sideNav({
//        menuWidth: 250, // Default is 240
//        edge: 'right', // Choose the horizontal origin
//        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
//    }
//    );

    jQuery(".dropdown-button").dropdown({
        inDuration: 300,
        outDuration: 255,
        constrain_width: false,
        hover: true,
        gutter: 0,
        belowOrigin: false,
        alignment: 'right'
    });

    /*---------------------------------------------*
     * STICKY scroll
     ---------------------------------------------*/

    $('').localScroll();

    /*---------------------------------------------*
     * WOW
     ---------------------------------------------*/

    var wow = new WOW({
        mobile: false // trigger animations on mobile devices (default is true)
    });
    wow.init();

    /* ---------------------------------------------------------------------
     Carousel
     ---------------------------------------------------------------------= */

    $('.carousel').owlCarousel({
        responsiveClass: true,
        autoplay: false,
        items: 1,
        loop: true,
        dots: false,
        nav: false,
        navText: [
            "<i class='lnr lnr-chevron-left'></i>",
            "<i class='lnr lnr-chevron-right'></i>"
        ],
        autoplayHoverPause: true

    });


// scroll Up

    jQuery(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
    });
    jQuery('.scrollup').click(function () {
        $("html, body").animate({scrollTop: 0}, 1000);
        return false;
    });


    /*---------------------------------------------*
     * Menu Section
     ---------------------------------------------*/
     
    // Add contactus to menu
    $('#main-nav ul').append('<li><a href="#contactus">'+$('#contactus :header').first().text()+'</a></li>')

    $('.cd-menu-trigger').on('click', function (event) {
        event.preventDefault();
        $('.home-main-content').addClass('move-out');
        $('#main-nav').addClass('is-visible');
        $('.cd-shadow-layer').addClass('is-visible');
    });
    //close menu
    $('.cd-close-menu').on('click', function (event) {
        event.preventDefault();
        $('.home-main-content').removeClass('move-out');
        $('#main-nav').removeClass('is-visible');
        $('.cd-shadow-layer').removeClass('is-visible');
    });

    //clipped image - blur effect
    set_clip_property();
    $(window).on('resize', function () {
        set_clip_property();
    });

    function set_clip_property() {
        var $header_height = $('.cd-header').height(),
                $window_height = $(window).height(),
                $header_top = $window_height - $header_height,
                $window_width = $(window).width();
        $('.cd-blurred-bg').css('clip', 'rect(' + $header_top + 'px, ' + $window_width + 'px, ' + $window_height + 'px, 0px)');
    }
    $('#main-nav a[href^="#"]').on('click', function (event) {
        event.preventDefault();
        var target = $(this.hash);
        $('.home-main-content').removeClass('move-out');
        $('#main-nav').removeClass('is-visible');
        $('.cd-shadow-layer').removeClass('is-visible');
        $('body,html').animate(
                {'scrollTop': target.offset().top},
                900
                );
    });

    $('.main_home ul a[href^="#"]').on('click', function (event) {
        event.preventDefault();
        var target = $(this.hash);
        $('body,html').animate(
                {'scrollTop': target.offset().top},
                900
                );
    });
    
    
// scrolldown icon
$('.scrolldown a').bind('click', function () {
    $('html , body').stop().animate({
        scrollTop: $($(this).attr('href')).offset().top - 160
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
});





    //End
});




jQuery(document).on("scroll", function () {
    if ($(document).scrollTop() > 120) {
        $("header").addClass("small");
    } else {
        $("header").removeClass("small");
    }
});

jQuery(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a')) {
        $(this).collapse('hide');
    }
});

/**
 * Contact Form
 */
$(document).ready(function(){
    $( "form" ).each(function() {
        var form = this;

        // Suppress the default bubbles
        form.addEventListener( "invalid", function( event ) {
            event.preventDefault();
        }, true );

        // Support Safari, iOS Safari, and the Android browser—each of which do not prevent
        // form submissions by default
        $( form ).on( "submit", function( event ) {
            if ( !this.checkValidity() ) {
                event.preventDefault();
            }
        });

        $( "input, select, textarea", form )
            // Destroy the tooltip on blur if the field contains valid data
            .on( "blur", function() {
                var field = $( this );
                if ( field.data( "kendoTooltip" ) ) {
                    if ( this.validity.valid ) {
                        field.kendoTooltip( "destroy" );
                    } else {
                        field.kendoTooltip( "hide" );
                    }
                }
            })
            // Show the tooltip on focus
            .on( "focus", function() {
                var field = $( this );
                if ( field.data( "kendoTooltip" ) ) {
                    field.kendoTooltip( "show" );
                }
            });

        $( "button:not([type=button]), input[type=submit]", form ).on( "click", function( event ) {
            // Destroy any tooltips from previous runs
            $( "input, select, textarea", form ).each( function() {
                var field = $( this );
                if ( field.data( "kendoTooltip" ) ) {
                    field.kendoTooltip( "destroy" );
                }
            });

            // Add a tooltip to each invalid field
            var invalidFields = $( ":invalid", form ).each(function() {
                var field = $( this ).kendoTooltip({
                    content: function() {
                        return field[ 0 ].validationMessage;
                    },
                    width: 200
                });
            });

            // If there are errors, give focus to the first invalid field
            invalidFields.first().trigger( "focus" ).eq( 0 ).focus();
        });
    });

    $("#contactSubmit").click(function(e){
        e.preventDefault();
        var thisButton = $(this);

        if(!thisButton.hasClass("loading") && !thisButton.hasClass("done")){
            var frm = $("#contactFormId");
            if (!frm[0].checkValidity()) {
                // If the form is invalid, submit it. The form won't actually submit;
                // this will just cause the browser to display the native HTML5 error messages.
                frm.find('input[type=submit]').click()
            } else {
                thisButton.addClass('loading');

                var data = frm.serializeArray();
                data = data.reduce(function (m, e) { m[e.name] = e.value; return m; }, {});
                $.ajax({
                    type: "POST",
                    "url": "/api/1/services/mail.json",
                    "data": data,
                }).done(function () {
                    $('#contactFormId')[0].reset();
                    thisButton.removeClass('loading hidden').addClass('done');
                }).fail(function (error) {
                    thisButton.removeClass('loading hidden').addClass('error');
                    console.error(error);
                }).always(function(){
                    setTimeout(function(){
                        thisButton.removeClass('done error');
                    }, 2000);
                });
            }
        }
    });
});

/**
 * Gallery
 */
$(document).ready(function() {
    var wall = new Freewall(".gallery");
    var resizeFunction = wall.fitWidth.bind(wall);
    window.galleryOnResizeFunction = resizeFunction;
    wall.reset({
        selector: '.brick',
        animate: true,
        cellW: 20,
        cellH: 20,
        fixSize: null,
        onResize: function() {
            resizeFunction();
        }
    });

    var images = wall.container;
    images.find('img').load(function() {
        resizeFunction();
    });
    resizeFunction();
    $(window).trigger("resize");

    $('.gallery .image_preload_list').each(function(){ // For each image list in a gallery
        $(this).find('img').each(function(){
            var imageObj = new Image();
            imageObj.src = $(this)[0].src
            imageObj.onload = function(){
                addImageToGallery(wall, $(imageObj)
                    .wrap('<a href="'+imageObj.src+'" class="gallery-img"></a>')
                    .parent()
                );
            }
        });
    });
});

/**
 * 
 * @param {*} imgAnchor Receives the jQuery wrapped anchor element surrounding an image
 */
function addImageToGallery(containerWall, imgAnchor) {
    var brick = imgAnchor.wrap('<div class="brick"></div>').parent();
    containerWall.appendBlock(brick);
    containerWall.refresh();
    jQuery(imgAnchor).magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
    });
}

/**
 * Scroll Indicator
 */
// $('section').scrollIndicatorBullets({
//     titleSelector: 'h1,h2,h3'
// });

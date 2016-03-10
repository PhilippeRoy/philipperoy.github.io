'use strict';

// App
var portfolioWebsiteApp = angular.module('portfolioWebsiteApp', ['duScroll'])
.config(function($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
  .hashPrefix('!');
})
.run(function($rootScope) {
  if(!window.history || !history.replaceState) {
    return;
  }
  $rootScope.$on('duScrollspy:becameActive', function($event, $element, $target){
    //Automaticly update location
    var hash = $element.prop('hash');
    if (hash) {
      history.replaceState(null, null, hash);
    }
  });
});

/* Controllers */
portfolioWebsiteApp.controller('FeatureSliderCtrl', ['$scope', function($scope) {

  $scope.initPortfolioSlider = function() {

    if ($('.portfolio .featured-slider').length > 0){
      //Slick Slider
      $('.portfolio .featured-slider').slick({
        autoplay: true,
        dots: true,
        appendArrows: $('.portfolio .featured-slider-nav')
      });
      if ($(document.body).hasClass('portfolio')){
        $('.portfolio .featured-slider').slick('slickRemove', false );
      }
      $('.portfolio .featured-slider-nav .slick-prev').after($('.portfolio .slick-dots'));
    }
  }

  $scope.initProjectsSlider = function() {

    if ($('.projects .featured-slider').length > 0){
      //Slick Slider
      $('.projects .featured-slider').slick({
        autoplay: true,
        dots: true,
        appendArrows: $('#projects .featured-slider-nav')
      });
      $('.projects .featured-slider-nav .slick-prev').after($('.projects .slick-dots'));
    }
  }

}]);


portfolioWebsiteApp.controller('PortfolioCtrl', ['$scope', '$http', function($scope, $http) {

  $http.get('data/sites.json').success(function(data) {
    $scope.sites = data;
  });

}]);

portfolioWebsiteApp.controller('ProjectCtrl', ['$scope', '$http', function($scope, $http) {

  $http.get('data/sites.json').success(function(data) {
    $scope.sites = data;
  });

}]);


// Global controller
portfolioWebsiteApp.controller('TheBody', function($scope, $document) {

  $scope.pageReady = function() {

    // Add class to hide content when Angular is loading partials
    document.body.className = document.body.className + ' '+ 'showtime';

    // Once content is loaded scroll to hash value
    if(location.hash.length){
      var someElement = angular.element(document.querySelector(location.hash));
      $(window).on('load', function(){
        $document.scrollToElement(someElement, document.querySelector('.navbar').clientHeight, 1000);
      })
    }

    // init controller for scroll Magic
    var controller = new ScrollMagic.Controller();

    $(function(){

      // Intro section animation
      if(document.querySelectorAll('.home').length){

        var tl = new TimelineLite();
        var b1 = document.querySelector('#intro-menu li:nth-of-type(1) button'),
            b2 = document.querySelector('#intro-menu li:nth-of-type(2) button'),
            b3 = document.querySelector('#intro-menu li:nth-of-type(3) button'),
            da = document.querySelector('body button.down-arrow');

            tl.delay(1);
            if(screen.width >= 768){
              tl.staggerFrom([b2,b1,b3], 0.75, {y:20, opacity: 0}, 0.5);
              tl.from(da, 0.5, {width: 0})
            } else {
              tl.from(da, 0.5, {width: 0})
            }

          // Down Arrow animation
          new ScrollMagic.Scene({triggerElement: "#myself", triggerHook: 1, duration: '100%', offset: '2px'  })
              // .addIndicators({name: 'intro Arrow'})
              .addTo(controller) // assign the scene to the controller
              .on("progress", function (event) {
                if(event.state === 'DURING' && event.scrollDirection === 'FORWARD'){document.querySelector('.down-arrow').className = 'down-arrow forward';}
                else if(event.state === 'DURING' && event.scrollDirection === 'REVERSE'){document.querySelector('.down-arrow').className = 'down-arrow reverse';}
              })
              .on("enter leave", function (e) { document.querySelector('.down-arrow').className = 'down-arrow'; })


          // Navbar animations
          var navheight = function(){return document.querySelector('.navbar').clientHeight / window.innerHeight; };

          $(window).on('resize', function(){
            sceneNavbar.triggerHook(navheight());
          })

          var sceneNavbar = new ScrollMagic.Scene({triggerElement: "#myself", triggerHook: navheight(), offset: -50 })
              // .addIndicators({name: 'Scene Navbar'})
              .on("enter leave", function (e) {
    						if(e.type == "enter"){
                  $('.navbar, .navbar-toggle').addClass('visible');
                  TweenMax.to('.navbar', 1, {opacity: 1})
                  TweenMax.to('.navbar-toggle .icon-bar', 0.5, {backgroundColor: '#000000'})
                } else {
                  $('.navbar-collapse, .navbar').removeClass('open');
                  $('.navbar, .navbar-toggle').removeClass('visible');
                  TweenMax.to('.navbar', 1, {opacity: 0})
                  TweenMax.to('.navbar-toggle .icon-bar', 0.5, {backgroundColor: '#FFFFFF'})
                }
    					})
              .addTo(controller); // assign the scene to the controller


          // Skills Section animation
          var circleHeight = document.querySelector('.circle').offsetHeight

          if(screen.width >= 768){
            new ScrollMagic.Scene({triggerElement: "#profile", triggerHook: 0.8 })
                // .addIndicators({name: 'Scene Skills'})
                .setTween(TweenMax.staggerTo('.circle', 1,  {top: 0 }, 0.3))
                .addTo(controller); // assign the scene to the controller
          } else {
            $('.circle').each(function(){
              // console.log($(this).context);
              new ScrollMagic.Scene({triggerElement: $(this).context, triggerHook: 0.8 })
                  // .addIndicators({name: 'Scene circle'})
                  .setTween(TweenMax.to($(this), 1,  {top: 0 }, 0.3))
                  .addTo(controller); // assign the scene to the controller
            })
          }

        }


        var l = $('.navbar-nav > li').length - 1;
        $('.navbar-nav > li').each(function(i){$(this).css('z-index', l - i)})

        var isHome = $(document.body).hasClass('home');

        $('.navbar-toggle').on('click', function(){
          if(!$(this).hasClass('open')){
            $('.navbar-toggle, .navbar-collapse, .navbar').addClass('open');
            if(isHome){
              TweenMax.to('.navbar', 1, {opacity: 1})
              TweenMax.to('.navbar-toggle .icon-bar', 0.5, {backgroundColor: '#000000'})
            }
            var sum = $('.navbar-header').height(), prevSum = 0;
            TweenMax.staggerTo(".navbar-nav > li", 0.5, {
              ease: Expo.easeOut,
              visibility: 'visible',
              cycle:{
                y:function(i) {
                  prevSum = sum;
                  sum = sum + this.offsetHeight;
                  return prevSum  }
              }
            }, 0.05);
          } else {
            $(this).removeClass('open');
            $('.navbar-toggle, .navbar-collapse, .navbar').removeClass('open');
            if(isHome){
              if ($('.navbar').hasClass('visible')){
                TweenMax.to('.navbar', 1, {opacity: 1})
                TweenMax.to('.navbar-toggle .icon-bar', 0.5, {backgroundColor: '#000000'})
              } else {
                TweenMax.to('.navbar', 1, {opacity: 0})
                TweenMax.to('.navbar-toggle .icon-bar', 0.5, {backgroundColor: '#FFFFFF'})
              }
            }
            TweenMax.staggerTo(".navbar-nav > li", 0.25, {
             ease: Expo.easeOut,
             cycle:{
               y:function(i) {
                return 0
               }
             }
           }, -0.05)
          }

      })
    })


    // Global Functions
    $(function(){
      $('.thisYear').html(new Date().getFullYear());

      var asciiArt = '';
      asciiArt += '          _____                    _____          \n';
      asciiArt += '         /\\    \\                  /\\    \\         \n';
      asciiArt += '        /::\\    \\                /::\\    \\        \n';
      asciiArt += '       /::::\\    \\              /::::\\    \\       \n';
      asciiArt += '      /::::::\\    \\            /::::::\\    \\      \n';
      asciiArt += '     /:::/\\:::\\    \\          /:::/\\:::\\    \\     \n';
      asciiArt += '    /:::/__\\:::\\    \\        /:::/__\\:::\\    \\    \n';
      asciiArt += '   /::::\\   \\:::\\    \\      /::::\\   \\:::\\    \\   \n';
      asciiArt += '  /::::::\\   \\:::\\    \\    /::::::\\   \\:::\\    \\  \n';
      asciiArt += ' /:::/\\:::\\   \\:::\\____\\  /:::/\\:::\\   \\:::\\____\\ \n';
      asciiArt += '/:::/  \\:::\\   \\:::|    |/:::/  \\:::\\   \\:::|    |\n';
      asciiArt += '\\::/    \\:::\\  /:::|____|\\::/   |::::\\  /:::|____|\n';
      asciiArt += ' \\/_____/\\:::\\/:::/    /  \\/____|:::::\\/:::/    / \n';
      asciiArt += '          \\::::::/    /         |:::::::::/    /  \n';
      asciiArt += '           \\::::/    /          |::|\\::::/    /   \n';
      asciiArt += '            \\::/____/           |::| \\::/____/    \n';
      asciiArt += '             ~~                 |::|  ~|          \n';
      asciiArt += '                                |::|   |          \n';
      asciiArt += '                                \\::|   |          \n';
      asciiArt += '                                 \\:|   |          \n';
      asciiArt += '                                  \\|___|          \n';
      asciiArt += '                                                  \n';

      console.log(asciiArt);

      console.log('Philippe Roy');
      console.log('Web Developer');
      console.log('e: philippe.j.roy@gmail.com');
      console.log('l: au.linkedin.com/in/philippejroy');
      console.log('g: github.com/PhilippeRoy');

    })


  }
});

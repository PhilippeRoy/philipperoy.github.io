'use strict';

/* Controllers */



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

portfolioWebsiteApp.controller('FeatureSliderCtrl', ['$scope', function($scope) {

$scope.initPortfolioSlider = function() {

  if ($('.portfolio .featured-slider').length > 0){
    //Slick Slider
    $('.portfolio .featured-slider').slick({
      autoplay: true,
      dots: true,
      appendArrows: $('.portfolio .featured-slider-nav')
    });
    $('.portfolio .featured-slider-nav .slick-prev').after($('#portfolio .slick-dots'));
  }
}

$scope.initProjectsSlider = function() {

  if ($('#projects .featured-slider').length > 0){
    //Slick Slider
    $('#projects .featured-slider').slick({
      autoplay: true,
      dots: true,
      appendArrows: $('#projects .featured-slider-nav')
    });
    $('#projects .featured-slider-nav .slick-prev').after($('#projects .slick-dots'));
  }

}

}]);


portfolioWebsiteApp.controller('PortfolioCtrl', ['$scope', '$http', function($scope, $http) {

  $http.get('data/sites.json').success(function(data) {
    $scope.sites = data;
  });

}]);

portfolioWebsiteApp.controller('TheBody', function($scope, $document) {

  $scope.pageReady = function() {

    if(location.hash.length){
      var someElement = angular.element(document.querySelector(location.hash));
      $document.scrollToElement(someElement, document.querySelector('.navbar').clientHeight, 1000);
    }

    // init controller
    var controller = new ScrollMagic.Controller();

    if(document.querySelectorAll('#intro').length){
      var prevProgress = null;

      new ScrollMagic.Scene({triggerElement: "#myself", triggerHook: 1, duration: '100%', offset: '2px'  })
          .addIndicators({name: 'intro Arrow'})
          .addTo(controller) // assign the scene to the controller
          .on("progress", function (event) {
            if(event.state === 'DURING' && event.scrollDirection === 'FORWARD'){document.querySelector('.down-arrow').className = 'down-arrow forward';}
            else if(event.state === 'DURING' && event.scrollDirection === 'REVERSE'){document.querySelector('.down-arrow').className = 'down-arrow reverse';}
          }).on("enter leave", function (e) {
            document.querySelector('.down-arrow').className = 'down-arrow';
					})

    }

    if(document.querySelectorAll('#myself').length){

      var navheight = function(){return document.querySelector('.navbar').clientHeight / window.innerHeight; };

      $(window).on('resize', function(){
        sceneNavbar.triggerHook(navheight());
      })

      // create a scene
      var sceneNavbar = new ScrollMagic.Scene({triggerElement: "#myself", triggerHook: navheight(), offset: -50 })
          // .addIndicators({name: 'Scene Navbar'})
          .setTween(TweenMax.fromTo('.navbar', 1,  {opacity: 0 }, {opacity: 1}))
          .addTo(controller); // assign the scene to the controller

      var circleHeight = document.querySelector('.circle').offsetHeight

      new ScrollMagic.Scene({triggerElement: "#profile", triggerHook: 0.8 })
          // .addIndicators({name: 'Scene Skills'})
          .setTween(TweenMax.staggerTo('.circle', 1,  {top: 0 }, 0.3))
          .addTo(controller); // assign the scene to the controller
    }


    // Add this year
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

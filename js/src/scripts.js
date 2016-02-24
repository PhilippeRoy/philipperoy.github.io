$(document).ready(function() {


  // Smooth Scroll by Chris Coyier
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 50
        }, 1000);
        return false;
      }
    }
  });


  var targetPoint = $("#myself").offset().top;
  var profileModuleArray = [$( "#circle-ninja" ),$('#circle-graduate'), $('#circle-business')];

  window.onscroll = function (event) {
    var top = window.pageYOffset || document.documentElement.scrollTop;

    if (top >= targetPoint) {
        document.getElementById('primary-nav').style.display = 'block';
        document.getElementById('primary-nav').style.opacity = 1;

        if (profileModuleArray.length) {
            profileModuleArray.forEach(function (el) {
                if (isElementInViewport(el)) {
                el.animate({
                  opacity: 1,
                  top: "0px"
                  }, 1000, function() {
                  profileModuleArray.unset(el);
                });
              }
            });
        };

      } else if (top <= 0 ) {
        document.getElementById('primary-nav').style.display = 'none';
      } else {
         document.getElementById('primary-nav').style.display = 'block';
         document.getElementById('primary-nav').style.opacity = Math.easeInCubic(top, 0, 1, targetPoint-50);
      }

  }


  PR_();

$('#otherTricksSwitch').on('click', function () {
  $( "#otherTricks" ).slideToggle( "slow", function() {
    // Animation complete.
  });
});


});

/* ==========================================================================
 * Ultities
   ========================================================================== */
Math.easeInCubic = function (t, b, c, d) {
	t /= d;
	return c*t*t*t + b;
};


Array.prototype.unset = function(value) {
    if(this.indexOf(value) != -1) { // Make sure the value exists
        this.splice(this.indexOf(value), 1);
    }
}

/* ==========================================================================
 * functions
   ========================================================================== */
function isElementInViewport (el) {

   //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= ((window.innerHeight || document.documentElement.clientHeight)+200) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

/* ==========================================================================
 * Globals
   ========================================================================== */

var PR_ = function () {

  var interval = 0;
  var ulArr = document.getElementById('intro-menu').getElementsByTagName('li');

  var timer = setInterval(function(cnt){
    ulArr[interval].classList.add('fadeIn');
    interval++;
    if(interval >= ulArr.length){
      clearInterval(timer);
    }
  }, 500);

  timer;

  var timer2 = setTimeout(function(){
    var el = document.getElementsByClassName("down-arrow");
    el[0].classList.add('slideDown');
  },2000);

  timer2;

}

//console.log('Loaded Zblog Main.js');

var zproto = zproto || {};

(function() {
  'use strict';

  //Zblog nav scripts
  zproto.nav = (function () {
    var container = $('.zcontent')
      , navSrc = $('.nav-ham')
      , hamburger = $('.ztoggle')
      , navImage = navSrc.find('img').attr('src')
      , closeImage = 'img/nav-close.png'
      , navTab = $('.nav-choice')
      ;

      hamburger.on('click', function(){
        if(container.hasClass('view')) {
          navSrc.find('img').attr('src', navImage);
          container.removeClass('view');
        } else {
          navSrc.find('img').attr('src', closeImage);
          container.addClass('view');
        }
      });

      $('.nav-categories li a').on('click', function(e) {
        $(this).next('ul').toggleClass('visible');
      });

      // $(document).on('click', '.visible', function(e) {
      //   e.stopPropagation();
      //   $(this).removeClass('visible');
      // });

    return {
      init: function() {
        console.log(navImage);
      }
    };

  }());

  zproto.heightFinder = (function(){

    return {
      init: function(){

      }
    };
  }());

  //Init Function
  zproto.init = function() {
    zproto.nav.init();
  };

}());

var updateHiddenProducts =  function() {
  var showHiddenProducts = $('.imHiding');
  if (showHiddenProducts.length) {
    $('.show-all').find('span.hidden-number').html(showHiddenProducts.length);
  }
};

$(document).ready(function() {
  'use strict';
  zproto.init();


  $('.stickit').on('click', function() {
    var elem = $(this).parent().clone();

    elem.find('.stickit').html('Unstick').css('width','100%').addClass('removeMe');
    elem.find('.hideit').remove();

    console.log('Setting Height to ', $('.heightFinder').data('columnHeight'))
    elem.css('height', $('.heightFinder').data('columnHeight'));



    var myKids = $('.sticky-container').children().length;

    if (myKids > 0) {
      $('.sticky-container').css('width', (myKids + 1)*162);
    }

    $('.sticky-container').append(elem);

    // var theElem = $(this).parent();

    // theElem.css('height', $('.heightFinder').data('columnHeight'));
    // theElem.animate({
    //       left:0
    //     });
  });



  $('.hideit').on('click', function() {

    if (!$('.show-all').is(":visible")) {
      $('.show-all').css('display','block');
      $('.show-all').animate({
        'height':'40',
        'opacity':1,
        padding: 10
      });
    }

    var elem = $(this).parent();

    elem.attr('oldHeight',elem.css('height'));
    elem.animate({
      'width':1,
      'opacity':0,
      'height':1
    }, function(){
      $(this).hide();
    });

    elem.addClass('imHiding');

    updateHiddenProducts();
  });

  $(document).on('click', '.removeMe', function(){
    $(this).parent().remove();
    var theWidth = parseInt($('.sticky-container').css('width'), 10);

    if (theWidth != 0) {
      $('.sticky-container').css('width', theWidth - 161 );
    }

    console.log($('.sticky-container').css('width'));
  });

  $(document).on('click', '.showallproducts', function() {
    console.log($('.imHiding').length);

    $('.imHiding').each(function(i,elem){

      var thisElem = $(elem),
          oldHeight = thisElem.attr('oldHeight');
      
      thisElem.removeClass('imHiding');
      thisElem.css('display','block');
      thisElem.animate({
        opacity:1,
        width:161,
        height: oldHeight
      });
    });

    $('.show-all').animate({
      height:1,
      opacity:0,
      padding: 0
    }, function(){
      $(this).hide();
    });

  });

});


var homeCarousel = $('.carousel');

$('#home-carousel').on('swipeleft', function() {
  homeCarousel.carousel('next');
});

$('#home-carousel').on('swiperight', function() {
  homeCarousel.carousel('prev');
});

$(document).on('click', '.goToLevel2', function() {
  $('.znav-content').toggleClass('view');
});

$(document).on('click', '.goToLevel3', function() {
  $('.znav-content2').toggleClass('view');
});

$(document).on('click', '.login-block', function() {
  $('.zsearch').removeClass('view');
  $('.zlogin').toggleClass('view');
});

$(document).on('click', '.search', function() {
  $('.zlogin').removeClass('view');
  $('.zsearch').toggleClass('view');
});

(function() {
  var target2 = $(".swipe2")[0]; // <== Getting raw element

  $(".swipe1").scroll(function() {
    
    // target.scrollTop = this.scrollTop;
    target2.scrollLeft = this.scrollLeft;
  });
})();


(function() {
  var target1 = $(".swipe1")[0]; // <== Getting raw element

  $(".swipe2").scroll(function() {
    
    // target.scrollTop = this.scrollTop;
    target1.scrollLeft = this.scrollLeft;
  });
})();


$.fn.widthMaker = function() {
  var cellWidth = parseInt(this.children().eq(1).css('width'), 10),
      cellNum = this.children().length;

  this.css('width',  cellWidth*cellNum);

  return this;

}


//HeightFinder Jquery Plugin
$.fn.heightFinder = function() {

  var directSiblings = this.children();
  console.log('directSiblings: ', directSiblings);

  var allHeight = directSiblings.map(function(){
    return $(this).height();
  }).get();

  var height = Math.max.apply(null, allHeight);

  this.data({"columnHeight": height});
  this.attr('columnHeight', height);

  return this;
}

$('.heightFinder').heightFinder();
$('.heightFinder').widthMaker();

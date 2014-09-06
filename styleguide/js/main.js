$(document).ready(function(){

  var helpers = {
    htmlEncode: function(value){
      return $('<div/>').text(value).html();
    },

    htmlDecode: function(value){
      return $('<div/>').html(value).text();
    }
  };


  var page = {
    init: function() {
      this.buttons = $('#main-nav a');

      this.activateNav();
      this.disableDemoButtons();
      this.generateCodeSamples();
    },

    generateCodeSamples: function() {
      var self = this;

      $('.showcase').each(function(index, element) {
        var $showcase = $(element);
        var buttonsHTML = helpers.htmlEncode($showcase.find('.showcase-examples:first').html().trim());

        $showcase.append('<pre class="prettyprint linenums">' + buttonsHTML + '</pre>');
      });

      prettyPrint();
    },

    activateNav: function() {
      var that = this;

      this.buttons.click(function(e) {
        e.preventDefault();
        var currentButton = $(e.currentTarget);
        var buttonId = currentButton.attr('href');

        //DESELECT ALL BUTTONS & SELECT CURRRENT ONE
        that.buttons.parent().removeClass('selected');
        currentButton.parent().addClass('selected');

        //ANIMATE SCROLL EFFECT
        $("html, body").animate({
            scrollTop: $(buttonId).offset().top - 100
        }, 'slow');
      });
    },


    disableDemoButtons: function() {
      $('[href^=#]').on('click', function(e) {
        e.preventDefault();
      });
    }
  };

  //INITIALIZE PAGE
  page.init();
});
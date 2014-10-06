$(document).ready(function(){

  var page = {
    init: function() {
      this.buttons = $('#main-nav a');

      this.activateNav();
      this.disableDemoButtons();
      this.generateCodeSamples();
    },

    generateCodeSamples: function() {
      var self = this;

      $('.showcase .l-over').each(function(index, element) {
        var $showcase = $(element);
        var $codeBox = $('<pre class="prettyprint is-preview linenums"></pre>');
        var $overlay = $('<div class="prettyprint-overlay"></div>');
        var exampleHTML = self._encodeHTML($showcase.find('.showcase-examples:first').html());

        //Trim newlines
        exampleHTML = exampleHTML.replace(/^\s*[\r\n]/gm, "");

        //Add click event for overlay
        $overlay.on('click', function(e) {
          $overlay.hide();
          $codeBox.removeClass('is-preview');
        });

        //Update prettyprint container content
        $codeBox.html(exampleHTML);
        $codeBox.append($overlay);
        $showcase.append($codeBox);
      });

      // Intialize Pretty Print
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
    },

    _encodeHTML: function(str) {
      return String(str).replace(/(<br>)/gim, '').replace(/\t+/gim, '').replace(/(href="#" )*/gim, '').replace(/&/g, '&amp;').replace(/(<)+/g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
  };

  //INITIALIZE PAGE
  page.init();
});
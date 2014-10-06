$(document).ready(function(){

  var page = {
    init: function() {
      this.buttons = $('#main-nav a');

      this.activateNav();
      this.disableDemoButtons();
      this.generateCodeSamples();
      this.attachScrollMonitor();
    },

    showFooter: function() {
      var footer = $('.l-footer');
      footer.removeClass('is-hidden').addClass('is-visible');
    },

    hideFooter: function() {
      var footer = $('.l-footer');
      footer.removeClass('is-visible').addClass('is-hidden');
    },

    attachScrollMonitor: function() {
      var self = this;

      //Create a watcher on the header. If not in viewport show footer
      var watcher = scrollMonitor.create($('.monitor-scrolling'));
      if (!watcher.isInViewport) {
        self.showFooter();
      }

      //Don't want a footer when header is visible…period
      watcher.enterViewport(function() {
        self.hideFooter();
      });

      //Listen for scroll since we don't want to show the footer until
      //user stops scrolling for alloted duration
      $(window).scroll(function() {

        //The idea here is any time a scroll event happens, timeout gets
        //cleared–happens until alloted time elapsed since last scroll
        clearTimeout($.data(this, "scrollCheck"));
        $.data(this, "scrollCheck", setTimeout(function() {

          //User's stopped scrolling for and header's scrolled out of view
          if (!watcher.isInViewport) {
            self.showFooter();
          }
        }, 300));
      });
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
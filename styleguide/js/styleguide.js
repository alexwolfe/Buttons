$(document).ready(function(){

  var page = {
    templates: {
      codebox: Handlebars.compile($("#template-codebox").html())
    },

    init: function() {
      this.activateNav();
      this.disableDemoButtons();
      this.generateCodeSamples();
      this.attachScrollMonitor();
      this.activateSmoothScrolling();
    },

    showFooter: function() {
      var footer = $('.l-slide-in-footer');
      footer.removeClass('is-hidden').addClass('is-visible');
    },

    hideFooter: function() {
      var footer = $('.l-slide-in-footer');
      footer.removeClass('is-visible').addClass('is-hidden');
    },

    attachScrollMonitor: function() {
      var self = this;
      var footer = $('.l-slide-in-footer');

      //Create a watcher on the header. If not in viewport show footer
      var watcher = scrollMonitor.create($('.hero'));
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

      $('.showcase-content').each(function(index, element) {
        var $showcase = $(element);
        var title = $showcase.find('.showcase-title:first').text();
        var id = title.toLowerCase().replace(/\s*(\&amp;)*/gi, '');
        var code = $showcase.find('.showcase-examples:first').html();


        $showcase.append(self.templates.codebox({
          title: title,
          id: id,
          code: self._encodeHTML(code)
        }));

        self.activateCopyButton($showcase, code);
      });

      // Intialize Pretty Print
      prettyPrint();
    },


    activateCopyButton: function($showcase, code) {
      var button = $showcase.find('.codebox-copy:first');
      var client = new ZeroClipboard( button );

      //ENSURE FLASH IS INSTALLED
      client.on( "ready", function( readyEvent ) {
        button.addClass('is-visible');

        //TEXT COPIED
        client.on( "copy", function(event) {
          event.clipboardData.setData('text/plain', code);

          button.text('Copied!').addClass('is-selected');

          setTimeout(function() {
            button.html('<i class="fa fa-cut"></i> Copy').removeClass('is-selected');
          }, 1000);
        });
      });
    },


    activateNav: function() {
      var that = this;
      var nav = $('#top-nav');
      var buttonList = nav.find('ul:first');
      var $showcases = $('.showcase');
      var sections = [];

      $showcases.each(function(index, item){
        if(item.id) {
          var name = item.id.replace('buttons-', '');
          buttonList.append('<li><a href="#' + item.id + '">' + name + '</a></li>');
        }
      });

      nav.show();
    },


    activateSmoothScrolling: function() {
      $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 40
            }, 1000);
            return false;
          }
        }
      });
    },

    disableDemoButtons: function() {
      $('.showcase .button').on('click', function(e) {
        e.preventDefault();
      });
    },

    _encodeHTML: function(str) {
      return String(str).replace(/<br>/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
  };

  //INITIALIZE PAGE
  page.init();
});
Buttons
=======

Buttons is a fully customizable CSS button library that's built using Sass & Compass, and created by [Alex Wolfe](https://twitter.com/alexwolfe) and [Rob Levin](https://twitter.com/roblevintennis).

Quickly get started by [visiting the Buttons Builder Website](http://alexwolfe.github.io/Buttons/) where you can view live examples and fully customize your Buttons download.

[![Example of Buttons](https://dl.dropboxusercontent.com/u/1517246/builder.png "Example of Buttons")](http://alexwolfe.github.io/Buttons/)

Setup & Installation
====================

1. Visit the [Buttons Builder Website](http://alexwolfe.github.io/Buttons/), download and add files to your website.
2. Include css in the head of your webpage. *You only need the font-awesome css if you're using icons*
    `<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">`
    `<link rel="stylesheet" href="css/buttons.css">`
3. Include jQuery and buttons.js if you're using dropdown menu buttons.
    `<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>`
    `<script type="text/javascript" src="js/buttons.js"></script>`
4. Create buttons in your html. [View code examples here](http://alexwolfe.github.io/Buttons/).


or Install with Bower
====================
You can also install Buttons using [Bower](http://bower.io/) if you're using that for your package management.

`Bower install Buttons`

Using as a Partial
==================
You can easily import Buttons as a partial into an existing project.

```css
@import 'partials/buttons';
```

The buttons partial will, in turn, import compass plus any additional partials included in the Buttons library that you'll need.

Customize Buttons
====================

1. Clone the Buttons repo
2. Make sure you have Sass and Compass installed
3. Edit the `partials/_options.scss` with your own custom values (see example values below)
4. Run the *compass watch* command from the root directory of the Buttons directory from the command line
5. The buttons.css file should now be updated


General Options
---------------

In order to edit your Button options, simply change option values within the *partials/_options.scss* file to your liking. After you make your edits run *compass watch* in the root of the button directory and the updates should take place.
You can open up index.html in a browser to view your changes.

* **$unicorn-btn-namespace:**  Desired CSS namespace for your buttons (default .button)
* **$unicorn-btn-glow_namespace:** Desired CSS namespace for your glow effect (default .glow)
* **$unicorn-btn-glow_color:** Default glow color (#2c9adb, light blue)
* **$unicorn-btn-bgcolor:** Default button background color (#EEE, light gray)
* **$unicorn-btn-height:** Default height, also used to calculate padding on the sides (32px)
* **$unicorn-btn-font-color:** Default font color (#666, gray)
* **$unicorn-btn-font-size:** Default font size (14px)
* **$unicorn-btn-font-weight:** Default font weight (300)
* **$unicorn-btn-font-family:**  Default font family ("HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif)


Advanced Options
----------------

The only option you should adjust here is the button actions. When you need to add/remove/edit another button
color simply add/remove/edit one of the items in the list. There is no limit to the number of items in your list (hint: you can create additional items if you wish). Each item will create a new button.

* **$unicorn-btn-actions:** Edit this to add new buttons ('name' background-color font-color) example: ('highlight' #F18D05 #FFF) ('caution' #E54028 #FFF)
* **$unicorn-btn-types:** Correspond to the styles avaialble ('rounded' 'pill' 'circle')
* **$unicorn-btn-sizes:** Correspond to the sizes avaialble ('large' 'small' 'tiny')
* **$unicorn-btn-circle-size:** Radius for circle buttons, circles only have one size (120px)

* **$unicorn-btn-dropdown-background:** Backround color of dropdown menu
* **$unicorn-btn-dropdown-link-color:** Link color in dropdown menu
* **$unicorn-btn-dropdown-link-hover:** Hover color for link in dropdown menu
* **$unicorn-btn-dropdown-link-hover-background:** Background hover color for link in dropdown menu


Browser Support
====================
Buttons works in All modern browsers (Firefox, Chrome, Safari, IE) and gracefully degrades all the way down to Internet Explorer 8.


Authors
===================
Created by Alex Wolfe [@alexwolfe](https://twitter.com/alexwolfe) and Rob Levin [@roblevintennis ](https://twitter.com/roblevintennis)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/alexwolfe/buttons/trend.png)](https://bitdeli.com/free "Bitdeli Badge")


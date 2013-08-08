Buttons
=======

Buttons is A fully customizable CSS button library built using Sass & Compass, created by [Alex Wolfe](https://twitter.com/alexwolfe)

You can start by [viewing live examples on the Buttons Website](http://alexwolfe.github.io/Buttons/).

![Example of Buttons](https://dl.dropboxusercontent.com/u/1517246/buttons.png)


There is also a [Ruby Gem Friendly Version](https://github.com/rajahafify/buttons-rails)

Setup & Installation
====================

1. [Download Buttons](https://github.com/alexwolfe/Buttons/raw/gh-pages/Buttons.zip) and add files to your website.
2. Include css in the head of your webpage. *You only need the font-awesome css if you're using icons*
    `<link rel="stylesheet" href="css/font-awesome.min.css">`
    `<link rel="stylesheet" href="css/buttons.css">`
3. Include jQuery and buttons.js if you're using dropdown menu buttons.
    `<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>`
    `<script type="text/javascript" src="js/buttons.js"></script>`
4. Create buttons in your html. [View code examples here](http://alexwolfe.github.io/Buttons/).

Using as a Partial
==================
You can easily import Buttons as a partial into an existing project.

```css
@import 'partials/options';
@import 'partials/buttons';
```

Customize Buttons
====================

1. Clone the Buttons repo
2. Make sure you have Sass and Compass installed.
3. Edit the `partials/_options.scss` with your own custom values (see values below)
4. Run the *compass watch* command root of the Buttons directory from the command line.
5. The buttons.css file should now be updated


General Options
---------------

In order to edit your options simple option the *partials/_options.scss* file. After you make your
edits run *compass watch* in the root of the button directory and the updates should take place.
You can use index.html to view your changes.

* **$namespace:**  Desired CSS namespace for your buttons (default .button)
* **$glow_namespace:** Desired CSS namespace for your glow effect (default .glow)
* **$glow_color:** Default glow color (#2c9adb, light blue)
* **$bgcolor:** Default button background color (#EEE, light gray)
* *** *$height:** Default height, also used to calculate padding on the sides (32px)
* **$font-color:** Default font color (#666, gray)
* **$font-size:** Default font size (14px)
* **$font-weight:** Default font weight (300)
* **$font-family:**  Default font family ("HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif)


Advanced Options
----------------

The only option you should adjust here is the button actions. When you need to add/remove/edit another button
color simple add/remove/edit on of the items in the list. There is not limit to the number of items in your list. Each
item will create a new button.

* **$button_actions:** Edit this to add new buttons ('name' background-color font-color) example: ('highlight' #F18D05 #FFF) ('caution' #E54028 #FFF)
* **$button_styles:** Correspond to the styles avaialble ('rounded' 'pill' 'circle')
* **$button_sizes:** Correspond to the sizes avaialble ('large' 'small' 'tiny')
* **$circle-size:** Radius for circle buttons, circles only have one size (120px)

* **$dropdown-background:** Backround color of dropdown menu
* **$dropdown-link-color:** Link color in dropdown menu
* **$dropdown-link-hover:** Hover color for link in dropdown menu
* **$dropdown-link-hover-background:** Background hover color for link in dropdown menu


Browser Support
====================
Buttons works in All modern browsers (Firefox, Chrome, Safari, IE) and gracefully degrades all the way down to Internet Explorer 8.


Author
===================
Created with by Alex Wolfe [@alexwolfe](https://twitter.com/alexwolfe) at [@adroll](https://twitter.com/adroll)


Contributors
===================
Rob Levin [@roblevintennis ](https://twitter.com/roblevintennis)

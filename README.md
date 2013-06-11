Buttons
=======

A CSS fully customizable button library built using Sass and Compass

Your view code examples on the [Button Website](http://alexwolfe.github.io/Buttons/)


[Ruby Gem Friendly Version](https://github.com/rajahafify/buttons-rails)

General Options
===============

In order to edit your options simple option the *_options.scss* file. After you make your
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
===============

The only option you should adjust here is the button actions. When you need to add/remove/edit another button
color simple add/remove/edit on of the items in the list. There is not limit to the number of items in your list. Each
item will create a new button.

* **$button_actions:** Edit this to add new buttons ('name' background-color font-color) example: ('highlight' #F18D05 #FFF) ('caution' #E54028 #FFF)
* **$button_styles:** Correspond to the styles avaialble ('rounded' 'pill' 'circle')
* **$button_sizes:** Correspond to the sizes avaialble ('large' 'small' 'tiny')
* **$circle-size:** Radius for circle buttons, circles only have one size (120px)

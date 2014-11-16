# Buttons 2.0

[![Sauce Test Status](https://saucelabs.com/browser-matrix/unicornuirocks.svg)](https://saucelabs.com/u/unicornuirocks)

[![Build Status](https://travis-ci.org/alexwolfe/Buttons.svg?branch=buttons-2)](https://travis-ci.org/alexwolfe/Buttons)

#Buttons 2.0

Buttons is a highly customizable production ready mobile web and desktop css button library. Buttons is a free  open source project created using Sass.

Authors [Alex Wolfe](https://twitter.com/alexwolfe) and [Rob Levin](https://twitter.com/roblevintennis).

## Showcase Demo

View the  [showcase demo](http://unicorn-ui.com/buttons/) to see the buttons in action. The showcase provides full list of examples along with code snippets to speed up development.

[![Buttons 2.0 Showcase](https://www.dropbox.com/s/y9cbmxmih6uwrmm/buttons-showcase.png?dl=1 "Buttons 2.0 Showcase")](http://unicorn-ui.com/buttons/)



## Setup & Installation

1. Download the latest [buttons.css](http://unicorn-ui.com/buttons/showcase/css/buttons.css)
2. Include buttons in your website:

```html
  <!-- Buttons core css -->
  <link rel="stylesheet" href="css/buttons.css">

  <!-- Only needed if you want support for dropdown menus -->
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script type="text/javascript" src="js/buttons.js"></script>

  <!-- Only needed if you want font icons -->
  <link href="//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.css" rel="stylesheet">
```


## Bower Installation
1. If you're using [Bower](http://bower.io/) you can run  `bower install buttons`

## Transitioning From Buttons 1.0 to Buttons 2.0
We've made some major improvements to the Buttons library. In order to integrate buttons into your current project you'll need to make the following changes:

1. Compass has been replaced with [autoprefixer](https://github.com/postcss/autoprefixer). Compass is not recommended but it is still supported.
2. Button colors are now complete independent (ex. button-primary) we no longer have classes like <code>button-flat-primary</code> to achieve this you now simply add <code>button-flat button-primary</code>
3. Buttons styles are now independent (ex. button-flat, button-3d, etc.). You can apply these styles and they will automatically pick up the color attached to the button (ex. button-primary button-3d)

## Customize Buttons (Recommended uses Sass & Autoprefixer)
0. Clone the Buttons repository.
0. Make sure you have [node.js](http://nodejs.org/) installed.
0. From the command line cd into the root for the Buttons directory
0. Run ```npm install``` or ```sudo npm install``` (depending on your system permissions).
0. On the command line run ```grunt dev```, this will open a browser with Buttons
0. Locate **scss** in the root directory
0. You can modify the _options.scss where you can customize colors, typography, and …
0. Anytime you save your changes the Buttons showcase page will live reload with your changes!

## Customize Buttons with only Sass or Compass
0. Clone the Buttons repo
0. Make sure you have Sass installed
0. Run `npm install` from your terminal
0. Edit the `_options.scss` with your own custom values (see example values below)
0. Buttons now works with–or without–Compass. So choose one of the following examples accordingly and run from the command line in Buttons's root directory:
  For Sass run: `$ sass --watch --scss scss/buttons.scss:css/buttons.css`
  For Compass run: `$ compass watch`
0. The `css/buttons.css` file should now be updated

## Button Options

To edit Buttons simply change values within the `_options.scss` file. After you make your edits recompile your sass file and your changes will get processed.

* **$ubtn:** This prefix stands for Unicorn Button and prevents namespace collisions that could occur if you import buttons as part of your Sass build process. We kindly ask you not to use the prefix $ubtn in your project in order to avoid possilbe name conflicts. Thanks!
* **$ubtn-namespace:**  Desired CSS namespace for your buttons (default .button)
* **$ubtn-glow-namespace:** Desired CSS namespace for your glow effect (default .glow)
* **$ubtn-colors:** List of colors in format like `(name, background, color)`.
* **$ubtn-glow-color:** Default glow color (#2c9adb, light blue)
* **$ubtn-shapes:** List of shapes in format like `(square 0px)`. You can use Sass maps if you're using 3.3. See `_options.scss` for details.
* **$ubtn-sizes:** List of sizes in format like `(jumbo 1.5)`. You can use Sass maps if you're using 3.3. See `_options.scss` for details.
* **$ubtn-bgcolor:** Default button background color (#EEE, light gray)
* **$ubtn-height:** Default height, also used to calculate padding on the sides (32px)
* **$ubtn-font-family:**  Default font family
* **$ubtn-font-color:** Default font color (#666, gray)
* **$ubtn-font-weight:** Default font weight
* **$ubtn-font-size:** Default font size (14px). You can also specify a value of `inherit` and it will be respected.


## Excluding Button Types

By default, Buttons will include all  button types. You can exclude types from your compilation by simply removing the corresponding *@import* statement in the buttons.scss file.

```shell
//Example import statement for 3d button.
@import 'types/3d';
```
Remove this statement then recompile to create a build without 3d buttons.

## Browser Support
Buttons works in all modern browsers (Firefox, Chrome, Safari, IE) and gracefully degrades all to Internet Explorer 8.


## About Buttons
Buttons is part of the [Unicorn-UI Framework](http://unicorn-ui.com). Created by Alex Wolfe [@alexwolfe](https://twitter.com/alexwolfe) and Rob Levin [@roblevintennis ](https://twitter.com/roblevintennis).

# Buttons

[![Build Status](https://travis-ci.org/alexwolfe/Buttons.svg?branch=buttons-2)](https://travis-ci.org/alexwolfe/Buttons)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/unicornuirocks.svg)](https://saucelabs.com/u/unicornuirocks)

Buttons is a fully customizable CSS button library that's built using Sass, and created by [Alex Wolfe](https://twitter.com/alexwolfe) and [Rob Levin](https://twitter.com/roblevintennis).

Quickly get started by [visiting the Buttons Builder Website](http://alexwolfe.github.io/Buttons/) where you can view live examples and fully customize your Buttons download.

[![Example of Buttons](https://dl.dropboxusercontent.com/u/1517246/builder.png "Example of Buttons")](http://alexwolfe.github.io/Buttons/)

## Setup & Installation

1. Visit the [Buttons Builder Website](http://alexwolfe.github.io/Buttons/), download and add files to your website.
2. Include css in the head of your webpage. *You only need the font-awesome css if you're using icons*
    `<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">`
    `<link rel="stylesheet" href="css/buttons.css">`
3. Include jQuery and buttons.js if you're using dropdown menu buttons.
    `<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>`
    `<script type="text/javascript" src="js/buttons.js"></script>`
4. Create buttons in your html. [View code examples here](http://alexwolfe.github.io/Buttons/).


## or Install with Bower
You can also install Buttons using [Bower](http://bower.io/) if you're using that for your package management.

`bower install buttons`

## Customize Buttons

1. Clone the Buttons repo
2. Make sure you have Sass installed
3. Run `npm install; bower install` from your terminal
4. Edit the `_options.scss` with your own custom values (see example values below)
5. Buttons now works with–or without–Compass. So choose one of the following examples accordingly and run from the command line in Buttons's root directory:

	`$ compass watch # compile with Compass`

	`$ sass --watch --scss scss/buttons.scss:css/buttons.css # compile with Sass`

6. The `css/buttons.css` file should now be updated

## Grunt

If you plan to make any significant modifications or contributions to Buttons, you'll likely want to take advantage of the Grunt tasks available. You'll of course need to ensure you have [Grunt Setup](http://gruntjs.com/). You can run one of the following from the root directory of Buttons:

```shell
grunt # default task which compiles with sass and leverages autoprefixer and cssmin
grunt dev # does same as above but starts a &ldquo;live watch&rdquo; too
```

### General Options

In order to edit your Button options, simply change option values within the `_options.scss` file to your liking. After you make your edits run `compass watch`, or, `sass --watch --scss scss/buttons.scss:css/buttons.css` from Button's root directory and your updates should be reflected in `css/buttons.css`.

At any time, you can directly open up the `index.html` file in a browser to view your changes.

#### Options

* **$ubtn:** This prefix stands for Unicorn Button and prevents namespace collisions that could occur if you import buttons as part of your Sass build process. We kindly ask you not to use the prefix $ubtn in your project in order to avoid possilbe name conflicts. Thanks!
* **$ubtn-namespace:**  Desired CSS namespace for your buttons (default .button)
* **$ubtn-glow-namespace:** Desired CSS namespace for your glow effect (default .glow)
* **$ubtn-colors:** List of colors in format like `(name, background, color)`.
* **$ubtn-shapes:** List of shapes in format like `(square 0px)`. You can use Sass maps if you're using 3.3. See `_options.scss` for details.
* **$ubtn-sizes:** List of sizes in format like `(jumbo 1.5)`. You can use Sass maps if you're using 3.3. See `_options.scss` for details.
* **$ubtn-glow-color:** Default glow color (#2c9adb, light blue)
* **$ubtn-bgcolor:** Default button background color (#EEE, light gray)
* **$ubtn-height:** Default height, also used to calculate padding on the sides (32px)
* **$ubtn-font-family:**  Default font family
* **$ubtn-font-color:** Default font color (#666, gray)
* **$ubtn-font-weight:** Default font weight
* **$ubtn-font-size:** Default font size (14px). You can also specify a value of `inherit` and it will be respected.


## Excluding Button Types

By default, Buttons will compile all *Button Types* to your `css/buttons.css` file. However, you can exclude types from your compilation unit in order to improve performance. To do so, simply comment out or delete the *import* line for that button type. For example, to remove the 3D button type, find the corresponding line in the `scss/button.scss` file that reads:
```shell
@import 'types/3d';
```
and comment out or remove that line and then recompile (see instructions on how to compile above).

## Browser Support
Buttons works in All modern browsers (Firefox, Chrome, Safari, IE) and gracefully degrades all the way down to Internet Explorer 8.


## Authors
Created by Unicorn-UI (visit us at [unicorn-ui.com](unicorn-ui.com)) whos team members consist of Alex Wolfe [@alexwolfe](https://twitter.com/alexwolfe) and Rob Levin [@roblevintennis ](https://twitter.com/roblevintennis).

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/alexwolfe/buttons/trend.png)](https://bitdeli.com/free "Bitdeli Badge")


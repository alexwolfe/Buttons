# Mavenlink SVG Builder

## Purpose

The SVG Builder is a simple set of directories used to export the SVG's Mavenlink uses in the core product. It requires a set of source SVG files (placed in the `svgs` directory and generally obtained from the Design team in an Illustrator file), and then builds out an SVG defs file suitable for inline SVG usage.

## Setup &amp; Usage

The build process is driven by [Grunt](http://gruntjs.com/getting-started) which depends on [NodeJS](http://nodejs.org/download/). Install NodeJS from previous link, and then follow the instructions on the [Grunt Getting Started page](http://gruntjs.com/getting-started) to get set up.

```bash
npm install # Install dependency namely grunt-svgstore
grunt # Perform the build
```

Once you've done this, the `dist` directory will contain the built file (there will also be a convenient `.tmp/svg-defs-demo.html` that you should be able to click on the `dest/svg-defs-demo.html` file to preview in a browser).

### SVGs Used in Production

Take the contents of `dist/svg-defs.svg` and copy the contents of that to Mavenlink proper's `app/assets/images/svg_icon_def.svg` file. Reload Mavenlink and ensure that previously working SVG's are still working.

You should now be able to refer to the SVG def from within Mavenlink proper using one of:

* For `.eco` (Coffeescript) template use the helper `svg_icon` found in: app/assets/javascripts/backbone/view-helpers.coffee as follows:

		<%= @svg_icon("icon-search", "icon-tiny") %>

* For `.erb` (Rails) use the rails helper with the same name `svg_icon` found in: app/helpers/application_helper.rb as follows:

		<%= svg_icon('icon-multi-documents', 'icon-tiny', true) %>

_Disclaimer: Please check the Mavenlink proper's codebase to ensure syntax hasn't changed!_


*IF YOU ADD ICONS:*
Please do this on another branch and ping Rob. If you've spot checked the def in the product and everything seems good, we'll do two things:

1. Merge your topic branch in to [master] here

2. You'll be asked to create a pull request updating the Mavenlink repo with the latest defs



## TODO

At present we are considering using icon fonts for super simple icons like sorting acending/descending arrows, etc., in which case we'd likely produce these with the []icomoon app](https://icomoon.io/app) which very easily allows you to create custom builds from your own icon assets. TBD

## Research &amp; Findings

* We can use img tags for SVG but:

> The problem with both img and background-image...Is that you don't get to control the innards of the SVG with CSS like you can with the following two ways. Read on!
[Using SVG](http://css-tricks.com/using-svg/)

* Also, since we're essentially going to "include" the svg def into a partial, we don't have to make additional http requests.

* Unfortunately, inline SVG is not really cacheable so that would be the down side of this approach.


### Resources

If you'd like to further understand the rationale and benefits of using SVG see the following resources:

[Icon Fonts vs SVG](http://css-tricks.com/icon-fonts-vs-svg/)


[Icon System with SVG Sprites](http://css-tricks.com/svg-sprites-use-better-icon-fonts/)


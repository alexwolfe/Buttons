The tl;dr usage is:

```shell
#Install the Buttons example and set up npm dependencies
git clone -b svg-inline-experiments --single-branch https://github.com/unicorn-ui/Buttons.git Buttons && cd Buttons && npm install

#Install the SVG specific dependencies and run example
pushd svg-builder && npm install && grunt && popd && grunt dev
```

Run this from the root of the Buttons project and what that will do is:

* We clone the repository pointing to the `svg-inline-experiments` branch
* We install the Buttons node dependencies
* We install the SVG node dependencies
* We build the inline SVG definitions
* We run our Grunt development workflow which build our example page

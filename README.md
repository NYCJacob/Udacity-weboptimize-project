# Udacity Website Optimization Project by Jacob Sherman
This is a submission for Udacity's Front End Developer NanoDegree.

The goal of the project is to obtain pagespeed scores above 90 on ./index.html
and meet the specs for page refresh 60fps on ./views/pizza.html

## ./index.html 93/95 pagespeed
-   replaced google webfont with css font family
-   inline css and media query for print.css
-   moved scripts to bottom and async google analytics
-   optimize image sizes and image formats, moved href images to local dir
-   minified html, inlined css, compress images, use strict in perfmatters.js

##  ./views/pizza.html 60fps
- first submission included various styling changes that violated spec, unfortunately :(
- ~~refactored html using proper Bootstrap syntax and used Bootstrap 4alpha~~
- ~~redesigned layout and color scheme including flexbox based responsive (hamburger menu) navbar at top~~
    +   ~~flexbox menu comes from [Wes Boz flexbox site](http://www.flexbox.io)~~
- ~~slider also changes text for pizza size text~~
- moving pizzas have css: will-change and transform properties
- updatePositions now does phase calculations outside of loop
- updatePositions populations array of phase values using loop
- number of moving pizzas based on window size with 8 columns.
- number of random pizzas based on browser window and image dimensions

## build process
-   a streamlined build process was not implemented because of difficulties maintaining directory structure withing gulp
-   gulp used to compress images, minify html, js and css
-   gulp process could be improved and simplified if directory structure streamlined.  This caused many headaches trying to configure gulp.

## other
-   experimented with moving updatePositions to a webworker but this did not seem to work because of limitations of web worker scope.
-   tried using requestAnimationFrame but caused a lot more jank
-   need to improve gulp build process

## github
- comments and contributions welcome
- [Rep on github here](https://github.com/NYCJacob/Udacity-weboptimize-project)
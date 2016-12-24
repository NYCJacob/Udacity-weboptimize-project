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
- refactored html using proper Bootstrap syntax and used Bootstrap 4alpha
- redesigned layout and color scheme including flexbox based navbar at top
- slider also changes text for pizza size text
- moving pizzas have css: will-change and transform properties
- updatePositions now does phase calculations outside of loop
- movingPizza placed 200 pizza loop; number of moving pizzas based on window size with 8 columns.

## build process
-   gulp used to compress images, minify html, js and css
-   gulp process could be improved and simplified if directory structure streamlined.  This caused many headaches trying to configure gulp.

## other
-   experimented with moving updatePositions to a webworker but this did not seem to work because of limitations of web worker scope.
-   considered using requestAnimationFrame but was already hitting 60fps
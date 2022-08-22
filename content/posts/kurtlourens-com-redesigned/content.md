[KurtLourens.com](https://kurtlourens.com/) is my online CV website. I first created the site way back in Feb 2016. Looking back at, the site was poorly constructed as I had a very basic understanding of CSS and Javascript. Some evidence of this is the huge amount of inline styles copy pasted all over the place 😅. There were also a lot of CSS files imported. And no consideration for SEO.

## So my goals for the Redesign
- Small (the whole website)
- Fast (ties in with small)
- Automate all the things
- SEO friendly
- In some sort of source control
- CI (Continuous Integration)
- CD (Continuous Delivery)

## Making the site small
I made use of SCSS, so everything gets compiled to 2 CSS files (`main.css` and `icon-pack.css`) 
So I started with the basics, minnify-ing the CSS. This removes whitespace. I then ran through [purgecss](https://github.com/FullHuman/purgecss) to remove duplicate rules and rules that aren't used in any of the HTML files. This means that the 96kbs of SCSS files that usually output to 67kbs now outputs 27kbs of CSS.

The Theme that I used [html5up.net Strata](https://html5up.net/strata), came with quite a few stock images. With the images that I added, my assets folder became quite large. So I stripped out the unused images, resized the images to suite what they were to be used for (one image was 3000px x 1000px and was only being displayed at 150px x 50px). I then ran those images through [Kraken.io Image Optimizer](https://kraken.io/web-interface) and went from 12mb (37 files) to 30.9kbs (10 files). HUGE savings 💰

The theme that I used came with some Javascript files, mostly JQuery, with some logic for a Paralax effect. I then did a bit of cutting here and there to remove functions that I wasn't going to use as well as fixing and removing functions that were causing warning messages in Chrome (Added non-passive event listener to a scroll-blocking 'touchstart' event). [These violation warnings are a known problem in JQuery at the moment](https://github.com/jquery/jquery/issues/2871). I then moved on to concatenating the Javascript files into a bundle and minifying/uglifying the bundle. This took 115kbs of multiple already minified Javascript files and turned them into one 94kb file.

While creating the site, I used [Font-Awesome 4.7](https://fontawesome.com/v4.7.0/). Which has an amazing set of 675 icons. I was using 4 of them. This meant that I was using 0.005% of the 1.03mb font file 🤦‍. After some Googling I found [IcoMoon](https://icomoon.io/) which allowed me to select the icons that I wanted, and download a significantly smaller font 19.35kbs which is 0.018% of the [Font-Awesome 4.7](https://fontawesome.com/v4.7.0/) fonts.

Lastly I ran a somewhat pointless task that minifies HTML files. Basically it only removes whitespace. This turned my 14.9kb index.html file into 12.8kb mess that looks the same to your browser but looks horrendous to humans 😂.

## Making the site fast
Making all of the website's assets small is a great step. But the way that browsers load a website's  assets. Basically CSS blocks the rendering of the page and Javascript blocks parsing of the page.

To fix the JavaScript parser blocking, we can add attributes such as `async` or `defer` [described very well here](https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html). So I went with `async` to load my Javascript Bundle.

`image not found`

To Fix the CSS render blocking I used some ugly JQuery. Firstly I had to handle browsers without Javascript (which is quite uncommon these days).

`image not found`

This will load the CSS files normally if Javascript is not enabled in the browser. If Javascript is enabled, it will ignore the section and not load anything.

`image not found`

This function is called in `window.onload` and simply adds the link tags to the document after the HTML has been parsed. This does mean that the page will render to the user with no styling. So I added a basic loader with all of the loader styles in a style tag in index.html and in `window.onload` I remove the loader from the DOM.
Now the website loads the most important content first, and everything else later 👍

## Automate all the things
I automated all of the minifying of HTML, CSS and Javascript by using Gulp. Using Browserify I was able to live reload my website (locally) whenever I made a change to a file. This made development easier as I was able to see my changes immediately.

## SEO
I hate SEO. Different SEO test site give different results. Almost all of SEO standards are just guesses. Such as the optimal title length. Some sites will penalise your SEO score if your title is not between 50-60 chars, others require 64 - 78.

First thing to do is to head over to [HeyMeta](http://www.heymeta.com/) and fill in the required info to get some basic meta tags 😀. Second thing to work on is Lighthouse's Audit scores, which can be launched from Chrome DevTools (which I scored 100 in every audit except for the PWA, I will add the PWA part of the website later 😀). After that I worked my way through https://sitechecker.pro/ and https://suite.seotesteronline.com/seo-checker, trying to get my scores as high as possible.

## Source Control & CI / CD
Originally I had the website in a public Github as I wanted to make use of CircleCI to automate the building and deploying of the site. However I struggled to get CircleCI to even install npm, even though I was using their demo/tutorials. So I moved on to [Buddy](https://buddy.works/) which is an amazing tool. I got a "build" up and running in a few minutes using Gulp and the tasks I defined.

The only access I have to the Server where the website is running is through FTP. Unfortunately I could not get [Buddy](https://buddy.works/) to connect via FTP to the Server and therefore could not use it for CD 😞.

So I switched over to using Azure DevOps (formerly VSTS).  On Azure DevOps the site is "Built" (running all of the automation tasks using Gulp) and Deployed to the Server using FTP. The status of the last build and the last deployment is visible via these badges: 

![Build](https://khaoznet.visualstudio.com/KhaozNet/_apis/build/status/KhaozNet.CV.v2%20-%20CI)![Deployment](https://khaoznet.vsrm.visualstudio.com/_apis/public/Release/badge/b5441643-fd7c-4330-92d7-bffc23a7e0a4/15/20)




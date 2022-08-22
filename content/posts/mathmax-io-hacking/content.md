## Its not Hacking like in the movies

*I didn’t break into anything or get around any security measures. I simply used code to do the heavy lifting for me*😄.

### The steps I took
The first thing I do when I am intrigued by a website is open the inspector and take a quick look at the HTML structure, maybe zooming in on a specific element's CSS classes. Then I start trying to figure out what it is built with, keeping in mind how the page loaded and how the pages thereafter appeared on my screen. With [MathMax.io](https://MathMax.io) I immediately looked at the network traffic. 

As I played the game I saw how there were no calls happening, therefore there is no backend 🤷. It would have been simple for me to talk to the backend from a C# console app, not a possibility anymore, so new tactic. 

I started up Visual Studio and got going on a simple console app with Selenium. Looking at the page I saw that the two options had their own id tags, which is nice, no need for ugly findByClass methods😁.
![Options have ids of 'opt1' and 'opt2'](https://host.khaoznet.xyz/BlogImg/MathMax/Options.PNG)

I've got the values now, which is good, but I need to do the maths. I could have written my own methods to parse the text into math operations (converting × to * and ÷ to /) and then applying BODMAS/PEMDAS (Order of operations). And that is not something that I want to get stuck into. 

After a quick google search I found a nuget package called [Flee](https://github.com/mparlak/Flee). I then created a test project to test the package out and was very happy with the results. ![Test methods to make sure that Flee could handle what MathMax was spitting out](https://host.khaoznet.xyz/BlogImg/MathMax/UnitTests.PNG) I then progressed a bit further into the game to try and get all the operations out and realised that I needed to change some of the human friendly characters into symbols that [Flee](https://github.com/mparlak/Flee) could understand.

Ready to go I ran my little Selenium/Console app and watched the points grow 
<iframe width="100%" height="400" src="https://www.youtube.com/embed/-g8ANbC2puo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

In the video you will see me change the purpose of the app to getting every answer wrong on purpose. This is because during the recording I realised that I was accruing time for every correct answer at such a rate that I would have to wait 10min before I could see the end screen. So, I took the knock of the wrong answers, so that I could get to the end screen.

Source Code available at [https://github.com/Khaoz-Topsy/MathMax.io-Selenium](https://github.com/Khaoz-Topsy/MathMax.io-Selenium)


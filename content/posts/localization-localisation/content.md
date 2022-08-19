I have been streaming the development of the [Assistant for No Man's Sky](https://nmsassistant.com/) for a while now, over on my Twitch channel which, you can find [here](https://twitch.tv/khaoztopsy). Please leave a follow if you enjoy this post 💪. 
This all started with me wanting some way for stream chat to be able to interact with my stream a bit more, while looking for some solutions I didn't really find something I liked... So I decided to build something myself!

So what was I actually building? A way for users to be able to select an emoji and then to have that emoji float across the screen in a random way. Sound simple right? Well there are a few things to consider. 

1. The emoji needs to display as soon as a person clicks an emoji. 
1. How to integrate with Streaming software.
1. Who is allowed to click the emojis? If anyone can then we might be vulnerable to attacks.

## Showing emojis instantly
For the first point, while it is easy to receive a request from a user on the server and then respond with information. It is a lot more tricky to send information directly to a user without them having asked for it. One hacky way to get around this is to have a client make many requests to the server, perhaps once a second, that way the client would get a delay of 1 second maximum before receiving the information from the server. This obviously has a really bad downside which is that so many requests are wasted.

![Traditional way of getting information from a server]({postDir}/traditional-2.png)

A better solution would be to use some technology called SignalR. This allows for real time 2 way communication between the client and server.

![With SignalR any machine can send data to the other after the initial setup is complete]({postDir}/signalR-1.png)

## Integrating with the live stream

I am using Streamlabs OBS to stream and integrating with it generally means having a website/webpage dedicated to displaying what will be displayed on the stream. By default the background colour is set to transparent on the browser source. In my case I created a webpage to display the selected emojis, but the menu and footer were still displaying. I added a class to all the elements I didn't want to display `.hide-on-stream` and then on the browser source I added a CSS rule to `display: none` for elements with that class.

![Adding a webpage as a source in StreamLabs OBS]({postDir}/Screenshot-2021-03-24-142723.jpg)

## Who is allowed to submit emojis?

This was quite tricky problem...

![First run without spam protection]({postDir}/EwODcHWW8AE8chV.jpg)

Very tricky...

![What an auto clicker can accomplish when there is no spam protection]({postDir}/EwOGKCAXMAY6WNh.jpg)

Eventually I got around to implementing rate limiting on the endpoints, for the dotnet Core WebApi it is really easy to add thanks to the [AspNetCoreRateLimit NuGet package](https://github.com/stefanprodan/AspNetCoreRateLimit). I chose to limit the endpoint to 2 requests per second, per IP Address as well as a limit of 10 requests per 30 seconds per IP Address. Then on the front end I added some messages to let the user know that they are being rate limited and we also limit their ability to spam the same emoji multiple times. 

One thing I still need to handle is if there are many users (or many IP Addresses) submitting many emojis. These would all be valid and would not be prevented by the rate limits. But that hasn't happened yet, I don't have a large enough audience for this to be an issue 😅. One solution I have thought of is to allow some emojis on screen (maybe the first submitted emojis) and then to display totals of the emojis submitted at the bottom of the screen. 

## Adding some flair 🎉
One thing I wanted to add was a little bit of randomness on every emoji, what I settled on was having multiple "Major" animations, these would be the animations that move the emoji across the screen and then adding several "Minor" animations that would effect the emoji in a smaller way. Each of these animations will also have variations. 

![Diagram of some of the animations]({postDir}/anims-2.png)

There are currently 5 different "Major" animations, Snowflake, Fly, Fly-inverse, DVD, DVD-inverse. These "Major" animations have multiple different variations, in the case of the Snowflake animation, the variation affects the X coordinate where the variations for the Fly animations affect the Y coordinates. There are also 3 different timings for the "Major" animations, 10, 20 and 30 seconds. Each emoji displayed on the dashboard will get one "Major" animation and one "Minor" animation. The "Minor" animation applied will either be Shake, Rotate, Bounce-x, Pulse or Bounce-y. Each "Minor" animation also gets a random timing, either 1, 2, 3 or 4 seconds.

I also made use of the [Gamblers Dice library](https://www.npmjs.com/package/gamblers-dice) for all random selections, mostly because I really like how this library tries to combat our human understanding of randomness and the Gamblers Fallacy. I found the Gamblers Fallacy really interesting, checkout the Wikipedia article [here](https://simple.wikipedia.org/wiki/Gambler%27s_fallacy). Basically this package will help ensure that each of the animations will appear the same amount of times, slightly better than the usual way of getting a random value. 

### In Conclusion
This tool is still a work in progress, you can view the site live over here: [stream.assistantapps.com](https://stream.assistantapps.com/). If you want to mess around with it, ensure that you have the ["client"](https://stream.assistantapps.com/) open to submit emojis and the ["dashboard"](https://stream.assistantapps.com/dash) open to see the emojis bounce around the screen.

_I may split this out into it's own solution one day... That way it would be available for other people to use 🤷‍♂️_
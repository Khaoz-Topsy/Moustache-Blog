A good friend of mine one day complained about Software Engineering in general, they were frustrated about how the software they were in charge of just kept failing, crashing, etc. And they left me with a lingering question, why doesn't software just work forever when the source code doesn't change?

### Isn't software immortal?

If we look at what software is made of, it is just text and binary data, it should last forever, right? We expect that in computing, doing the same thing over and over will produce the same results. But that isn't always the case, there is something that forces our teams to keep working on them to maintain their functionality.

Let's look at the [First website](http://info.cern.ch/hypertext/WWW/TheProject.html), it is still available online. This site went live in 1991 and yet it still works, because this is a website, the source code is visible to us. The source code is as simple as the page looks and based on the HTML I see, it likely hasn't changed much since it was first written.

<br />

> Even though the HTML standard has changed over the years, almost everything written in the past is still supported. You can think of the changes to the HTML standard as mostly being additive. 

This "stability" has undoubtedly contributed to the first website still being supported but does point out that it has a dependency on the HTML standard continuing to support backward compatibility as well as browsers (Chrome, Firefox, Opera, etc) rendering HTML in the same way.

### Dependencies

It is almost unavoidable these days to write software with 0 dependencies. The deeper you look the more dependencies you will find. Let's take a look at the `create-react-app` command, which sets up a modern React project for you with all the dependencies a starting project "needs". A fresh project will net you 13484<code>*</code> dependencies via npm packages. 

<video src="./escalation.mp4" autoplay muted loop></video>

The number is a bit high and needs a bit of context, while each of those is an individual package, many are unintentional. The `create-react-app` tool may only have a handful of dependencies, but each of those has dependencies and so on until you end up with thousands of packages. Well, this is a ~~problem~~ feature of npm it has made development easier over the years. 

<br />

Each of those npm packages may have a person or team maintaining the package, adding features and breaking others, many of those packages are dormant. To add to the struggles of modern front-end development, security vulnerabilities are constantly being found and patched, which require updates and/or removal of packages.

<br />

While the [First website](http://info.cern.ch/hypertext/WWW/TheProject.html) has a dependency on the HTML standard and the way browsers render HTML, I would classify these dependencies as low risk. They are unlikely to change as any change to them impacts a large number of communities and projects. While npm packages change often and drastically. Even if you compiled all of your dependencies into a `bundle.js` and vowed never to change or update it, you are at the mercy of the javascript interpreters inside browsers and your site will be vulnerable to vulnerabilities _eventually_.

### Integration dependencies

I think that some of the more difficult problems to solve are the dependencies on software that your project integrates with, such as payment gateways, SaaS products, etc. In my opinion, these can be the most vulnerable parts of your projects. The biggest risk comes from the integration possibly changing the way it expects your project to communicate with it. Often these changes happen with very little notice and there is virtually no guarantee that they will support your project for its whole lifecycle. I have also found that starting up old projects is made more tricky when they have these integrations.

## Conclusion

While a zero-dependency project is probably not possible or maintainable, it is good to be aware of what can speed up the decay of the software you write today. We need to be aware of how quickly and often software changes and we need to prepare for it when designing systems. Otherwise, our future selves are going to have a tough time 😅.

<br />

<code>*</code> The stat comes from [AppSignal - JavaScript Growing Pains: From 0 to 13,000 Dependencies - Nikola Đuza on May 14, 2020](https://blog.appsignal.com/2020/05/14/javascript-growing-pains-from-0-to-13000-dependencies.html)
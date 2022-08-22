> I wrote this article on the internal blog platform for the company I work for Entelect. The article was chosen to be displayed on their website [culture.entelect.co.za](https://culture.entelect.co.za/our-engineering/introduction-to-flutter/). Before publishing it, Entelect did have people read over and correct my grammer, spelling, etc as well as design an awesome graphic for it 😁

Flutter is a relatively recent addition to cross-platform mobile app development frameworks. It is a Google product, open source, and has a very strong and growing community. If you’re not too familiar with Flutter, the below will cover how it works, and the pros and cons of using it.

Due to its relatively short existence, it changes often and sometimes drastically. An example of this is the recent Flutter for Web and Flutter Desktop Embedding that have become available. This makes Flutter exciting to try out, but also risky. Since Flutter is a Google product it is also vulnerable to being ended sooner than its users would like. The [Google Cemetery](https://gcemetery.co/) has a long list of products that Google has ended.

## The basic idea
Flutter Apps are written in Dart (another Google product). Dart is a C-like language that is relatively new, and is receiving a lot of the features that other languages have had for decades, such as the recent [extension methods](https://www.youtube.com/watch?v=D3j0OSfT9ZI) addition.

The Dart code in Flutter Apps are [Ahead-of-Time compiled](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) in release mode and [Just-in-Time compiled](https://en.wikipedia.org/wiki/Just-in-time_compilation) when in debug mode – which leads to a better development experience and better speed in production.

Flutter App’s views are similar to that of React. Instead of _components_, Dart calls it _widgets_. React has components and functional components, and Dart has stateful and stateless widgets. The Dart code interacts with the Flutter Engine, telling it how and what to draw on screen, and the Flutter Engine communicates with the platform it is running on. Therefore the Flutter Engine is a sort of Virtual Machine.

If your Dart code works on the Flutter Engine, it will also work on any platform that can run the Flutter Engine. This strategy is what lead to Flutter for Web and Flutter Desktop Embedding materialise in such a short period.

## Some Caveats
You may be thinking that you will only need to write Dart code and the Flutter framework handles the rest. However, the ecosystem is not 100% there yet.

In a lot of situations the app developer will need to change something that is platform-specific (i.e. changing the app Icon.) For Android, changing an app icon involves working with its resources folder and the manifest file, but for Desktop it involves changing a .ico file.

You would also still need to deal with the app stores. Each app store has their own set of requirements and rules that they expect developers to follow. And Apple is by far the most expensive and most strict.

## Features
Flutter’s developer environment is all about speed. The hot reloading means that your changes are reflected within a second or two while maintaining the app’s state.

There are also a few ‘hacks’ that make development even faster. When building the Android app, it can take a few minutes to get to the hot reloading phase, because the emulator needs to launch and the app needs to be loaded onto the emulator.

Something that a few users have started doing (myself included), is developing the app in Desktop mode. This opens a simple window on your Windows, Linux or Mac machine capable of running your app within a few seconds. The best part of this is that you can resize the window to emulate different screen sizes.

## Issues
Flutter is very new and has had a few issues in the last year or two. Currently there is a huge issue with [Flutter crashing](https://github.com/flutter/flutter/issues/47804) on certain Huawei phones. It is likely that Flutter will have more issues similar to this until it is more mature.

## Is it worth it?
I would definitely say it is worth looking into for personal projects or small projects that require an Android and iOS app. However, it would be difficult convince clients to trade more stable and reliable cross-platform frameworks for fancy, fast-paced development

A lot of the issues mentioned can be picked early with proper testing and releases to Alpha and Beta channels.

I have used Flutter to create an app that is live on [Google Play](https://play.google.com/store/apps/details?id=com.kurtlourens.no_mans_sky_recipes) and the [Apple App Store](https://apps.apple.com/us/app/id1480287625?ref=nmsAssistant). I may be biased, but I am pleased that I didn’t have to learn Objective-C/Swift or have 2 different code bases doing the same thing just to have an iOS app.
Recently I started messing around with creating an app using Flutter. It seems to be really close to React Native in terms of how Components (in this case Widgets) are created and used. It didn't take me too long to get the hang of Dart (the language used to write Flutter apps), and turns out that Flutter is blazing fast ⚡ (at least from what I have seen).

[![Build status](https://khaoznet.visualstudio.com/KhaozNet/_apis/build/status/KhaozNet.FlutterCV%20-%20CI)](https://visualstudio.com) [![Production Deployment status](https://khaoznet.vsrm.visualstudio.com/_apis/public/Release/badge/b5441643-fd7c-4330-92d7-bffc23a7e0a4/18/25)](https://visualstudio.com)

One thing that I found was lacking for Flutter Developers was Microsoft's AppCenter support. For all the other ways that I could think of for writing Android or iOS apps, AppCenter had an easy way to setup a CI (Continuous Integration) and CD (Continuous Deployment) pipeline. While not having a CI / CD pipeline setup isn't the worst thing, especially if you are a team of one. I still did not want to build the APK on my machine and then upload it to the Google Play Console each time I wanted to release a new version.

Thankfully someone had already written a Azure Devops Marketplace extension to build Flutter apps on Azure Devops' agents. 
[https://marketplace.visualstudio.com/items?itemName=aloisdeniel.flutter](https://marketplace.visualstudio.com/items?itemName=aloisdeniel.flutter)

So at the end of my first Flutter app's journey I had a pipeline where if I committed and pushed code on the develop branch of my repository my app would be built and deployed to the Google Play Store's Internal test track, where myself and anyone else specified could download the app and test it. And if I committed and pushed code to master, the production version of the app would be pushed to the Google Play Store as a publicly available app to download.

In the process of building the app I got familiar with Azure Devops' Secure File storage. I used the Secure File storage to hold my app's keystore, Google-Services.json and environment settings. 
* The keystore file is what signs you Android app and your app is required to be signed for every upload to the Google Play Store.
* The Google-Services.json is a file which has Authentication information for Google's Cloud Services. I am using their Cloud Messaging service to be able to send push notification's to my app's users.
* The environment settings file contains settings that the app requires which are different on my local machine versus the production version of the app. In this case I used this file to hold my AppCenter AppSecret, which is used for Analytics.

I believe that it is important to automate as much as possible, especially if you are doing a repetitive task. Automation can save a lot of time, as one of my friends once said... 

_Friends don't let friends deploy manually._

<strong>Update:</strong> here is the <a href="http://kurtlourens.com/docs/flutterBuild.yaml" target="_blank" rel="noopener norefferer">flutterBuild.yaml</a> file requested by Cobalt

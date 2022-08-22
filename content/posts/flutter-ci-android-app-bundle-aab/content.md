Not too long ago, I received an email from Google Play, letting me know that from the 1st of August 2019, they would be requiring me to upload 64-bit versions of my apps if I wished to update my apps.

![Oh Noes!](ohNoes.gif)

In a panic I reached for the nearest search engine and frantically typed in `Flutter build android 64-bit` and went down the rabbit hole.

At some point I found articles saying that there is a new preferred format to submit Android Apps to the Play Store, AAB or Android App Bundle. This format came with a few improvements:

- Faster Build times
- Smaller App size
- No longer need to maintain multiple APKs

![Sounds good to me, where do I sign?](soundsGoodToMe.gif)

## Continuous Integration
In my previous [article](https://blog.kurtlourens.com/flutter-with-ci-cd/) about setting up a CI CD pipeline for building a Flutter app and having it be deployed to the Play Store , I used this Azure Devops Marketplace extension: [aloisdeniel.flutter](https://marketplace.visualstudio.com/items?itemName=aloisdeniel.flutter). Thankfully the extension has been receiving updates and you can go check out it's github [here](https://github.com/aloisdeniel/vsts-flutter-tasks). But the updates were not coming fast enough for my liking.

At the time of writing a github user, [Tregan](https://github.com/Tregan), has a pull request that would add AAB support to the Flutter extension, but since the pull request hasn't been merged, none of us can use the feature.

So I forked the repository and created an Azure Devops Marketplace extension: [Flutter (AAB support)](https://marketplace.visualstudio.com/items?itemName=KurtLourens.aloisdenielfluttercopy). This extension is almost the same as [aloisdeniel.flutter](https://marketplace.visualstudio.com/items?itemName=aloisdeniel.flutter) with the exception that it contains the AAB feature built by [Tregan](https://github.com/Tregan).

![downside](downside.gif)

## Downside
Using my Azure Devops Marketplace extension you will be able to generate a Android App Bundle, unfortunately at the time of writing the Devops task to Publish to the Google Play Store [ms-vsclient.google-play](https://marketplace.visualstudio.com/items?itemName=ms-vsclient.google-play) does not allow for AAB files to be uploaded 😥. So you the uploading of your App to the Play Store will have to be a manual task for now 😞.

There is an [issue](https://github.com/microsoft/google-play-vsts-extension/issues/100) open on github asking for this feature to be added, although it is (at the time of writing) over 14 months old. I don't have the energy or motivation to add this feature, but I have hope that someone will 😅

## Conclusion
There are many ways to have your Flutter App build and deploy to the Play Store automatically, I may look into some of the alternatives to Azure Devops when I find the time. But for now I am happy with what Azure Devops has to offer.

Some alternatives for Flutter CI CD:

- [Fastlane](https://fastlane.tools/)
- [CodeMagic.io](https://codemagic.io/)
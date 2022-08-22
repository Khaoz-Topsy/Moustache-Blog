If you are like me and want to try the latest tech, you may have wanted to try making a Desktop App with Flutter.

Flutter for Desktop is unfortunately not available in the stable release of Flutter at the time of writing this. If you want to try it out, you need to be on the **master** channel. You can do this by simply running `flutter channel master` in your terminal. You will then want to run `flutter upgrade`.

## Problem
Unfortunately, when I tried this, I got a terminal that got stuck at `pub upgrade`. My google searches were fruitless. No one seemed to be having the same issue (at least not recently). This left me with a broken Flutter installation that would try to perform a `pub upgrade` whenever I used `flutter doctor` or `flutter run` 😢.

## Solution
Luckily someone posted about adding the `dart-sdk` to their PATH on Windows and I am happy to say that it solved the problem for me 😁. This does mean that the `pub upgrade` could have finished eventually as it now seems that the terminal was going through all of the paths in my PATH environment variable looking for something that could execute `pub upgrade`. This is more a fix for those who are impatient like me.

## Adding Dart 🎯 to your PATH
On Windows 10, go to 'This PC' >> right click then select Properties >> 'Advanced system settings' >> 'Environment Variables...' >> 'Path' >> 'Edit' >> 'New' and add the path to your `dart-sdk` folder, which should be in your Flutter bin folder `Flutter\bin\cache\dart-sdk`. Click 'OK' on all the dialogs and then open up a new terminal so that it has the latest PATH variable and run `flutter doctor`.

## Guides
I am currently going through this Medium article on how to create a Flutter Desktop app => https://medium.com/flutter-community/flutter-for-desktop-create-and-run-a-desktop-application-ebeb1604f1e0

And this blog post on how to create a game in Flutter => https://blog.geekyants.com/building-a-2d-game-in-flutter-a-comprehensive-guide-913f647846bc
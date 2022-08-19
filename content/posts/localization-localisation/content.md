Localisation is one of the parts of designing software that can be very difficult and can be extremely costly when overlooked.

As with most topics, on the surface they seem trivial until you delve deeper into the subject and learn the nuances. Over a year ago when I started the [Assistant for No Man's Sky](https://nmsassistant.com/) project I had a very basic understanding of how localisation worked and I was very lucky to start my project on the right foot by having localisation/internationalisation working from the start of the project. A year later I have now had a lot more experience with supporting multiple languages in an app that is used around the world and I thought that I would share what I have learned.

## The basic idea

Often the simplest approach to localisation is to make use of a Dictionary/Map of strings for each language that your app supports. In simpler terms this would be a `key` that is used by your application's code that is associated with a `value`, which is the text that is displayed to the user in your application. In the image below the `keys` are represented in the light blue colour and the `values` are in orange.

![An example of a localisation file from the Assistant for No Man's Sky]({postDir}/Screenshot-2020-12-07-131138.jpg)

One part of writing code that makes use of localisation is the added effort of adding text to this file each and every time you add text to your application. Even though this can be a nuisance (especially if adding an entry is not automated) but it is a lot better for your application in the long run.

## Hacking things together with Magic Strings

In the beginning of many projects, the aim is to get something that is "working" out as soon as possible. For web applications this might take the form of getting the page routing working so that developers and testers can navigate the site and start working on the various pages. More often than not, this also means using text without adding it to the localisation files or not even adding localisation files.

What often happens in projects early on is that we end up using Magic Strings. For non technical readers, this is simply regular text that does not change and is added to source code. Often these Magic Strings are copy pasted into various parts of the code instead of being placed in one central file which would make it easier to edit the value and have the change occur everywhere in the application. 

An example of when using hard-coded/Magic Strings caused havoc happened in April 2018, when the percentage of VAT charged in South Africa was changed from 14% to 15%. This value had not been changed for 25 years and as expected there were quite a few reports of software development teams that worked on or maintained codebases containing hard-coded/Magic Strings of the VAT rate. You may be thinking that it would be easy to search for all instances of `14` within the code and replace them with `15`. While that may work for a lot of scenarios, there are also places where the VAT value was added, multiplied, divided, etc into other values which resulted in different values being stored in Magic Strings as well as various other parts of the software containing `14` for values not related to VAT.

## Avoiding Magic Strings

With localisation it is better to abstain from using Magic Strings for any words used in the application as much as possible. The effort of coming back to and combing through code looking for Magic Strings is far higher than adding the new text to your localisations.

Another area to avoid adding Magic Strings, is the keys of the localisation file. If your application is using Magic Strings to load the translations, it becomes difficult to know whether or not the key actually exists in your localisation files. It is much better to list all available localisation keys and ensure that developers get appropriate error messages when there is a change to the available localisation keys, otherwise your app may end up not being able to load translations for part of it's User Interface and ultimately giving your users a bad experience.

## Localisation in Games
A lot of what I have mentioned so far applies to Video Games as well. An example of a game that has been translated into many languages is **No Man's Sky**. I have had the opportunity to look into the game's files through data mining and here is an example of one of the language files in the game `NMS_LOC6_ENGLISH.MBIN`.

![NMS_LOC6_ENGLISH.MBIN decompiled]({postDir}/Screenshot-2021-01-04-170304.jpg)

While this looks more complicated than the previous image, after dissecting the image a bit you will see it just takes more characters to represent the same thing. On line 6 you will notice `value="UI_PSN_SAVE_TRANSFER_UP`, this represents the `key` in the Dictionary/Map and the `value="Transfer Save Data to PlayStation®5"` represents the `value` for the English translation. _It is important to note that this is a decompiled version of the game's language files and most likely is not what the game developers actually work with. I hope that whatever they are using, it is not only easier to read but also easier to maintain._

Localisation is an essential part of your software for a global audience and can be difficult to add once a software solution has been worked on for a considerable amount of time. I have seen the value of adding support for multiple languages through the apps I have built, either via the reviews left by users or the number of users in different countries. I definitely think that you should add it to your applications as soon as possible!
In the next post I will look at the UI Considerations, Translator pain points, etc... See you there 💪
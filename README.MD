# [/r/imposter](https://www.reddit.com/r/Imposter) script

There are scripts out there to do the same thing, but this one is my version, not published anywhere before the event is finished, so even though you are seeing this right now, the script won't do you any good.

Before you say I am the one to ruin the game, nope, this program has delay built in, and I had only answered 9200 games in total out of the 22.0mil (so it only effrects 0.041% of total results) games with only 21% identify rate.  
(The program only performed a little better than a dice because it remembered other human options, but obviously the program never collected enough human options to really beat imposter)

It's easy to explain how it worked:  
1. I set up a backend server on your computer
2. Userscript sends all options to backend
3. Userscript request a number that represents an option from backend
4. Userscript clicks option
5. Depends on which page it visited next, the backend knows the picked option is an imposter or not, and if the other options are humans.
6. Do next question

How it worked?
![](https://i.imgur.com/FQIqFIA.gif)

How to setup:  
Really? The event has ended, my dude!  
But if you really want to know, here are instructions:  
1. Install [Tampermonkey](https://www.tampermonkey.net)
2. Install [Node.js](https://nodejs.org/en/)
3. Install two userscript from "Userscripts" folder.
4. Open a command prompt, "cd" to "reddit_imposter_solver_backend" folder
5. do `npm i` to install dependency
6. do `node ./` to start backend
7. open https://gremlins-api.reddit.com/embed?platform=desktop in browser and manually click into question once (obviously that doesn't work anymore)
8. You will have manually grant the sctipt to send network request for the first time.
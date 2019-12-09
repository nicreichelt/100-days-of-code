# 100 Days Of Code - Log

### All Projects
**Link(s) to work & Learning**
1. **PROJECT**: [Meal Plan App](https://github.com/nicreichelt/100-days-of-code/tree/master/meal-plan-app)
2. **LEARNING**: [JavaScript30](https://javascript30.com)
    * My personal branch for the JS 30 Challenge can be found on my [Github](https://github.com/nicreichelt/30-days-of-js)
3. **LEARNING**: [FreeCodeCamp JS Cert Course](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures)

### Day 21: December 7, 2019
**Today's Progress**: Meal Plan App

* I worked on my '[Meal Plan App](https://github.com/nicreichelt/100-days-of-code/tree/master/meal-plan-app)' today

Mostly a refactoring/code clean up day.

Date functions have been moved to their own file. This cleans up the main file.

I also separated some of the 'meal'/'meal plan' logic to their own functions. May split off to their own files too. Not sure yet.

I am going to use the 'addMeal' logic to handle adding a new meal plan item and updating. This will make the code more "DRY".

Overall it was fun analyzing the codebase thus far and seeing how to clean it up. Sometimes you just have to step back.

### Day 20: December 6, 2019
**Today's Progress**: Learning & Meal Plan App

* I completed 10/33 lessons in the Regex module of [FreeCodeCamp JS Cert Course](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures)

I have worked a little with Regex before, but this was helpful to get down to brass tacks and understand from start to finish how to use them.

* I worked on my '[Meal Plan App](https://github.com/nicreichelt/100-days-of-code/tree/master/meal-plan-app)' today

You can now select exisiting meals when adding a new meal plan item. This pulls the meals reference list and you can filter by season and type (one or both). Next is to implement the "update existing meal plan item" logic and refactor the codebase to be a bit cleaner. It is a little all over at the moment.

**Thoughts:** 

### Day 19: December 5, 2019
**Today's Progress**: Learning & Meal Plan App

**Thoughts:** 

* I completed the ES6 module of [FreeCodeCamp JS Cert Course](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures)

I really enjoyed the lessons on promises and export/import. I can see those being a huge help, and have worked a little with promises already.

* I worked on my '[Meal Plan App](https://github.com/nicreichelt/100-days-of-code/tree/master/meal-plan-app)' today

New meal plan items go into the Meal Plan Refernce dataset. Duplicate detection logic is in place to ensure items are not added with the same name.

### Day 18: December 4, 2019
**Today's Progress**: Learning & Meal Plan App

**Thoughts:** 

* I completed 20/31 lessons in the ES6 module of [FreeCodeCamp JS Cert Course](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures)

This is helping to solidify a lot of what I learned doing the JS30 Challenge.

* I worked on my '[Meal Plan App](https://github.com/nicreichelt/100-days-of-code/tree/master/meal-plan-app)' today

New meal plan items can be added to the plan. They do not load into the meals reference yet but that will come next. 

### Day 17: December 3, 2019
**Today's Progress**: Learning & Meal Plan App

**Thoughts:** 

* I completed my additonal features for Day 30 of the [JS30 challenge](https://javascript30.com) - Whack-A-Mole

I finalized the addition of the level, leaderboard, total score, and game over conditions of the game. The game now has 5 levels with increased difficulty. The player gets 3 'lives' to beat level 5, and the highest score is displayed above the game.

There is also a text box to enter the players name which is used for the leaderboard. There is 'levelText' at the bottom of the game to give info on the current state of the game (current level, if you beat the level or not, and game over screen)

    * [BUG] There is a bug with the 'peep' function after level one. More than one mole 'peeps' on the first timeout. I have not been able to isolate the cause though.
    
  * I worked on my '[Meal Plan App](https://github.com/nicreichelt/100-days-of-code/tree/master/meal-plan-app)' tonight
  
I added options to 'create new' or 'add existing' to the add meal popup. Placeholder text loads for now, but will present a form to create a new meal item or present options to select from the current meal list. 

Refactored a little bit of the code as well.

### Day 16: December 2, 2019
**Today's Progress**: Learning

**Thoughts:** 

* I added features to Day 30 of the [JS30 challenge](https://javascript30.com) - Whack-A-Mole

I started to flesh out a level system which is contained in an array of 'level' objects. I started to add a 'totalScore' object to keep track of the game's current state. I also stated to add a leaderboard which is stored in localStorage.

### Day 15: December 1, 2019
**Today's Progress**: Learning

**Thoughts:** 

* I completed Day 30 of the [JS30 challenge](https://javascript30.com) - Whack-A-Mole

This was a full game to build within JS. I completed the lesson as is today, so the day was kind of short. I am adding additional features to it though to end the challenge with a bang.

### Day 14: November 30, 2019
**Today's Progress**: Learning

**Thoughts:** 

* I completed Day 29 of the [JS30 challenge](https://javascript30.com) - Countdown Timer

I had been working with dates on my 'Meal Plan App' so this was more practice using them. I added a 15-second warning flash (orange) and a time up flash (red) once the counter is over. This was a fun addition and allowed me to put my own flair on the project.

* I completed up to exercise 10 of the [FreeCodeCamp's ES6 Module](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures)

### Day 13: November 29, 2019
**Today's Progress**: Learning

**Thoughts:** 

* I completed Day 28 of the [JS30 challenge](https://javascript30.com) - Video Speed Controller

This was a mix of the last lesson and the HTML Video Player lesson. A cool UX update for controlling the videos playback speed. The technique in and of itself could be useful for other projects, and I want to look into that at some point.

### Day 12: November 28, 2019
**Today's Progress**: Learning

**Thoughts:** 

* I completed Day 27 of the [JS30 challenge](https://javascript30.com) - Click & Drag

This was a very handy lesson and I can see the benefits of using this technique in a carousel. I want to implement it in some of my current sites.

### Day 11: November 27, 2019
**Today's Progress**: Learning & 'Meal Planning' App

**Thoughts:** 

* I completed Day 26 of the [JS30 challenge](https://javascript30.com) - Stripe Follow Along Nav

This was a culmination of a few lessons in one. This is a very unique feature and adds a depth and richness to the UI/UX that a standard nav bar/dropdowns can't provide. I am excited to implement this in a navbar or even as a modal possibly in the future (possibly for 'hints' on a website/app)

* I started [FreeCodeCamp's ES6 Module](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures)

* I updated and refactored some of my '[Meal Plan App](https://github.com/nicreichelt/100-days-of-code/tree/master/meal-plan-app)'

I made the whole 'li' element for the weekdays clickable and it will bring a popup to add/update a meal and provide the recipe link


### Day 10: November 26, 2019
**Today's Progress**: Learning & 'Meal Planning' App

**Thoughts:** 

* I completed Day 25 of the [JS30 challenge](https://javascript30.com) - Event Capture, Propagation, Bubbling and Once
* I completed the rest of the first Module in FreeCodeCamp's JS Cert [Basic JS](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/)

I was able to complete both of these efficiently today. The setup of some of the exercises in FreeCodeCamp is a little frustrating, but I understand why it is done the way it is.

* I worked on my ['Meal Plan App'](https://github.com/nicreichelt/100-days-of-code/tree/master/meal-plan-app) tonight.

I was able to complete the implementation of setting the initial date upon loading the "Meal Plan Section" and make sure the previous and next buttons move back and forward one week each. The passed date is set to 12am and adjusted for prev/next week from there.

I completed the implementation of the test/dummy meal plan date. The meals load on the appropriate date because when loading the page the days of the week are set with a data attribute for their date (YYYY/MM/DD) and the dummy data uses an object with the date included.

There is also a link to a recipe if one is added. All of this is loaded into local storage and "stringified" then "parsed" when loaded.

Next is to add the ability to change/add a new meal which will tie into the "Meals Reference Page"

### Day 9: November 25, 2019
**Today's Progress**: Learning

**Thoughts:** 

* I completed Day 24 of the [JS30 challenge](https://javascript30.com) - Sticky Nav

I have worked with a pure CSS sticky Nav and found this JS implementation to be a lot cleaner and easier to implement. I am excited to add this to other projects in the near future. The ability to dynamically update elements is huge for UX and making a site more responsive, since you are not relying on static values.

### Day 8: November 23, 2019
**Today's Progress**: Learning

**Thoughts:** 

* I completed Day 23 of the [JS30 challenge](https://javascript30.com) - Speech Synthesis

This was a cool lesson to see how to access the the OS's voice synthesis 'voices' and if using Chrome, Google's 'voices'.

I did find the eventListener 'voiceschanged' would not fire on FireFox, but did work in Chrome. This would make it so you could only use the default voice in Firefox. I was not able to investigate further, but may in the future. All other code worked in both browsers (Chrome & FireFox).

### Day 7: November 22, 2019
**Today's Progress**: Learning & Meal Plan App

**Thoughts:** 

* I completed Day 22 of the [JS30 challenge](https://javascript30.com) - Follow Along Link Highlighter
* I got the [Meal Plan](https://github.com/nicreichelt/100-days-of-code/tree/master/meal-plan-app) section to load with the previous week button (bugged)

The JS30 lesson provided a helpful UX feature. It is better than the traditional link hover effects and has a pretty cool animation watching the 'bubble' jump around the page.

I was able to get the 'previous week' button working and loading the week before the current week. It added to the bottom of the container though and should replace the data. This was not able to be fixed in this session.

### Day 6: November 21, 2019
**Today's Progress**: Learning

**Thoughts:** 

* I completed Day 21 of the [JS30 challenge](https://javascript30.com) - Geolocation
* I completed 100/110 exercises in the Basic JS Module of [FreeCodeCamp's JS Cert Course](https://www.freecodecamp.org/learn)

The JS30 Lesson was pretty cool to see. It is awesome that browsers have access to so much info. Can be kind of scary to think about from a security/privacy perspective though.

The FreeCodeCamp JS Course is pretty helpful. I find that some exercises are overly specific and hard to follow, but that is probably just me trying to rush through them. I am working on slowing down and taking my time though.

### Day 5: November 20, 2019

**Today's Progress**: Learning

**Thoughts:** 

* I completed Day20 of the [JS30 challenge](https://javascript30.com)

Today was a shorter day. It was busier at work and I had plans for the evening. I got to work with Speech Recognition in the browser. Took me a while to figure out it is only supported by Chrome though. 

I added a couple if states to check if the transcript included certain words. I made a simple "Jarvis" command that listened for the word "get" and then listened for "the traffic" or "the weather" and would return a certain response. I had to turn off "interimResults" to prevent it from firing several times. I may go back and figure out how to debounce, but couldn't figure it out effectively without messing with the speec recognition.

### Day 4: November 19, 2019

**Today's Progress**: Learning & More "Meal Planning" App 

**Thoughts:** 

* I completed Day 19 of the [JS30 challenge](https://javascript30.com)
* I completed 95/110 Lessons in the FreeCodeCamp [JS Certification Course](https://www.freecodecamp.org/learn)
* Worked on Meal Plan app more (part of this repo).
* * Refactored code to keep it DRY
* * Got the ['Meal Plan'](https://github.com/nicreichelt/100-days-of-code/tree/master/meal-plan-app) section to load the current date, first day of week, and a 'ul' with each day of the week and data attributes with the date attached.

I got to work with the webcam today in the JS30 challenge. Seeing how you can take a video stream and grab difference elements from it (i.e. the video, a still image, etc), and putting that in the canvas to manipulate.

Creating a simple UI/UX with JS, HTML, and CSS is pretty fun. I am learning a lot about the DOM and how to manipulate things. I like working in Vanilla JS so I can see how it is all functioning in the browser.

### Day 3: November 18, 2019

**Today's Progress**: Learning

**Thoughts:** 

* I completed Day 18 of the [JS30 challenge](https://javascript30.com)
* I completed 85/110 Lessons in the FreeCodeCamp [JS Certification Course](https://www.freecodecamp.org/learn)
* Worked on my ['Meal Plan app'](https://github.com/nicreichelt/100-days-of-code/tree/master/meal-plan-app) more (part of this repo).
* * Got all sections to load and populate "home" button, as well as placeholder data
* * Need to debug heading not changing back when going home

I got to work with 'map' and 'reduce' more in today's JS30 challenge. I am understanding more and more how to use these functions.

I am enjoying creating a small project from scratch, and using what I have learned these last couple weeks. You really do need ot use things or you lose them, and not just use but use for a prupose.

### Day 2: November 17, 2019

**Today's Progress**: Learning

**Thoughts:** 

* I completed Day 17 of the [JS30 challenge](https://javascript30.com)
* I completed 80/110 Lessons in the FreeCodeCamp [JS Certification Course](https://www.freecodecamp.org/learn)

I got to work with 'map' and 'sort' more in today's JS30 challenge. I need to use these more as they have great utility in most projects.

### Day 1: November 16, 2019

**Today's Progress**: Learning, Planning, and 1st Project Start

**Thoughts:** 

* I completed Day 16 of the [JS30 challenge](https://javascript30.com)
* I started the FreeCodeCamp [JS Certification Course](https://www.freecodecamp.org/learn)
* I started my ['Meal Plan'](https://github.com/nicreichelt/100-days-of-code/tree/master/meal-plan-app) web app. It is in this Github repo

I feel like things are starting to come together for me. I am creating this web app completely with Vanilla JS and creating page elements dynamically.

I am excited to see where this can go and how much I can accomplish in this manner. At this time the applications will use localStorage. Not sure if I am gong to hook it into a DB or Cookie. Will keep updated.

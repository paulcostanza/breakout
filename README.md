# breakout

**To Do list**
- Fix paddle corners collision with ball issue
- Add power ups & power downs
- figure out how to add different levels
- add difficulty (easy or hard mode) to the options menu. 
- edit user names to lowercase in the high score menu

#### Nov 29th
1. Fixed a major bug when the ball was hitting the corner of the brick. It now bounces off in a realistic angle. Before it would either bounce in a random direction or just go right through a brick. Took fours days of effort and research, but the game is MUCH better now. 

2. You can now angle the bounce of the ball depending on where the ball makes contact with the paddle. 

#### Nov 25th
Made the high score menu more readable by changing everyother score's background to #222 as opposed to the background-color of the menu at #333. Creates a nice subtle touch. 

#### Nov 24th
Change where the ball starts. 

#### Nov 23rd
Added a high score menu that saves user name and score in local storage. 

#### Nov 22nd
1. Create menu.js to store menu options. So far I have moved the *rules* and *user name* options. My main.js is starting to get way too messy :worried:

2. Added a feature where users can **enter name**. Right now there name will appear right above the game board. In the future, I hope to implement a high score feature that is saved in local storage. 
# How to run this program
Had some issues getting this up and running, mainly to use the javascript modules. 
However, if I need to use a local server, these are the steps: 
1. pull up the terminal
2. inside this directory, type: npx http-server

## features to add
- options menu:
    - easy or hard: how fast the ball moves, size of the paddle
    - if you want the paddle to be continuous (go past the right side and pop out the left, and reverse)
    - Change board color
    - switch between score and timer (Melinda's idea)
    - toggle music
    - toggle sound effects
- make the ball bounce in a different direction depending on which side of the paddle it hits. 
- add explosion when the ball hits the bottom of the screen
- change where the ball starts - I want user to shoot it from the paddle
- a nice fade in for balls to reappear
- add a high score menu that
    - a 'local high score' that saves into local memory
    - a 'global high score' that saves to a database
- cool letter swapping when user enters a name


## power-ups to add
Not sure if I should make the power-ups instant turns or save them on the side. If saved, it would save up to three that you can use, (1, 2, & 3) and would knock out ones when you pick up new power-ups. Show a timer for how long power-ups last.
- make ball bigger
- make paddle bigger
- add a gun
- add a laser
- add extra balls
- add a life
- turn ball into a bomb, when it hits a brick it destroies the adjacent bricks (for one or two turns)

## power-downs to add
Items you do not want to collect. Show a timer for how long power-downs last. 
- poison brick, speeds up the ball temporarily
- ghost balls, shoots out ghost balls to lose track of the really ball
- drunk ball: random speeds and/or directions


## sound
- add bill and ted '69 dude!' when you hit that score
- add explosion sound after adding ball explosion animation
- add a 'boin' sound when the ball hits the bottom of the screen

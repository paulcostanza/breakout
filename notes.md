# How to run this program
Had some issues getting this up and running, mainly to use the javascript modules. 
However, if I need to use a local server, these are the steps: 
1. pull up the terminal
2. inside this directory, type: npx http-server

## features to add
MENU
Add hamberger icon. When accessed it will pause the game. When you exit the menu, there will be a count down back for the game to start up again (3, 2, 1, Play!)
- options:
    - easy or hard: how fast the ball moves, size of the paddle
    - if you want the paddle to be continuous (go past the right side and pop out the left, and reverse)
    - Change board color
    - switch between score and timer (Melinda's idea)
    - toggle music
    - toggle sound effects
    - add Day/Night view
- High Score:
    - limit top 10 high score
    - If the user name is long it screws up the high score look.
    - Eventual change the look. Once this is launched on web, get rid of 'name' for local high score. 
- User Name
    - under user name menu, auto highlight and be able to press enter 
    - After you first lose, if you have not added your name the game can pause so you have to add the name.
- Questions/Comments/Problems
    - add this menu item 
    - Have it send an annoyomus email to me.
BALL ACTION
- add explosion image when the ball hits the bottom of the screen
- a nice fade in for balls to reappear
GLOBAL HIGH SCORE
- add a high score menu that has a 'global high score' that saves to a database
- add a password, but not until I am working on global storage
- "For secure storage, especially when dealing with authentication-related data, server-side storage is recommended."
- how to launch this web app onto the web and everything that will entail
- Have a top ten. If the person playing is NOT in the top ten, list them with their ranking after the top ten list.
RANDOM STUFF
- cool letter swapping when user enters a name
- another cool color: brickColor = '#9324ab'

## power-ups to add
Instant power ups now. Will change to save up to three for later If saved, it would save up to three that you can use, (1, 2, & 3) and would knock out ones when you pick up new power-ups. Show a timer for how long power-ups last.

#### Problems to figure out for power-ups
- what will it look like?
- how long will it last until it disappears
- how to get it to be random

- start off by getting a random brick

#### The types of power-ups
- make ball bigger
- make paddle bigger
- add a gun
- add a laser
- add extra balls
- add a life
- turn ball into a bomb, when it hits a brick it will destroy the adjacent bricks (for one or two turns)
- bonus bricks, if you hit them before time runs out you get bonus points

## power-downs to add
Items you do not want to collect. Show a timer for how long power-downs last. 
- poison brick, speeds up the ball temporarily
- ghost balls, shoots out ghost balls to lose track of the real ball
- ghost brick, fade in and out so it is hard to tell when/where the ball is going to bounce
- drunk ball: random speeds and/or directions
- random 'evil' paddle

## sound
- add bill and ted '69 dude!' when you hit that score, and 'excellent!' when you complete a level
- add explosion sound after adding ball explosion animation
- add a 'boin' sound when the ball hits the bottom of the screen
- add 'evil!' from mermaid man and baricle boy

## levels
- right now I can put it on random for how many bricks will pop up on screen
- moving, left and come to the other side

## things to double check
- the ball is bouncing correctly to according to where it hits the paddle. 
- The bal when it hits the bottom and then goes through the paddle and the paddle hits it in a direction. Looks weird, might be good to cancel that the paddle can effect it when the ball has become 'dead'.

## Saving to local storage
Ideas on how to store the user data

```Java
userName(all lowercase) = ['How the user wrote it', highScore, date, ]
```

## Boss level
Every 100 points intros a new boss. 1st boss idea: giant brick that breaks everytime you hit him. But when he breaks he adds space between the bricks and gets closer to you. 
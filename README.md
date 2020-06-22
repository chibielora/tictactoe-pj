# Tic-Tac-Toe Application

The goal of this game is to emulate a simple board of tic-tac-toe and be able to play against another remote user. The game will always start with X and by the end of each game there will be a message showing the winner and the total plays will be stored in the server.

## Technologies

- JavaScript
- jQuery
- [Dark Mode technology by](https://darkmodejs.learn.uno/)
- HTML
- CSS / Sass
- Ajax
- curl

## Planning and Problem Solving

The wireframe and 1x1 session pre-project helped with this first version. Then the api calls were built and all the events in the game besides messages were relocated to the game events file for organization purposes. It was decided that building the icons instead of using fonts for the game parts would work best for different types of screen. The game follows a simple logic of play-by-play until all the squares are occupied and then prompts a message that lets the user know who won and also resets the board to a new game right after the message is aknowledged.

## Unsolved Problems

There's still a lot to work on the alerts and messages responses, especially the illegal move alert that is still floating on the screen. There will be some layout rebuilding in the future, and I intend to reposition the sign-in/out/up and change password buttons to the top of the screen. I also plan on working in the scores, so that we have the total for X and 0, respectively.

## Wireframes

[Project Wireframes](https://i.imgur.com/rba3yVm.jpg)

### User Stories

- As a user, I can toggle dark mode to choose the color of my preference.
- As a user, I can sign up and log into my game account.
- As a user, once logged in, I can change my password.
- As a user, I can start a new game.
- As a user, I am able to play in turns and receive alerts when play is illegal.
- As a user, I can see the total score.
- As a user, I can start a new game right after the first is finished.
- As a user, I can access my score and play in multiple devices.
- As a user, I can sign out and my information will be stored.

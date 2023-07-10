## Art Heist 
Steal the art. Leave no trace.

## Collaborators - The Gallery Bandits

![GalleryBandits](https://github.com/KKLW97/capstone_front_end/blob/main/The%20Gallery%20Bandits.png)
<ul>
    <li>Hayan Butt (GitHub: HayanButt) </li>
    <li>Katie Bamford (GitHub: klb545)</li>
    <li>Kelly Wong (GitHub: KKLW97)</li>
    <li>Isabel Galwey (GitHub: IsabelG96)</li>
    <li>Stella Annor (GitHub: StellaA30) </li>
</ul>

## Project description

As a team, The Gallery Bandits, created a Back End RESTful API to serve a Front End Game Application. We decided to create an RPG/trivia game where you play as the thief and you can successfully steal art when you answer art trivia questions correctly.

## Wireframe

![WireframeExtensions](https://github.com/KKLW97/capstone_front_end/blob/main/src/assets/Wireframe.png?raw=true)

For the wireframe we decided on a multi page application using React Router. There is a navbar for the drop-down list of users, which enables switching between users. There is also a welcome message that changes with the selected user.  </li>

## Landing Page & React Router

The LandingContainer.js is our parent page and every other page within the application is a child of this page.

If you want to learn more about React Router please click on this link: https://www.w3schools.com/react/react_router.asp

## Game Page

This is where the user will play the game, and the majority of the game logic takes place. 

It contains: 

* The `map container` which displays the user interface, including the gallery map, the thief, the artworks around the gallery and their respective questions from the external API, and the obstacles (security guard and lasers). It contains the functions which move the `thief` around the gallery, and its interactions with other components.
* The `painting list container` which keeps track of the stolen paintings' data and their value 
* Modals for the game instructions, the current question, winning a game, and losing a game
* The penalty list of 'alarms' which will increase as the player answers questions incorrectly
* `Laser` and `security guard` components who interact with the `thief` without actually changing the game score or penalty.
* `Forfeit` game option, a button which allows the player to end their game with their current score and without stealing all the paintings.


The arrow keys can be used to move the `thief` around the map. When the thief comes into proximity with a painting, the player can choose to answer the question associated with that painting.

Answering the question calls the `handleClick` function which updates the game score and/or penalty. 

After every guess, the `checkGameStatus` function checks whether the player has reached the 0 paintings (win) or 3 lives (lose), and updates the game status accordingly. 


## External API - trivia questions

We used an external API for our trivia questions. (link to: https://opentdb.com/api_config.php) 

## HTML entities decode

The external API would return questions and answers with HTML entities so we needed to decode them. We navigated the issue by installing the html-entities package from npm. (https://www.npmjs.com/package/html-entities)

## UseSound

We used the useSound React Hook for our game's soundtrack. (https://www.npmjs.com/package/use-sound)

## Context & UseContext Hooks

We utilised context and useContext to minimise prop drilling and we can just pass through the active user down to the game page.

## Components Diagram

![Components.png](https://github.com/KKLW97/capstone_front_end/blob/main/src/Component.png)

 

# Tech Stack
<ul>
    <li>React</li>
    <li>JSX</li>
    <li>HTML</li>
    <li>CSS</li>
    <li>Visual Studio Code</li>
</ul>

## Set Up 

Ensure the following are installed on your machine:
<ul>
<li>Visual Studio Code</li>
<li>Intellij IDEA (JDK 17)</li>
<li>PostgreSQL</li>
<li>Postico</li>
<li>Postman</li>
</ul>

Back End Api link: https://github.com/IsabelG96/capstone_backend
Front End link: https://github.com/KKLW97/capstone_front_end


Clone the API repository from GitHub. 

Scroll to the top of this page and click on the green Code button. 

Ensure SSH is selected and copy the link provided. In your terminal, perform the following command:
  <pre><code>git clone git@github.com:IsabelG96/capstone_backend.git</code></pre> </li>

Create a new PostgreSQL database named 'Capstone_Backend' anywhere in your terminal.
  <pre> <code>createdb Capstone_Backend </code></pre>

Via Intellij IDEA, run the CapstoneBackendApplication and make sure the API is running on port 8080.

Clone the Capstone Front End repository from GitHub. 

Scroll to the top of this page and click on the green Code button. 

Ensure SSH is selected and copy the link provided. 

In your terminal, perform the following command:
  <pre><code>git clone git@github.com:KKLW97/capstone_front_end.git</code></pre> 

Via terminal ensure you're in the correct folder for the Capstone Front End and type 
<pre><code>npm i</code></pre>
to install the node modules. After it is installed, type 
<pre><code>npm start</code></pre>
to start the app up on localhost:3000

## MVP and Extensions
### MVP
* Endpoints from our API met in our React app
* Integrate external API supplying trivia questions
* Map and sprite functioning when moving with arrow keys
* Leaderboard for every user and individual user

### Extensions
* Penalty function - you get a question wrong, you get a penalty, three penalties and you lose the game
* Guard NPC travelling the map
* Music, sound effects

### Possible Extensions
* Full responsiveness - game is made for PC only at the moment, can be made mobile friendly
* Multiple game modes - easy, medium, hard. The higher the difficulty the harder the questions
* Different levels - design more maps increasing in difficulty eg. more guards, more lasers
* More questions - Instead of using external API with limited questions, data load our own questions
* Settings menu - instructions, volume control


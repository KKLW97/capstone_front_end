## Art Heist 
Steal the art. Leave no trace.

## Collaborators - The Gallery Bandits

![GalleryBandits] (https://github.com/KKLW97/capstone_front_end/blob/main/The%20Gallery%20Bandits.png)
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

![WireframeExtensions](https://github.com/KKLW97/capstone_front_end/blob/main/src/Wireframe.png)

For the wireframe we decided on a multi page application using React Router. There is a navbar for the drop-down list of users, which enables switching between users. There is also a welcome message that changes with the selected user.  </li>

## Landing Page & React Router

The LandingContainer.js is our parent page and every other page within the application is a child of this page.

If you want to learn more about React Router please click on this link: https://www.w3schools.com/react/react_router.asp

## Game Page

## External API - trivia questions

We used an external API for our trivia questions. (link to: https://opentdb.com/api_config.php) 

## HTML entities decode

The external API would return questions and answers with HTML entities so we needed to decode them. We navigated the issue by installing the html-entities package from npm. (https://www.npmjs.com/package/html-entities)

## UseSound

We used the useSound React Hook for our game's soundtrack. (https://www.npmjs.com/package/use-sound)

## context hooks

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
* 

### Extensions
* 

### Possible Extensions
* 


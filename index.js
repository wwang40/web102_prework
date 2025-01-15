/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (const data of games){
        // create a new div element, which will become the game card
        const gameCard = document.createElement("div")

         // add the class game-card to the list
        gameCard.classList.add("game-card")

        // set the inner HTML using a template literal to display some info 
        // about each game
        gameCard.innerHTML = `<img src=${data["img"]} class="game-img"></img>
        <h2>${data["name"]}</h2>
        <p>${data["description"]}</p>`

        // append the game to the games-container
        gamesContainer.append(gameCard)
    }
        

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce((acc, contribution) => {return acc + contribution["backers"];}, 0)

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `$${totalBackers.toLocaleString('en-US')}`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, raised) => {return acc + raised["pledged"];}, 0)

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString('en-US')}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.reduce((acc, raised) => {return acc + 1;}, 0)
gamesCard.innerHTML = `${totalGames}`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const goalNotMet = GAMES_JSON.filter((game) => {return game['goal']>game['pledged']});

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(goalNotMet)
}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const goalMet = GAMES_JSON.filter((game) => {return game['goal']<=game['pledged']});

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(goalMet)
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(sortedGames)
}

function sortByBackers(){
    deleteChildElements(gamesContainer);

    const sortedGamesByBacker =  GAMES_JSON.sort( (item1, item2) => {
        return item2.backers - item1.backers;
    });
    
    addGamesToPage(sortedGamesByBacker)
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");
const sorte = document.getElementById("sort");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly)
fundedBtn.addEventListener("click", filterFundedOnly)
allBtn.addEventListener("click", showAllGames)
sort.addEventListener('click', sortByBackers)
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const underfunded = GAMES_JSON.reduce((acc, game) => {return ((game['goal']>game['pledged']) ? acc + 1 : acc + 0);}, 0)

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${totalGames.toLocaleString('en-US')} games. 
Currently ${underfunded} ${underfunded>1?"games remain":"game remains"} underfunded. We need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container
const descrption = document.createElement('p')
descrption.innerHTML = displayStr
descriptionContainer.append(descrption)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [first, second, ...others] = sortedGames
let [firstName, secondName] = [first['name'], second['name']];

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGame = document.createElement('h1')
topGame.innerHTML = firstName
firstGameContainer.append(topGame)

// do the same for the runner up item
const runnerUp = document.createElement('h1')
runnerUp.innerHTML = secondName
secondGameContainer.append(runnerUp)
// The next 2 functions below are for creating the meetup HTML and displaying it on the DOM

// This creates the "li" HTML element that will be put in the results section upon search for Meetups
const buildMeetupHtml = (meetupResult) => {

  // This creates an "li" element and gives it a class of "meetup-results-list-item"
  const meetupItem = document.createElement("li")
  meetupItem.classList = "meetup-results-list-item"
  

// This creates a "span" element, gives it a class of "meetup-results-description", adds the text from the API to the "span", and appends the "span" to the "li"
  const meetupDescription = document.createElement("span")
  meetupDescription.classList = "meetup-results-description"
  meetupDescription.textContent = `${meetupResult.name.text}: ${meetupResult.description.text}`
  meetupItem.appendChild(meetupDescription)

// This creates a "button", gives it a class of "save-meetup-button", gives it a text content of "Save", and adds the event listener to the button
  const meetupButton = document.createElement("button")
  meetupButton.classList = "save-button"
  meetupButton.textContent = "Save"
  meetupButton.addEventListener("click", () => {

// Upon the button click, this selects the "restaurant-itinerary" section, clones the node, clears the previous entry in the itinerary, and appends the cloned node to the itinerary
    const meetupItinerary = document.querySelector(".meetup-itinerary")
    const meetupItineraryDesc = meetupDescription.cloneNode(true)
    meetupItinerary.innerHTML = ""

    // update database.json
    putUpdatedField("meetup", meetupDescription.textContent)

    meetupItinerary.appendChild(meetupItineraryDesc)
  })
  // this appends the button the the "li"
  meetupItem.appendChild(meetupButton)

  // this returns the entire "li" element will all contents
  return meetupItem
}

// This function creates a "ol" element, loops through the search results (events), appends the search results ("li") to the "ol", and appends the entire "ol" element to the results continer in the DOM 
const displayMeetupHtml = meetupResult => {
  let meetupSearchResultsHtml = document.createElement("ol")
  meetupResult.forEach(events => {
    meetupSearchResultsHtml.appendChild(buildMeetupHtml(events))
  })
  const searchResultsSection = document.querySelector("#results-container")

  searchResultsSection.innerHTML = ""

  searchResultsSection.appendChild(meetupSearchResultsHtml)

}





// html to be put into .search-results in searchForm.js
const buildRestaurantHtml = (restaurant, index) => `
    <li class="restaurant-results-list-item">
      <span id= "save-text-${index}">${restaurant.restaurant.name}: ${restaurant.restaurant.location.address}</span>
      <button id = "save-button-${index}" class = "save-button">Save</button>
    </li>
`

const displayRestaurantHtml = allRestaurants => {
  let restaurantResultsHtml = '<ol class="restaurant-results-list">'

  // limit to max four restuarants (i <= 3)
  for (let i = 0; i < allRestaurants.length && i <= 3; i++) {
    console.log(allRestaurants[i])
    restaurantResultsHtml += buildRestaurantHtml(allRestaurants[i], i)
  }

  restaurantResultsHtml += '</ol>'

  const restaurantSearchResultsSection = document.querySelector("#results-container")
  restaurantSearchResultsSection.innerHTML = restaurantResultsHtml
  
  for (let i = 0; i < allRestaurants.length && i <= 3; i++) {
    attachEventListenerToRestaurantSaveButton(i)
  }
}





// function definition to build a single park list item and attach an event listener to the save button
const buildParkListItem = (parkResult) => {
  // create the "li" element and give it a class
  const item = document.createElement("li")
  item.classList = "park-results-list-item"

  // create the description for the inside of the "li" element, 
  // give it a class, 
  // construct the text to display,
  // and append it to the "li" element
  const description = document.createElement("span")
  description.classList = "park-results-description"
  description.textContent = `${parkResult.name}: ${parkResult.address}`
  item.appendChild(description)

  // create the button for the "li" element,
  // give it a class,
  // have it display "Save" on the button,
  // attach a event listener to the button for adding it to the itinerary,
  // and then append the button to the "li" element
  const button = document.createElement("button")
  button.classList = "save-button"
  button.textContent = "Save"
  button.addEventListener("click", () => {
    // get a reference to the itinerary section for parks,
    // duplicate the description of the park to save,
    // remove any existing description in the park itinerary,
    // and append the cloned park description to the park itinerary section
    const parkItinerary = document.querySelector(".park-itinerary")
    const parkItineraryDesc = description.cloneNode(true)
    parkItinerary.innerHTML = ""

    parkItinerary.appendChild(parkItineraryDesc)

    // update database.json
    putUpdatedField("park", description.textContent)
  })
  item.appendChild(button)

  // return the "li" element
  return item
}

// function definition for displaying park results info
const displayParkHtml = (parkResults) => {
  // create a new ordered list element for the park results section
  const parkResultsListHtml = document.createElement("ol")

  // for each park result, append a new "li" element created by buildParkListItem
  parkResults.forEach(park => {
    parkResultsListHtml.appendChild(buildParkListItem(park))
  })
  // get a reference for the search results section
  const searchResultsSection = document.querySelector("#results-container")
  // clear it out of any previous search results
  searchResultsSection.innerHTML = ""
  // append the search results to the results section
  searchResultsSection.appendChild(parkResultsListHtml)

}

/* CONCERTS SEARCH RESULTS SECTION */

//Take the "concert" argument info and add the string to buildConcertHtml using string literals to get specific info
const buildConcertHtml = (concert, index) => `
  <li>
    <span id="concertResultText-${index}">${concert.name}: ${concert._embedded.venues[0].name}</span>
    <button type="button" id="concertResultButton-${index}">Save</button>
  </li>
  `


const displaySearchResults = allConcerts => { //From api.js, passes the contents into function and calls them allConcerts
  let concertsResultsHtml = `<ol class="concertResultsOL">` //Create an empty OL that acts as a holding place for info

  for (let i= 0; i < allConcerts.length && i <=3; i++) {
    concertsResultsHtml += buildConcertHtml(allConcerts[i], i)
  }

  concertsResultsHtml += `</ol>` 

//   allConcerts.forEach(concert => { //Loop through each item, and call each item "concert". In each pass through in the loop, do the following:
//     let concertHtml = buildConcertHtml(concert) //1) Run the following function (located above) and pass the contents in as the "concert" argument
//     concertsResultsHtml += concertHtml //and 2) Take the results that are returned from the above function and add them to what is already contained in "concertsResultsHtml"
//   });

  const searchResultsSection = document.querySelector("#results-container") //Grab the section where we want to add search results...
  searchResultsSection.innerHTML = concertsResultsHtml //...and put them there

  for (let i = 0; i < allConcerts.length && i <= 3; i++) {
    addToItinerarySaveButton(i)
  }
}
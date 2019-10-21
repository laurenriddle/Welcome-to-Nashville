const buildAndAppendSearchForm = () => {
    const searchForm = `
    <section class="search-form">
      <h3>Search for stuff to do today: </h3>
      <input type="text" placeholder="park by feature">
      <button id = "park-search-button">Search</button><br>
      <input type="text" placeholder="restaurants by food type">
      <button id = "restaurant-search-button">Search</button><br>
      <input type="text"placeholder="meetups by topic">
      <button id = "meetups-search-button">Search</button><br>
      <input type="text" placeholder="concerts by genre">
      <button id = "concerts-search-button">Search</button><br>
    </section>
    <section class="search-results"></section>
    `
    console.log(searchForm)
  
    const searchContainerDiv = document.querySelector("#search-container")
    searchContainerDiv.innerHTML = searchForm
  }
  
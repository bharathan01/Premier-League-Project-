// Function to fetch data from a JSON file using AJAX
function fetchLeagueData(callBack) {
  // Variable to hold the path of the JSON file
  const jsonPath = "./League.json";
  // Creating a new instance of XMLHttpRequest
  const xhr = new XMLHttpRequest();
  // Specifying the response data structure
  xhr.overrideMimeType("application/json");
  // Specify the HTTP method and make the request asynchronous
  xhr.open("GET", jsonPath, true);
  // Define a callback function to be invoked when the state changes
  xhr.onreadystatechange = () => {
    // Checking if the response status is successful and the request is complete
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Converting the string response to JSON
      const response = JSON.parse(xhr.responseText);
      // Invoking the callback function to pass the response data
      callBack(response);
    }
  };
  // Send the request to retrieve the JSON data
  xhr.send(null);
}

// Function to create table header
function createTableHead(tableHead, fields) {
  // Iterating over each row in the table head data
  tableHead.forEach((row) => {
    // Creating a th element for each row
    const th = document.createElement("th");
    // Adding a CSS class to the th element
    th.classList.add("td-tr-style");
    // Setting the inner HTML of the th element to the row value
    th.innerHTML = row;
    // Appending the th element to the table header
    fields.appendChild(th);
  });
}

// Function to create table rows
function createTableRow(playersData, fields) {
  // Iterating over each player data
  for (let i = 0; i < playersData.length; i++) {
    // Creating a tr element for each player
    const tr = document.createElement("tr");
    // Iterating over each key-value pair in the player data
    Object.entries(playersData[i]).forEach(([key, value]) => {
      // Creating a td element for each key-value pair
      const td = document.createElement("td");
      // Adding a CSS class to the td element
      td.classList.add("td-tr-style");
      // Handling special case for the "Name" key
      if (key === "Name") {
        // Splitting the value into player name and team info
        const [player, teamInfo] = playersData[i][key].split("|");
        // Setting the inner HTML of the td element with formatted player name and team info
        td.innerHTML = `<b>${player}</b> <br/> ${teamInfo}`;
      } else if (key === "Form") {
        // Handling special case for the "Form" key
        // Splitting the form value and adding icons based on form (Win, Loss, Draw)
        value.split("-").forEach((form) => {
          if (form === "W") {
            td.appendChild(
              addFormIcon("https://i.postimg.cc/MT10jpdB/win-icon.png")
            );
          } else if (form === "L") {
            td.appendChild(
              addFormIcon("https://i.postimg.cc/GpyGZp0f/loss-icon.png")
            );
          } else {
            td.appendChild(
              addFormIcon("https://i.postimg.cc/KcrrG4KS/drow-icon.png")
            );
          }
        });
      } else {
        // Setting the inner HTML of the td element with the value
        td.innerHTML = `<b>${value}</b>`;
      }
      // Appending the td element to the tr element
      tr.appendChild(td);
    });
    // Appending the tr element to the table body
    fields.appendChild(tr);
  }
}

// Function to add form icons
function addFormIcon(image) {
  // Creating an img element for the icon
  let img = document.createElement("img");
  // Setting the width and margin of the icon
  img.style.width = "15px";
  img.style.margin = "2px";
  // Setting the source of the icon
  img.src = image;
  // Returning the img element
  return img;
}

// Function to display Premier League table
function displayPremierLeagueTable(leagueTable) {
  // Getting the table header and body elements
  const topTeamHeading = document.getElementById("topteam-table-head");
  const topTeamBody = document.getElementById("topteam-table-body");
  // Getting the data for the Premier League table
  const topTeamData = leagueTable[0].Apr[0]["week-34"];
  // Getting the table head from the data
  const tableHead = Object.keys(topTeamData[0]);
  // Creating the table header
  createTableHead(tableHead, topTeamHeading);
  // Creating the table rows
  createTableRow(topTeamData, topTeamBody);
}

// Function to display top scorers
function displayTopscorers(topScorersData) {
  // Getting the table header and body elements
  const topScorersTableHead = document.getElementById("topscorers-table-head");
  const topScorersTableBody = document.getElementById("topscorers-table-body");
  // Getting the data for the top scorers
  const playersData = topScorersData[0].players;
  // Sort the array based on the "GoalsGL" attribute
  playersData.sort((a, b) => b.GoalsGL - a.GoalsGL);
  // Getting the table head from the data
  const tableHead = Object.keys(playersData[0]);
  // Creating the table header
  createTableHead(tableHead, topScorersTableHead);
  // Creating the table rows
  createTableRow(playersData, topScorersTableBody);
}

// Function to display league data
function displayLeagueData(leagueData) {
  // Destructuring the league data to get top scorers and Premier League table data
  const { PremierLeagueTopScorers, PremierLeagueTable } = leagueData;
  // Checking the page path to decide which data to display
  if (window.location.pathname === "/Topscorers.html") {
    // Displaying top scorers if the page is Topscorers.html
    displayTopscorers(PremierLeagueTopScorers);
  } else if (window.location.pathname === "/League.html") {
    // Displaying Premier League table if the page is League.html
    displayPremierLeagueTable(PremierLeagueTable);
  }
}

function fetchAndDisplayLeagueData() {
  // Fetch the data immediately when the function is called
  setTimeout(() => {
    // Fetching league data and displaying it
    fetchLeagueData(displayLeagueData);
  }); // Fetch the data at a pre-set interval no time delay
}

//calling the function
fetchAndDisplayLeagueData();

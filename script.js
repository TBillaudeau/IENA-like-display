fetch("https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:C01740/stops/stop_area:IDFM:70829/realtime")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(data => {
    console.log(data);
    displayTrain(data)
  })
  .catch((error) => console.error("FETCH ERROR:", error));

fetch("https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:C01741/stops/stop_area:IDFM:71517/realtime")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(data => {
    console.log(data);
    displayTrain(data)
  })
  .catch((error) => console.error("FETCH ERROR:", error));

fetch("https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:C01390/stops/stop_area:IDFM:70845/realtime")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(data => {
    console.log(data);
    displayTram(data)
  })
  .catch((error) => console.error("FETCH ERROR:", error));

function displayTrain(data) {
    const nextDepartures = data['nextDepartures']['data'];
    // loop in nextDepartures
    for (let i = 0; i < nextDepartures.length; i++) {
        // get shortName
        const shortName = nextDepartures[i]['shortName'];
        const vehicleName = nextDepartures[i]['vehicleName'];
        const lineDirection = nextDepartures[i]['lineDirection'];
        if (nextDepartures[i]['code'] === 'duration') {
            var time = nextDepartures[i]['time'] + ' min';
        } else {
            var time = nextDepartures[i]['schedule'];
        }

        // if shortName is 'L' display this image https://malignel.transilien.com/wp-content/themes/transilien2021-L/img/ligne.svg
        if (shortName === 'L') {
            var ico = 'https://malignel.transilien.com/wp-content/themes/transilien2021-L/img/ligne.svg';
        }else if (shortName === 'U') {
            var ico = 'https://meslignesnetu.transilien.com/wp-content/uploads/2021/05/Ligne_U_IDFM.png';
        }

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="cocktail">
                <img src="${ico}" alt="${shortName}" />
                <h2>${vehicleName}</h2>
                <p>${lineDirection}</p>
                <p class="time">${time}</p>
            </div>
        `;
        
        document.querySelector('.container_train').appendChild(div);
    }
} 

function displayTram(data) {
    const nextDepartures = data['nextDepartures']['data'];
    // loop in nextDepartures
    for (let i = 0; i < nextDepartures.length; i++) {
        // get shortName
        const shortName = nextDepartures[i]['shortName'];
        const vehicleName = nextDepartures[i]['vehicleName'];
        const lineDirection = nextDepartures[i]['lineDirection'];
        if (nextDepartures[i]['code'] === 'duration') {
            var time = nextDepartures[i]['time'] + ' min';
        } else {
            var time = nextDepartures[i]['schedule'];
        }

        // if shortName is 'L' display this image https://malignel.transilien.com/wp-content/themes/transilien2021-L/img/ligne.svg
        if (shortName === 'T2') {
            var ico = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Paris_transit_icons_-_Tram_2.svg/768px-Paris_transit_icons_-_Tram_2.svg.png';
        }

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="cocktail">
                <img src="${ico}" alt="${shortName}" />
                <p>${lineDirection}</p>
                <p class="time">${time}</p>
            </div>
        `;
        
        document.querySelector('.container_tram').appendChild(div);
    }
}   

// auto refresh every 1 minute
setTimeout(function() {location.reload();}, 10000);
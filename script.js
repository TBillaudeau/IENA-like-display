async function getICO(shortName) {
  switch(shortName) {
    case 'L':
      return 'https://malignel.transilien.com/wp-content/themes/transilien2021-L/img/ligne.svg';
    case 'U':
      return 'https://meslignesnetu.transilien.com/wp-content/uploads/2021/05/Ligne_U_IDFM.png';
    case 'E':
      return  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Paris_transit_icons_-_RER_E.svg/768px-Paris_transit_icons_-_RER_E.svg.png';
    case 'D':
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Paris_transit_icons_-_RER_D.svg/1024px-Paris_transit_icons_-_RER_D.svg.png';
    case 'B':
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Paris_transit_icons_-_RER_B.svg/2048px-Paris_transit_icons_-_RER_B.svg.png';
    case 'T2':
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Paris_transit_icons_-_Tram_2.svg/768px-Paris_transit_icons_-_Tram_2.svg.png';
    case '175':
      return 'https://upload.wikimedia.org/wikipedia/commons/a/ae/175_BUS_RATP.png';
  }
}

async function displayData(data, area){
  const nextDepartures = data['nextDepartures']['data'];

  // remove all children
  if (document.querySelector(`.${area}`).children[0] !== 'undefined'){
      while(document.querySelector(`.${area}`).children.length > 0) {
        document.querySelector(`.${area}`).children[0].remove();
    }
  }


  // loop in nextDepartures
  for (let i = 0; i < nextDepartures.length; i++) {
    
    // get all info
    const shortName = nextDepartures[i]['shortName'];
    const vehicleName = (nextDepartures[i]['vehicleName']) ? nextDepartures[i]['vehicleName'] : ' ' ;
    const lineDirection = nextDepartures[i]['lineDirection'];
    if (nextDepartures[i]['code'] === 'duration') {
        var time = nextDepartures[i]['time'] + ' min';
    } else {
        var time = nextDepartures[i]['schedule'];
    }
    const ico = await getICO(shortName);

    // create panel
    var div = document.createElement('div');
    div.innerHTML = `
        <div class="cocktail">
            <img src="${ico}" alt="${shortName}" />
            <h2>${vehicleName}</h2>
            <p>${lineDirection}</p>
            <p class="time">${time}</p>
        </div>
    `;

    document.querySelector(`.${area}`).appendChild(div);

    // check if panel already exist
    // if (document.querySelector(`.${area}`).children[0] === undefined) {
    //     document.querySelector(`.${area}`).appendChild(div);
    // } else {    
    //   document.querySelector(`.${area}`).replaceChild(div, document.querySelector(`.${area}`).children[0].childNodes[0]);
    // }
  }
}

async function getData(url, area) {
  await fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } 
  })
  .then(data => {
    return displayData(data, area);
  })
}

function showDate() {
  var time = null;
  var date = new Date()
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  if( h < 10 ){ h = '0' + h; }
  if( m < 10 ){ m = '0' + m; }
  if( s < 10 ){ s = '0' + s; }
  var time = h + ':' + m + ':' + s
  document.getElementById('horloge').innerHTML = time;
  setTimeout('showDate()', 1000)
}
showDate();

async function main(){
  // RER E - Gare Saint Lazare
  getData("https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:C01729/stops/stop_area:IDFM:73688/realtime", 'area3');

  // // RER E - Magenta
  getData("https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:C01729/stops/stop_area:IDFM:478733/realtime", 'area8');

  // T2 - Station Belvédère
  getData("https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:C01390/stops/stop_area:IDFM:70845/realtime", 'area2');

  // L - Gare Saint Lazare
  getData("https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:C01740/stops/stop_area:IDFM:71370/realtime", 'area4');

  // // L - Suresnes Mont Valérien
  getData("https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:C01740/stops/stop_area:IDFM:70829/realtime", 'area1');

  // // L - Clichy Levallois
  getData("https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:C01740/stops/stop_area:IDFM:72073/realtime", 'area9');

  // // U - Suresnes Mont Valérien
  getData("https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:C01741/stops/stop_area:IDFM:71517/realtime", 'area5');

  // RER D - Stade de France
  getData("https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:C01728/stops/stop_area:IDFM:72206/realtime", 'area6');
  
  // RER B - Stade de France
  getData("https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:C01743/stops/stop_area:IDFM:72211/realtime", 'area7');

  // 175 - Nieuport
  getData("https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:C01196/stops/stop_area:IDFM:70822/realtime", 'area10');


  setTimeout('main()', 1000)
}

main();
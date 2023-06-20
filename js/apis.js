document.getElementById("enviarBtn").addEventListener("click", function() {
  const selectLiga = document.getElementById('liga');
  const idLeague = selectLiga.value;

  if (!idLeague) {
    console.log('Por favor, selecciona una liga.');
    return;
  }

  var request = new XMLHttpRequest();

  request.open("GET", `https://v3.football.api-sports.io/standings?league=${idLeague}&season=2022`, true);
  request.setRequestHeader("x-rapidapi-key", "57f0694b37e90f2651fcf60342353d85");
  request.setRequestHeader("x-rapidapi-host", "v3.football.api-sports.io");

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var response = JSON.parse(request.responseText);
      var standings = response.response[0].league.standings[0];

      var tablaPosicionesContainer = document.getElementById("ligaElecta");
      tablaPosicionesContainer.innerHTML = "";

      standings.forEach(function(team) {
        var teamName = team.team.name;
        var teamPosition = team.rank;
        var teamPoints = team.points;
        var teamLogo = team.team.logo;

        var listItem = document.createElement("li");
        listItem.innerHTML = teamPosition + ". <img src='" + teamLogo + "' alt='" + teamName + "'> " + teamName + " - " + teamPoints;
        tablaPosicionesContainer.appendChild(listItem);
      });
    } else {
      console.log("Error al obtener la tabla de posiciones");
    }
  };

  request.onerror = function() {
    console.log("Error de conexión");
  };

  request.send();
});

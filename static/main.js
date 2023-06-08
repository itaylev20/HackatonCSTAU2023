$(document).ready(function () {
    $("#AddInventoryEmployeesV2Modal input").on("input", function () {
        console.log('hi');
        this.setCustomValidity("");
    });
    $("#AddInventoryEmployeesV2Modal textarea").on("input", function () {
        console.log('hi');
        ShowInputValidityMessage(this, "");
    });
    $("#AddInventoryEmployeesV2Modal select").on("change", function () {
        console.log('hi');
        ShowInputValidityMessage(this, "");
    });
});

function ShowInputValidityMessage(input, message) {
    input.focus();
    input.setCustomValidity(message);
    input.reportValidity();
}
function showBusPath(select){
    var option = $(select).find('option:selected');
    var route_id = option.val();
    var route_long_name = option.data('long-name');
    var origin = option.data('origin')
    var destination = option.data('destination')
    var stops = [origin,destination];
    console.log(`selected route id ${route_id}, origin ${origin} dest ${destination}`);
        $.get(`/get_stops_by_route_id/${route_id}`, function (response) {
        var stop_information  = JSON.parse(response);
        var stops_lan =  stop_information.map(item => `${item[1]},${item[2]}`);
        if (stops_lan.length>25){
            // createNotifcation("לא ניתן להציג מסלול",`יש מעל 25 תחנות, לצערנו גוגל לא תומך במעל 25 עצירות, לכן המסלול ${route_long_name} לא מוצג, תודה על ההבנה`,'red');
            // return;
            stops_lan.splice(0,25)
        }
        createNotifcation("מחשב מסלול",`מחשב מסלול ${route_long_name}`,'green');
        calculateAndDisplayRoute(stops_lan);
    }).
        fail(function () {
            alert('failed to get bus stops');
        });

}
function FillRoutes(selector) {
    $.get(`/get_routes`, function (response) {
        routes  = JSON.parse(response);
        FillSelectValues(selector,routes)
    }).
        fail(function () {
            alert('failed to get routes');
        });
}
function FillSelectValues(select_selector,routes){
    var selector = 'select'+select_selector;
    var selects = $(selector);
    selects.empty();
    for(const route of routes){
        var origin =  route.route_long_name.split('<->')[0];
        var destination = route.route_long_name.split('<->')[1];
        selects.append(`<option value='${route.route_id}' data-origin="${origin}" data-destination="${destination}" data-long-name="${route.route_long_name}">${route.route_short_name} - ${route.route_long_name}</option>`)
    }
    selects.selectpicker('refresh');

}



async function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  // The location of Uluru
  const position = { lat: 32.11321, lng: 34.80502 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru

  map = new Map(document.getElementById("google_map"), {
    zoom: 15,
    center: position,
    mapId: "DEMO_MAP_ID",
  });
  directionsRenderer.setMap(map);

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}
function calculateAndDisplayRoute(stops) {

  const waypts = [];
  const checkboxArray = document.getElementById("waypoints");

  for (let i = 1; i < stops.length-1; i++) {
      waypts.push({
        location: stops[i],
        stopover: true,
      });
  }

  directionsService
    .route({
      origin: stops[0],
      destination: stops.slice(-1)[0],
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
      const route = response.routes[0];
      console.log(route);

      const summaryPanel = document.getElementById("directions-panel");

      summaryPanel.innerHTML = "";

      // For each route, display summary information.
      for (let i = 0; i < route.legs.length; i++) {
        const routeSegment = i + 1;

        summaryPanel.innerHTML +=
          "<b>מסלול : " + routeSegment + "</b><br>";
        summaryPanel.innerHTML += route.legs[i].start_address + " אל ";
        summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
        summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
      }
    })
    .catch((e) => {
            window.alert("Directions request failed due to " + status);
            console.log("Directions request failed due to " + status);
            throw e;
        }
    );
}

function createNotifcation(title,message,fill_color){
    var notifcations_div = $("#notifcations-div");
    var toast = $("#notification-toast").clone();
    toast.find(".toast-title").html(title);
    toast.find(".toast-body").html(`<div class="d-flex align-items-center pr-3 pl-3 col"><h5>${message}</h5></div>`);
    toast.find(".square rect").attr('fill',fill_color);
    toast.removeClass("d-none");
    toast.toast('show');
    notifcations_div.prepend(toast);

}

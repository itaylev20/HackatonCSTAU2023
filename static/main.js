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

function FillRoutes(selector) {
    $.get(`/get_routes`, function (response) {
        console.log(response);
        routes  = JSON.parse(response);
        FillSelectValues(selector,routes)
    }).
        fail(function () {
            alert('failed to get routes')
        });
}
function FillSelectValues(select_selector,routes){
    var selector = 'select'+select_selector;
    var selects = $(selector);
    selects.empty();
    for(const route of routes){
        selects.append(`<option value='${route.route_id}'>${route.route_short_name} - ${route.route_long_name}</option>`)
    }
    selects.selectpicker('refresh');

}



async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("google_map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}

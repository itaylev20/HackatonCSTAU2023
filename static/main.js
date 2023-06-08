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
        selects.append(`<option value='${route.route_id}'>${route.route_short_name}</option>`)
    }
    selects.selectpicker('refresh');

}
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


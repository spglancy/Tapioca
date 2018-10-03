let ddstatus = document.getElementById("dropdownClosed");
function ddSwap() {
    if(ddstatus.id=="dropdownClosed"){
            ddstatus.id = "dropdownOpen";
    } else {
        ddstatus.id = "dropdownClosed";
    }
    return true;
}

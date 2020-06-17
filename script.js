
function checkInput() {
    if(document.getElementById("who").value == "" ||
    document.getElementById("room").value == "" ||
    document.getElementById("what").value == "" ||
    document.getElementById("why").value == "") {
        document.getElementById("submit").disabled=true;
        document.getElementById("submit").innerHTML="✗";
    } else {
        document.getElementById("submit").disabled=false;
        document.getElementById("submit").innerHTML="✓";
    }
}

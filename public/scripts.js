

function makeCall(event) {
    event.preventDefault();

    var { value } = event.target.firstElementChild;
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var xhttp = new XMLHttpRequest()
    // Open a new connection, using the GET request on the URL endpoint
    xhttp.open("POST", "api/allocateAndReport", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onload = function (responseData) {
        // Begin accessing JSON data here
        document.getElementById('response').innerHTML =  responseData.target.response;
    }
    // Send request
    xhttp.send(value);
}

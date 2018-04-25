
function myFunction() {

    document.getElementById("searchIGSN").innerText = "";

var data = document.getElementById("searchIGSN").value;

    if(data.length > 0){
    data = data.toUpperCase();

var isnum = /^\d+$/.test(data);

        if(isnum){
    data = "AU" + data;
}


			var Url = "http://dbforms.ga.gov.au/www_distp/a.igsn_api.get_igsnSample?pIGSN=" + data;


        xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", Url );

        //Get the isgn sample data from the dbforms database
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 200) {

                var xmlDoc = xmlHttp.responseXML;

                //Put data xml data into a list
                var data = xmlDoc.all;

                var JSONData = {}

                //Loops through the xml list and create a JSON object using the tagName as the key and textContent as the value
                for (var i = 0; i < data.length; i++) {

                    JSONData[data[i].tagName] = data[i].textContent
                    
                }

                
                //Content for the Goolge Maps infoWindows this is HTML
                var contentString = '<div id="content">' +
                    '<div id="siteNotice">' +
                    '</div>' +
                    '<h1 id="firstHeading" class="firstHeading"> AU' + JSONData.SAMPLENO + '</h1>' +
                    '<div id="bodyContent">' +
                    '<p><a href="http://pid.geoscience.gov.au/sample/AU' + JSONData.SAMPLENO + '" target="_blank">' +
                    'Link to AU' + JSONData.SAMPLENO +' sample details ' +
                    '</p>' +
                    '</div>' +
                    '</div>';

                //Adds the content into a Google Map Info Windows object
                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                //Set the lat and long from the sample for google maps marker 
                var myLatLng = { lat: parseFloat(JSONData.Y), lng: parseFloat(JSONData.X) };

                //Place the maker on the map
                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    title: JSONData.SAMPLENO
                });

                //Adding the info windows to the marker when it is clicked
                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });

                //Set the map to the markers position to center it
                map.setCenter(marker.getPosition());
}
            else if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 404) {
                //Error message if the sample is not found
    document.getElementById("message").innerText = "Sample " + data + " not found";
}

        };

        xmlHttp.send(null);
    } else {
        //Error message if the user did not enter in a sample number 
    document.getElementById("message").innerText = "Please enter sample number";
}


}

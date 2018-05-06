var markers = [];

document.addEventListener('DOMContentLoaded', function () {
    // your code goes here
    getSampleTypeDropdowns();
}, false);

function getIGSN() {
    clearMarkers();

var data = document.getElementById("searchIGSN").value;

    if(data.length > 0){
    data = data.toUpperCase();

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
                    '<h1 id="firstHeading" class="firstHeading"> ' + JSONData.IGSN + '</h1>' +
                    '<div id="bodyContent">' +
                    '<p><a href="http://pid.geoscience.gov.au/sample/' + JSONData.IGSN + '" target="_blank">' +
                    'Link to ' + JSONData.IGSN +' sample details ' +
                    '</p>' +
                    '</div>' +
                    '</div>';

                //Adds the content into a Google Map Info Windows object
                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                //Set the lat and long from the sample for google maps marker 
                var myLatLng = { lat: parseFloat(JSONData.HOLE_MIN_LATITUDE), lng: parseFloat(JSONData.HOLE_MIN_LONGITUDE) };

                //Place the maker on the map
                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    title: JSONData.IGSN
                });

                //Adding the info windows to the marker when it is clicked
                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });

                //Set the map to the markers position to center it
                map.setCenter(marker.getPosition());

                //Add marker to the array.
                markers.push(marker);
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

function getSearch() {

    clearMarkers();

    var country = document.getElementById("searchCountry").selectedOptions
    if (country.length > 0) {
        country = country[0].attributes[0].nodeValue;
        if (country !== 'unknown') {
            country = country.substring(0, 3);
        }
    }

    var state = document.getElementById("searchState").selectedOptions
    if (state.length > 0) {
        state = state[0].attributes[0].nodeValue;
        if (state !== 'unknown') {
            state = state.substring(0, 3);
            state = state.trim();
        }
    }

    var sampleType = document.getElementById("searchSampleType").value;
    var methodType = document.getElementById("searchMethodType").value;
    var materialType = document.getElementById("searchMaterialType").value;
    var lithology = document.getElementById("searchLithology").value;
    var entityType = document.getElementById("searchEntityType").value;

    var query = "&pNoOfLinesPerPage=250";

    if (country.length > 0) {
        query = query + "&pCountry=" + country;
    }

    if (state.length > 0) {
        query = query + "&pStateId=" + state;
    }

    if (sampleType.length > 0) {
        query = query + "&pSampleTypeNew=" + sampleType;
    }

    if (methodType.length > 0) {
        query = query + "&pSamplingMethod=" + methodType;
    }

    if (materialType.length > 0) {
        query = query + "&pMaterialClass=" + materialType;
    }

    if (lithology.length > 0) {
        query = query + "&pLithname=" + lithology;
    }

    if (entityType.length > 0) {
        query = query + "&pEntityType=" + entityType;
    }

    query = query.substring(1);

    var Url = "http://dbforms.ga.gov.au/www_distp/a.igsn_api.get_igsnSampleSet?" + query;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", Url);

    //Get the isgn sample data from the dbforms database
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 200) {

            var xmlDoc = xmlHttp.responseXML;

            //Put data xml data into a list
            var data = xmlDoc.all;


            var SampleList = [];
            var JSONData = {};

            //Loops through the xml list and create a JSON object using the tagName as the key and textContent as the value
            for (var i = 0; i < data.length; i++) {

                if (data[i].tagName === 'ROW') {
                    SampleList.push(JSONData);
                    JSONData = {};
                }
                else if (data[i].tagName !== 'ROWSET') {
                    JSONData[data[i].tagName] = data[i].textContent
                }

            }

            SampleList.push(JSONData);
            SampleList.shift()

            console.log(SampleList)

            var totalLat = 0;
            var totalLong = 0;

            for (var i = 0; i < SampleList.length; i++) {

                //Content for the Goolge Maps infoWindows this is HTML
                var content = '<div id="content">' +
                    '<div id="siteNotice">' +
                    '</div>' +
                    '<h1 id="firstHeading" class="firstHeading"> ' + SampleList[i].IGSN + '</h1>' +
                    '<div id="bodyContent">' +
                    '<p><a href="http://pid.geoscience.gov.au/sample/' + SampleList[i].IGSN + '" target="_blank">' +
                    'Link to ' + SampleList[i].IGSN + ' sample details ' +
                    '</p>' +
                    '</div>' +
                    '</div>';

                //Adds the content into a Google Map Info Windows object
                var infowindow = new google.maps.InfoWindow();

                //Set the lat and long from the sample for google maps marker 
                var myLatLng = { lat: parseFloat(SampleList[i].HOLE_MIN_LATITUDE), lng: parseFloat(SampleList[i].HOLE_MIN_LONGITUDE) };

                if (!isNaN(myLatLng.lat) && !isNaN(myLatLng.lng)) {
                    totalLat = totalLat + myLatLng.lat;
                    totalLong = totalLong + myLatLng.lng;

                    //Place the maker on the map
                    var marker = new google.maps.Marker({
                        position: myLatLng,
                        map: map,
                        title: SampleList[i].IGSN
                    });

                    google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
                        return function () {
                            infowindow.setContent(content);
                            infowindow.open(map, marker);
                        };
                    })(marker, content, infowindow));

                    //Add marker to the array.
                    markers.push(marker);

                }

                
                

            }

            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < markers.length; i++) {
                bounds.extend(markers[i].getPosition());
            }

            map.fitBounds(bounds);


            //totalLat = totalLat / SampleList.length;
            //totalLong = totalLong / SampleList.length;
            //var avgLatLng = { lat: totalLat, lng: totalLong };

            
                //Set the map to the markers position to center it
            //map.setCenter(avgLatLng);

            
        }
        else if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 404) {
            //Error message if the sample is not found
            document.getElementById("message").innerText = "Sample " + data + " not found";
        }

    };

    xmlHttp.send(null);




   
}

function getSampleTypeDropdowns() {

    var Url = "http://dbforms.ga.gov.au/www_distp/a.igsn_api.get_SampleTypes";

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", Url, true);

    //Get the isgn sample data from the dbforms database
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 200) {

            var xmlDoc = xmlHttp.responseXML;

            //Put data xml data into a list
            var data = xmlDoc.all;

            //Loops through the xml list and create a JSON object using the tagName as the key and textContent as the value
            for (var i = 0; i < data.length; i++) {

                var x = document.getElementById("searchSampleType");

                if (data[i].tagName == 'SAMPLE_TYPE' && data[i].textContent.length > 0) {
                    var option = document.createElement("option");
                    option.text = data[i].textContent;
                    option.setAttribute("data-tokens", data[i].textContent)
                    x.add(option);
                }
            }


            getMethodTypeDropdowns();
        }
        else if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 404) {
            //Error message if the sample is not found
            document.getElementById("message").innerText = "Sample " + data + " not found";
        }

    };

    xmlHttp.send(null);
}

function getMethodTypeDropdowns() {

    var Url = "http://dbforms.ga.gov.au/www_distp/a.igsn_api.get_MethodTypes";

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", Url, true);

    //Get the isgn sample data from the dbforms database
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 200) {

            var xmlDoc = xmlHttp.responseXML;

            //Put data xml data into a list
            var data = xmlDoc.all;

            var JSONData = {}

            //Loops through the xml list and create a JSON object using the tagName as the key and textContent as the value
            for (var i = 0; i < data.length; i++) {

                var x = document.getElementById("searchMethodType");
               
                if (data[i].tagName == 'METHOD_TYPE' && data[i].textContent.length > 0) {
                    var option = document.createElement("option");
                    option.text = data[i].textContent;
                    option.setAttribute("data-tokens", data[i].textContent)
                    x.add(option);
                }
            }

            getMaterialTypeDropdowns();

        }
        else if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 404) {
            //Error message if the sample is not found
            document.getElementById("message").innerText = "Sample " + data + " not found";
        }

    };

    xmlHttp.send(null);
} 

function getMaterialTypeDropdowns() {

    var Url = "http://dbforms.ga.gov.au/www_distp/a.igsn_api.get_MaterialTypes";

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", Url, true);

    //Get the isgn sample data from the dbforms database
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 200) {

            var xmlDoc = xmlHttp.responseXML;

            //Put data xml data into a list
            var data = xmlDoc.all;

            var JSONData = {}

            //Loops through the xml list and create a JSON object using the tagName as the key and textContent as the value
            for (var i = 0; i < data.length; i++) {

                var x = document.getElementById("searchMaterialType");

                if (data[i].tagName == 'MATERIAL_TYPE' && data[i].textContent.length > 0) {
                    var option = document.createElement("option");
                    option.text = data[i].textContent;
                    option.setAttribute("data-tokens", data[i].textContent)
                    x.add(option);
                }
            }

            getLithologyDropdowns();

        }
        else if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 404) {
            //Error message if the sample is not found
            document.getElementById("message").innerText = "Sample " + data + " not found";
        }

    };

    xmlHttp.send(null);
}

function getLithologyDropdowns() {

    var Url = "http://dbforms.ga.gov.au/www_distp/a.igsn_api.get_Lithologies";

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", Url, true);

    //Get the isgn sample data from the dbforms database
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 200) {

            var xmlDoc = xmlHttp.responseXML;

            //Put data xml data into a list
            var data = xmlDoc.all;

            var JSONData = {}

            //Loops through the xml list and create a JSON object using the tagName as the key and textContent as the value
            for (var i = 0; i < data.length; i++) {

                var x = document.getElementById("searchLithology");

                if (data[i].tagName == 'LITHNAME' && data[i].textContent.length > 0) {
                    var option = document.createElement("option");
                    option.text = data[i].textContent;
                    option.setAttribute("data-tokens", data[i].textContent)
                    x.add(option);
                }
            }

            getEntityTypeDropdowns();

        }
        else if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 404) {
            //Error message if the sample is not found
            document.getElementById("message").innerText = "Sample " + data + " not found";
        }

    };

    xmlHttp.send(null);
} 

function getEntityTypeDropdowns() {

    var Url = "http://dbforms.ga.gov.au/www_distp/a.igsn_api.get_EntityTypes";

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", Url, true);

    //Get the isgn sample data from the dbforms database
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 200) {

            var xmlDoc = xmlHttp.responseXML;

            //Put data xml data into a list
            var data = xmlDoc.all;

            var JSONData = {}

            //Loops through the xml list and create a JSON object using the tagName as the key and textContent as the value
            for (var i = 0; i < data.length; i++) {

                var x = document.getElementById("searchEntityType");

                if (data[i].tagName == 'ENTITY_TYPE' && data[i].textContent.length > 0) {
                    var option = document.createElement("option");
                    option.text = data[i].textContent;
                    option.setAttribute("data-tokens", data[i].textContent)
                    x.add(option);
                }
            }

        }
        else if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 404) {
            //Error message if the sample is not found
            document.getElementById("message").innerText = "Sample " + data + " not found";
        }

    };

    xmlHttp.send(null);
} 


function clearMarkers() {
    //Loop through all the markers and remove
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
};

'use strict';

var map = null;

angular.module('myApp.view1', ['ngRoute','am.multiselect'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])


    // http://dbforms.ga.gov.au/www_distp/a.igsn_api.get_MaterialTypes
    // http://dbforms.ga.gov.au/www_distp/a.igsn_api.get_EntityTypes
    // http://dbforms.ga.gov.au/www_distp/a.igsn_api.get_Lithologies

    .factory('dbServices', ['$http', '$q', function ($http, $q) {
        return {
            getCountries: function () {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: 'http://dbforms.ga.gov.au/www_distp/a.igsn_api.get_Countries'
                }).then(function successCallback(response) {
                    // Categorize briefs according to status
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });

                return deferred.promise;
            },
            getStates: function () {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: 'http://dbforms.ga.gov.au/www_distp/a.igsn_api.get_States'
                }).then(function successCallback(response) {
                    // Categorize briefs according to status
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });

                return deferred.promise;
            },
            getSampleTypes: function () {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: 'http://dbforms.ga.gov.au/www_distp/a.igsn_api.get_SampleTypes'
                }).then(function successCallback(response) {
                    // Categorize briefs according to status
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });

                return deferred.promise;
            },
            getMethodTypes: function () {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: 'http://dbforms.ga.gov.au/www_distp/a.igsn_api.get_MethodTypes'
                }).then(function successCallback(response) {
                    // Categorize briefs according to status
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });

                return deferred.promise;
            },
            getMaterialTypes: function () {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: 'http://dbforms.ga.gov.au/www_distp/a.igsn_api.get_MaterialTypes'
                }).then(function successCallback(response) {
                    // Categorize briefs according to status
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });

                return deferred.promise;
            },
            getEntityTypes: function () {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: 'http://dbforms.ga.gov.au/www_distp/a.igsn_api.get_EntityTypes'
                }).then(function successCallback(response) {
                    // Categorize briefs according to status
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });

                return deferred.promise;
            },
            getLithologiesTypes: function () {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: 'http://dbforms.ga.gov.au/www_distp/a.igsn_api.get_Lithologies'
                }).then(function successCallback(response) {
                    // Categorize briefs according to status
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });

                return deferred.promise;
            },
            getIGSN: function (igsn) {

                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: 'http://dbforms.ga.gov.au/www_distp/a.igsn_api.get_igsnSample?pIGSN=' + igsn
                }).then(function successCallback(response) {
                    // Categorize briefs according to status
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });

                return deferred.promise;

            },
            getSearch: function (query, pageNo) {

                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: 'http://dbforms.ga.gov.au/www_distp/a.igsn_api.get_igsnSampleSet?pNoOfLinesPerPage=100' + query + '&pPageNo=' + pageNo
                }).then(function successCallback(response) {
                    // Categorize briefs according to status
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.reject(response);

                });

                return deferred.promise;

            }
        };
    }])

    .controller('View1Ctrl', ['$scope', 'dbServices', function ($scope, dbServices) {

        $scope.searchIGSNMessage = '';
        $scope.searchMessage = '';
        $scope.previousPageExist = false;
        $scope.nextPageExist = false;
        $scope.results = [];
        $scope.markers = [];

        dbServices.getCountries().then(function (data) {
            $scope.countries = formatData(data, 'COUNTRY');
            applySelectize($scope.countries, '#searchCountries')
        });
        dbServices.getStates().then(function (data) {
            $scope.states = formatData(data, 'STATE');
            $scope.states.sort();
            applySelectize($scope.states, '#searchStates')
        });
        dbServices.getSampleTypes().then(function (data) {
            $scope.sampleTypes = formatData(data, 'SAMPLE_TYPE');
            $scope.sampleTypes.sort();
            applySelectize($scope.sampleTypes, '#searchSampleTypes')
        });
        dbServices.getMethodTypes().then(function (data) {
            $scope.methodTypes = formatData(data, 'METHOD_TYPE');
            $scope.methodTypes.sort();
            applySelectize($scope.methodTypes, '#searchMethodTypes')
        });
        dbServices.getMaterialTypes().then(function (data) {
            $scope.materialTypes = formatData(data, 'MATERIAL_TYPE');
            $scope.materialTypes.sort();
            applySelectize($scope.materialTypes, '#searchMaterialTypes')
        });
        dbServices.getEntityTypes().then(function (data) {
            $scope.entityTypes = formatData(data, 'ENTITY_TYPE');
            $scope.entityTypes.sort();
            applySelectize($scope.entityTypes, '#searchEntityTypes')
        });
        dbServices.getLithologiesTypes().then(function (data) {
            $scope.lithologiesTypes = formatData(data, 'LITHNAME');
            $scope.lithologiesTypes.sort();
            applySelectize($scope.lithologiesTypes, '#searchLithTypes')
        });


        initializeMap();

        function clearMessages() {
            $scope.searchIGSNMessage = '';
            $scope.searchMessage = '';
            $scope.previousPageExist = false;
            $scope.nextPageExist = false;
        }


        function placeMultipleMakers(data) {

            clearMarkers();

            //Put data xml data into a list
            var parser = new DOMParser();
            data = parser.parseFromString(data, "text/xml").all;

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
            SampleList.shift();

            $scope.results = SampleList;

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
                var myLatLng = {
                    lat: parseFloat(SampleList[i].HOLE_MIN_LATITUDE),
                    lng: parseFloat(SampleList[i].HOLE_MIN_LONGITUDE)
                };
                if (isNaN(myLatLng.lat) && isNaN(myLatLng.lng)) {
                    myLatLng = {
                        lat: parseFloat(SampleList[i].SAMPLE_MIN_LATITUDE),
                        lng: parseFloat(SampleList[i].SAMPLE_MIN_LONGITUDE)
                    };
                }
                if (isNaN(myLatLng.lat) && isNaN(myLatLng.lng)) {
                    myLatLng = {lat: parseFloat(SampleList[i].Y), lng: parseFloat(SampleList[i].X)};
                }

                if (!isNaN(myLatLng.lat) && !isNaN(myLatLng.lng)) {

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
                    $scope.markers.push(marker);

                }

            }

            console.log($scope.markers.length);
            console.log($scope.results.length);

            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < $scope.markers.length; i++) {
                bounds.extend($scope.markers[i].getPosition());
            }

            map.fitBounds(bounds);

        }

        function setNextAndPrev() {
            dbServices.getSearch($scope.query, $scope.pageNo + 1).then(function (data) {
                $scope.nextPageExist = true;
                $scope.nextData = data;

            }, function errorCallback() {
                $scope.nextPageExist = false;
            });

            dbServices.getSearch($scope.query, $scope.pageNo - 1).then(function (data) {
                $scope.previousPageExist = true;
                $scope.previousData = data;
            }, function errorCallback() {
                $scope.previousPageExist = false;
            });

            console.log($scope.results);
        }

        function clearMarkers() {
            //Loop through all the $scope.markers and remove
            for (var i = 0; i < $scope.markers.length; i++) {
                $scope.markers[i].setMap(null);
            }
            $scope.markers = [];
        }


        $scope.searchIGSN = function (igsn) {

            var isgn = igsn;

            clearMessages();
            clearMarkers();

            dbServices.getIGSN(igsn).then(function (data) {

                $scope.results = [];

                //Put data xml data into a list
                var parser = new DOMParser();
                data = parser.parseFromString(data, "text/xml").all;

                var JSONData = {};

                //Loops through the xml list and create a JSON object using the tagName as the key and textContent as the value
                for (var i = 0; i < data.length; i++) {

                    JSONData[data[i].tagName] = data[i].textContent

                }

                $scope.results.push(JSONData);

                //Content for the Google Maps infoWindows this is HTML
                var contentString = '<div id="content">' +
                    '<div id="siteNotice">' +
                    '</div>' +
                    '<h1 id="firstHeading" class="firstHeading"> ' + JSONData.IGSN + '</h1>' +
                    '<div id="bodyContent">' +
                    '<p><a href="http://pid.geoscience.gov.au/sample/' + JSONData.IGSN + '" target="_blank">' +
                    'Link to ' + JSONData.IGSN + ' sample details ' +
                    '</p>' +
                    '</div>' +
                    '</div>';

                //Adds the content into a Google Map Info Windows object
                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                //Set the lat and long from the sample for google maps marker
                var myLatLng = {
                    lat: parseFloat(JSONData.HOLE_MIN_LATITUDE),
                    lng: parseFloat(JSONData.HOLE_MIN_LONGITUDE)
                };
                if (isNaN(myLatLng.lat) && isNaN(myLatLng.lng)) {
                    myLatLng = {
                        lat: parseFloat(JSONData.SAMPLE_MIN_LATITUDE),
                        lng: parseFloat(JSONData.SAMPLE_MIN_LONGITUDE)
                    };
                }
                if (isNaN(myLatLng.lat) && isNaN(myLatLng.lng)) {
                    myLatLng = {lat: parseFloat(JSONData.Y), lng: parseFloat(JSONData.X)};
                }


                if (!isNaN(myLatLng.lat) && !isNaN(myLatLng.lng)) {
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

                    //Set the map to the $scope.markers position to center it
                    map.setCenter(marker.getPosition());

                    //Add marker to the array.
                    $scope.markers.push(marker);
                }

            }, function errorCallback(response) {
                $scope.searchIGSNMessage = "No data matches sample " + isgn;
            });

        };


        $scope.search = function (countryQuery, stateQuery, sampleTypeQuery, methodTypeQuery, materialTypeQuery, entityTypeQuery, lithologyQuery) {

            clearMessages();

            $scope.pageNo = 1;

            var query = '';

            if (countryQuery !== undefined && countryQuery.length > 0) {
                query = query + "&pCountry=" + countryQuery;
            }

            if (stateQuery !== undefined && stateQuery.length > 0) {
                query = query + "&pStateId=" + stateQuery;
            }

            if (sampleTypeQuery !== undefined && sampleTypeQuery.length > 0) {
                query = query + "&pSampleTypeNew=" + sampleTypeQuery;
            }

            if (methodTypeQuery !== undefined && methodTypeQuery.length > 0) {
                query = query + "&pSamplingMethod=" + methodTypeQuery;
            }

            if (materialTypeQuery !== undefined && materialTypeQuery.length > 0) {
                query = query + "&pMaterialClass=" + materialTypeQuery;
            }

            if (entityTypeQuery !== undefined && entityTypeQuery.length > 0) {
                query = query + "&pEntityType=" + entityTypeQuery;
            }

            if (lithologyQuery !== undefined && lithologyQuery.length > 0) {
                query = query + "&pLithname=" + lithologyQuery;
            }

            $scope.query = query;

            dbServices.getSearch($scope.query, $scope.pageNo).then(function (data) {

                placeMultipleMakers(data);
                setNextAndPrev();

            }, function errorCallback(response) {
                $scope.searchMessage = "No data matches this search";
            });
        };


        $scope.next = function () {
            placeMultipleMakers($scope.nextData);
            $scope.pageNo = $scope.pageNo + 1;
            setNextAndPrev();
        }

        $scope.previous = function () {
            placeMultipleMakers($scope.previousData);
            $scope.pageNo = $scope.pageNo - 1;
            setNextAndPrev();
        }


    }]);

function formatData(data, tagName) {

    var list = [];

    var parser = new DOMParser();
    data = parser.parseFromString(data, "text/xml").all;

    for (var i = 0; i < data.length; i++) {

        if (data[i].tagName == tagName && data[i].textContent !== undefined) {
            list.push(data[i].textContent);
        }
    }

    return list;

}

function applySelectize(data, elementID) {

    var options = [{text: 'None', value: ''}];


    for (var i = 0; i < data.length; i++) {

        if (data[i].length > 0) {

            if (elementID === '#searchStates') {
                var option = {text: getStateNameFromCode(data[i]), value: data[i]};

                console.log(option);

                options.push(option);
            }
            else if (elementID === '#searchCountries') {
                var option = {text: getCountryNameFromISO3(data[i]), value: data[i]};
                options.push(option);
            }
            else {
                var option = {text: data[i].capitalize(), value: data[i]};
                options.push(option);
            }
        }

    }

    $(elementID).selectize({
        allowEmptyOption: true,
        create: false,
        options: options
    });

}

function getCountryNameFromISO3(ISO3) {

    var name;

    var iso3ToName = {
        ABW: "Aruba",
        AFG: "Afghanistan",
        AGO: "Angola",
        AIA: "Anguilla",
        ALA: "Åland Islands",
        ALB: "Albania",
        AND: "Andorra",
        ANT: "Netherlands Antilles",
        ARE: "United Arab Emirates",
        ARG: "Argentina",
        ARM: "Armenia",
        ASM: "American Samoa",
        ATA: "Antarctica",
        ATF: "French Southern Territories",
        ATG: "Antigua and Barbuda",
        AUS: "Australia",
        AUT: "Austria",
        AZE: "Azerbaijan",
        BDI: "Burundi",
        BEL: "Belgium",
        BEN: "Benin",
        BFA: "Burkina Faso",
        BGD: "Bangladesh",
        BGR: "Bulgaria",
        BHR: "Bahrain",
        BHS: "Bahamas",
        BIH: "Bosnia and Herzegovina",
        BLM: "Saint Barthélemy",
        BLR: "Belarus",
        BLZ: "Belize",
        BMU: "Bermuda",
        BOL: "Bolivia, Plurinational State of",
        BRA: "Brazil",
        BRB: "Barbados",
        BRN: "Brunei Darussalam",
        BTN: "Bhutan",
        BVT: "Bouvet Island",
        BWA: "Botswana",
        CAF: "Central African Republic",
        CAN: "Canada",
        CCK: "Cocos (Keeling) Islands",
        CHE: "Switzerland",
        CHL: "Chile",
        CHN: "China",
        CIV: "Côte d'Ivoire",
        CMR: "Cameroon",
        COD: "Congo, the Democratic Republic of the",
        COG: "Congo",
        COK: "Cook Islands",
        COL: "Colombia",
        COM: "Comoros",
        CPV: "Cape Verde",
        CRI: "Costa Rica",
        CUB: "Cuba",
        CXR: "Christmas Island",
        CYM: "Cayman Islands",
        CYP: "Cyprus",
        CZE: "Czech Republic",
        DEU: "Germany",
        DJI: "Djibouti",
        DMA: "Dominica",
        DNK: "Denmark",
        DOM: "Dominican Republic",
        DZA: "Algeria",
        ECU: "Ecuador",
        EGY: "Egypt",
        ERI: "Eritrea",
        ESH: "Western Sahara",
        ESP: "Spain",
        EST: "Estonia",
        ETH: "Ethiopia",
        FIN: "Finland",
        FJI: "Fiji",
        FLK: "Falkland Islands (Malvinas)",
        FRA: "France",
        FRO: "Faroe Islands",
        FSM: "Micronesia, Federated States of",
        GAB: "Gabon",
        GBR: "United Kingdom",
        GEO: "Georgia",
        GGY: "Guernsey",
        GHA: "Ghana",
        GIB: "Gibraltar",
        GIN: "Guinea",
        GLP: "Guadeloupe",
        GMB: "Gambia",
        GNB: "Guinea-Bissau",
        GNQ: "Equatorial Guinea",
        GRC: "Greece",
        GRD: "Grenada",
        GRL: "Greenland",
        GTM: "Guatemala",
        GUF: "French Guiana",
        GUM: "Guam",
        GUY: "Guyana",
        HKG: "Hong Kong",
        HMD: "Heard Island and McDonald Islands",
        HND: "Honduras",
        HRV: "Croatia",
        HTI: "Haiti",
        HUN: "Hungary",
        IDN: "Indonesia",
        IMN: "Isle of Man",
        IND: "India",
        IOT: "British Indian Ocean Territory",
        IRL: "Ireland",
        IRN: "Iran, Islamic Republic of",
        IRQ: "Iraq",
        ISL: "Iceland",
        ISR: "Israel",
        ITA: "Italy",
        JAM: "Jamaica",
        JEY: "Jersey",
        JOR: "Jordan",
        JPN: "Japan",
        KAZ: "Kazakhstan",
        KEN: "Kenya",
        KGZ: "Kyrgyzstan",
        KHM: "Cambodia",
        KIR: "Kiribati",
        KNA: "Saint Kitts and Nevis",
        KOR: "Korea, Republic of",
        KWT: "Kuwait",
        LAO: "Lao People's Democratic Republic",
        LBN: "Lebanon",
        LBR: "Liberia",
        LBY: "Libyan Arab Jamahiriya",
        LCA: "Saint Lucia",
        LIE: "Liechtenstein",
        LKA: "Sri Lanka",
        LSO: "Lesotho",
        LTU: "Lithuania",
        LUX: "Luxembourg",
        LVA: "Latvia",
        MAC: "Macao",
        MAF: "Saint Martin (French part)",
        MAR: "Morocco",
        MCO: "Monaco",
        MDA: "Moldova, Republic of",
        MDG: "Madagascar",
        MDV: "Maldives",
        MEX: "Mexico",
        MHL: "Marshall Islands",
        MKD: "Macedonia, the former Yugoslav Republic of",
        MLI: "Mali",
        MLT: "Malta",
        MMR: "Myanmar",
        MNE: "Montenegro",
        MNG: "Mongolia",
        MNP: "Northern Mariana Islands",
        MOZ: "Mozambique",
        MRT: "Mauritania",
        MSR: "Montserrat",
        MTQ: "Martinique",
        MUS: "Mauritius",
        MWI: "Malawi",
        MYS: "Malaysia",
        MYT: "Mayotte",
        NAM: "Namibia",
        NCL: "New Caledonia",
        NER: "Niger",
        NFK: "Norfolk Island",
        NGA: "Nigeria",
        NIC: "Nicaragua",
        NIU: "Niue",
        NLD: "Netherlands",
        NOR: "Norway",
        NPL: "Nepal",
        NRU: "Nauru",
        NZL: "New Zealand",
        OMN: "Oman",
        PAK: "Pakistan",
        PAN: "Panama",
        PCN: "Pitcairn",
        PER: "Peru",
        PHL: "Philippines",
        PLW: "Palau",
        PNG: "Papua New Guinea",
        POL: "Poland",
        PRI: "Puerto Rico",
        PRK: "Korea, Democratic People's Republic of",
        PRT: "Portugal",
        PRY: "Paraguay",
        PSE: "Palestinian Territory, Occupied",
        PYF: "French Polynesia",
        QAT: "Qatar",
        REU: "Réunion",
        ROU: "Romania",
        RUS: "Russian Federation",
        RWA: "Rwanda",
        SAU: "Saudi Arabia",
        SDN: "Sudan",
        SEN: "Senegal",
        SGP: "Singapore",
        SGS: "South Georgia and the South Sandwich Islands",
        SHN: "Saint Helena, Ascension and Tristan da Cunha",
        SJM: "Svalbard and Jan Mayen",
        SLB: "Solomon Islands",
        SLE: "Sierra Leone",
        SLV: "El Salvador",
        SMR: "San Marino",
        SOM: "Somalia",
        SPM: "Saint Pierre and Miquelon",
        SRB: "Serbia",
        STP: "Sao Tome and Principe",
        SUR: "Suriname",
        SVK: "Slovakia",
        SVN: "Slovenia",
        SWE: "Sweden",
        SWZ: "Swaziland",
        SYC: "Seychelles",
        SYR: "Syrian Arab Republic",
        TCA: "Turks and Caicos Islands",
        TCD: "Chad",
        TGO: "Togo",
        THA: "Thailand",
        TJK: "Tajikistan",
        TKL: "Tokelau",
        TKM: "Turkmenistan",
        TLS: "Timor-Leste",
        TON: "Tonga",
        TTO: "Trinidad and Tobago",
        TUN: "Tunisia",
        TUR: "Turkey",
        TUV: "Tuvalu",
        TWN: "Taiwan, Province of China",
        TZA: "Tanzania, United Republic of",
        UGA: "Uganda",
        UKR: "Ukraine",
        UMI: "United States Minor Outlying Islands",
        URY: "Uruguay",
        USA: "United States",
        UZB: "Uzbekistan",
        VAT: "Holy See (Vatican City State)",
        VCT: "Saint Vincent and the Grenadines",
        VEN: "Venezuela, Bolivarian Republic of",
        VGB: "Virgin Islands, British",
        VIR: "Virgin Islands, U.S.",
        VNM: "Viet Nam",
        VUT: "Vanuatu",
        WLF: "Wallis and Futuna",
        WSM: "Samoa",
        YEM: "Yemen",
        ZAF: "South Africa",
        ZMB: "Zambia",
        ZWE: "Zimbabwe"
    };

    if (iso3ToName[ISO3] !== undefined) {
        name = iso3ToName[ISO3]
    }
    else {
        name = ISO3;
    }

    return name
}

function getStateNameFromCode(code) {

    var name;

    var codeToName = {
        NSW: "New South Wales",
        QLD: "Queensland",
        SA: "South Australia",
        TAS: "Tasmania",
        VIC: "Victoria",
        WA: "Western Australia",
        ACT: "Australian Capital Territory",
        JBT: "Jervis Bay Territory",
        NT: "Northern Territory",
        AAT: "Australian Antarctic Territory",
        NFK: "Norfolk Island",
        ZOCA: "Zone of Cooperation Area",
        JPDA: "Joint Petroleum Development Area"
    };

    if (codeToName[code] !== undefined) {
        name = codeToName[code]
    }
    else {
        name = code;
    }

    return name
}

String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
    });
};

function initializeMap() {
    var mapOptions = {
        center: new google.maps.LatLng(-35.280849, 149.129886),
        zoom: 10
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);
}






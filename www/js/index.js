/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var locationField;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, true);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        deviceProperty(id);
        getLocation();
        watchLocation();
    }
};

app.initialize();
function deviceProperty(id){
    showAlert('showAlert' + id);
    alert('test' + id);
     var element = document.getElementById('deviceProperties');
        element.innerHTML = 'Device Model: '    + device.model    + ', ' +
                            'Device Cordova: '  + device.cordova  + ', ' +
                            'Device Platform: ' + device.platform + ', ' +
                            'Device UUID: '     + device.uuid     + ', ' +
                            'Device Version: '  + device.version  + ', ';

}
// alert dialog dismissed
function alertDismissed() {
    // do something
}

function showAlert(message) {
        navigator.notification.alert(
            message,  // message
            alertDismissed,         // callback
            'TEST',            // title
            'Done'                  // buttonName
        );
    }
function getLocation(){
    locationField = "geolocation";
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true, timeout: 30000 });
}

function watchLocation(){
    locationField = "watchlocation";
    navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true, timeout: 30000 });
}

function onSuccess(position) {
    var element = document.getElementById(locationField);
    element.innerHTML = 'Latitude: '           + position.coords.latitude              + ', ' +
                        'Longitude: '          + position.coords.longitude             + ', ' +
                        'Altitude: '           + position.coords.altitude              + ', ' +
                        'Accuracy: '           + position.coords.accuracy              + ', ' +
                        'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + ', ' +
                        'Heading: '            + position.coords.heading               + ', ' +
                        'Speed: '              + position.coords.speed                 + ', ' +
                        'Timestamp: '          + position.timestamp                    + ', ';
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

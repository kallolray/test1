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
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
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
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
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
        //watchLocation();
    }
};

app.initialize();
function deviceProperty(id){
    showAlert('showAlert' + id);
    //alert('test' + id);
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
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true});
}

function watchLocation(){
    var watchID = navigator.geolocation.watchPosition(onSuccess2, function(){}, {timeout: 5000 });
}
function onSuccess2(position) {
    var element = document.getElementById("watchlocation");
    element.innerHTML = 'Latitude: '           + position.coords.latitude              + ', ' +
                        'Longitude: '          + position.coords.longitude             + ', ' +
                        'Accuracy: '           + position.coords.accuracy              + ', ' +
                        'Timestamp: '          + position.timestamp                    + ', <br/ >' +
                        element.innerHTML;
}

function onSuccess(position) {
    var element = document.getElementById("geolocation");
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

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
  // Uncomment to view the base64-encoded image data
  // console.log(imageData);

  // Get image handle
  //
  var smallImage = document.getElementById('smallImage');

  // Unhide image elements
  //
  smallImage.style.display = 'block';

  // Show the captured photo
  // The in-line CSS rules are used to resize the image
  //
  smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
  // Uncomment to view the image file URI
  // console.log(imageURI);

  // Get image handle
  //
  var largeImage = document.getElementById('largeImage');

  // Unhide image elements
  //
  largeImage.style.display = 'block';

  // Show the captured photo
  // The in-line CSS rules are used to resize the image
  //
  largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
    destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function capturePhotoEdit() {
  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
    destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}

// Called if something bad happens.
//
function onFail(message) {
  alert('Failed because: ' + message);
}

// Called when capture operation is finished
//
function captureSuccess(mediaFiles) {
    var i, len;
    var element = document.getElementById("captureFile");
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        //uploadFile(mediaFiles[i]);
        element.innerHTML = "Path : " + mediaFiles[i].fullPath + ", " +
            "Name : " + mediaFiles[i].name

    }
}

// Called if something bad happens.
//
function captureError(error) {
    var msg = 'An error occurred during capture: ' + error.code;
    navigator.notification.alert(msg, null, 'Uh oh!');
}

// A button will call this function
//
function captureAudio() {
    // Launch device audio recording application,
    // allowing user to capture up to 2 audio clips
    navigator.device.capture.captureAudio(captureSuccess, captureError, {limit: 2});

    // Launch device camera application,
    //navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 2});

    // start video capture
    //navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:2});
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}

function directoryReadersuccess(entries) {
    var i,
        element = document.getElementById("directoryList");
    for (i=0; i<entries.length; i++) {
        element.innerHTML += "Name: " + entries[i].name + ", " +
            "File?: " + entries[i].isFile + ", " +
            "Directory?: " + entries[i].isDirectory + ", " +
            "Path: " + entries[i].fullPath + "<br>";
        if (entries[i].isDirectory){
            var directoryReader = entries[i].createReader();
            directoryReader.readEntries(directoryReadersuccess,directoryReaderfail);
        }
    }
}

function directoryReaderfail(error) {
    alert("Failed to list directory contents: " + error.code);
}

function dirReader(){
    // Get a directory reader
    var store = cordova.file.dataDirectory;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFail); //PERSISTENT or TEMPORARY
    window.resolveLocalFileSystemURI(store, onFileSystemSuccess, onFail);
}

function onFileSystemSuccess(fileSystem) {
    var element = document.getElementById("directoryList");
    element.innerHTML += "fileSystem.name:" + fileSystem.name + ", fileSystem.root.name : " + fileSystem.root.name + "<br>";

    var directoryReader = fileSystem.root.createReader();

    // Get a list of all the entries in the directory
    directoryReader.readEntries(directoryReadersuccess,directoryReaderfail);
}

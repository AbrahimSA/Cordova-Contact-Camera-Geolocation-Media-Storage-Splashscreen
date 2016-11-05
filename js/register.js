var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    }
};



    $("#Register").click(function() {
       //alert('Start Register');
       getPosition();
       localStorage.setItem("user",$("#user").val());
       localStorage.setItem("pwd",$("#pwd").val());
       localStorage.setItem("phone",$("#phone").val());
       localStorage.setItem("photo",$('#photo').attr('src'));
       alert('User save!');
       //localStorage.setItem("location",$("#location").val());
      //window.location = 'index.html';
      //$( "#returnLogin" ).click()
    });


    $("#returnLogin").click(function() {
       // alert("return");
            window.location = 'index.html';

    });

        $("#photo").click(function() {
                   // alert("Photo Click")
                   navigator.camera.getPicture(onSuccess, onFail, {
                      quality: 100,
                      allowEdit:true,
                      targetWidth:225,
                      targetHeight:225,
                      destinationType: Camera.DestinationType.DATA_URL
                   });

                   function onSuccess(imageData) {
                   // alert("Photo Save");
                     $('#photo').attr('src',"data:image/jpeg;base64," + imageData);
                     // var image = document.getElementById('photo');
                     // image.src = "data:image/jpeg;base64," + imageData;
                   }

                   function onFail(message) {
                      alert('Failed because: ' + message);
                   }
        });


        //function loadContact() { ALL
        $( window ).load(function() {
             //alert("load");
              $("#user").val(localStorage.getItem("user"));
              $("#pwd").val(localStorage.getItem("pwd"));
              $("#phone").val(localStorage.getItem("phone"));
              $('#location').val(localStorage.getItem("location"));
              $('#photo').attr('src',localStorage.getItem("photo"));
         });


////////////////////  GEOLOCATION

//document.getElementById("getPosition").addEventListener("click", getPosition);

function getPosition() {
  //alert("getPosition");
   var options = {
      enableHighAccuracy: true,
      maximumAge: 3600000
   }

   var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

           function onSuccess(position) {
           //alert("onSuccess");
           var local = 'Latitude: ' + position.coords.latitude  + ' Longitude: '
                + position.coords.longitude  + ' Altitude: ' + position.coords.altitude;
          //  alert(local) ;
           localStorage.setItem("location",local);
           $("#location").val(local);

             /*
              alert('Latitude: '          + position.coords.latitude          + '\n' +
                 'Longitude: '         + position.coords.longitude         + '\n' +
                 'Altitude: '          + position.coords.altitude          + '\n' +
                 'Accuracy: '          + position.coords.accuracy          + '\n' +
                 'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                 'Heading: '           + position.coords.heading           + '\n' +
                 'Speed: '             + position.coords.speed             + '\n' +
                 'Timestamp: '         + position.timestamp                + '\n');*/
           };

           function onError(error) {
              alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
           }
        }

        function watchPosition() {

           var options = {
              maximumAge: 3600000,
              timeout: 3000,
              enableHighAccuracy: true,
           }

           var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

           function onSuccess(position) {

              alert('Latitude: '          + position.coords.latitude          + '\n' +
                 'Longitude: '         + position.coords.longitude         + '\n' +
                 'Altitude: '          + position.coords.altitude          + '\n' +
                 'Accuracy: '          + position.coords.accuracy          + '\n' +
                 'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                 'Heading: '           + position.coords.heading           + '\n' +
                 'Speed: '             + position.coords.speed             + '\n' +
                 'Timestamp: '         + position.timestamp                + '\n');
           };

           function onError(error) {
              alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
           }

        }

app.initialize();
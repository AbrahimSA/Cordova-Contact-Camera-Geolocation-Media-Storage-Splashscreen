

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

var selectContact = '';
var imgclick = false;

    $("#btnHome").click(function() {
       window.location = 'index.html';
    });

     $( "#btnRegister" ).click(function() {
           window.location = 'register.html';
     });



       //function loadContact() { ALL
        $( window ).load(function() {

                        //alert('loadContact');
                        var options = new ContactFindOptions();
                        options.filter="";
                        options.multiple=true;
                        var fields = ["*"];
                       // alert('loadContact2');
                        navigator.contacts.find(fields, onSuccess, onError, options);

                         function onSuccess(contacts) {
                               // alert('onSuccess00');
                                for (var i = 0; i < contacts.length; i++) { //
                                    // alert('onSuccess01: ' + contacts[i].displayName);
                                     var new_contact = '';
                                   //  alert(contacts[i].id);
                                     if(contacts[i].displayName) {
                                        //href="tel:' + contacts[i].phoneNumbers + '"
                                          if(contacts[i].photos ) { //&& contacts[i].photos.length
                                            new_contact += '<li class="callPhoneButton" id="li_' + contacts[i].id + '"><a id="name_' + contacts[i].id + '" data-rel="popup" data-position-to="window" data-role="button" data-transition="fade" ><img href="#addContact" class="btnItemContact" id="img_' + contacts[i].id + '" src="' + contacts[i].photos[0].value +'" alt="img/contact.jpeg">';
                                          } else {
                                            new_contact += '<li class="callPhoneButton" id="li_' + contacts[i].id + '"><a id="name_' + contacts[i].id + '" data-rel="popup" data-position-to="window" data-role="button" data-transition="fade" ><img  href="#addContact" class="btnItemContact" id="img_' + contacts[i].id + '" src="img/contact.jpeg" alt="img/contact.jpeg">';
                                          }
                                        //  alert('onSuccess02');
                                          new_contact += '<h2 id="nameh2_' + contacts[i].id + '"> ' + contacts[i].displayName + '</h2>';

                                          if(contacts[i].phoneNumbers && contacts[i].phoneNumbers.length) {
                                             new_contact += '<p id="num_' + contacts[i].id + '">' + contacts[i].phoneNumbers[0].value + '</p></a><a id="del_' + contacts[i].id + '" href="#deleteContact" class="btnConfirmDelContact" data-rel="popup" data-position-to="window" data-icon="delete" data-transition="pop" aria-haspopup="true"  aria-expanded="false" class="ui-btn ui-btn-icon-notext ui-icon-delete ui-btn-a" title=""></a></li>';
                                          } else {
                                            new_contact += '<p id="num_' + contacts[i].id + '">Without Number' + '</p></a><a id="del_' + contacts[i].id + '" href="#deleteContact" class="btnConfirmDelContact"  data-rel="popup" data-position-to="window" data-icon="delete" data-transition="pop" aria-haspopup="true"  aria-expanded="false" class="ui-btn ui-btn-icon-notext ui-icon-delete ui-btn-a" title=""></a></li>';
                                          }
                                        // alert('onSuccess03');
                                         // $('#listContact').append('<li class="ui-li-has-alt ui-li-has-thumb ui-first-child"><a href="#" class="ui-btn"><img src="img/contact.jpeg" alt="img/contact.jpeg"><h2>New Item Header</h2><p>Item second line</p></a><a href="#purchase" data-rel="popup" data-position-to="window" data-icon="delete" data-transition="pop" aria-haspopup="true" aria-owns="purchase" aria-expanded="false" class="ui-btn ui-btn-icon-notext ui-icon-delete ui-btn-a" title=""></a></li>');
                                         $("#listContact").append(new_contact);
                                     }
                               }
                               $("#listContact").listview("refresh");
                         }

                         function onError()
                         {
                         alert("Some Error Occured");
                         }
               }
        );


        $('#listContact').on("click", ".btnItemContact", function() {
             imgclick = true;
             //alert($(this).attr('id'));
             //alert($(this).attr('id').substr(4));
             selectContact = $(this).attr('id').substr(4);
             $("#contactName").val($("#name_" + selectContact).text().replace($("#num_" + selectContact).text(),""));
             $("#contactNumber").val($("#num_" + selectContact).text()) ;
             $('#imgAddContact').attr('src',$(this).attr( "src" ));
             $("#addContactButton").text('Update Contact');
             $( "#btnAddContact" ).click();

         });


        $('#listContact').on("click", ".btnConfirmDelContact", function() {
            imgclick = true;
            //alert($(this).attr('id'));
            //alert($(this).attr('id').substr(4));
            $("#lblID").text($(this).attr('id').substr(4)) ;
            $("#lblID").css('display','none');
            });


        $('#btnAddContact').focus(function() {
                    //alert("focus");
                     $("#contactName").val('') ;
                     $("#contactNumber").val('') ;
                     $('#imgAddContact').attr('src','img/contact.jpeg');
                     $("#addContactButton").text('Add Contact');
                     selectContact = '';
                     imgclick = false;
        });


        $("#addBackButton").click(function() {
                     $("#contactName").val('') ;
                     $("#contactNumber").val('') ;
                     $('#imgAddContact').attr('src','img/contact.jpeg');
                     $("#addContactButton").text('Add Contact');
                     selectContact = '';
                     imgclick = false;

         }
         );


        $("#btnCancelDel").click(function() {
          imgclick = false;
        });

        $("#btnDeleteContact").click(function() {
              imgclick = false;
              // alert($("#lblID").text());

                  var options = new ContactFindOptions();
                  options.filter = $("#lblID").text();
                  options.multiple = false;
                  fields = ["id"];

                  navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

                  function contactfindSuccess(contacts) {

                     var contact = contacts[0];
                     contact.remove(contactRemoveSuccess, contactRemoveError);

                     function contactRemoveSuccess(contact) {
                        alert("Contact Deleted");
                        $("#li_" + $("#lblID").text()).remove();
                     }

                     function contactRemoveError(message) {
                        alert('Failed because: ' + message);
                     }
                  }

                  function contactfindError(message) {
                     alert('Failed because: ' + message);
                  }
         });




function onFail(message) {
    alert('Failed because: ' + message);
}

        //function cameraTakePicture() { -- click imgAddContact
        $( "#imgAddContact" ).click(function() {
               // alert("imgAddContact");
                    navigator.camera.getPicture(onSuccess, onFail, {
                      quality: 100,
                      allowEdit:true,
                      targetWidth:225,
                      targetHeight:225,
                      //destinationType: Camera.DestinationType.DATA_URL
                      destinationType: Camera.DestinationType.FILE_URI
                   });

                   function onSuccess(imageData) {
                   $('#imgAddContact').attr('src', imageData);
                    }

                   function onFail(message) {
                      alert('Failed because: ' + message);
                   }
              }
        );

$('#listContact').on("click", ".callPhoneButton", function() {
    //alert("dblclick");
    if (imgclick == false) {
      //alert("#num_" + $(this).attr('id').substr(3));
      //alert($("#num_" + $(this).attr('id').substr(3)).text());
       window.open("tel:" + $("#num_" + $(this).attr('id').substr(3)).text() + '"', '_system');
    }
});

        $("#addContactButton").click(function() {
                     //alert("Contact Save with Success");
                     //alert($("#contactName").val());
                     //alert($("#contactNumber").val());
                     //alert($("#imgAddContact").attr( "src" ));
                //alert("selectContact: " + selectContact);
             if (selectContact == '')  { //Insert
                 var contact = navigator.contacts.create();
                 contact.displayName = $("#contactName").val() ;
                 var phoneNumbers = [];
                 phoneNumbers[0] = new ContactField('mobile', $("#contactNumber").val(), true);
                 contact.phoneNumbers = phoneNumbers;
                // contact.photos[0].value = $("#imgAddContact").attr( "src" );
                  //alert($("#imgAddContact").attr( "src" ));
                  var photos = [];
                  photos[0] = new ContactField('URL',  $("#imgAddContact").attr( "src" ), true);
                 // photos[0] = new ContactField('base64',  $("#imgAddContact").attr( "src" ), false);
                  contact.photos = photos;

                    contact.save(onSuccess,onError);

                function onSuccess(contact) {
                    /*   alert("Contact Save with Success");
                        alert(contact.id);
                       alert($("#contactNumber").val());
                       alert($("#contactName").val());
                       alert($("#imgAddContact").attr( "src" )); */


                   var new_contact = '';
                    //alert("new_contact: " + new_contact);
                   new_contact += '<li class="callPhoneButton" id="li_' + contact.id + '"><a id="name_' + contact.id + '" data-rel="popup" data-position-to="window" data-role="button" data-transition="fade" ><img href="#addContact" class="btnItemContact" id="img_' + contact.id + '" src="' + $("#imgAddContact").attr( "src" ) +'" alt="img/contact.jpeg">';
                   // alert(new_contact);
                   new_contact += '<h2  id="nameh2_' + contact.id + '"> ' + $("#contactName").val() + '</h2>';
                   // alert(new_contact);
                   new_contact += '<p id="num_' + contact.id + '">' + $("#contactNumber").val() + '</p></a><a id="del_' + contact.id + '" href="#deleteContact" class="btnConfirmDelContact" data-rel="popup" data-position-to="window" data-icon="delete" data-transition="pop" aria-haspopup="true"  aria-expanded="false" class="ui-btn ui-btn-icon-notext ui-icon-delete ui-btn-a" title=""></a></li>';

                    // alert(new_contact);
                    $("#listContact").append(new_contact);
                    $("#listContact").listview("refresh");
                    $("#contactName").val('') ;
                    $("#contactNumber").val('') ;
                    $('#imgAddContact').attr('src','img/contact.jpeg');
                    $("#addContactButton").text('Add Contact');

                };

                function onError(contactError) {
                    alert("Error = " + contactError.code);
                };
            } else { // UPDATE
                //alert("Update");
                //alert("selectContact: " + selectContact);
                 var options = new ContactFindOptions();
                  options.filter = selectContact;
                  options.multiple = false;
                  fields = ["id"];

                  navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

                  function contactfindSuccess(contacts) {
                     //alert("contactfindSuccess");
                       var contact = contacts[0];
                       contact.displayName = $("#contactName").val() ;
                       contact.phoneNumbers[0].value = $("#contactNumber").val();
                        var photos = [];
                      // photos[0] = new ContactField('base64',  $("#imgAddContact").attr( "src" ), false);
                      photos[0] = new ContactField('URL',  $("#imgAddContact").attr( "src" ), true);
                      contact.photos = photos;
                      //contact.photos[0].value = $("#imgAddContact").attr( "src" );

                       contact.save(onUpdateSuccess,onUpdateError);

                     function onUpdateSuccess(contact) {
                        alert("Contact Update");
                        alert("selectContact: " + selectContact);
                        alert($("#contactName").val());
                        alert($("#num_" + selectContact).text());
                        alert($("#img_" + selectContact).attr( "src" ));

                        alert($("#name_" + selectContact).text());
                        alert($("#nameh2_" + selectContact).text());
                        alert($("#contactName").val());
                        alert($("#contactNumber").val());
                        alert($('#imgAddContact').attr('src'));
                         //selectContact = $(this).attr('id');

                         $("#img_" + selectContact).attr( "src", $('#imgAddContact').attr('src'));
                         $("#nameh2_" + selectContact).text($("#contactName").val());
                         $("#num_" + selectContact).text($("#contactNumber").val());

                            $("#listContact").listview("refresh");
                            $("#contactName").val('') ;
                            $("#contactNumber").val('') ;
                            $('#imgAddContact').attr('src','img/contact.jpeg');
                            $("#addContactButton").text('Add Contact');
                     }

                     function onUpdateError(message) {
                        alert('Failed because: ' + message);
                     }
                  }

                  function contactfindError(message) {
                     alert('Failed because: ' + message);
                  }
            }  //End Else Update

        });








app.initialize();
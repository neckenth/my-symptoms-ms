console.log("Background running");

const background = {
  symptoms: [],

  init: function() {
    //listen for any messages and route them to functions
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.fn in background) {
        background[request.fn](request, sender, sendResponse);
      }
      const jsonObj = {};
      jsonObj["symptoms"] = request.symptoms;
      console.log("message received", jsonObj);

      //   this.postSymptoms(JSON.stringify(jsonObj))
      this.postSymptoms(request.symptoms);
    });
  },

  //not sure i need these, since i don't really need to send a response back to the popup

  // setSymptoms: function(request, sender, sendResponse) {
  //     console.log('setting symptoms obj', this.symptoms)
  //     this.symptoms.push(request.symptoms)

  // },

  // getSymptoms: function(request, sender, sendResponse) {
  //     sendResponse(this.symptoms)
  // },

  postSymptoms: function(msg) {
    const spreadSheetID = "1QYFb57cDedBeV53dLRgyo3vgLqNl1qP2FeSB_V_fyLA";

    const params = {
      range: "A1",
      majorDimension: "ROWS",
      values: [Object.values(msg)]
    };

    //get auth tokens
    chrome.identity.getAuthToken(
      {
        interactive: true
      },
      function(token) {
        console.log(token)
        // if (chrome.runtime.lastError) {
        //   alert(chrome.runtime.lastError.message);
        //   return;
        // }
        let x = new XMLHttpRequest();
        x.open(
          "GET",
          "https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=" +
            token
        );
        x.setRequestHeader('Authorization', 'Bearer ' + token);

        // x.onload = function() {
        //   alert(x.response);
        // };
        // x.send();

        var xhr = new XMLHttpRequest();
        xhr.open(
          "PUT",
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetID}/values/A1?valueInputOption=USER_ENTERED`
        );
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        console.log('THESE ARE PARAMS', params)
        xhr.send(params);
      }
    );

    // const GoogleAuth;

    // function initClient() {
    //   gapi.client.init({
    //     'apiKey': 'AIzaSyBXjq3MEaSQ-o_dax9r7RaYiJ8YaVK6UuM',
    //     'clientId': '48454209769-mnrprlbh63drei4rukpeski0strvadvo.apps.googleusercontent.com',
    //     'scope': 'https://www.googleapis.com/auth/spreadsheets',
    //     'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4']
    //   }).then(function () {
    //     GoogleAuth = gapi.auth2.getAuthInstance();

    //     GoogleAuth.isSignedIn.listen(updateSigninStatus)
    //   })
    // }

    //THIS WAS TESTED FROM THE GOOGLE AUTH PLAYGROUND AND CONFIRMED TO WORK
    // PUT `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetID}/values/A1?valueInputOption=USER_ENTERED`

    // let access_token = chrome.identity.getAuthToken({
    //     interactive: true
    // }, function(token) {
    //     if (chrome.runtime.lastError) {
    //         alert(chrome.runtime.lastError.message);
    //         return;
    //     }
    //     var x = new XMLHttpRequest();
    //     x.open('GET', 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token);
    //     x.onload = function() {
    //         alert(x.response);
    //     };
    //     x.send();
    // });

    // let sheetId = '1QYFb57cDedBeV53dLRgyo3vgLqNl1qP2FeSB_V_fyLA'

    //   var params = {
    //       "range":"A1",
    //       "majorDimension": "ROWS",
    //       "values": [
    //       msg
    //      ],
    // }
    // console.log("ACCESS_TOKEN", token);

    // var xhr = new XMLHttpRequest();
    // xhr.open('PUT', `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetID}/values/A1?valueInputOption=USER_ENTERED`)
    // xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    // xhr.send(JSON.stringify(params));

    // "https://ms-mysymptoms-1541705437963.firebaseio.com"
    // xhr.open("POST", "https://ms-mysymptoms-1541705437963.firebaseio.com/symptoms.json", true);
    // xhr.open("PUT", `https://docs.google.com/spreadsheets/d/${sheetId}`, true)
    // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // xhr.send(msg);

    //i would like to post data to an API endpoint here
    //need to be able to get data and write to csv, which requires server-side code
  }
};

background.init();

// // const buttonClicked = (tab) => {
// //     console.log(tab)
// // }

// chrome.browserAction.onClicked.addListener(buttonClicked)

// function buttonClicked(tab) {
//     let msg = {
//         txt: 'goodbye'
//     }
//     chrome.tabs.sendMessage(tab.id, msg)
//     console.log('button clicked', tab)
// }

// console.log('Ready to go')

// chrome.runtime.onMessage.addListener((message, sender, response) => {
//     chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
//         if (tabs.length) {
//             console.log('MESSAGE', message)
//         }
//     })
//     // console.log('MESSAGE', message['fatigue'])
// })

// var popups = chrome.extension.getViews({type: "popup"});
// if (0 < popups.length)
//     console.log('we are here')
//   popups[0].variable = 42;

// chrome.extension.onConnect.addListener(function(port) {
//     console.log("Connected .....");
//     port.onMessage.addListener(function(msg) {
//          console.log("message recieved" + msg);
//         //  port.postMessage("Hi Popup.js");
//     });
// })

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
    msg = msg.map(elem => Object.values(elem)[0]);
    const spreadSheetID = "1QYFb57cDedBeV53dLRgyo3vgLqNl1qP2FeSB_V_fyLA";

    const params = {
      majorDimension: "ROWS",
      values: [msg]
    };

    //get auth tokens
    chrome.identity.getAuthToken(
      {
        interactive: true
      },
      function(token) {
        console.log(token);
        if (chrome.runtime.lastError) {
          alert(chrome.runtime.lastError.message);
          return;
        }
        let x = new XMLHttpRequest();
        x.open(
          "GET",
          "https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=" +
            token
        );
        x.setRequestHeader("Authorization", "Bearer " + token);

        //post data - authorize with token
        const xhr2 = new XMLHttpRequest();

        xhr2.open(
          "POST",
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetID}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED`
          );
        xhr2.setRequestHeader("Authorization", "Bearer " + token);
        xhr2.send(JSON.stringify(params));
      }
    );
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

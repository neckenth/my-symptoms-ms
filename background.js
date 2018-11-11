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

      //send data to post function
      this.postSymptoms(request.symptoms);
    });
  },

  setSymptoms: function(request, sender, sendResponse) {
    console.log("setting symptoms obj", this.symptoms);
    this.symptoms.push(request.symptoms);
  },

  getSymptoms: function(request, sender, sendResponse) {
    sendResponse('message received')
  },

  postSymptoms: function(msg) {
    //extract values from msg obj for array in params obj below
    if (msg) {
      msg = msg.map(elem => Object.values(elem)[0]);

      let today = new Date();
      msg.unshift(today.toLocaleDateString("en-US"));
    }
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

const console = chrome.extension.getBackgroundPage().console;
console.log('hello')

const app = {

  symptoms: [],

  init: function () {
    //cache some element references
    let formEl = document.getElementById("symptoms-form");

    let fatigue = document.getElementById("fatigue");
    let tingling = document.getElementById("tingling");
    let weakness = document.getElementById("weakness");
    let vision = document.getElementById("vision");
    let dizzy = document.getElementById("dizzy");
    let cognition = document.getElementById("cognition");
    let depression = document.getElementById("depression");
    let balance = document.getElementById("balance");

    //upon submit, update symptoms obj and send to background
    formEl.addEventListener("submit", ev => {
      ev.preventDefault();
      console.log('button click')
      this.symptoms.push({fatigue: Number(fatigue.value)})
      this.symptoms.push({tingling: Number(tingling.value)})
      this.symptoms.push({weakness: Number(weakness.value)})
      this.symptoms.push({vision: Number(vision.value)})
      this.symptoms.push({dizzy: Number(dizzy.value)})
      this.symptoms.push({cognition: Number(cognition.value)})
      this.symptoms.push({depression: Number(depression.value)})
      this.symptoms.push({balance: Number(balance.value)})

      // let date = new Date();
      // var dd = today.getDate();
      // var mm = today.getMonth(); //January is 0!
      // var yyyy = today.getFullYear();

      // this.symptoms.push({date: new Date()})

      // chrome.runtime.sendMessage({fn: 'getSymptoms'}, function(response) {
      //   console.log('popup got response', response)
      // })

      chrome.runtime.sendMessage({fn: 'setSymptoms', symptoms: this.symptoms})
    });

  }
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    var response;
    var requestURL = "https://sheets.googleapis.com/v4/spreadsheets/" + '1QYFb57cDedBeV53dLRgyo3vgLqNl1qP2FeSB_V_fyLA' + "/values/" + 'A1';
    var objectHTTP;
    objectHTTP = new XMLHttpRequest();
    objectHTTP.onreadystatechange = function() {

    if (objectHTTP.readyState == 4 && objectHTTP.status == 200) {
            response = objectHTTP.responseText;
        }
    };

    objectHTTP.open("GET", requestURL, true);
    objectHTTP.setRequestHeader('Authorization', 'Bearer ' + token);
    objectHTTP.send();

    // This is the part where I obtain the response, but how do I use it in the main app (popup.js)? Can I somehow share the variables?
    });
  app.init();
})

// function popup() {
//   let symptoms = {};
//   let formEl = document.getElementById("symptoms-form");

//   let fatigue = document.getElementById("fatigue");
//   let tingling = document.getElementById("tingling");
//   let weakness = document.getElementById("weakness");
//   let vision = document.getElementById("vision");
//   let dizzy = document.getElementById("dizzy");
//   let cognition = document.getElementById("cognition");
//   let depression = document.getElementById("depression");
//   let balance = document.getElementById("balance");

//   fatigue.addEventListener("change", event => {
//     symptoms[event.target.name] = Number(event.target.value);
//   });
//   tingling.addEventListener("change", event => {
//     symptoms[event.target.name] = Number(event.target.value);
//   });
//   weakness.addEventListener("change", event => {
//     symptoms[event.target.name] = Number(event.target.value);
//   });
//   vision.addEventListener("change", event => {
//     symptoms[event.target.name] = Number(event.target.value);
//   });
//   dizzy.addEventListener("change", event => {
//     symptoms[event.target.name] = Number(event.target.value);
//   });
//   cognition.addEventListener("change", event => {
//     symptoms[event.target.name] = Number(event.target.value);
//   });
//   depression.addEventListener("change", event => {
//     symptoms[event.target.name] = Number(event.target.value);
//   });
//   balance.addEventListener("change", event => {
//     symptoms[event.target.name] = Number(event.target.value);
//   });

//   formEl.addEventListener("submit", ev => {
//     ev.preventDefault();
//   });

//   // const xhr = new XMLHttpRequest();

//   // xhr.open("POST", "http://localhost:8080/", true)
//   // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
//   // xhr.send('hello world')



//   console.log(symptoms)
//   return symptoms;
// }

// // const symptoms = popup();



// // console.log('SYMPTOMS', symptoms)



// //you have the symptoms obj --> write to csv


// // localStorage.setItem('symptoms', JSON.stringify(symptoms))

// // chrome.storage.local.set({test: 'THIS IS A TEST'}, () => {
// //   console.log('WE MADE IT HERE')
// // })
// // chrome.storage.local.set({
// //   test: 'THIS IS A TEST'
// // }, () => {
// //   chrome.tabs.executeScript({
// //     file: 'content.js'
// //   })
// // })


// // chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
// //   console.log('we are here')
// //   chrome.tabs.sendMessage(tabs[0].id, symptoms)
// // })

// // var port = chrome.extension.connect({
// //   name: "Sample Communication"
// // });
// // port.postMessage('"Hi BackGround"');
// // port.onMessage.addListener(function(msg) {
// //   console.log("message recieved" + msg);
// // });

// // const messenger = () => {
// //   const port = chrome.extension.connect({
// //     name: 'passing data'
// //   });
// //   port.postMessage('Hi Background');
// //   port.onMessage.addListener(data => {
// //     console.log('data received: ', data)
// //   })
// // }


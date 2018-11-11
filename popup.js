const console = chrome.extension.getBackgroundPage().console;

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
    let journal = document.getElementById("journal")

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
      this.symptoms.push({journal: journal.value})


      chrome.runtime.sendMessage({fn: 'getSymptoms'}, function(response) {
        console.log('popup got response', response)
        window.close();
      })

      chrome.runtime.sendMessage({fn: 'setSymptoms', symptoms: this.symptoms})
    });

  }
}

document.addEventListener('DOMContentLoaded', () => {
    app.init();  
  });


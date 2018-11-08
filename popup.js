function popup() {
  console.log("ping");
  console.log(document);

  //this part is not - returning an empty string - do i need an event listener
  let userInput = document.getElementById("fatigue").value;
  console.log(userInput);

  //   console.log(userInput)

  let params = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(params, gotTab);

  //this part is working
  function gotTab(tabs) {
    //   console.log(tabs)
    let newData = {
      fatigue: userInput
    };
    chrome.tabs.sendMessage(tabs[0].id, newData);
  }
}

popup();

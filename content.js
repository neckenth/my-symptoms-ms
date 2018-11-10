console.log('Ready to go')

chrome.runtime.onMessage.addListener(message => {
    console.log(message)
})

// chrome.storage.local.get('newSymptoms', () => {
//     console.log('WE ARE HERE')
// })

// let port = chrome.runtime.connect();

// chrome.runtime.onConnect.addListener(() => {
//     port.onMessage.addListener(message => {
//         console.log('MESSAGE', message)
//         port.postMessage('MESSAGE POSTED', message)
//     })
// })
//     port.onMessage.addListener(function(msg) {
//       if (msg.joke == "Knock knock")
//         port.postMessage({question: "Who's there?"});
//       else if (msg.answer == "Madame")
//         port.postMessage({question: "Madame who?"});
//       else if (msg.answer == "Madame... Bovary")
//         port.postMessage({question: "I don't get it."});
//     });
//   });


// function gotMessage(message, sender, response) {
//     console.log('MESSAGE', message)
// }
console.log('Ready to go')

chrome.runtime.onMessage.addListener(gotMessage)

function gotMessage(message, sender, response) {
    console.log(message)
}
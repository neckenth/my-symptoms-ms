console.log('Background running')

// const buttonClicked = (tab) => {
//     console.log(tab)
// }

chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab) {
    let msg = {
        txt: 'hello'
    }
    chrome.tabs.sendMessage(tab.id, msg)
    console.log('button clicked', tab)
}

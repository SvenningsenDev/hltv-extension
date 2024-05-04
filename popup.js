document.getElementById('toggleSpoiler').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.storage.local.get('spoilersRemoved', function(data) {
            const currentStatus = !data.spoilersRemoved;
            console.log(currentStatus);  // Log the current status to debug
            chrome.storage.local.set({'spoilersRemoved': currentStatus}, function() {
                chrome.scripting.executeScript({
                    target: {tabId: tabs[0].id},
                    function: setPageBlur,
                    args: [currentStatus]
                });
            });
        });
    });
});

function setPageBlur() {
    console.log("JEG ER HER NU");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            files: ['content.js']
        });
    });
}

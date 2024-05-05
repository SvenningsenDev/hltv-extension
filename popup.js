document.getElementById('toggleSpoiler').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.storage.local.get('spoilersRemoved', function(data) {
            const currentStatus = !data.spoilersRemoved;
            console.log(currentStatus);  // Log the current status for debugging
            chrome.storage.local.set({'spoilersRemoved': currentStatus}, function() {
                // Inject the content script to read the new state and act on it
                chrome.scripting.executeScript({
                    target: {tabId: tabs[0].id},
                    files: ['content.js']
                });
            });
        });
    });
});
